# Homer Portes — Portfolio

Portfolio personal de Homer Portes. **Vite + React 19 + TypeScript**, con
animación de scroll hecha con CSS y un único frame compartido (sin librerías de animación).

La dirección de arte, el sistema de color, la tipografía y las reglas de motion
están documentadas en [DESIGN.md](DESIGN.md). Léelo antes de cambiar algo visual.

## Comandos

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

## Publicar

Sitio estático: `npm run build` genera `dist/`.

1. **Vercel (recomendado).** Importa el repo; `vercel.json` ya define build,
   carpeta de salida, caché de assets y cabeceras de seguridad. El dominio de
   producción se toma solo (`VERCEL_PROJECT_PRODUCTION_URL`).
2. **Otro hosting (Netlify, Cloudflare Pages, GitHub Pages…).** Build
   `npm run build`, carpeta `dist`, y define la variable de entorno
   `SITE_URL` con la dirección final, por ejemplo `SITE_URL=https://homerportes.dev`.

`SITE_URL` completa las URLs absolutas de `index.html` (canonical, Open Graph,
Twitter, datos estructurados) y genera `robots.txt` y `sitemap.xml`. Sin ella el
build avisa, usa URLs relativas y omite el sitemap.

Tras publicar, comprueba la vista previa del enlace en
[opengraph.xyz](https://www.opengraph.xyz) o en el Post Inspector de LinkedIn.
La imagen es `public/og-image.jpg` (1200×630).

## Estructura

```
src/
├── components/
│   ├── layout/       Header (running head), Footer (colofón)
│   └── motion/       useReveal (IntersectionObserver)
├── features/
│   ├── hero/         Masthead, diagrama Onion, índice, handoff a Project 01
│   ├── projects/     stage/ (useStage, Chapter, Crop) + un *Experience por proyecto
│   ├── experience/   Junior → Semi-Senior (acumulación vertical)
│   ├── skills/       Índice tipo espécimen tipográfico
│   └── education/    ITLA, UNIBE
├── content/          Datos: profile, projects, experience, skills, education
├── assets/projects/  Capturas reales de Finevo y FacEl
├── types/            Tipos de los modelos de contenido
├── hooks/            useSceneTone
└── styles/           tokens.css, reset.css, global.css
```

Cada proyecto es un mundo con su propio sticky stage. El contrato de escenas
vive en `src/features/projects/stage/useStage.ts` (variables CSS + `data-state`,
sin re-render por scroll) — léelo junto con DESIGN.md antes de añadir animación.

Alias de path: `@/*` → `src/*`.

## Editar contenido

Todo el texto y los datos viven en `src/content/`. Ningún componente
hardcodea contenido.

| Tarea | Archivo |
| --- | --- |
| Proyectos, stacks, repos, medios | `src/features/projects/content.ts` |
| Experiencia | `src/content/experience.ts` |
| Skills y "currently learning" | `src/content/skills.ts` |
| Educación | `src/content/education.ts` |
| Nombre, contacto, idiomas | `src/content/profile.ts` |
| Color, tipografía, espaciado, motion | `src/styles/tokens.css` |

## Sobre las imágenes y los datos

Las capturas son **reales**; las variantes optimizadas (WebP, 1100w + completa)
se sirven desde `public/work/`. Originales:

- Finevo → `FinevoFrontend/artifacts/` (dashboard, mensajes, asesores, móvil)
- FacEl → `FacturacionElectronica/research-output/pdf/` (e-CF 31 y nota de
  crédito renderizados por el propio motor de PDF)

Los e-CF llevan el banner "ENTORNO DEMO — SIN VALIDEZ FISCAL" del propio
proyecto. El ledger de Finevo es material representativo y está etiquetado como
tal en la interfaz.

Regla: si una superficie no tiene captura real, se resuelve con tipografía y un
diagrama real. **Nunca con una captura inventada.** Cuando haya capturas nuevas,
se reemplaza el archivo en `src/assets/projects/` y ya.

## Accesibilidad y motion

- `prefers-reduced-motion` no desactiva animaciones y ya: cada escena tiene una
  versión estática completa y compuesta.
- El scroll es nativo. No hay smooth-scroll, snapping ni intercepción de rueda.
- Contrastes verificados ≥ 4.5:1 en texto.
