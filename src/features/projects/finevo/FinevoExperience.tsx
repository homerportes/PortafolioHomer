import type { CSSProperties } from 'react';
import { media, projectById } from '../content';
import { Chapter, ChapterFoot, Lines, Shot, ScenePoints } from '../stage/Stage';
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
    body: 'A personal-finance platform that brings scattered money activity into one place, so people can understand it, organise it and decide what to do next.',
    points: ['The problem: money data arrives scattered across Gmail, spreadsheets and cash', 'ASP.NET Core API · EF Core · React + TypeScript'],
  },
  {
    kicker: 'Input',
    title: 'Three formats.\nOne language.',
    body: 'Gmail notices, Excel/CSV rows and manual entries arrive in different shapes. Finevo normalizes each into one record (date, amount, currency, category, type, source) that the whole product relies on.',
    points: ['Gmail notices, Excel / CSV rows and manual entries', 'One record: date, description, amount, currency, category, type, source'],
  },
  {
    kicker: 'Understand',
    title: 'The month,\nat a glance.',
    body: 'The overview summarises a period: total spending, where it went by category, what is still uncategorised, which budgets need attention and a recommended next step.',
    points: ['Total spending, spending by category and uncategorised items', 'Budgets that need attention and a recommended next action'],
  },
  {
    kicker: 'Control',
    title: 'Every movement\naccounted for.',
    body: 'Transactions are a workspace, not a list: filter by source, category and date, and review what is still uncategorised in place.',
    points: ['Filters by source, category and date; categorise in place', 'The server resolves the user from auth claims, never from a UserId sent by the client'],
  },
  {
    kicker: 'Plan',
    title: 'A limit for\nevery category.',
    body: 'Monthly budgets set a limit per category and measure real spending against it, so overspending shows before the month ends.',
    points: ['Monthly budgets per category', 'Measured against real spending, not estimates'],
  },
  {
    kicker: 'Guidance',
    title: 'Advice, in the\nsame place.',
    body: 'Clients discover advisors by specialty, compare profiles and consultation prices, and talk to them in private messages inside the platform.',
    points: ['Advisor marketplace by specialty, with profiles and pricing', 'Private client–advisor messaging', 'JWT and Google OIDC hardened with PKCE, state and nonce'],
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
      <h3 className={f.title}>
        <Lines text={scene.title} lineClassName={f.line} />
      </h3>
      <p className={f.body}>{scene.body}</p>
      <ScenePoints items={scene.points} />
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
