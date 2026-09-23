import { useEffect, useRef, type CSSProperties, type ImgHTMLAttributes, type ReactNode } from 'react';
import type { Media, ProjectMeta } from '../content';
import { tierWeights, useStage, type StageWeights } from './useStage';
import s from './stage.module.css';
import { Arrow } from '@/components/Arrow';

const cx_ = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(' ');

/**
 * One project world: a pinned stage on desktop, a document everywhere else.
 * The shell owns scroll, tone and anchors; the experience owns composition.
 */
export function Chapter({
  project,
  weights,
  className,
  frameClassName,
  surfaces,
  children,
}: {
  project: ProjectMeta;
  /** scroll length of each scene, in viewport heights */
  weights: StageWeights;
  className?: string;
  frameClassName?: string;
  /** base colour per scene, when a world changes its ground mid-chapter */
  surfaces?: readonly string[];
  children: ReactNode;
}) {
  const ref = useStage(weights, project.name, true);
  const tiers = tierWeights(weights);
  const desktopLen = tiers.desktop.reduce((a, b) => a + b, 0) + 1;
  const handheldLen = tiers.handheld.reduce((a, b) => a + b, 0) + 1;

  return (
    <article
      id={`project-${project.id}`}
      className={cx_(s.chapter, className)}
      data-world={project.id}
      data-tone={project.tone}
      data-surface={project.surface}
      aria-labelledby={`project-title-${project.id}`}
      style={{ '--len': desktopLen, '--len-handheld': handheldLen } as CSSProperties}
    >
      <div ref={ref} className={s.track} data-surfaces={surfaces?.join(',')}>
        <div className={cx_(s.frame, frameClassName)}>{children}</div>
      </div>
    </article>
  );
}

/**
 * A statement set line by line. Each line sits in its own clipping box so a
 * world can mask it in; `--i` carries the line index for staggering.
 */
export function Lines({ text, lineClassName }: { text: string; lineClassName?: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={line} className={lineClassName} style={{ '--i': i } as CSSProperties}>
          <span>{line}</span>{' '}
        </span>
      ))}
    </>
  );
}

/** A real capture, served at the right width. */
export function Shot({
  m,
  sizes = '100vw',
  eager,
  className,
  alt,
  ...rest
}: {
  m: Media;
  sizes?: string;
  eager?: boolean;
  className?: string;
  /** pass "" when the capture is decorative next to a visible label */
  alt?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'>) {
  const base = `/work/${m.src}`;
  return (
    <img
      className={className}
      src={`${base}.webp`}
      srcSet={m.small ? `${base}-1100.webp 1100w, ${base}.webp ${m.w}w` : undefined}
      sizes={m.small ? sizes : undefined}
      width={m.w}
      height={m.h}
      alt={alt ?? m.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...rest}
    />
  );
}

/**
 * A real capture seen through a window. `crop` is the visible box in fractions
 * of the image — [x, y, width, height] — so a composition can frame the part
 * of an interface that matters instead of pasting the whole screen.
 */
export function Crop({
  m,
  crop: [cx, cy, cw, ch],
  className,
  sizes,
  eager,
}: {
  m: Media;
  crop: readonly [number, number, number, number];
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const style = {
    '--cx': cx,
    '--cy': cy,
    '--cw': cw,
    '--ar': (cw * m.w) / (ch * m.h),
  } as CSSProperties;
  return (
    <div className={cx_(s.crop, className)} style={style}>
      <Shot m={m} sizes={sizes} eager={eager} />
    </div>
  );
}

/** Stack line and the real repository links. Restrained on purpose. */
export function ChapterFoot({
  project,
  className,
  ...rest
}: { project: ProjectMeta; className?: string } & Record<`data-${string}`, string>) {
  return (
    <div className={cx_(s.foot, className)} {...rest}>
      <p className={s.stack}>
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </p>
      {project.repos.length > 0 && <nav className={s.repos} aria-label={`${project.name} source code`}>
        {project.repos.map((repo) => {
          const text = repo.label === 'Repository' ? 'View repository' : `${repo.label} repository`;
          return (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name}: ${text} on GitHub (opens in a new tab)`}
            >
              <span>{text}</span>
              <span aria-hidden="true" className={s.arrow}><Arrow dir="up-right" /></span>
            </a>
          );
        })}
      </nav>}
    </div>
  );
}

/**
 * The seam between two worlds: the outgoing atmosphere recedes into the next
 * one while the next project's name rises. Short, continuous, no flash.
 */
export function Handoff({ from, to }: { from: ProjectMeta; to: ProjectMeta }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.seen = '';
        io.disconnect();
      },
      { rootMargin: '0px 0px -25% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={s.handoff}
      data-to={to.id}
      style={{ '--from': from.surface, '--to': to.surface } as CSSProperties}
    >
      <div className={s.handoffOut} data-tone={from.tone} data-surface={from.surface} />
      <div ref={ref} className={s.handoffIn} data-tone={to.tone} data-surface={to.surface}>
        <a href={`#project-${to.id}`} className={s.handoffLink}>
          <span className={s.handoffNum}>{to.number}</span>
          <span className={s.handoffName}>{to.name}</span>
          <span className={s.handoffField}>{to.field}</span>
        </a>
      </div>
    </div>
  );
}
