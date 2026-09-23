import { CINEMATIC_QUERY } from './useStage';
import { onFrame, requestTick } from '@/lib/frame';

/**
 * One gesture, one scene.
 *
 * Every pinned stage registers its scene bounds here. While the reader is
 * inside (or right next to) a stage, a wheel notch, a swipe or an arrow key
 * glides the page to the next scene's resting point instead of nudging it a
 * few pixels. Outside the stages — Skills, Education, the footer — scroll is
 * native. The scrollbar, anchors and focus still move the page freely; the
 * next gesture simply continues from wherever the page is.
 */

export type StageEntry = {
  track: HTMLElement;
  label: string;
  /** a project chapter: the reader can skip the rest of the projects */
  skippable?: boolean;
  /** scene bounds as fractions of the stage's scroll span */
  bounds: () => [number, number][];
  /** cached document offset and scroll span, kept fresh by the stage */
  metrics: () => { top: number; span: number };
};

export type StageSnapshot = {
  label: string;
  scene: number;
  count: number;
  /** is there anything further down the page to step to */
  hasNext: boolean;
  first: boolean;
  skippable: boolean;
};

type Geometry = { entry: StageEntry; top: number; end: number; stops: number[] };

/** where a scene comes to rest, as a fraction of its own length */
const REST = 0.82;
/** a stage this close to the viewport captures the gesture */
const REACH = 0.62;
/**
 * Two stages this close are stepped straight through: the gap between one
 * stage's end and the next one's top is the unpinning frame (one screen) plus
 * the hand-off seam.
 */
const CHAIN = 1.75;
/** a pause this long separates two gestures (and ends trackpad inertia) */
const GESTURE_GAP = 170;

const entries = new Set<StageEntry>();
const listeners = new Set<(snapshot: StageSnapshot | null) => void>();
let snapshot: StageSnapshot | null = null;
let installed = false;
let tween = 0;
let lastWheel = 0;
let wheelAccum = 0;

const cinematic = () => window.matchMedia?.(CINEMATIC_QUERY).matches ?? false;
// an open dialog (a project's case file) owns every gesture until it closes
const stepping = () => cinematic() && !document.querySelector('dialog[open]');

/** Reads only cached numbers: safe to call on every scroll frame. */
function geometry(): Geometry[] {
  return Array.from(entries)
    .map((entry) => {
      const { top: rawTop, span } = entry.metrics();
      const top = Math.round(rawTop);
      const stops = entry.bounds().map(([start, end], i) =>
        Math.round(top + span * (i === 0 ? start : start + (end - start) * REST)),
      );
      return { entry, top, end: top + Math.round(span), stops };
    })
    .filter((g) => g.end > g.top)
    .sort((a, b) => a.top - b.top);
}

/** The scroll position one step away, or null when the gesture belongs to the page. */
function resolve(dir: 1 | -1): number | null {
  const y = window.scrollY;
  const reach = window.innerHeight * REACH;
  const chain = window.innerHeight * CHAIN;
  const stages = geometry();

  if (dir > 0) {
    for (let i = 0; i < stages.length; i++) {
      const g = stages[i];
      if (y >= g.top - 2 && y < g.end - 2) {
        const next = g.stops.find((stop) => stop > y + 2);
        if (next !== undefined) return next;
        const after = stages[i + 1];
        return after && after.top - g.end <= chain ? after.top : g.end;
      }
    }
    const ahead = stages.find((g) => g.top > y + 2 && g.top - y <= reach);
    return ahead ? ahead.top : null;
  }

  for (let i = stages.length - 1; i >= 0; i--) {
    const g = stages[i];
    if (y > g.top + 2 && y <= g.end + 2) {
      const prev = [...g.stops].reverse().find((stop) => stop < y - 2);
      return prev ?? g.top;
    }
    if (Math.abs(y - g.top) <= 2) {
      const before = stages[i - 1];
      return before && g.top - before.end <= chain ? before.stops[before.stops.length - 1] : null;
    }
  }
  const behind = [...stages].reverse().find((g) => y > g.end + 2 && y - g.end <= reach);
  return behind ? behind.stops[behind.stops.length - 1] : null;
}

