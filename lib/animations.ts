"use client";

import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { loaderState } from "@/lib/loader-state";

type Ctx = {
  reduced: boolean;
};

export function whenLoaderDone(fn?: () => void): Promise<void> | void {
  if (loaderState.isDone()) {
    fn?.();
    return;
  }
  return new Promise<void>((resolve) => {
    const unsub = loaderState.subscribe(() => {
      unsub?.();
      resolve();
      fn?.();
    });
  });
}

/** Fade-up reveal for any block element. */
export function fadeUp(
  el: HTMLElement,
  ctx: Ctx,
  opts: { delay?: number; start?: string; y?: number } = {}
) {
  if (ctx.reduced) return gsap.set(el, { opacity: 1 });
  gsap.fromTo(
    el,
    { autoAlpha: 0, y: opts.y ?? 40 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      delay: opts.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: opts.start ?? "top 88%" },
    }
  );
}

/** Line-masked heading reveal using SplitText. */
export function textReveal(
  el: HTMLElement,
  ctx: Ctx,
  opts: { delay?: number; start?: string } = {}
): () => void {
  if (ctx.reduced) return () => undefined;

  const split = new SplitText(el, {
    type: "lines",
    linesClass: "reveal-line",
    mask: "lines",
  });
  const tween = gsap.fromTo(
    split.lines,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.08,
      delay: opts.delay ?? 0,
      paused: true,
      onComplete: () => split.revert(),
    }
  );

  const st = ScrollTrigger.create({
    trigger: el,
    start: opts.start ?? "top 85%",
    once: true,
    onEnter: () => tween.play(),
  });

  return () => {
    st.kill();
    tween.kill();
    split.revert();
  };
}

/** Clip-path image reveal: mask opens while the media settles from oversize. */
export function imageReveal(
  wrap: HTMLElement,
  ctx: Ctx,
  opts: { delay?: number } = {}
) {
  if (ctx.reduced) return gsap.set(wrap, { clipPath: "inset(0% 0% 0% 0%)" });
  const media =
    wrap.querySelector<HTMLElement>("[data-reveal-media]") ??
    (wrap.firstElementChild as HTMLElement | null);
  const tl = gsap.timeline({
    delay: opts.delay ?? 0,
    scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
  });
  tl.fromTo(
    wrap,
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }
  );
  if (media) {
    tl.fromTo(media, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0.15);
  }
  return tl;
}

/** Parallax drift for depth layers. */
export function parallax(
  el: HTMLElement,
  ctx: Ctx,
  amount = 10,
  trigger?: HTMLElement | null
) {
  if (ctx.reduced) return;
  gsap.fromTo(
    el,
    { yPercent: -amount / 2 },
    {
      yPercent: amount / 2,
      ease: "none",
      scrollTrigger: {
        trigger: trigger ?? el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

/** Magnetic attraction for buttons/links. Returns cleanup. */
export function magnetic(
  el: HTMLElement,
  ctx: Ctx,
  strength = 0.35
): () => void {
  if (ctx.reduced || !window.matchMedia("(hover: hover)").matches)
    return () => undefined;

  const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

  const move = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    xTo(relX * strength);
    yTo(relY * strength);
  };
  const leave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", leave);
  return () => {
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerleave", leave);
  };
}

/** Infinite marquee via gsap (direction-aware). */
export function marquee(track: HTMLElement, ctx: Ctx, speed = 60, reverse = false) {
  if (ctx.reduced) return () => undefined;
  const inner = track.querySelector<HTMLElement>("[data-marquee-inner]");
  if (!inner) return () => undefined;

  // duplicate content until it fills 2x viewport width
  const original = inner.innerHTML;
  let guard = 0;
  while (inner.scrollWidth < window.innerWidth * 2 && guard < 8) {
    inner.innerHTML += original;
    guard += 1;
  }

  const w = inner.scrollWidth / 2;
  const tl = gsap.to(inner, {
    x: reverse ? `+=${w}` : `-=${w}`,
    duration: w / speed,
    ease: "none",
    repeat: -1,
  });
  if (reverse) gsap.set(inner, { x: -w });

  return () => {
    tl.kill();
    inner.innerHTML = original;
    gsap.set(inner, { x: 0 });
  };
}
