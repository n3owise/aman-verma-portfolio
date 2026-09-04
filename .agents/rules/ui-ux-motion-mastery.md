---
trigger: always_on
description: >-
  Rules and engineering standards for Awwwards-grade UI/UX, 120 FPS motion physics,
  perceived performance, and typography styling.
---

# UI/UX & Motion Engineering Standards

1. **120 FPS Hardware Acceleration & Zero Layout Thrashing**:
   - Never animate `padding`, `margin`, `width`, `height`, `left`, `top`, or `border-width` during continuous motion or marquee translation.
   - Always use GPU-composited properties: `transform: translate3d(x, y, 0)`, `scale()`, `opacity`, `filter`, and native OpenType `font-variation-settings`.
   - Apply `will-change: transform` only on persistent transform layers.

2. **Kinetic Inertia & Physics Dampening**:
   - Always apply a dead-zone filter to raw scroll deltas (`threshold > 1.2px`) to eliminate trackpad sub-pixel noise and jitter.
   - Use second-order Critically Damped Springs or exponential lerp (`lerp(current, target, factor * deltaRatio)`) for seamless direction reversals.
   - Normalize motion by `gsap.ticker.deltaRatio(60)` to guarantee identical physics on 60Hz, 120Hz, and 144Hz displays.

3. **Seamless Infinite Loop Wrapping**:
   - Use strict continuous Euclidean modulo wrapping (`gsap.utils.wrap(-unitW, 0, x)`) to prevent single-frame snap gaps or coordinate jumps.
   - Ensure the track buffer length is at least $3.5\times$ the viewport width.

4. **Typography & Readability**:
   - Maintain strict WCAG AAA contrast ratio ($\ge 7:1$) on all high-key backgrounds.
   - Avoid internal stroke artifacts on variable fonts.
