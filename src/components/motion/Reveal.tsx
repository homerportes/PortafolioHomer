import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT } from './easing';

type RevealProps = {
  children: ReactNode;
  /** stagger delay in seconds */
  delay?: number;
  /** distance in px the block rises from */
  distance?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
};

/**
 * Single shared entrance: rise + fade once, when the block enters the viewport.
 * Reduced motion drops the movement and keeps a plain fade.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 22,
  className,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, transform: reduced ? 'none' : `translateY(${distance}px)` }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}
