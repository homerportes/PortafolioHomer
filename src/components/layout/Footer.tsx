import { profile } from '@/content/profile';
import styles from './Footer.module.css';

/**
 * Colophon — the classic closing page of a printed volume, kept factual:
 * contact, languages, and how the site itself is set and built.
 */
export function Footer() {
  return (
    <footer className={`${styles.footer} on-night`} data-tone="dark">
      <div className={`container ${styles.inner}`}>
        <div className={styles.contactBlock}>
          <p className="label" style={{ color: 'var(--faint-on-night)' }}>
            Contact
          </p>
          <a href={`mailto:${profile.email}`} className={styles.email}>
            {profile.email}
          </a>
          <div className={styles.socialRow}>
            <a href={profile.social.github} className="link" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.social.linkedin} className="link" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <div className={styles.columns}>
          <div>
            <p className="label" style={{ color: 'var(--faint-on-night)' }}>
              Languages
            </p>
            <ul className={styles.list}>
              {profile.languages.map((lang) => (
                <li key={lang.name}>
                  <span>{lang.name}</span>
                  <span className={styles.dim}>, {lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label" style={{ color: 'var(--faint-on-night)' }}>
              Colophon
            </p>
            <p className={styles.colophon}>
              Set in Fraunces, Archivo &amp; IBM Plex Mono. Built with React 19, TypeScript and
              Vite. Designed and written in {profile.location}.
            </p>
          </div>
        </div>

        <div className={styles.baseline}>
          <span className="meta">Homer Portes</span>
          <span className="meta">{profile.locationShort}</span>
        </div>
      </div>
    </footer>
  );
}
