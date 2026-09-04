"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { lenisStore } from "@/lib/lenis-store";

export default function CinematicScrollSnap() {
  const pathname = usePathname();
  const currentStepRef = useRef(0);
  const isLockedRef = useRef(false);
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    // Only apply on the homepage
    if (pathname !== "/") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Helper: get project count dynamically from SelectedWork
    const getWorkCount = () => {
      return (
        (window as unknown as { __avSelectedWorkCount?: number })
          .__avSelectedWorkCount || 2
      );
    };

    // Helper: calculate absolute top positions of the sections
    const getPositions = () => {
      const hero = document.getElementById("hero");
      const portrait = document.getElementById("portrait-stage");
      const work = document.getElementById("work");
      const graphic = document.getElementById("graphic-work");

      const scrollY = window.scrollY;
      const heroTop = hero ? hero.getBoundingClientRect().top + scrollY : 0;
      const portraitTop = portrait ? portrait.getBoundingClientRect().top + scrollY : window.innerHeight;
      const workTop = work ? work.getBoundingClientRect().top + scrollY : window.innerHeight * 2;
      const graphicTop = graphic ? graphic.getBoundingClientRect().top + scrollY : window.innerHeight * 3;

      return { heroTop, portraitTop, workTop, graphicTop };
    };

    // Total steps: 0 (Hero) + 1 (Portrait) + N (Projects in SelectedWork) + 1 (Work Samples)
    const getTotalSteps = () => {
      return 2 + getWorkCount(); // Last step index is 2 + getWorkCount()
    };

    // Helper: navigate to a cinematic step
    const executeStep = (targetStep: number) => {
      const workCount = getWorkCount();
      const maxStep = 2 + workCount; // Step for Work Samples
      const clamped = Math.max(0, Math.min(maxStep, targetStep));
      currentStepRef.current = clamped;
      isLockedRef.current = true;

      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);

      const { heroTop, portraitTop, workTop, graphicTop } = getPositions();
      const lenis = lenisStore.current;

      const unlockAfterDwell = (dwellMs = 750) => {
        lockTimerRef.current = setTimeout(() => {
          isLockedRef.current = false;
        }, dwellMs);
      };

      if (clamped === 0) {
        // Step 0: Hero
        if (lenis) {
          lenis.scrollTo(heroTop, {
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => unlockAfterDwell(750),
          });
        } else {
          window.scrollTo({ top: heroTop, behavior: "smooth" });
          unlockAfterDwell(1200);
        }
      } else if (clamped === 1) {
        // Step 1: Portrait Stage
        if (lenis) {
          lenis.scrollTo(portraitTop, {
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => unlockAfterDwell(750),
          });
        } else {
          window.scrollTo({ top: portraitTop, behavior: "smooth" });
          unlockAfterDwell(1200);
        }
      } else if (clamped >= 2 && clamped < 2 + workCount) {
        // Steps 2 through (2 + workCount - 1): Selected Work Projects (0, 1, 2...)
        const projectIndex = clamped - 2;
        window.dispatchEvent(
          new CustomEvent("av-change-selected-work", { detail: { index: projectIndex } })
        );

        // If not already at Selected Work top, scroll smoothly there
        if (Math.abs(window.scrollY - workTop) > 20) {
          if (lenis) {
            lenis.scrollTo(workTop, {
              duration: 1.0,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => unlockAfterDwell(projectIndex === 0 ? 750 : 900),
            });
          } else {
            window.scrollTo({ top: workTop, behavior: "smooth" });
            unlockAfterDwell(1200);
          }
        } else {
          // Already at workTop: in-place yellow wipe between projects
          unlockAfterDwell(900);
        }
      } else if (clamped === 2 + workCount) {
        // Final Step: Work Samples Archive
        if (lenis) {
          lenis.scrollTo(graphicTop, {
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => unlockAfterDwell(750),
          });
        } else {
          window.scrollTo({ top: graphicTop, behavior: "smooth" });
          unlockAfterDwell(1200);
        }
      }
    };

    // Keep step synced if user navigates via menu or reloads
    const onScrollSync = () => {
      if (isLockedRef.current) return;
      const { heroTop, portraitTop, workTop, graphicTop } = getPositions();
      const workCount = getWorkCount();
      const scrollY = window.scrollY;

      if (scrollY < (heroTop + portraitTop) / 2) {
        currentStepRef.current = 0;
      } else if (scrollY < (portraitTop + workTop) / 2) {
        currentStepRef.current = 1;
      } else if (scrollY < (workTop + graphicTop) / 2) {
        const activeIdx = (window as unknown as { __avSelectedWorkActiveIndex?: number })
          .__avSelectedWorkActiveIndex ?? 0;
        currentStepRef.current = 2 + activeIdx;
      } else {
        currentStepRef.current = 2 + workCount;
      }
    };
    window.addEventListener("scroll", onScrollSync, { passive: true });

    // Wheel Event Handler with Strict Section Snapping & Dwell
    const onWheel = (e: WheelEvent) => {
      // If modal lightbox or menu drawer is open, let user interact freely
      if (document.body.style.overflow === "hidden") return;

      const { graphicTop } = getPositions();
      const workCount = getWorkCount();
      const maxStep = 2 + workCount;
      const current = currentStepRef.current;

      // Inside Section 4 (Work Samples):
      if (current >= maxStep) {
        // Scrolling DOWN inside Work Samples grid: allow natural scroll!
        if (e.deltaY > 0) return;

        // Scrolling UP from the very top of Work Samples: snap back to the last project in Selected Work!
        if (e.deltaY < -22 && window.scrollY <= graphicTop + 20) {
          e.preventDefault();
          if (!isLockedRef.current) {
            executeStep(maxStep - 1);
          }
          return;
        }
        return;
      }

      // In Sections 0, 1, 2..: Prevent continuous scroll and enforce section lock
      e.preventDefault();

      // If currently animating or dwelling on section, ignore momentum
      if (isLockedRef.current) return;

      if (e.deltaY > 20) {
        // Scroll Down -> advance to next cinematic step
        executeStep(current + 1);
      } else if (e.deltaY < -20) {
        // Scroll Up -> return to previous cinematic step
        executeStep(current - 1);
      }
    };

    // Keyboard Navigation (Arrow keys / Page keys / Space)
    const onKeyDown = (e: KeyboardEvent) => {
      if (document.body.style.overflow === "hidden") return;
      const current = currentStepRef.current;
      const workCount = getWorkCount();
      const maxStep = 2 + workCount;
      const { graphicTop } = getPositions();

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        if (current < maxStep) {
          e.preventDefault();
          if (!isLockedRef.current) executeStep(current + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        if (current > 0 && window.scrollY <= graphicTop + 20) {
          e.preventDefault();
          if (!isLockedRef.current) executeStep(current - 1);
        }
      }
    };

    // Mobile / Touch Navigation
    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (document.body.style.overflow === "hidden") return;
      if (isLockedRef.current) return;

      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      const current = currentStepRef.current;
      const workCount = getWorkCount();
      const maxStep = 2 + workCount;
      const { graphicTop } = getPositions();

      if (current >= maxStep && deltaY > 0) return;

      if (deltaY > 48) {
        // Swipe up -> advance
        executeStep(current + 1);
      } else if (deltaY < -48) {
        // Swipe down -> go back
        if (current >= maxStep && window.scrollY > graphicTop + 20) return;
        executeStep(current - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollSync);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, [pathname]);

  return null;
}
