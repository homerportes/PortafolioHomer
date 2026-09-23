import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { profile } from '@/content/profile';
import { experience } from '@/content/experience';
import { media, projects, type Media, type ProjectMeta } from '@/features/projects/content';
import { Shot } from '@/features/projects/stage/Stage';
import { skipProjects } from '@/features/projects/stage/stepper';
import { at, useStage } from '@/features/projects/stage/useStage';
import styles from './Hero.module.css';
import { Arrow } from '@/components/Arrow';

/**
 * arrival → the full stop opens into the room → "5 Projects. Five worlds."
 * → the ground turns to Finevo's forest and its chapter begins
 */
const WEIGHTS = [0.5, 1, 0.9, 0.7] as const;
const HANDHELD_WEIGHTS = [0.8, 0.65, 0.8, 0.6] as const;

const LINES = ['Homer', 'Portes'];

/** the capture each project card opens on */
const COVERS: Record<ProjectMeta['id'], Media> = {
  finevo: media.finevo.marketing,
  facel: media.facel.ecf31,
  realstate: media.realstate.search,
  artemis: media.artemis.accounts,
  linkup: media.linkup.feed,
};
const current = experience.find((role) => role.current);

const FACTS = [
  { label: 'Currently', value: current ? `${current.title}, ${current.company}` : profile.role },
  { label: 'Focus', value: profile.interests.join(' · ') },
  { label: 'Learning', value: profile.learning.join(' · ') },
  {
    label: 'Languages',
    value: profile.languages.map((l) => `${l.name} (${l.level.split(' ·')[0]})`).join(' · '),
  },
];

const clock = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Santo_Domingo',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