/**
 * The glide is the browser's own smooth scroll. It runs on the compositor
 * thread, so it stays fluid even when the main thread is busy painting a
 * scene; the scene reacts to the scroll positions as they arrive.
 */
export function glideTo(target: number) {
  cancelGlide();
  if (Math.abs(target - window.scrollY) < 1) return;
  document.documentElement.dataset.gliding = '';
  window.addEventListener('scrollend', endGlide, { once: true });
  // no scrollend (older engines) or an interrupted glide: release anyway
  tween = window.setTimeout(endGlide, 1400);
  window.scrollTo({ top: target, behavior: 'smooth' });
}

function endGlide() {
  if (!tween) return;
  window.clearTimeout(tween);
  tween = 0;
  window.removeEventListener('scrollend', endGlide);
  delete document.documentElement.dataset.gliding;
}

function cancelGlide() {
  if (!tween) return;
  endGlide();
  // stop the smooth scroll where it is
  window.scrollTo({ top: window.scrollY, behavior: 'instant' });
}

/** Nested scrollers (a code excerpt, an open menu) keep their own scroll. */
function scrollsItself(target: EventTarget | null, dir: 1 | -1) {
  let el = target instanceof Element ? target : null;
  while (el && el !== document.body && el !== document.documentElement) {
    if (el instanceof HTMLElement) {
      const overflow = getComputedStyle(el).overflowY;
      if ((overflow === 'auto' || overflow === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
        if (dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0) return true;
      }
    }
    el = el.parentElement;
  }
  return false;
}

function onWheel(event: WheelEvent) {
  if (event.ctrlKey || !stepping()) return;
  const dy = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
  if (Math.abs(event.deltaX) > Math.abs(dy) || dy === 0) return;
  const dir = dy > 0 ? 1 : -1;

  const now = performance.now();
  const sameGesture = now - lastWheel < GESTURE_GAP;
  lastWheel = now;

  // cheap checks first: the dozens of events of one gesture (and its
  // inertia tail) never reach the style-reading ones below
  if (tween) {
    event.preventDefault();
    return;
  }
  if (sameGesture && wheelAccum === Infinity) {
    if (resolve(dir) !== null) event.preventDefault();
    return;
  }

  const target = resolve(dir);
  if (target === null) return;
  if (scrollsItself(event.target, dir)) return;
  event.preventDefault();

  wheelAccum = (sameGesture ? wheelAccum : 0) + Math.abs(dy);
  if (wheelAccum < 6) return;
  wheelAccum = Infinity;
  glideTo(target);
}

let touch: { x: number; y: number; stepped: boolean; claimed: boolean } | null = null;

function onTouchStart(event: TouchEvent) {
  if (event.touches.length !== 1) {
    touch = null;
    return;
  }
  const t = event.touches[0];
  touch = { x: t.clientX, y: t.clientY, stepped: false, claimed: false };
}

function onTouchMove(event: TouchEvent) {
  if (!touch || !stepping() || event.touches.length !== 1) return;
  const t = event.touches[0];
  const dy = touch.y - t.clientY;
  const dx = touch.x - t.clientX;
  if (!touch.claimed && (dy === 0 || Math.abs(dx) > Math.abs(dy))) return;
  const dir = dy > 0 ? 1 : -1;

  if (!touch.claimed) {
    if (!tween && (resolve(dir) === null || scrollsItself(event.target, dir))) {
      touch = null;
      return;
    }
    touch.claimed = true;
  }
  if (event.cancelable) event.preventDefault();

  if (!touch.stepped && !tween && Math.abs(dy) > 36) {
    const target = resolve(dir);
    touch.stepped = true;
    if (target !== null) glideTo(target);
  }
}

function onTouchEnd() {
  touch = null;
}

const KEYS: Record<string, 1 | -1> = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, ' ': 1 };

