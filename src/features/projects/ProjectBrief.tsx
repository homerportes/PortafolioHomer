import { useEffect, useRef } from 'react';
import { Arrow } from '@/components/Arrow';
import type { ProjectMeta } from './content';
import { briefs } from './briefs';
import s from './ProjectBrief.module.css';

/**
 * The case file of one project, in a native modal dialog: focus is trapped,
 * Escape closes it and the page behind is inert. The chapter underneath keeps
 * its place, so closing returns the reader exactly where they were.
 */
export function ProjectBrief({ project, onClose }: { project: ProjectMeta | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const brief = project ? briefs[project.id] : null;

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      aria-labelledby="brief-title"
      onClose={onClose}
      // a click on the backdrop (the dialog box itself, outside the sheet) closes it
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && brief && (
        <article className={s.sheet}>
          <header className={s.head}>
            <p className={s.kicker}>
              <span>{project.number}</span> {project.field}
            </p>
            <button type="button" className={s.close} onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <h2 id="brief-title" className={s.title}>
            {project.name}
          </h2>
          <p className={s.summary}>{brief.summary}</p>

          <section className={s.block}>
            <h3>The problem</h3>
            <p>{brief.problem}</p>
          </section>

          <section className={s.block}>
            <h3>What I built</h3>
            <ul className={s.list}>
              {brief.built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={s.block}>
            <h3>Engineering decisions</h3>
            <div className={s.decisions}>
              {brief.engineering.map((item) => (
                <div key={item.title} className={s.decision}>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={s.block}>
            <h3>Architecture &amp; stack</h3>
            <p className={s.chips}>
              {brief.architecture.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          </section>

          {project.repos.length > 0 && (
            <nav className={s.repos} aria-label={`${project.name} source code`}>
              {project.repos.map((repo) => (
                <a key={repo.href} href={repo.href} target="_blank" rel="noreferrer">
                  {repo.label === 'Repository' ? 'View repository' : `${repo.label} repository`}
                  <Arrow dir="up-right" />
                </a>
              ))}
            </nav>
          )}
        </article>
      )}
    </dialog>
  );
}