/** Local time in Santo Domingo, refreshed each half minute. */
function useSantoDomingoTime() {
  const [time, setTime] = useState(() => clock.format(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setTime(clock.format(new Date())), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/**
 * The name answers the pointer: letters near it widen along Archivo's width
 * axis, the rest settle back. Pure style writes on a frame, no React state;
 * skipped for coarse pointers and reduced motion.
 */
function useElasticName(onSettle: () => void) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia?.('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!fine?.matches) return;

    const letters = Array.from(el.querySelectorAll<HTMLElement>('[data-letter]'));
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      // read every position first, then write: no forced layout between letters
      const widths = letters.map((letter) => {
        const r = letter.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
        return String(Math.round(100 + Math.max(0, 1 - d / 320) * 25));
      });
      letters.forEach((letter, i) => letter.style.setProperty('--wdth', widths[i]));
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const letter of letters) letter.style.removeProperty('--wdth');
      window.setTimeout(onSettle, 650);
    };

    const onScroll = () => {
      if (letters.some((l) => l.style.getPropertyValue('--wdth'))) onLeave();
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [onSettle]);

  return ref;
}

/**
 * Records where the full stop sits inside the frame (`--dx`, `--dy`) so the
 * scroll can open the room from exactly that point.
 */
function useDotAnchor(frame: RefObject<HTMLDivElement | null>, dot: RefObject<HTMLSpanElement | null>) {
  const [measure] = useState(() => () => {
    const f = frame.current;
    const d = dot.current;
    if (!f || !d) return;
    // offsets ignore the scroll transforms, so this is right at any scroll position
    let x = d.offsetWidth / 2;
    let y = d.offsetHeight / 2;
    let node: HTMLElement | null = d;
    while (node && node !== f) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    f.style.setProperty('--dx', `${Math.round(x)}px`);
    f.style.setProperty('--dy', `${Math.round(y)}px`);
    f.style.setProperty('--dr', `${Math.round(d.offsetWidth / 2)}px`);
  });

  // Offsets are read only when the layout really changed: on mount, once the
  // fonts land, on resize, and when the name settles after a hover (see
  // useElasticName). Reading them on scroll forced a reflow on every frame.
  useEffect(() => {
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return measure;
}

/**
 * The opening frame, then the doorway into the work. The name arrives
 * oversized and answers the pointer; on the first scroll its full stop opens
 * into a dark room that names the five projects, and the room becomes
 * Finevo's ground.
 */
export function Hero() {
  const ref = useStage({ desktop: WEIGHTS, handheld: HANDHELD_WEIGHTS }, 'Intro');
  const frameRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const remeasure = useDotAnchor(frameRef, dotRef);
  const nameRef = useElasticName(remeasure);
  const time = useSantoDomingoTime();

  return (
    <section
      className={styles.hero}
      id="top"
      data-tone="light"
      data-surface="#f3eee4"
      aria-labelledby="hero-title"
    >
      <div
        ref={ref}
        className={styles.track}
        style={{ '--len': WEIGHTS.reduce<number>((sum, weight) => sum + weight, 1), '--handheld-len': HANDHELD_WEIGHTS.reduce<number>((sum, weight) => sum + weight, 1) } as CSSProperties}
      >
        <div ref={frameRef} className={styles.frame}>
          <div className={styles.light} aria-hidden="true" />

          <div className={styles.intro} {...at(0, 1)}>
            <div className={styles.meta}>
              <p className={styles.kicker}>Portfolio 2026</p>
              <p className={styles.clock}>
                {profile.locationShort} ·{' '}
                <time aria-label={`Local time in Santo Domingo: ${time}`}>{time}</time>
              </p>
            </div>

            <h1 ref={nameRef} className={styles.name} id="hero-title" aria-label={profile.name}>
              {LINES.map((line, i) => (
                <span
                  key={line}
                  className={styles.nameLine}
                  style={{ '--i': i } as CSSProperties}
                  aria-hidden="true"
                >
                  <span>
                    {line.split('').map((char, j) => (
                      <span key={j} data-letter="" className={styles.letter}>
                        {char}
                      </span>
                    ))}
                    {i === LINES.length - 1 && <span ref={dotRef} className={styles.period} />}
                  </span>
                </span>
              ))}
            </h1>

            <div className={styles.aside}>
              <p className={styles.statement}>
                I build complete systems: <em>backend first</em>, with frontends that hold up to it.
              </p>
              <p className={styles.sub}>
                Financial platforms, electronic invoicing and industrial software. Now expanding
                into AI and data science.
              </p>
              <div className={styles.actions}>
                <a className={styles.primary} href="#experience" onClick={skipProjects}>
                  View experience <Arrow dir="right" />
                </a>
                <a className={styles.secondary} href={`mailto:${profile.email}`}>
                  Get in touch <Arrow dir="up-right" />
                </a>
              </div>

              <div className={styles.contact}>
                <p className={styles.contactLabel}>Email</p>
                <a className={styles.email} href={`mailto:${profile.email}`}>
                  {profile.email}
                  <Arrow dir="up-right" />
                </a>
                <p className={styles.social}>
                  <a href={profile.social.github} target="_blank" rel="noreferrer">
                    GitHub <Arrow dir="up-right" />
                  </a>
                  <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn <Arrow dir="up-right" />
                  </a>
                </p>
              </div>
            </div>

            <dl className={styles.facts}>
              {FACTS.map((fact, i) => (
                <div key={fact.label} style={{ '--i': i } as CSSProperties}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* the full stop opens into the room where the work begins */}
          <div className={styles.portal} {...at(1, 2, 3)} data-tone="dark" data-surface="#16120d">
            <div className={styles.forest} aria-hidden="true" />
            <div className={styles.room}>
              <p className={styles.roomTitle}>
                <span className={styles.roomLine}>
                  <span>
                    5 Projects<span className={styles.roomDot} aria-hidden="true" />
                  </span>
                </span>{' '}
                <span className={styles.roomLine}>
                  <span>Five worlds.</span>
                </span>
              </p>

              <div className={styles.worlds} {...at(2, 3)}>
                <div className={styles.worldsHead}>
                  <p className={styles.worldsHint}>
                    <span className={styles.hintIcon} aria-hidden="true"><Arrow dir="down" /></span>
                    <span>
                      Click the project you want to see, <em>or scroll to see them all.</em>
                    </span>
                  </p>
                  <a className={styles.skip} href="#experience" onClick={skipProjects}>
                    Skip projects <Arrow dir="down" />
                  </a>
                </div>
                <nav aria-label="Project chapters">
                  <ol className={styles.cards}>
                    {projects.map((project, i) => (
                      <li
                        key={project.id}
                        style={{ '--i': i, '--ground': project.surface } as CSSProperties}
                      >
                        <a className={styles.card} href={`#project-${project.id}`}>
                          <span className={styles.cardMedia}>
                            <Shot m={COVERS[project.id]} alt="" sizes="(min-width: 1024px) 20vw, 72vw" />
                          </span>
                          <span className={styles.cardBody}>
                            <span className={styles.cardTop}>
                              <span className={styles.worldNum}>{project.number}</span>
                              <span className={styles.cardGo} aria-hidden="true"><Arrow dir="up-right" /></span>
                            </span>
                            <span className={styles.worldName}>{project.name}</span>
                            <span className={styles.worldField}>{project.field}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>

            <p className={styles.enter} aria-hidden="true">
              <span>01</span> Finevo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
