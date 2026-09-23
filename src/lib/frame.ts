/**
 * One animation frame for everything scroll-linked.
 *
 * Every stage, the scene rail and the header tone used to keep their own
 * scroll listener and their own requestAnimationFrame, and each read layout
 * (scrollY, rects, hit tests) after another had already written styles — a
 * forced reflow per reader, per frame. Here there is a single frame: scrollY
 * is read once, every reader runs on the clean layout of the previous frame,
 * and only then do the writers touch the DOM.
 */

type Job = (scrollY: number) => void;

const readers = new Set<Job>();
const writers = new Set<Job>();
let raf = 0;
let installed = false;

let lastY = NaN;

function tick() {
  raf = 0;
  const y = window.scrollY;
  readers.forEach((job) => job(y));
  writers.forEach((job) => job(y));
  // readers saw the layout from before this frame's writes; when the page
  // moved, one trailing frame lets them read the final state once it stops
  if (y !== lastY) {
    lastY = y;
    requestTick();
  }
}

/** Ask for one more frame (scroll and resize already ask on their own). */
export function requestTick() {
  if (!raf) raf = requestAnimationFrame(tick);
}

function install() {
  if (installed) return;
  installed = true;
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });
}

/**
 * Run `job` on every scroll-linked frame. Readers may measure but never
 * write; writers may write but never measure.
 */
export function onFrame(job: Job, phase: 'read' | 'write' = 'write') {
  const set = phase === 'read' ? readers : writers;
  set.add(job);
  install();
  requestTick();
  return () => {
    set.delete(job);
  };
}
