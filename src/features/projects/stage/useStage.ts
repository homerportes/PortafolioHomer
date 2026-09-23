import { useEffect, useRef } from 'react';
import { registerStage } from './stepper';
import { onFrame, requestTick } from '@/lib/frame';

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
 * The pinned frame is 100svh tall. One shared, fixed probe reports that height
 * without touching any stage's layout.
 */
let probe: HTMLDivElement | null = null;
function viewportHeight() {
  if (!probe) {
    probe = document.createElement('div');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none';
    document.body.appendChild(probe);
  }
  return probe.offsetHeight || window.innerHeight;
}

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
 * The stage also registers with the stepper, so one wheel notch, swipe or
 * arrow key moves exactly one scene.
 *
 * @param weights relative scroll length of each scene
 * @param label     the stage's name on the scene rail
 * @param skippable a project chapter, which offers "Skip projects"
 */
export function useStage(weights: StageWeights, label = '', skippable = false) {
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
    let lastP = '';

    // a world may change its base colour per scene; the header follows it
    const surfaces = track.dataset.surfaces?.split(',');
    const host = track.closest<HTMLElement>('[data-surface]');

    // Geometry is cached and re-read only when layout actually changes, so a
    // scroll frame is pure arithmetic on scrollY: no layout read after the
    // style writes, no forced reflow.
    const metrics = { top: 0, span: 0 };
    // a chapter's track fills its <article>, which content-visibility never
    // skips: measuring the article keeps skipped chapters unlaid-out
    const box = track.parentElement?.tagName === 'ARTICLE' ? track.parentElement : track;
    const measure = () => {
      const rect = box.getBoundingClientRect();
      metrics.top = rect.top + window.scrollY;
      metrics.span = rect.height - viewportHeight();
    };
    measure();

    const setScene = (scene: number) => {
      if (scene === current) return;
      current = scene;
      track.dataset.scene = String(scene);
      if (surfaces?.[scene] && host) {
        host.dataset.surface = surfaces[scene];
        // the header reads the new ground on the next frame
        requestTick();
      }
      for (const { el, scenes } of nodes) {
        el.dataset.state = scenes.includes(scene)
          ? 'active'
          : Math.max(...scenes) < scene
            ? 'past'
            : 'future';
      }
    };

    // a writer on the shared frame: it gets scrollY and never reads layout
    const apply = (scrollY: number) => {
      if (!near || !mq?.matches) return;
      const { top, span } = metrics;
      const p = span > 0 ? clamp01((scrollY - top) / span) : 0;
      const pText = p.toFixed(4);
      if (pText !== lastP) {
        lastP = pText;
        track.style.setProperty('--p', pText);
      }

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
    };

    const schedule = requestTick;

    const proximity = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        schedule();
      },
      { rootMargin: '50% 0px 50% 0px' },
    );
    // observe the chapter itself: it stays measurable while its contents are
    // skipped by content-visibility
    proximity.observe(track.closest('article, section') ?? track);

    // anything above the stage (images, fonts, a chapter rendering for the
    // first time) can move it, so the whole document is watched
    const layout = new ResizeObserver(() => {
      measure();
      schedule();
    });
    layout.observe(track);
    layout.observe(document.documentElement);

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
      const [start, end] = bounds()[scene] ?? [0, 0];
      window.scrollTo({ top: metrics.top + metrics.span * (start + (end - start) * 0.5) });
    };
    track.addEventListener('focusin', onFocus);

    const onResize = () => {
      measure();
      schedule();
    };

    const onModeChange = () => {
      measure();
      lastP = '';
      last.fill(-1);
      current = -1;
      near = true;
      schedule();
    };

    const offFrame = onFrame(apply);
    window.addEventListener('resize', onResize, { passive: true });
    mq?.addEventListener?.('change', onModeChange);
    desktopMq?.addEventListener?.('change', onModeChange);
    const unregister = registerStage({ track, label, skippable, bounds, metrics: () => metrics });

    return () => {
      unregister();
      offFrame();
      track.removeEventListener('focusin', onFocus);
      proximity.disconnect();
      layout.disconnect();
      reveal.disconnect();
      window.removeEventListener('resize', onResize);
      mq?.removeEventListener?.('change', onModeChange);
      desktopMq?.removeEventListener?.('change', onModeChange);
    };
  }, [weightsKey, label, skippable]);

  return ref;
}
