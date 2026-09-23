import { education } from '@/content/education';
import { useReveal } from '@/components/motion/useReveal';
import styles from './Education.module.css';

/**
 * Education — the quiet page. Two stops on one line: what is finished carries
 * a filled full stop, what comes next an open ring and an outlined name.
 */
export function Education() {
  const ref = useReveal<HTMLElement>();
  const [done, next] = education;

  return (
    <section
      ref={ref}
      id="education"
      className={styles.section}
      data-tone="light"
      data-surface="#f3eee4"
      aria-labelledby="education-title"
    >
      <div className={styles.seam} aria-hidden="true">
        <span data-tone="dark" data-surface="#16120d" />
        <span />
      </div>

      <div className={styles.inner}>
        <div className={styles.meta}>
          <h2 id="education-title" className={styles.kicker}>
            Education
          </h2>
          <p className={styles.range}>{done.period?.split('–')[0]} → next</p>
        </div>

        <ol className={styles.path} data-reveal="">
          <li className={styles.stop} data-status={done.status}>
            <p className={styles.status}>
              <span className={styles.marker} aria-hidden="true" />
              Completed · {done.period}
            </p>
            <h3 className={styles.name}>
              <span>{done.institution}</span>
            </h3>
            {done.institutionFull && <p className={styles.full}>{done.institutionFull}</p>}
            <p className={styles.program}>{done.program}</p>
          </li>

          <li className={styles.link} aria-hidden="true">
            <span className={styles.line} />
            <span className={styles.next}>next</span>
          </li>

          <li className={styles.stop} data-status={next.status}>
            <p className={styles.status}>
              <span className={styles.marker} aria-hidden="true" />
              Upcoming
            </p>
            <h3 className={styles.name}>
              <span>{next.institution}</span>
            </h3>
            <p className={styles.program}>
              <em>{next.program}</em>
            </p>
          </li>
        </ol>
      </div>

      <div className={styles.outro} aria-hidden="true">
        <span />
        <span data-tone="dark" data-surface="#171310" />
      </div>
    </section>
  );
}
