import { media, projectById } from '../content';
import { Chapter, ChapterFoot, Crop, Lines } from '../stage/Stage';
import { at } from '../stage/useStage';
import l from './linkup.module.css';

const project = projectById.linkup;
const img = media.linkup;

const WEIGHTS = {
  desktop: [0.9, 0.9, 1, 1.3, 1.1],
  handheld: [0.64, 0.64, 0.7, 0.8, 0.72],
} as const;
/** the world turns to night when the game appears */
const NIGHT = '#070b26';
const SURFACES = [project.surface, project.surface, project.surface, NIGHT, NIGHT];

const SCENES = [
  {
    kicker: 'Share',
    title: 'Post it.',
    body: 'Members publish photo and video posts to a feed shared with their friends.',
  },
  {
    kicker: 'Discuss',
    title: 'Reply to\nthe reply.',
    body: 'Comments branch into nested replies, so every answer stays under what it answers.',
  },
  {
    kicker: 'Connect',
    title: 'Find your\npeople.',
    body: 'Profiles, friend requests (pending, accepted or rejected) and mutual friends shape the network.',
  },
  {
    kicker: 'Play',
    title: 'Then it\nturns into\nBattleship.',
    body: 'Members challenge each other to Battleship: a fleet on a 12 × 12 board, shots taken turn by turn.',
  },
  {
    kicker: 'Keep score',
    title: 'Every shot,\nevery match.',
    body: 'Hits, misses and the state of each ship during play; finished games kept with their result and times.',
  },
];

function Copy({ i }: { i: number }) {
  const scene = SCENES[i];
  return (
    <div className={l.copy} data-slot={i}>
      <p className={l.kicker}>
        <span>{String(i + 1).padStart(2, '0')}</span>
        {scene.kicker}
      </p>
      <h4 className={l.title}>
        <Lines text={scene.title} lineClassName={l.line} />
      </h4>
      <p className={l.body}>{scene.body}</p>
    </div>
  );
}

export function LinkUpExperience() {
  return (
    <Chapter
      project={project}
      weights={WEIGHTS}
      surfaces={SURFACES}
      className={l.world}
      frameClassName={l.frame}
    >
      <div className={l.light} aria-hidden="true" />
      <div className={l.night} aria-hidden="true" />

      {/* the board's own geometry, entering the room */}
      <div className={l.sea} aria-hidden="true">
        <div className={l.seaGrid} />
        <ol className={l.cols}>
          {Array.from({ length: 12 }, (_, i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
        <ol className={l.rows}>
          {Array.from({ length: 12 }, (_, i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      </div>

      {/* 01 — share */}
      <section className={l.scene} {...at(0)} data-reveal="">
        <div className={l.masthead}>
          <p className={l.eyebrow}>05 · {project.field}</p>
          <h3 id={`project-title-${project.id}`} className={l.name}>
            LinkUp
          </h3>
          <p className={l.alias}>Repository · {project.alias}</p>
        </div>
        <Copy i={0} />
        <Crop m={img.feed} crop={[0.23, 0.09, 0.4, 0.91]} className={`${l.win} ${l.feed}`} sizes="(min-width: 1024px) 80vw, 100vw" />
      </section>

      {/* 02 — discuss */}
      <section className={l.scene} {...at(1)} data-reveal="">
        <Copy i={1} />
        <Crop m={img.comments} crop={[0.285, 0.03, 0.43, 0.94]} className={`${l.win} ${l.comments}`} sizes="(min-width: 1024px) 80vw, 100vw" />
      </section>

      {/* 03 — connect */}
      <section className={l.scene} {...at(2)} data-reveal="">
        <Copy i={2} />
        <Crop m={img.requests} crop={[0.14, 0.1, 0.7, 0.88]} className={`${l.win} ${l.requests}`} sizes="(min-width: 1024px) 56vw, 100vw" />
        <Crop m={img.profile} crop={[0.27, 0.1, 0.46, 0.4]} className={`${l.win} ${l.profile}`} sizes="(min-width: 1024px) 70vw, 100vw" />
      </section>

      {/* 04 — play: the reveal */}
      <section className={l.scene} {...at(3)} data-reveal="">
        <Copy i={3} />
        <Crop m={img.board} crop={[0.075, 0.25, 0.44, 0.71]} className={`${l.win} ${l.board}`} sizes="(min-width: 1024px) 140vw, 100vw" />
      </section>

      {/* 05 — keep score */}
      <section className={l.scene} {...at(4)} data-reveal="">
        <Copy i={4} />
        <Crop m={img.opponent} crop={[0.05, 0.06, 0.9, 0.94]} className={`${l.win} ${l.opponent}`} sizes="(min-width: 1024px) 50vw, 100vw" />
        <Crop m={img.history} crop={[0.16, 0.1, 0.68, 0.5]} className={`${l.win} ${l.history}`} sizes="(min-width: 1024px) 48vw, 100vw" />
        <ChapterFoot project={project} className={l.foot} />
      </section>
    </Chapter>
  );
}
