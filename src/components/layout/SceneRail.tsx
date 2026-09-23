import { useEffect, useState } from 'react';
import {
  getStageSnapshot,
  goToScene,
  skipProjects,
  step,
  subscribeStage,
  type StageSnapshot,
} from '@/features/projects/stage/stepper';
import styles from './SceneRail.module.css';
import { Arrow } from '@/components/Arrow';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Where am I, and what do I do next. While a pinned stage holds the screen,
 * the rail names the chapter and shows its scenes as dots, and a cue at the
 * foot of the screen says to scroll (or swipe) for the next one.
 */
export function SceneRail() {
  const [stage, setStage] = useState<StageSnapshot | null>(getStageSnapshot);
  const [touch, setTouch] = useState(false);

  useEffect(() => subscribeStage(setStage), []);

  useEffect(() => {
    const mq = window.matchMedia?.('(pointer: coarse)');
    if (!mq) return;
    const sync = () => setTouch(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  const visible = stage !== null;
  const scenes = stage ? Array.from({ length: stage.count }, (_, i) => i) : [];
  const verb = touch ? 'Swipe up' : 'Scroll';

  return (
    <>
      <nav
        className={styles.rail}
        data-visible={visible || undefined}
        aria-label={stage ? `${stage.label}: scenes` : 'Scenes'}
        aria-hidden={!visible}
      >
        {stage && (
          <>
            <p className={styles.label}>{stage.label}</p>
            <ol className={styles.dots}>
              {scenes.map((i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={styles.dot}
                    aria-label={`Scene ${i + 1} of ${stage.count}`}
                    aria-current={i === stage.scene ? 'step' : undefined}
                    onClick={() => goToScene(i)}
                  />
                </li>
              ))}
            </ol>
            <p className={styles.count} aria-hidden="true">
              {pad(stage.scene + 1)}<span>/{pad(stage.count)}</span>
            </p>
          </>
        )}
      </nav>

      <button
        type="button"
        className={styles.cue}
        data-visible={(stage?.hasNext ?? false) || undefined}
        data-first={stage?.first || undefined}
        tabIndex={stage?.hasNext ? 0 : -1}
        aria-hidden={!stage?.hasNext}
        onClick={() => step(1)}
      >
        {stage && !stage.first && (
          <span className={styles.cueCount} aria-hidden="true">
            {pad(stage.scene + 1)}<span>/{pad(stage.count)}</span>
          </span>
        )}
        <span>{stage?.first ? `${verb} to explore` : verb}</span>
        <span className={styles.srOnly}> to the next scene</span>
        <span className={styles.chevron} aria-hidden="true" />
      </button>

      <div
        className={styles.actions}
        data-visible={stage?.skippable || undefined}
        aria-hidden={!stage?.skippable}
      >
        <a
          className={styles.skip}
          href="#experience"
          tabIndex={stage?.skippable ? 0 : -1}
          aria-label="Skip projects"
          onClick={skipProjects}
        >
          Skip<span className={styles.long}> projects</span> <Arrow dir="down" />
        </a>
      </div>
    </>
  );
}
