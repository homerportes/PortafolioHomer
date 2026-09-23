import { useEffect, useState } from 'react';
import { onFrame } from '@/lib/frame';

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
    // A reader on the shared frame: the hit test runs before any stage writes
    // its styles, so it sees the previous frame's clean layout instead of
    // forcing a fresh one.
    const measure = () => {
      // the header itself sits on top of the probe point, so look beneath it
      const stack = document.elementsFromPoint?.(window.innerWidth / 2, probeY) ?? [];
      const host = stack
        .find((el) => !el.closest('header') && el.closest('[data-tone]'))
        ?.closest<HTMLElement>('[data-tone]');
      const dark = host?.dataset.tone === 'dark';
      const surface = host?.dataset.surface ?? null;
      setTone((prev) => (prev.dark === dark && prev.surface === surface ? prev : { dark, surface }));
    };

    return onFrame(measure, 'read');
  }, [probeY]);

  return tone;
}
