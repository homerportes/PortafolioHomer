import { useEffect, useRef } from 'react';

/** Keep these media conditions byte-identical to the CSS module media blocks. */
export const DESKTOP_QUERY =
  '(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)';
export const HANDHELD_QUERY =
  '(max-width: 1023px) and (orientation: portrait) and (min-height: 560px) and (prefers-reduced-motion: no-preference)';
export const CINEMATIC_QUERY = `${DESKTOP_QUERY}, ${HANDHELD_QUERY}`;

export type StageWeights = readonly number[] | {
  desktop: readonly number[];
  handheld: readonly number[];
};

export const tierWeights = (weights: StageWeights) => Array.isArray(weights)
  ? { desktop: weights, handheld: weights }
  : weights as { desktop: readonly number[]; handheld: readonly number[] };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Marks an element as belonging to one or more scenes of a stage. The stage
 * flips `data-state` between `past`, `active` and `future` as the reader
 * scrolls; CSS owns every transition that follows.
 */
export function at(...scenes: number[]) {
  return {
    'data-at': scenes.join(' '),
    'data-state': scenes.includes(0) ? 'active' : 'future',
  };
}

/**
 * The scene contract for a project stage.
 *
 * Scroll never touches React state. On each animation frame (and only while
 * the stage is near the viewport) the hook writes CSS custom properties on the
 * track:
 *
 * - `--p`            chapter progress, 0 → 1
 * - `--s0`…`--sN`    each scene's local progress, 0 → 1
 *
 * and, only when the active scene changes, flips `data-state` on every
 * `[data-at]` element. Continuous travel reads the variables; discrete beats
 * are CSS transitions on `data-state`, so they are interruption-safe and can
 * never desync.
 *
 * In document mode (short landscape screens, reduced motion) `[data-reveal]` elements
 * receive `data-seen` once, when they enter the viewport.
 *
 * @param weights relative scroll length of each scene
 */
export function useStage(weights: StageWeights) {
  const ref = useRef<HTMLDivElement>(null);
  const tiers = tierWeights(weights);
  const weightsKey = `${tiers.desktop.join(',')}|${tiers.handheld.join(',')}`;

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    const [desktopKey, handheldKey] = weightsKey.split('|');
    const makeBounds = (key: string) => {
      const w = key.split(',').map(Number);
      const total = w.reduce((a, b) => a + b, 0);
      let start = 0;
      return w.map((weight): [number, number] => {
        const end = start + weight / total;
        const bound: [number, number] = [start, end];
        start = end;
        return bound;
      });
    };
    const desktopBounds = makeBounds(desktopKey);
    const handheldBounds = makeBounds(handheldKey);

    const nodes = Array.from(track.querySelectorAll<HTMLElement>('[data-at]')).map((el) => ({
      el,
      scenes: (el.dataset.at ?? '0').split(' ').map(Number),
    }));

    const mq = window.matchMedia?.(CINEMATIC_QUERY);
    const desktopMq = window.matchMedia?.(DESKTOP_QUERY);
    const bounds = () => desktopMq?.matches ? desktopBounds : handheldBounds;
    const last = new Array<number>(Math.max(desktopBounds.length, handheldBounds.length)).fill(-1);
    let current = -1;
    let near = false;
    let frame = 0;

    // a world may change its base colour per scene; the header follows it
    const surfaces = track.dataset.surfaces?.split(',');
    const host = track.closest<HTMLElement>('[data-surface]');
    const scrollSpan = (trackHeight: number) => {
      const frame = track.firstElementChild as HTMLElement | null;
      return trackHeight - (frame?.getBoundingClientRect().height ?? trackHeight);
    };

    const setScene = (scene: number) => {
      if (scene === current) return;
      current = scene;
      track.dataset.scene = String(scene);
      if (surfaces?.[scene] && host) host.dataset.surface = surfaces[scene];
      for (const { el, scenes } of nodes) {
        el.dataset.state = scenes.includes(scene)
          ? 'active'
          : Math.max(...scenes) < scene
            ? 'past'
            : 'future';
      }
    };

    const apply = () => {
      frame = 0;
      if (!mq?.matches) return;
      const rect = track.getBoundingClientRect();
      const span = scrollSpan(rect.height);
      const p = span > 0 ? clamp01(-rect.top / span) : 0;
      track.style.setProperty('--p', p.toFixed(4));

      let scene = 0;
      bounds().forEach(([start, end], i) => {
        const local = Math.round(clamp01((p - start) / (end - start)) * 1000) / 1000;
        if (local !== last[i]) {
          last[i] = local;
          track.style.setProperty(`--s${i}`, String(local));
        }
        if (p >= start) scene = i;
      });
      setScene(scene);
      // tone can change inside a scene (a growing clip-path); keep the header in step
      window.dispatchEvent(new Event('stage:surface'));
    };

    const schedule = () => {
      if (near && !frame) frame = requestAnimationFrame(apply);
    };

    const proximity = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        schedule();
      },
      { rootMargin: '50% 0px 50% 0px' },
    );
    proximity.observe(track);

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.seen = '';
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    track.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));

    // Keyboard focus drives the stage: tabbing into a scene scrolls to it, so
    // nothing focusable is ever stranded in a scene the reader cannot see.
    const onFocus = (event: FocusEvent) => {
      if (!mq?.matches) return;
      const host = (event.target as HTMLElement).closest<HTMLElement>('[data-at]');
      if (!host) return;
      const scene = Number((host.dataset.at ?? '0').split(' ')[0]);
      if (scene === current) return;
      const rect = track.getBoundingClientRect();
      const span = scrollSpan(rect.height);
      const [start, end] = bounds()[scene] ?? [0, 0];
      window.scrollTo({ top: window.scrollY + rect.top + span * (start + (end - start) * 0.5) });
    };
    track.addEventListener('focusin', onFocus);

    const onModeChange = () => {
      last.fill(-1);
      current = -1;
      near = true;
      schedule();
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    mq?.addEventListener?.('change', onModeChange);
    desktopMq?.addEventListener?.('change', onModeChange);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener('focusin', onFocus);
      proximity.disconnect();
      reveal.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mq?.removeEventListener?.('change', onModeChange);
      desktopMq?.removeEventListener?.('change', onModeChange);
    };
  }, [weightsKey]);

  return ref;
}
