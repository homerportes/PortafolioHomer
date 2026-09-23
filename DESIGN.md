# Design — Homer Portes portfolio

## Thesis

**Systems, understood from the inside.** The site is set like a printed
technical periodical: a masthead, five project chapters, and a colophon. The
portfolio stays typographically coherent while each chapter shifts into its
own world: Finevo's deep forest, FacEl's drafting sheet of real fiscal
identifiers, RealStateApp's sunlit limestone, Artemis Banking's deep-ink ledger,
and LinkUp's cobalt feed that turns to night for Battleship. Every product image is real evidence;
atmosphere and composition come from the surrounding page.

Mode: **Experience** — the artifact leads, the interface recedes.

## Real material only

Every project image is a real capture or a crop of one. Originals live in
`media-source/projects/` (kept out of the build) and `src/assets/projects/`; the served, resized WebP
variants (full width + `-1100`) live in `public/work/<project>/`. Facts and
media are declared once in `src/features/projects/content.ts`.

FacEl has no finished frontend, so its world is built from FacEl's own
rendered e-CF documents (marked "ENTORNO DEMO — SIN VALIDEZ FISCAL") plus
typography made of real identifiers: the `FiscalDocumentPipeline` stage names,
schema element names, the sample e-NCF and its security code. The XML is
labelled as an excerpt. **If a surface has no capture, it gets typography and a
labelled representation, never an invented screenshot.**

Screens are framed with `Crop` (a window onto the meaningful part of an
interface) rather than pasted whole.

## Color

Warm stone paper and warm ink hold the rest of the portfolio together. Each
project is its own world; tokens live in `stage/stage.module.css`
(`.chapter[data-world=…]`) and are shared with the hand-off seams.

| Project | Ground | Ink | Accent | Tone |
| --- | --- | --- | --- | --- |
| Finevo | Deep forest `#0b1511` | Cream | Mint `#8fe3b8` | dark |
| FacEl | Cool bone `#e8e7e2` + drafting grid | Graphite | Vermilion `#cf3b22` | light |
| RealStateApp | Limestone `#ece4d8` + travelling daylight | Umber | Terracotta `#9e4d27` | light |
| Artemis Banking | Deep ink `#090e18` + 12 ledger columns | Cool neutral | Restrained blue `#86a8ff` | dark |
| LinkUp | Cobalt `#1d2fd6` → night `#070b26` at PLAY | White | Soft yellow `#ffe07a` | dark |

Old application palettes (Bootstrap blue, cyan) are not inherited: the screens
stay untouched, the world around them is new. Body text stays ≥ 4.5:1.

## Type

- **Fraunces** (display) — headlines, project names, the formula. Its optical
  sizing and italics carry the print reference.
- **Archivo** (body) — text, and the width axis is used as an interaction:
  Skills rows widen from `wdth 100` to `121` on hover.
- **IBM Plex Mono** (`.meta`) — reserved for real data: dates, amounts, e-NCF
  numbers, XML. Never used as a costume for "technical".
- **Caveat** (`.hand`) — a hand in the margin, used four times in the whole
  site and only to point at something real. Add a fifth and it stops working.

`.label` is the one recurring kicker style (Archivo, expanded, caps, tracked).
It is a system, not an eyebrow on every section.

## Motion

Tokens: `--ease: cubic-bezier(0.22,1,0.36,1)`, `--ease-io: cubic-bezier(0.65,0,0.35,1)`.

**The stage contract** is `features/projects/stage/useStage.ts`. Scroll never
touches React state. Per frame, while a stage is near the viewport, it writes
`--p` (chapter progress) and `--s0…--sN` (each scene's local progress) on the
track; when the active scene changes it sets `data-scene` on the track and flips
`data-state` (`past | active | future`) on every element marked with `at(…)`.

- Continuous travel (camera pans, zooms, parallax, the e-NCF filling) reads the
  CSS variables — transform/opacity only.
- Discrete beats (copy, plates, masks) are CSS transitions on `data-state`, so
  they are interruption-safe and cannot desync.
- A world may change its ground mid-chapter (`surfaces` prop); the header
  follows via the `stage:surface` event.
- Tabbing into a hidden scene scrolls the stage to it.

Each world has its own motion character: Finevo soft rises and a lit plane,
FacEl typed wipes, RealStateApp plates developing upward, Artemis horizontal
wipes across ledger columns, LinkUp a loose social cluster, then night.

**One gesture, one scene.** `stage/stepper.ts` holds every registered stage.
Inside a stage (or within reach of one) a wheel notch, a swipe or an arrow /
Page / Space key glides the page to the next scene's resting point (82% into
the scene; scene 0 rests at its top), and adjacent stages chain through their
hand-off seam. Inertia tails are swallowed; nested scrollers, an open menu,
zoom and horizontal gestures are left alone. Outside the stages (Skills,
Education, footer) scroll is native, and the scrollbar and anchors always move
freely. `SceneRail` shows the chapter and its scenes (right rail on desktop,
count inside the cue on handhelds) plus a "Scroll / Swipe up" cue.


