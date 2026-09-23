import { useEffect, useState } from 'react';

type SceneTone = { dark: boolean; surface: string | null };

/**
 * Reports the tone of the strip of page directly under the fixed header, so
 * the running head can re-ink itself instead of sitting on the artwork as a
 * pale band. Scenes opt in with `data-tone="dark" | "light"`, and may name
 * their base colour with `data-surface` so the header can take it on.
 */
export function useSceneTone(probeY = 64): SceneTone {
  const [tone, setTone] = useState<SceneTone>({ dark: false, surface: null });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      // the header itself sits on top of the probe point, so look beneath it
      const stack = document.elementsFromPoint?.(window.innerWidth / 2, probeY) ?? [];
      const host = stack
        .find((el) => !el.closest('header') && el.closest('[data-tone]'))
        ?.closest<HTMLElement>('[data-tone]');
      const dark = host?.dataset.tone === 'dark';
      const surface = host?.dataset.surface ?? null;
      setTone((prev) => (prev.dark === dark && prev.surface === surface ? prev : { dark, surface }));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // a project stage can change its ground without the page moving
    window.addEventListener('stage:surface', onScroll);
    return () => {
      window.removeEventListener('stage:surface', onScroll);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [probeY]);

  return tone;
}
