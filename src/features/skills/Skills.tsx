import { useState, type CSSProperties } from 'react';
import { skillCategories } from '@/content/skills';
import { projects } from '@/features/projects/content';
import { useReveal } from '@/components/motion/useReveal';
import styles from './Skills.module.css';

type Place = 'finevo' | 'facel' | 'realstate' | 'artemis' | 'linkup' | 'intelca';

const PLACES: { id: Place; name: string }[] = [
  ...projects.map((p) => ({ id: p.id, name: p.name })),
  { id: 'intelca', name: 'Intelca (work)' },
];

/**
 * Where each skill actually shipped. Only pairings backed by a project's
 * stack or by the work listed in `content/experience.ts` are marked; a skill
 * with no verifiable place simply carries no mark.
 */
const USED_IN: Partial<Record<string, Place[]>> = {
  'C#': ['finevo', 'realstate', 'artemis', 'linkup'],
  'ASP.NET Core 9': ['finevo', 'realstate', 'artemis', 'linkup'],
  WebAPI: ['finevo', 'artemis'],
  'Entity Framework Core': ['finevo', 'realstate', 'artemis', 'linkup'],
  Python: ['intelca'],
  FastAPI: ['intelca'],
  'SQL Server': ['realstate', 'artemis', 'linkup'],
  MySQL: ['intelca'],
  React: ['finevo'],
  TypeScript: ['finevo', 'facel'],
  'Razor Views': ['linkup'],
  'Onion Architecture': ['finevo', 'realstate', 'artemis'],
  CQRS: ['realstate'],
  MediatR: ['realstate'],
  Ignition: ['intelca'],
  SCADA: ['intelca'],
  'Python automation': ['intelca'],
  'Industrial data': ['intelca'],
  'FastAPI microservices': ['intelca'],
  'AI integrations for industrial systems': ['intelca'],
  'Azure Functions': ['artemis'],
  Git: ['finevo', 'facel', 'realstate', 'artemis', 'linkup'],
  GitHub: ['finevo', 'facel', 'realstate', 'artemis', 'linkup'],
  SCRUM: ['intelca'],
};

/**
 * Official marks from Devicon (MIT, see public/logos/LICENSE-devicon.txt).
 * Concepts and tools without a mark — CQRS, SCADA, Razor — stay as type.
 */
const LOGO: Partial<Record<string, string>> = {
  'C#': 'csharp',
  'ASP.NET Core 9': 'dotnetcore',
  'Entity Framework Core': 'entityframeworkcore',
  Python: 'python',
  FastAPI: 'fastapi',
  Java: 'java',
  'SQL Server': 'sqlserver',
  MySQL: 'mysql',
  React: 'react',
  TypeScript: 'typescript',
  'JavaScript ES6+': 'javascript',
  HTML5: 'html5',
  CSS3: 'css3',
  'Bootstrap 5': 'bootstrap',
  'Python automation': 'python',
  'FastAPI microservices': 'fastapi',
  'Azure Functions': 'azure',
  Git: 'git',
  GitHub: 'github',
  Postman: 'postman',
  Swagger: 'swagger',
};

const nameOf = (id: Place) => PLACES.find((p) => p.id === id)?.name ?? id;

/**
 * Skills — a specimen set in the dark room. No percentages: every mark next
 * to a skill is a place it shipped. Pointing at a place in the key lights
 * every skill used there.
 */
export function Skills() {
  const ref = useReveal<HTMLElement>();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <section
      ref={ref}
      id="skills"
      className={styles.section}
      data-selected-place={selectedPlace || undefined}
      data-tone="dark"
      data-surface="#16120d"
      aria-labelledby="skills-title"
    >
      <div className={styles.seam} aria-hidden="true">
        <span data-tone="light" data-surface="#f3eee4" />
        <span />
      </div>

      <div className={styles.inner}>
        <div className={styles.meta}>
          <p className={styles.note}>No percentages. Every mark is a place it shipped.</p>
        </div>

        <div className={styles.head} data-reveal="">
          <h2 id="skills-title" className={styles.title}>
            <span>
              Skills
            </span>
          </h2>

          <ul className={styles.key} aria-label="Where the skills were used">
            {PLACES.map((place) => (
              <li key={place.id}>
                <button
                  type="button"
                  className={styles.keyButton}
                  data-key={place.id}
                  aria-pressed={selectedPlace === place.id}
                  onClick={() => setSelectedPlace((current) => current === place.id ? null : place.id)}
                >
                  <span className={styles.mark} data-place={place.id} aria-hidden="true" />
                  {place.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ol className={styles.rows}>
          {skillCategories.map((category, i) => (
            <li
              key={category.id}
              className={styles.row}
              data-learning={category.learning || undefined}
              data-reveal=""
              style={{ '--i': i } as CSSProperties}
            >
              <div className={styles.rowHead}>
                <span className={styles.index}>{category.index}</span>
                <h3 className={styles.label}>{category.label}</h3>
              </div>
              <ul className={styles.skills}>
                {category.skills.map((skill, j) => {
                  const places = USED_IN[skill] ?? [];
                  const logo = LOGO[skill];
                  return (
                    <li
                      key={skill}
                      className={styles.skill}
                      data-uses={places.join(' ') || undefined}
                      style={{ '--j': j } as CSSProperties}
                    >
                      {logo && (
                        <span className={styles.logo} aria-hidden="true">
                          <img src={`/logos/${logo}.svg`} alt="" width={20} height={20} loading="lazy" />
                        </span>
                      )}
                      <span className={styles.skillName}>{skill}</span>
                      {places.length > 0 && (
                        <span className={styles.marks}>
                          {places.map((place) => (
                            <span
                              key={place}
                              className={styles.mark}
                              data-place={place}
                              aria-hidden="true"
                            />
                          ))}
                          <span className={styles.srOnly}>
                            (used in {places.map(nameOf).join(', ')})
                          </span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
