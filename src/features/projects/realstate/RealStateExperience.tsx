import { media, projectById } from '../content';
import { Chapter, ChapterFoot, Crop, Lines, Shot } from '../stage/Stage';
import { at } from '../stage/useStage';
import r from './realstate.module.css';

const project = projectById.realstate;
const img = media.realstate;

const WEIGHTS = {
  desktop: [1, 1.1, 0.9, 0.9, 1.1],
  handheld: [0.72, 0.7, 0.68, 0.8, 0.78],
} as const;

const SCENES = [
  {
    kicker: 'Discover',
    title: 'Find the\nhouse first.',
    body: 'Clients search the inventory by code, type, price, bedrooms, bathrooms and location, and save favourites to come back to.',
  },
  {
    kicker: 'Explore',
    title: 'Then everything\nabout it.',
    body: 'A listing brings photos, price, rooms, size, description and upgrades together with the agent’s contact.',
  },
  {
    kicker: 'Negotiate',
    title: 'Make an offer\non the page.',
    body: 'Offers are made from the listing and move through a lifecycle (pending, accepted or rejected) that client and agent both follow. Here, RD$25,000.00 is still pending.',
  },
  {
    kicker: 'Communicate',
    title: 'A conversation\ntied to the house.',
    body: 'Client and agent talk in a thread tied to listing YLK590, typing indicator included, so the negotiation never leaves the platform.',
  },
  {
    kicker: 'Manage',
    title: 'Agents and admins\nrun the catalogue.',
    body: 'Agents publish, edit and change the status of their own properties; administrators run metrics, users, developers and the catalogues of types, sale types and upgrades.',
  },
];

function Copy({ i }: { i: number }) {
  const scene = SCENES[i];
  return (
    <div className={r.copy} data-slot={i}>
      <p className={r.kicker}>
        <span>{String(i + 1).padStart(2, '0')}</span>
        {scene.kicker}
      </p>
      <h3 className={r.title}>
        <Lines text={scene.title} lineClassName={r.line} />
      </h3>
      <p className={r.body}>{scene.body}</p>
    </div>
  );
}

export function RealStateExperience() {
  return (
    <Chapter project={project} weights={WEIGHTS} className={r.world} frameClassName={r.frame}>
      <div className={r.sun} aria-hidden="true" />
      <div className={r.floor} aria-hidden="true" />

      <p className={r.mark} {...at(1, 2, 3, 4)} aria-hidden="true">
        <span>03</span> RealStateApp
      </p>

      <ul className={r.roles} aria-label="Roles in this scene">
        <li {...at(0, 1, 2, 3)}>Client</li>
        <li {...at(3, 4)}>Agent</li>
        <li {...at(4)}>Admin</li>
      </ul>

      {/* 01 — discover */}
      <section className={r.scene} {...at(0)} data-reveal="">
        <div className={r.masthead}>
          <p className={r.eyebrow}>03 · {project.field}</p>
          <h3 id={`project-title-${project.id}`} className={r.name}>
            RealStateApp
          </h3>
        </div>
        <Copy i={0} />
        <Crop m={img.search} crop={[0.155, 0, 0.69, 0.78]} className={r.search} sizes="(min-width: 1024px) 80vw, 100vw" />
        <figure className={r.print}>
          <Shot m={img.house} />
          <figcaption>YLK590 · Casa · Alquiler</figcaption>
        </figure>
      </section>

      {/* 02 + 03 — the listing grows into focus, then the offer */}
      <section className={r.scene} {...at(1)} data-reveal="">
        <Copy i={1} />
      </section>
      <div className={r.detail} {...at(1, 2)} data-reveal="">
        <div className={r.detailCam}>
          <Shot m={img.detail} sizes="(min-width: 1024px) 64vw, 100vw" />
        </div>
      </div>
      <section className={r.scene} {...at(2)} data-reveal="">
        <Copy i={2} />
        <div className={r.offers}>
          <Shot m={img.offers} />
        </div>
      </section>

      {/* 04 — communicate */}
      <section className={r.scene} {...at(3)} data-reveal="">
        <Copy i={3} />
        <figure className={r.chatClient}>
          <Shot m={img.chatClient} />
          <figcaption>Client</figcaption>
        </figure>
        <figure className={r.chatAgent}>
          <Shot m={img.chatAgent} />
          <figcaption>Agent</figcaption>
        </figure>
      </section>

      {/* 05 — manage */}
      <section className={r.scene} {...at(4)} data-reveal="">
        <Copy i={4} />
        <Crop m={img.agentProperties} crop={[0.13, 0.03, 0.74, 0.66]} className={r.agent} sizes="(min-width: 1024px) 80vw, 100vw" />
        <Crop m={img.admin} crop={[0.16, 0.02, 0.68, 0.72]} className={r.admin} sizes="(min-width: 1024px) 56vw, 100vw" />
        <ChapterFoot project={project} className={r.foot} />
      </section>
    </Chapter>
  );
}
