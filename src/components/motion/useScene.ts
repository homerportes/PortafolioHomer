import { useRef, useState, type RefObject } from 'react';
import { useMotionValueEvent, useScroll, type MotionValue } from 'motion/react';

/**
 * The scene contract for every sticky chapter.
 *
 * Continuous travel (things that glide with the wheel) reads `progress`.
 * Discrete beats (things that switch on and off) read the derived state, which
 * only changes identity when a beat actually flips — so a scene can never end
 * up with half its elements on one beat and half on another, and every beat
 * transition stays a CSS transition, retargetable mid-flight.
 *
 * See DESIGN.md — this is the rule the FacEl desync bug bought us.
 */
export function useScene<T extends Record<string, string | number | boolean>>(
  derive: (p: number) => T,
): {
  ref: RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  beat: T;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const [beat, setBeat] = useState<T>(() => derive(0));

  useMotionValueEvent(progress, 'change', (p) => {
    const next = derive(p);
    setBeat((prev) => {
      for (const key of Object.keys(next) as (keyof T)[]) {
        if (prev[key] !== next[key]) return next;
      }
      return prev;
    });
  });

  return { ref, progress, beat };
}
