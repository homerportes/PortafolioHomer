import type { CSSProperties } from 'react';
import { media, projectById } from '../content';
import { Chapter, ChapterFoot, Lines, Shot } from '../stage/Stage';
import { at } from '../stage/useStage';
import f from './finevo.module.css';

const project = projectById.finevo;
const img = media.finevo;

/** Scroll length per scene, in viewport heights. */
const WEIGHTS = {
  desktop: [0.9, 1, 0.9, 0.9, 0.9, 1.1],
  handheld: [0.65, 0.72, 0.68, 0.68, 0.68, 0.78],
} as const;

const SCENES = [
  {
    kicker: 'Personal finance',
    title: 'Everyday money,\nmade legible.',
    body: 'A personal-finance product that gathers transactions, budgets and advisor conversations into one calm workspace.',
  },
  {
    kicker: 'Input',
    title: 'Three formats.\nOne language.',
    body: 'Gmail notices, Excel/CSV rows and manual entries arrive in different shapes. Finevo normalizes each one into the same transaction record.',
  },
  {
    kicker: 'Understand',
    title: 'The month,\nat a glance.',
    body: 'The overview reads total spending, where the money went and what still needs classifying, built only from registered transactions.',
  },
  {
    kicker: 'Control',
    title: 'Every movement\naccounted for.',
    body: 'Recent movements surface merchant, category and date, and flag the ones still waiting for review.',
  },
  {
    kicker: 'Plan',
    title: 'A limit for\nevery category.',
    body: 'Budgets set a planned amount per category and measure spending against it, month by month.',
  },
  {
    kicker: 'Guidance',
    title: 'Advice, in the\nsame place.',
    body: 'Clients find advisors by specialty and continue the conversation in private messages.',
  },
];

function Copy({ i }: { i: number }) {
  const scene = SCENES[i];
  return (
    <div className={f.copy} data-slot={i}>
      <p className={f.kicker}>
        <span>{String(i + 1).padStart(2, '0')}</span>
        {scene.kicker}
      </p>
      <h4 className={f.title}>
        <Lines text={scene.title} lineClassName={f.line} />
      </h4>
      <p className={f.body}>{scene.body}</p>
    </div>
  );
}

export function FinevoExperience() {
  return (
    <Chapter project={project} weights={WEIGHTS} className={f.world} frameClassName={f.frame}>
      <div className={f.glow} aria-hidden="true" />
      <div className={f.horizon} aria-hidden="true" />

      {/* running mark, from scene 2 onward */}
      <p className={f.mark} {...at(1, 2, 3, 4, 5)} aria-hidden="true">
        <span>01</span> Finevo
      </p>

      {/* 01 — introduction */}
      <section className={f.scene} {...at(0)} data-reveal="">
        <h3 id={`project-title-${project.id}`} className={f.giant}>
          <span>Finevo</span>
        </h3>
        <Copy i={0} />
        <div className={f.marketing}>
          <Shot m={img.marketing} eager sizes="(min-width: 1024px) 74vw, 100vw" />
        </div>
      </section>

      {/* 02 — input */}
      <section className={f.scene} {...at(1)} data-reveal="">
        <Copy i={1} />
        <div className={f.normal}>
          <Shot m={img.normalization} sizes="(min-width: 1024px) 110vw, 160vw" />
        </div>
      </section>

      {/* 03 + 04 — the overview, then the camera moves into its movements */}
      <section className={f.scene} {...at(2)} data-reveal="">
        <Copy i={2} />
      </section>
      <div className={f.overview} {...at(2, 3)} data-reveal="">
        <div className={f.overviewCam}>
          <Shot m={img.overview} sizes="(min-width: 1024px) 70vw, 100vw" />
        </div>
      </div>
      <section className={f.scene} {...at(3)} data-reveal="">
        <Copy i={3} />
      </section>
      <div className={f.overviewPhone} {...at(2, 3)}>
        <Shot m={img.overviewPhone} sizes="(max-width: 1023px) 70vw, 100vw" />
      </div>

      {/* 05 — plan */}
      <section className={f.scene} {...at(4)} data-reveal="">
        <Copy i={4} />
        <div className={f.budgets}>
          <div className={f.budgetsScroll}>
            <Shot m={img.budgets} sizes="(min-width: 1024px) 64vw, 100vw" />
          </div>
        </div>
      </section>

      {/* 06 — guidance */}
      <section className={f.scene} {...at(5)} data-reveal="">
        <Copy i={5} />
        <div className={f.advisors}>
          <Shot m={img.advisors} className={f.advisorsDesktop} sizes="58vw" />
          <Shot m={img.advisorsPhone} className={f.advisorsHandheld} sizes="70vw" />
        </div>
        <div className={f.phone}>
          <Shot m={img.messagesPhone} sizes="(max-width: 1023px) 62vw, 100vw" />
        </div>
        <ChapterFoot project={project} className={f.foot} />
      </section>

      <div className={f.rail} aria-hidden="true">
        {SCENES.map((scene, i) => (
          <span key={scene.kicker} {...at(i)} style={{ '--i': i } as CSSProperties}>
            {scene.kicker}
          </span>
        ))}
      </div>
    </Chapter>
  );
}