function onKey(event: KeyboardEvent) {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || !stepping()) return;
  let dir = KEYS[event.key];
  if (!dir) return;
  if (event.key === ' ' && event.shiftKey) dir = -1;
  const el = event.target as HTMLElement | null;
  if (el?.closest?.('input, textarea, select, [contenteditable], button, summary')) return;
  if (tween) {
    event.preventDefault();
    return;
  }
  const target = resolve(dir);
  if (target === null || scrollsItself(el, dir)) return;
  event.preventDefault();
  glideTo(target);
}

/* ---------- where the reader is, for the scene rail ---------- */

let docHeight = 0;

function computeSnapshot(y: number): StageSnapshot | null {
  if (!cinematic()) return null;
  const stages = geometry();
  const index = stages.findIndex((g) => y >= g.top - 2 && y <= g.end - 2);
  if (index < 0) return null;
  const g = stages[index];
  let scene = 0;
  g.stops.forEach((stop, i) => {
    // a scene counts as reached halfway to its resting point
    const from = i === 0 ? g.top : (g.stops[i - 1] + stop) / 2;
    if (y >= from - 2) scene = i;
  });
  const pageLeft = docHeight - (y + window.innerHeight) > 4;
  return {
    label: g.entry.label,
    scene,
    count: g.stops.length,
    hasNext: scene < g.stops.length - 1 || pageLeft,
    first: index === 0 && scene === 0,
    skippable: g.entry.skippable ?? false,
  };
}

function sameSnapshot(a: StageSnapshot | null, b: StageSnapshot | null) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.label === b.label && a.scene === b.scene && a.count === b.count &&
    a.hasNext === b.hasNext && a.first === b.first && a.skippable === b.skippable;
}

/** A reader on the shared frame; it only touches cached numbers. */
function refreshSnapshot(y: number) {
  const next = computeSnapshot(y);
  if (sameSnapshot(next, snapshot)) return;
  snapshot = next;
  listeners.forEach((listener) => listener(snapshot));
}

const scheduleSnapshot = requestTick;

function install() {
  if (installed) return;
  installed = true;
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('touchcancel', onTouchEnd, { passive: true });
  window.addEventListener('keydown', onKey);
  // grabbing the scrollbar takes the page back
  window.addEventListener('mousedown', cancelGlide, { passive: true });
  onFrame(refreshSnapshot, 'read');
  // the page length, read when it changes rather than on every frame
  const root = document.documentElement;
  docHeight = root.scrollHeight;
  new ResizeObserver(() => {
    docHeight = root.scrollHeight;
  }).observe(root);
}

export function registerStage(entry: StageEntry) {
  entries.add(entry);
  install();
  scheduleSnapshot();
  return () => {
    entries.delete(entry);
    scheduleSnapshot();
  };
}

export function subscribeStage(listener: (snapshot: StageSnapshot | null) => void) {
  listeners.add(listener);
  scheduleSnapshot();
  return () => {
    listeners.delete(listener);
  };
}

export function getStageSnapshot() {
  return snapshot;
}

/** Step forward or back from wherever the page is (for on-screen controls). */
export function step(dir: 1 | -1) {
  const target = resolve(dir);
  if (target !== null) glideTo(target);
  else window.scrollBy({ top: dir * window.innerHeight * 0.8, behavior: 'smooth' });
}

/** Jump to a scene of the stage the reader is in. */
export function goToScene(scene: number) {
  const y = window.scrollY;
  const g = geometry().find((stage) => y >= stage.top - 2 && y <= stage.end - 2);
  const stop = g?.stops[scene];
  if (stop !== undefined) glideTo(stop);
}

/**
 * Leave the projects: jump straight to the Experience stage, without playing
 * every chapter on the way.
 */
export function skipProjects(event?: { preventDefault(): void }) {
  const section = document.getElementById('experience');
  if (!section) return;
  event?.preventDefault();
  cancelGlide();
  const stage = Array.from(entries).find((entry) => section.contains(entry.track));
  const target = stage ? stage.metrics().top : section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: Math.round(target), behavior: 'instant' });
  history.replaceState(null, '', '#experience');
}
