const PATHS = {
  right: 'M3 8h10M9 4l4 4-4 4',
  down: 'M8 3v10M4 9l4 4 4-4',
  'up-right': 'M4.5 11.5l7-7M5.5 4.5h6v6',
} as const;

/**
 * A drawn arrow. Text arrows such as ↗ have an emoji form that iOS and Android
 * pick by default, so every directional mark in the UI is an SVG in the
 * current text colour instead.
 */
export function Arrow({ dir = 'right', className }: { dir?: keyof typeof PATHS; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'inline-block', flex: 'none', verticalAlign: '-0.125em' }}
    >
      <path d={PATHS[dir]} />
    </svg>
  );
}
