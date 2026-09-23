import type { CSSProperties } from 'react';
import { media, projectById } from '../content';
import { Chapter, ChapterFoot, Lines, Shot } from '../stage/Stage';
import { at } from '../stage/useStage';
import a from './artemis.module.css';

const project = projectById.artemis;
const img = media.artemis;

const WEIGHTS = {
  desktop: [1, 0.9, 1.1, 1.1],
  handheld: [0.7, 0.72, 1.05, 0.78],
} as const;

const SCENES = [
  {
    kicker: 'Account',
    title: 'Accounts, balances,\nloans.',
    body: 'Customers see their primary and secondary accounts, available balances and each loan’s amount, outstanding balance, instalments and rate.',
  },
  {
    kicker: 'Transaction',
    title: 'Every transfer has\na source and a destination.',
    body: 'Transfers between own accounts, express transactions, credit-card and loan payments, and payments to saved beneficiaries.',
  },
  {
    kicker: 'Operation',
    title: 'Cash moves only\nafter it is confirmed.',
    body: 'Tellers run deposits, withdrawals and payments. Each confirmation states holder, account, amount and resulting balance before it commits.',
  },
  {
    kicker: 'Management',
    title: 'The whole bank,\nfrom one panel.',
    body: 'Administrators follow transactions, payments, clients and assigned products, and manage credit cards with their limits, debt and status.',
  },
];

/** The withdrawal confirmation, as the ledger line it represents. */
const LEDGER = [
  { label: 'Saldo actual', value: '73,500.00' },
  { label: 'Monto a retirar', value: '20,000.00', op: '−' },
  { label: 'Saldo final', value: '53,500.00', op: '=' },
];

function Copy({ i }: { i: number }) {
  const scene = SCENES[i];
  return (
    <div className={a.copy} data-slot={i}>
      <p className={a.kicker}>
        <span>{String(i + 1).padStart(2, '0')}</span>
        {scene.kicker}
      </p>
      <h3 className={a.title}>
        <Lines text={scene.title} lineClassName={a.line} />
      </h3>
      <p className={a.body}>{scene.body}</p>
    </div>
  );
}

export function ArtemisExperience() {
  return (
    <Chapter project={project} weights={WEIGHTS} className={a.world} frameClassName={a.frame}>
      <div className={a.columns} aria-hidden="true" />

      <div className={a.masthead}>
        <p className={a.eyebrow}>04 · {project.field}</p>
        <h3 id={`project-title-${project.id}`} className={a.name}>
          {project.name}
        </h3>
        <p className={a.alias}>Repository · {project.alias}</p>
      </div>

      <ol className={a.index} aria-hidden="true">
        {SCENES.map((scene, i) => (
          <li key={scene.kicker} {...at(i)} style={{ '--i': i } as CSSProperties}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            {scene.kicker}
          </li>
        ))}
      </ol>

      {/* 01 — account */}
      <section className={a.scene} {...at(0)} data-reveal="">
        <Copy i={0} />
        <div className={a.plate} data-shot="accounts">
          <Shot m={img.accounts} sizes="(min-width: 1024px) 62vw, 100vw" />
        </div>
      </section>

      {/* 02 — transaction */}
      <section className={a.scene} {...at(1)} data-reveal="">
        <Copy i={1} />
        <div className={a.plate} data-shot="transfer">
          <Shot m={img.transfer} sizes="(min-width: 1024px) 90vw, 100vw" />
        </div>
      </section>

      {/* 03 — operation */}
      <section className={a.scene} {...at(2)} data-reveal="">
        <Copy i={2} />
        <dl className={a.ledger}>
          {LEDGER.map((row, i) => (
            <div key={row.label} style={{ '--i': i } as CSSProperties}>
              <dt>{row.label}</dt>
              <dd>
                {row.op && <span aria-hidden="true">{row.op}</span>}
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className={a.trio}>
          {[img.teller, img.deposit, img.withdrawal].map((m, i) => (
            <div key={m.src} className={a.cell} style={{ '--i': i } as CSSProperties}>
              <Shot m={m} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      </section>

      {/* 04 — management */}
      <section className={a.scene} {...at(3)} data-reveal="">
        <Copy i={3} />
        <div className={a.plate} data-shot="admin">
          <Shot m={img.admin} sizes="(min-width: 1024px) 52vw, 100vw" />
        </div>
        <div className={a.plate} data-shot="cards">
          <Shot m={img.cards} sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
        <ChapterFoot project={project} className={a.foot} />
      </section>
    </Chapter>
  );
}
