import { Fragment, type ComponentType } from 'react';
import { projects, type ProjectMeta } from './content';
import { Handoff } from './stage/Stage';
import { FinevoExperience } from './finevo/FinevoExperience';
import { FacelExperience } from './facel/FacelExperience';
import { RealStateExperience } from './realstate/RealStateExperience';
import { ArtemisExperience } from './artemis/ArtemisExperience';
import { LinkUpExperience } from './linkup/LinkUpExperience';
import styles from './Projects.module.css';

const EXPERIENCES = {
  finevo: FinevoExperience,
  facel: FacelExperience,
  realstate: RealStateExperience,
  artemis: ArtemisExperience,
  linkup: LinkUpExperience,
} satisfies Record<ProjectMeta['id'], ComponentType>;

export function Projects() {
  return (
    <section id="projects" aria-label="Selected projects">
      {/* the index of worlds lives in the hero; the section only names itself */}
      <h2 className={styles.srOnly}>Projects</h2>

      {projects.map((project, index) => {
        const Experience = EXPERIENCES[project.id];
        const next = projects[index + 1];
        return (
          <Fragment key={project.id}>
            <Experience />
            {next && <Handoff from={project} to={next} />}
          </Fragment>
        );
      })}
    </section>
  );
}
