import { useState, type CSSProperties } from 'react';
import { profile } from '@/content/profile';
import { useSceneTone } from '@/hooks/useSceneTone';
import styles from './Header.module.css';
import { Arrow } from '@/components/Arrow';

const NAV_ITEMS = [
  { href: '#top', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
];

const CONTACT_ITEM = { href: 'mailto:', label: 'Get in touch' };

/**
 * The navigation stays present on the opening frame so the portfolio reads as
 * one composed page instead of revealing its controls after the hero.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark: onDarkScene, surface } = useSceneTone();

  return (
    <header
      className={styles.header}
      data-dark={onDarkScene || undefined}
      style={surface ? ({ '--header-surface': surface } as CSSProperties) : undefined}
    >
      <nav className={styles.nav} aria-label="Sections">
        <a href="#top" className={styles.wordmark} aria-label="HP — Homer Portes, back to top">
          <span>HP</span><i aria-hidden="true" />
        </a>
        <ul className={styles.links}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${profile.email}`} className={styles.contactLink}>
          {CONTACT_ITEM.label}<Arrow dir="up-right" />
        </a>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </nav>
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
            <Arrow dir="up-right" />
          </a>
        ))}
        <a href={`mailto:${profile.email}`} onClick={() => setMenuOpen(false)}>
          {CONTACT_ITEM.label}
          <Arrow dir="up-right" />
        </a>
      </div>
    </header>
  );
}
