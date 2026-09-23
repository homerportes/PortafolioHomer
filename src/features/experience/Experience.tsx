import type { CSSProperties } from 'react';
import { experience } from '@/content/experience';
import { at, useStage } from '@/features/projects/stage/useStage';
import styles from './Experience.module.css';

const [junior, semiSenior] = experience;

/** intro → the junior role → the promotion */
const WEIGHTS = {
  desktop: [0.7, 1, 1.2],
  handheld: [0.6, 0.72, 0.78],
} as const;

/**
 * What Homer became responsible for, in the order he took it on — each line
 * restates a line of work from `content/experience.ts`. The list is the
 * argument: the title changes because this column got longer.
 */
const AREAS = [
  { name: 'Python automation', era: 'junior' },
  { name: 'SCADA environments', era: 'junior' },
  { name: 'Real-time data validation', era: 'junior' },
  { name: 'MySQL · operational reporting', era: 'junior' },
  { name: 'Ignition SCADA integration', era: 'semi' },
  { name: 'Python / FastAPI microservices', era: 'semi' },
  { name: 'AI insights on industrial data', era: 'semi' },
  { name: 'AI chat & automated reporting', era: 'semi' },
  { name: 'Task planning for junior developers', era: 'semi' },
  { name: 'Kanban · SCRUM', era: 'semi' },
] as const;

const JUNIOR_AREAS = AREAS.filter((a) => a.era === 'junior').length;

const ROLES = [
  { role: junior, prefix: 'Junior', scene: 1 },
  { role: semiSenior, prefix: 'Semi-Senior', scene: 2 },
] as const;

const MARKS = [
  { date: 'Oct 2025', label: 'Joined Intelca', scenes: [1, 2] },
  { date: 'Jun 2026', label: 'Promoted', scenes: [2] },
  { date: 'Present', label: semiSenior.title, scenes: [2] },
];

/**
 * Experience — one company, one promotion, told as a scope that grows. The
 * role title swaps in place while the column of responsibilities lengthens
 * and the timeline runs from joining to now.
 */
export function Experience() {
  const ref = useStage(WEIGHTS, 'Experience');
  const desktopLength = WEIGHTS.desktop.reduce<number>((sum, weight) => sum + weight, 1);
  const handheldLength = WEIGHTS.handheld.reduce<number>((sum, weight) => sum + weight, 1);

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className={styles.seam} aria-hidden="true">
        <span data-tone="dark" data-surface="#070b26" />
        <span data-tone="light" data-surface="#f3eee4" />
      </div>

      <div ref={ref} className={styles.track} data-tone="light" data-surface="#f3eee4" style={{ '--len-desktop': desktopLength, '--len-handheld': handheldLength } as CSSProperties}>
        <div className={styles.frame}>
          <div className={styles.meta}>
            {/* the whole tenure at the company, not the junior role's dates */}
            <p className={styles.kicker}>{junior.company} · Oct 2025 – present</p>
            <p className={styles.company}>
              {junior.location}
            </p>
          </div>

          {/* 01 — the frame of the story */}
          <div className={styles.intro} {...at(0)}>
            <h2 id="experience-title" className={styles.title}>
              <span className={styles.titleLine}>
                <span>
                  Experience
                </span>
              </span>
            </h2>
            <p className={styles.lede}>
              Joined {junior.company} as a junior developer in October 2025.{' '}
              <em>Promoted eight months later.</em>
            </p>
          </div>

          {/* 02–03 — the role, then the promotion */}
          {ROLES.map(({ role, prefix, scene }) => (
            <article key={role.id} className={styles.role} {...at(scene)} data-role={prefix}>
              <p className={styles.period}>
                <span>{role.period}</span>
                {role.current && <span className={styles.current}>Current</span>}
              </p>
              <h3 className={styles.roleTitle}>
                <span className={styles.prefix}>
                  <span>{prefix}</span>
                </span>{' '}
                <span className={styles.constant}>Software Developer</span>
              </h3>
              <ul className={styles.work}>
                {role.work.map((line, i) => (
                  <li key={line} style={{ '--i': i } as CSSProperties}>
                    {line}
                  </li>
                ))}
              </ul>
              <p className={styles.areasTag}>{role.areas.join(' · ')}</p>
            </article>
          ))}

          <p className={styles.stamp} {...at(2)} aria-hidden="true">
            <span className={styles.stampDot} />
            Promoted · Jun 2026
          </p>

          {/* the column that earned the new title */}
          <div className={styles.ledger} {...at(1, 2)}>
            <p className={styles.ledgerHead}>
              <span>Responsibilities</span>
              <span className={styles.count}>
                <span data-count="junior">{String(JUNIOR_AREAS).padStart(2, '0')}</span>
                <span data-count="semi">{String(AREAS.length).padStart(2, '0')}</span>
              </span>
            </p>
            <ol>
              {AREAS.map((area, i) => (
                <li
                  key={area.name}
                  data-era={area.era}
                  style={{ '--i': area.era === 'junior' ? i : i - JUNIOR_AREAS } as CSSProperties}
                >
                  <span className={styles.areaIndex}>{String(i + 1).padStart(2, '0')}</span>
                  {area.name}
                </li>
              ))}
            </ol>
          </div>

          <ol className={styles.timeline} aria-label="Timeline">
            {MARKS.map((mark) => (
              <li key={mark.date} {...at(...mark.scenes)}>
                <span className={styles.markDot} aria-hidden="true" />
                <span className={styles.markDate}>{mark.date}</span>
                <span className={styles.markLabel}>{mark.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
