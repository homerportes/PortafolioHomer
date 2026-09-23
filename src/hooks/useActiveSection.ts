import { useEffect, useState } from 'react';

/**
 * The section the reader is in: the one crossing a thin band across the middle
 * of the viewport. IntersectionObserver does the geometry off the main thread,
 * so nothing is measured on scroll. Between sections the last one holds.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join(',');

  useEffect(() => {
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-49% 0px -50% 0px' },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [key]);

  return active;
}
