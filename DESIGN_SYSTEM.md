# DESIGN SYSTEM — Aman Verma Portfolio

**Concept:** *A mind in motion.* The portfolio is a walk through Aman's visual brain:
an editorial print studio where ideas exist as physical artifacts (plates, prints,
frames) on warm paper, occasionally interrupted by dark "screen" chapters for
motion/AI work.

---

## 1. Color

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F1EDE4` | Primary background (warm off-white) |
| `--paper-2` | `#E9E3D6` | Raised paper / desk surface |
| `--ink` | `#181510` | Primary text (deep warm charcoal) |
| `--ink-2` | `#2A261E` | Dark section background |
| `--muted` | `#8B8577` | Secondary text on paper |
| `--muted-dark` | `#A39C8C` | Secondary text on ink |
| `--accent` | `#E8500F` | Signal vermilion — one accent only |
| `--line` | `rgba(24,21,16,.14)` | Hairlines on paper |
| `--line-dark` | `rgba(241,237,228,.16)` | Hairlines on ink |

Rules: imagery provides color; UI stays paper/ink/accent. Accent is used sparingly —
index numbers, hover states, one word in a statement. Never gradients as decoration.

## 2. Typography

| Family | Role | Notes |
|---|---|---|
| **Inter Tight** (400–900) | Display + body | Tight tracking (-0.03/-0.05em) at display sizes; the identity |
| **Instrument Serif** (italic 400) | Editorial accent words | One emphasized word per statement |
| **JetBrains Mono** (400/500) | Technical metadata | Labels, indices, counters, nav meta |

Scale (fluid via clamp):

```
display-xl   clamp(4rem, 14vw, 15rem)    hero name
display-1    clamp(2.75rem, 7vw, 7rem)   section titles
statement    clamp(1.75rem, 4vw, 4rem)   manifesto lines
title        clamp(1.25rem, 2.2vw, 2rem) card titles
body         1rem / 1.0625rem            paragraphs
label        .6875–.75rem mono uppercase tracked
```

## 3. Grid

CSS variables; compositions may break it, the system never does.

```css
--page-pad:  clamp(1.25rem, 4vw, 4rem);
--grid-gap:  clamp(.75rem, 1.5vw, 1.5rem);
--grid-columns: 12;  /* 8 @ ≤1024px, 4 @ ≤700px */
```

Utility: `.grid` spans viewport minus padding; children use `grid-column: span N`.
⌘G toggles a dev grid overlay.

## 4. Spacing & rhythm

Section padding-block: `clamp(5rem, 12vh, 10rem)`. Chapter rhythm per page:
QUIET → BUILD → SURPRISE → QUIET → BIG VISUAL → DETAIL → INTERACTION → PAUSE → FINALE.
Dark chapters: AI/Medium, Motion reel. Everything else sits on paper.

## 5. Motion tokens

| Name | Duration | Ease | Use |
|---|---|---|---|
| fast | 200ms | `power2.out` | hovers, cursor, link states |
| med | 450ms | `power3.out` | cards, menus items |
| slow | 900ms | `expo.out` | reveals, image masks |
| drama | 1400ms | `power4.inOut`, `circ.inOut` | loader collapse, page wipe |

Principles: transform/opacity only; nothing animates without hierarchy purpose;
reduced-motion collapses everything to instant state changes.

## 6. Elevation / depth system

Depth = scale + shadow + parallax velocity, never blur-glow.

```
z0 flat print        shadow none
z1 lifted artifact   0 18px 40px -18px rgba(24,21,16,.35)
z2 floating frame    0 30px 60px -22px rgba(24,21,16,.45)
```

## 7. Texture

One global film-grain overlay (SVG feTurbulence data-URI) at ~4% opacity,
`mix-blend-mode: multiply` on paper / `overlay` on ink. Nothing else.

## 8. Components

- `Loader` — counter + hairline bar; collapses upward with clip-path
- `Navigation` — fixed wordmark, index links, menu button → fullscreen overlay
- `CustomCursor` — dot; grows with labels VIEW / PLAY / OPEN / DRAG via `data-cursor`
- `Magnetic` — pointer-attract wrapper for CTAs
- `TextReveal` — line-mask split reveal (SplitText)
- `Plate` — generative placeholder artwork (SVG systems: halftone, grid-specimen,
  scanfield, gradient-mesh, letterform). Stands in until real assets replace them.
- `ProjectCard` — asymmetric editorial placements, hover crop-shift + meta slide
- `DeskCollage` — tilted artifact field with per-item scroll velocity
- `AIDiffSlider` — RAW ↔ DIRECTED drag comparison
- `Marquee` — infinite vocabulary ticker
- `HeroCanvas` — Three.js fragment field behind hero type (lazy, fallback-safe)

## 9. Breakpoints

```
≥1440  full composition
1024   tablet: 8-col, simplified collage
≤768   mobile: 4-col, stacked editorial cards, no cursor/WebGL, reduced parallax
```

## 10. Accessibility & performance rules

- Semantic landmarks, skip link, focus-visible styles, Esc closes overlays
- `prefers-reduced-motion`: Lenis off, parallax off, loader instant, WebGL off
- Images: next/image with sizes; plates are inline SVG (zero requests)
- WebGL: lazy init on visibility, dpr ≤ 1.75, paused when hidden
- Budgets: LCP < 2.5s, CLS < 0.1, INP < 200ms
