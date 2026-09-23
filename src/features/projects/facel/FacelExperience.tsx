import type { CSSProperties, ReactNode } from 'react';
import { media, projectById } from '../content';
import { Chapter, ChapterFoot, Lines, Shot } from '../stage/Stage';
import { at } from '../stage/useStage';
import x from './facel.module.css';

const project = projectById.facel;
const img = media.facel;

const WEIGHTS = {
  desktop: [1, 1, 0.9, 0.9, 1.1],
  handheld: [0.7, 0.7, 0.68, 0.72, 0.78],
} as const;

/** Stage identifiers exactly as `FiscalDocumentPipeline` names them. */
const STAGES = ['SERIALIZE', 'PRE_SIGN_VALIDATE', 'SIGN', 'FINAL_VALIDATE', 'BUILD_EVIDENCE'];
/** which scene each stage belongs to */
const STAGE_SCENE = [1, 2, 3, 4, 4];

/** The e-NCF of the sample document: type E31 + a 10-digit sequence. */
const ENCF = 'E310000000001';

/** DGII status codes as modelled in `packages/dgii-contracts`. */
const STATUSES: [string, string][] = [
  ['1', 'ACCEPTED'],
  ['4', 'CONDITIONALLY_ACCEPTED'],
  ['3', 'PROCESSING'],
  ['2', 'REJECTED'],
  ['0', 'NOT_FOUND'],
];

const t = (name: string) => (
  <>
    <i>&lt;</i>
    <b>{name}</b>
    <i>&gt;</i>
  </>
);
const c = (name: string) => (
  <>
    <i>&lt;/</i>
    <b>{name}</b>
    <i>&gt;</i>
  </>
);
const v = (value: string) => <em>{value}</em>;

/**
 * Excerpt of the e-CF XML the pipeline serializes: element names from the
 * official schema, values taken from the sample e-CF 31 shown in scene one.
 */
const XML: [number, ReactNode][] = [
  [0, t('ECF')],
  [1, t('Encabezado')],
  [2, t('IdDoc')],
  [3, <>{t('TipoeCF')}{v('31')}{c('TipoeCF')}</>],
  [3, <>{t('eNCF')}{v(ENCF)}{c('eNCF')}</>],
  [2, c('IdDoc')],
  [2, <>{t('Emisor')}{t('RNCEmisor')}{v('101010101')}{c('RNCEmisor')}</>],
  [2, <>{t('Comprador')}{t('RNCComprador')}{v('101000001')}{c('RNCComprador')}</>],
  [2, t('Totales')],
  [3, <>{t('MontoTotal')}{v('375200.00')}{c('MontoTotal')}</>],
  [2, c('Totales')],
  [1, c('Encabezado')],
  [1, <>{t('DetallesItems')}<i>…</i>{c('DetallesItems')}</>],
  [0, c('ECF')],
];

const SCENES = [
  {
    kicker: 'Input',
    title: 'A business document\nbecomes a fiscal one.',
    body: 'A multi-tenant e-CF platform for the Dominican Republic: a NestJS fiscal core, a Next.js workspace, and every step recorded in PostgreSQL.',
  },
  {
    kicker: 'Stage 01 · Serialize',
    title: 'Structure\nfirst.',
    body: 'Each invoice is serialized into e-CF XML, the structure DGII defines per document type, from E31 to E46.',
  },
  {
    kicker: 'Stage 02 · Pre-sign validate',
    title: 'Validate\nbefore signing.',
    body: 'The XML is checked against the official schema before any signature, so a malformed document never reaches the signer.',
  },
  {
    kicker: 'Stage 03 · Sign',
    title: 'Sign without\ntouching a byte.',
    body: 'An XMLDSig signature is applied, and the pipeline fails if the signer alters the unsigned content. The first six characters of the SignatureValue become the security code.',
  },
  {
    kicker: 'Stages 04–05 · Validate · Evidence',
    title: 'Validate again.\nKeep the evidence.',
    body: 'The signed XML is validated a second time and the evidence recorded. The PDF carries the DGII QR payload; status follows DGII’s codes.',
  },
];

function Copy({ i }: { i: number }) {
  const scene = SCENES[i];
  return (
    <div className={x.copy} data-slot={i}>
      <p className={x.kicker}>{scene.kicker}</p>
      <h4 className={x.title}>
        <Lines text={scene.title} lineClassName={x.line} />
      </h4>
      <p className={x.body}>{scene.body}</p>
    </div>
  );
}

