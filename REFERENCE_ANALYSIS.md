# REFERENCE ANALYSIS — trevornoah.com

Research method: full DOM inspection of the live homepage (HTML + inline critical CSS +
module architecture), plus inspection of the site's custom JS entry bundle.

---

## 1. Technical stack (verified)

| Layer | Finding |
|---|---|
| CMS / shell | Webflow (published HTML, `w-` classes, Webflow CDN CSS) |
| Custom app | Hand-written JS app served from Vercel (`app.js` → webpack chunks), layered over Webflow |
| Scroll | Locomotive-style attribute API: `data-scroll`, `data-scroll-speed`, `data-scroll-offset`, `data-scroll-css-progress`; native scrollbar fully hidden |
| WebGL | **One persistent fixed canvas** (`data-module-global="webgl"`), scene swapped per section via `data-gl-scene`; includes paper-tear/peel transitions (SVG blur filter + corner-curl gradients) and a GL "tour" overlay |
| Modules | `data-module="split"`, `"card"`, `"hover-float"`, `"widget"`, `"modal"`, `"intro"`, `"hero-carousel"`, `"gl-nav"`, `"fixed-progress"` |
| Preloader | `preloader_wrap` with **3-digit padded counter ("000")** + progress bar; body starts `data-start="hidden"`; readiness gated on `html.is-ready` |
| Fonts | Die Grotesk, 6 woff2 cuts preloaded at `fetchpriority="high"`; Font Loading API manager in JS with timeout fallback |
| Dev tools | Grid overlay toggled via ⌘G reading `--grid-columns` from CSS — the layout is genuinely grid-driven |
| Schema | JSON-LD `Person` with jobTitle[], knowsAbout[] |
| Analytics | GTM behind consent mode |

## 2. Section rhythm (DOM order)

```
HERO (logo parts masked-reveal from translateY(110%), social links scale-in delayed)
STATEMENT   — big editorial line, one word accent-colored
MEDIA       — light section, carousel of cards
ABOUT       — is-dark section, statement + bio + CTA
LATEST      — is-dark section, dated list rows
QUOTE       — pull-quote with accent author citation
BOOKS       — light section, editorial cards
FOOTER      — minimal
```

Key principle: **alternating quiet/loud chapters**, light/dark alternation, and a single
pull-quote used as a pacing pause between major chapters.

## 3. Interaction principles worth stealing

1. **One persistent GL layer, many scenes** — not one canvas per effect. Scenes are
   attached to sections; transitions between sections happen *inside* the canvas
   (paper tear), so the page never "reloads" visually.
2. **Masked typography entrances** — display text lives inside overflow-hidden line
   masks; parts translate up into place. Nothing fades in blandly.
3. **Split-text as infrastructure** (`data-module="split"`) — one system for every
   heading, opacity gated by `html.is-ready` to avoid FOUC.
4. **Scroll as physics, not position** — `data-scroll-speed` gives objects inertia;
   elements drift at different velocities creating depth.
5. **The menu is a destination** — fullscreen overlay with its own floating objects
   (faces, mic, book), staggered link reveals, background transformation.
6. **Editorial cards with physicality** — hover-float modules, subtle rotation,
   shadow shifts; assets feel like objects on a surface.
7. **Progress-linked CSS animations** (`data-scroll-css-progress`) — scrub animations
   driven by scroll progress without JS per-frame writes.
8. **Typography does the branding** — multi-cut grotesk family, extreme scale contrast,
   small technical labels vs huge display lines.
9. **Counter-based loader** — numeric progress ("000") feels mechanical/precise rather
   than decorative.
10. **Grid honesty** — visible alignment discipline; chaos compositions still snap to
    an invisible 12-col system.

## 4. What we will NOT copy

- Name, biography, photography, artwork, logos, copy, layouts, exact animations.
- The paper-tear GL transition verbatim (we reinterpret depth transitions differently).
- Navy palette (#1d2440) — Aman gets his own warm-paper identity.
- jQuery/Webflow dependency chain.

## 5. Reinterpretation strategy for amanverma.com

| Reference principle | Aman implementation |
|---|---|
| Persistent GL layer | One hero-scoped Three.js fragment field (planes = design artifacts), lazy-init, CSS fallback |
| Masked type reveals | Line-mask `TextReveal` utility (GSAP SplitText) reused everywhere |
| Counter loader | Padded 000→100 counter, mono type, ~1.1s budget, session-aware |
| Scroll speeds | Lenis + ScrollTrigger parallax depths on collage/work imagery |
| Fullscreen menu | Overlay with oversized staggered links + drifting plate fragments |
| Light/dark chapters | Paper ↔ ink section alternation with matched motion intensity |
| Pull-quote pause | Manifesto statements between work chapters |
| Editorial cards | Asymmetric work index; hover crop-shift + VIEW cursor |
| ⌘G grid overlay | Recreated as a dev easter egg reading our own `--grid-columns` |
