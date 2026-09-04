"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { lenisStore } from "@/lib/lenis-store";

import CinematicScrollSnap from "@/components/CinematicScrollSnap";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoResize: true,
      prevent: (node) => (node as HTMLElement)?.id === "lenis-prevent",
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.0,
      syncTouch: true,
    });
    lenisStore.current = lenis;
    (window as unknown as { __lenis: Lenis | null }).__lenis = lenis;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as unknown as { __lenis: Lenis | null }).__lenis = null;
      if (lenisStore.current === lenis) lenisStore.current = null;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisStore.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <>
      <CinematicScrollSnap />
      {children}
    </>
  );
}