export function FacelExperience() {
  return (
    <Chapter project={project} weights={WEIGHTS} className={x.world} frameClassName={x.frame}>
      <div className={x.grid} aria-hidden="true" />

      {/* the e-NCF, assembled as the reader moves through the pipeline */}
      <p className={x.spine} aria-hidden="true">
        {ENCF.split('').map((char, i) => (
          <span key={i} style={{ '--i': i } as CSSProperties}>
            {char}
            <span>{char}</span>
          </span>
        ))}
      </p>

      <ol className={x.pipeline} aria-label="FacEl fiscal document pipeline">
        {STAGES.map((stage, i) => (
          <li key={stage} {...at(STAGE_SCENE[i])}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            {stage}
          </li>
        ))}
      </ol>

      {/* 01 — input */}
      <section className={x.scene} {...at(0)} data-reveal="">
        <div className={x.masthead}>
          <p className={x.eyebrow}>02 · {project.field}</p>
          <h3 id={`project-title-${project.id}`} className={x.name}>
            FacEl
          </h3>
        </div>
        <Copy i={0} />
      </section>

      <figure className={x.doc} {...at(0)} data-reveal="">
        <div className={x.docPaper}>
          <Shot m={img.ecf31} eager sizes="(min-width: 1024px) 46vw, 100vw" />
          <span className={x.callout} data-side="left" style={{ '--x': '31cqw', '--y': '19.4%' } as CSSProperties}>
            <span>&lt;RNCEmisor&gt;</span>
          </span>
          <span className={x.callout} data-side="right" style={{ '--x': '84cqw', '--y': '19%' } as CSSProperties}>
            <span>&lt;eNCF&gt;</span>
          </span>
          <span className={x.callout} data-side="right" style={{ '--x': '89cqw', '--y': '75.6%' } as CSSProperties}>
            <span>&lt;MontoTotal&gt;</span>
          </span>
        </div>
        <figcaption>Sample e-CF 31 rendered by FacEl’s own PDF engine · demo environment, no fiscal validity</figcaption>
      </figure>

      {/* 02–04 — the XML the document becomes */}
      <section className={x.scene} {...at(1)} data-reveal="">
        <Copy i={1} />
      </section>
      <section className={x.scene} {...at(2)} data-reveal="">
        <Copy i={2} />
      </section>

      <figure className={x.xml} {...at(1, 2, 3)} data-reveal="">
        <p className={x.schema}>
          <span>checked against</span> e-CF 31 v.1.0.xsd
        </p>
        <ol>
          {XML.map(([depth, node], i) => (
            <li key={i} style={{ '--d': depth, '--i': i } as CSSProperties}>
              <code>{node}</code>
              <span className={x.tick} aria-hidden="true">✓</span>
            </li>
          ))}
        </ol>
        <figcaption>Excerpt · element names from the e-CF schema, values from the sample document</figcaption>
      </figure>

      {/* 04 — sign */}
      <section className={x.scene} {...at(3)} data-reveal="">
        <Copy i={3} />
        <div className={x.seal}>
          <p className={x.code} aria-label="Security code YvUuo1">
            {'YvUuo1'.split('').map((ch, i) => (
              <span key={i} style={{ '--i': i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </p>
          <p className={x.codeNote}>
            <span>Código de Seguridad</span>
            <span>= SignatureValue[0..6]</span>
          </p>
          <figure className={x.sealImg}>
            <Shot m={img.seal} />
            <figcaption>As printed on the sample e-CF 31</figcaption>
          </figure>
        </div>
      </section>

      {/* 05 — validate again, keep the evidence */}
      <section className={x.scene} {...at(4)} data-reveal="">
        <Copy i={4} />
        <div className={x.pair}>
          <Shot m={img.ecf33} className={x.back} sizes="(min-width: 1024px) 30vw, 70vw" />
          <Shot m={img.ecf31} className={x.front} sizes="(min-width: 1024px) 30vw, 70vw" />
        </div>
        <div className={x.ledger}>
          <p className={x.ledgerHead}>DGII status · TrackId polling</p>
          <ul>
            {STATUSES.map(([code, name], i) => (
              <li key={name} style={{ '--i': i } as CSSProperties}>
                <span>{code}</span>
                {name}
              </li>
            ))}
          </ul>
          <p className={x.boundary}>
            Offline by design. Transport is scripted and the demo makes no live DGII calls.
          </p>
        </div>
        <ChapterFoot project={project} className={x.foot} />
      </section>
    </Chapter>
  );
}
