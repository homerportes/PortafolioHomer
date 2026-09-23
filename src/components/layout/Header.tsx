import { useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { profile } from '@/content/profile';
import { EASE_OUT } from '@/components/motion/easing';
import { useSceneTone } from '@/hooks/useSceneTone';
import styles from './Header.module.css';

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
  const reduced = useReducedMotion();
  const { dark: onDarkScene, surface } = useSceneTone();

  return (
    <motion.header
      className={styles.header}
      initial={reduced ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: EASE_OUT }}
      data-dark={onDarkScene || undefined}
      style={surface ? ({ '--header-surface': surface } as CSSProperties) : undefined}
    >
      <nav className={styles.nav} aria-label="Sections">
        <a href="#top" className={styles.wordmark} aria-label="Homer Portes, back to top">
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
          {CONTACT_ITEM.label}<span aria-hidden="true">↗</span>
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
            <span aria-hidden="true">↗</span>
          </a>
        ))}
        <a href={`mailto:${profile.email}`} onClick={() => setMenuOpen(false)}>
          {CONTACT_ITEM.label}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.header>
  );
}