## Rhythm

| Section | Desktop track | Handheld portrait track | Scenes |
| --- | --- | --- | --- |
| Hero | 3.3 svh units | per-tier short beats | arrival (name) → five worlds as an index → Finevo opens into its chapter |
| Finevo | 6.7 svh units | shorter scene weights | intro → input → understand → control → plan → guidance |
| FacEl | 5.9 | shorter scene weights | input → serialize → pre-sign validate → sign → validate + evidence |
| RealStateApp | 6.0 | shorter scene weights | discover → explore → negotiate → communicate → manage |
| Artemis Banking | 5.1 | shorter scene weights | account → transaction → operation → management |
| LinkUp | 6.2 | shorter scene weights | share → discuss → connect → play (night) → keep score |
| Experience | pinned, 3 scenes | pinned, 3 short scenes | Junior → transition → Semi-Senior |
| Skills / Education | in flow | in flow | — |

Scene weights live at the top of each `*Experience.tsx` (and `Hero.tsx`). The
hero uses the same stage contract: its five tiles are the project index, and the
Finevo tile opens (a scroll-linked `clip-path`) until it is Finevo's ground, so
the portfolio enters its first project without a cut. Between worlds a
short hand-off seam blends the grounds (oklab) and names the next project.

## Performance rules

Fluid on modest phones and GPU-less laptops, with the same animations for all:

- **One frame for everything scroll-linked** (`lib/frame.ts`): scrollY is read
  once; readers (header tone hit test, scene rail) run first, writers (stage
  CSS variables, `data-state`) after. Never read layout inside a writer.
- **Geometry is cached.** Stages measure themselves only when layout changes
  (ResizeObserver on the track and the document, resize, mode change); a scroll
  frame is arithmetic on scrollY. Chapters are measured through their
  `<article>` and a shared `100svh` probe, never through skipped content.
- **The glide is native smooth scroll** (`scrollTo({behavior:'smooth'})` +
  `scrollend`), which runs on the compositor thread.
- **Off-screen work is skipped:** chapters (in pinned mode), Skills and
  Education use `content-visibility: auto` with an exact or remembered
  intrinsic size.
- **No full-screen blending or live blur.** Grain is a static PNG tile
  (`public/textures/grain.png`) on its own layer, normal blend; the header is
  near-opaque instead of `backdrop-filter`.
- **No animation runtime.** Motion is CSS transitions and keyframes only; the
  `motion` package was removed.

## Reduced motion

The pinned stage exists under two named tiers. Desktop uses
`(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)`;
handheld portrait uses
`(max-width: 1023px) and (orientation: portrait) and (min-height: 560px) and (prefers-reduced-motion: no-preference)`.
The same conditions live in `useStage.ts` and CSS media blocks. Reduced motion
at any width and short landscape phones get every scene as a composed document.
Reveal transforms are also gated on `no-preference`.

## Responsive

Desktop retains its original cinematic compositions. Portrait tablets and
phones have their own pinned compositions and shorter scroll beats. The hero
stacks its name and opens the full stop into a vertical five-world index.
Finevo uses real phone captures in an image-led lower field. FacEl turns its
pipeline into a top strip, document pins, and readable XML. RealStateApp is
photo-first with alternating chat plates. Artemis keeps its four-column ledger
and shows one transaction plate at a time. LinkUp's tiles arrive singly before
the Battleship board enters at night. Experience swaps roles above the work
lines. Skills and Education remain in flow with touch-size controls. Short
landscape screens retain document flow. Sticky frames and tracks use `svh` so
address-bar changes do not alter their scroll span.

## Conventions

- New scene elements: mark them with `at(sceneIndex, …)`; style `data-state`.
- Worlds mark themselves `data-tone` + `data-surface`; `useSceneTone` probes
  under the fixed header so the running head re-inks.
- Representative excerpts (the FacEl XML) are labelled as such.
