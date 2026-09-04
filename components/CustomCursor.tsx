"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

export default function CustomCursor() {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, { damping: 24, stiffness: 400 });
  const dotY = useSpring(rawY, { damping: 24, stiffness: 400 });
  const labelX = useSpring(rawX, { damping: 28, stiffness: 220 });
  const labelY = useSpring(rawY, { damping: 28, stiffness: 220 });

  useEffect(() => {
    const root = document.documentElement;
    if (touch || reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    root.classList.add("has-cursor");

    const onPointerMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const tagged = target.closest<HTMLElement>("[data-cursor]");
      const text = tagged?.dataset.cursor ?? "";
      setCursorText(text);

      const interactive = target.closest("a, button, [role='button'], input, [data-cursor]");
      setIsHovered(!!interactive && !text);
    };

    const onPointerDown = () => setIsClicking(true);
    const onPointerUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [touch, reduced, isVisible, rawX, rawY]);

  if (touch || reduced) return null;

  return (
    <div
      className="cursor"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: "none",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {/* Dot Cursor */}
      <motion.div
        className="cursor-dot"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: "10px",
          height: "10px",
          margin: "-5px 0 0 -5px",
          borderRadius: "50%",
          backgroundColor: "#E05414",
          boxShadow: isHovered ? "0 0 16px rgba(224, 84, 20, 0.6)" : "none",
          willChange: "transform, opacity",
        }}
        animate={{
          opacity: isVisible ? (isHovered || cursorText ? 0.85 : 1) : 0,
          scale: cursorText ? 0 : isClicking ? 0.6 : isHovered ? 2.4 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Label Badge Cursor */}
      <motion.div
        className="cursor-label"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x: labelX,
          y: labelY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "74px",
          height: "74px",
          margin: "-37px 0 0 -37px",
          borderRadius: "50%",
          backgroundColor: "#E05414",
          color: "#FFFFFF",
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          boxShadow: "0 14px 32px rgba(224, 84, 20, 0.4)",
          willChange: "transform, opacity",
        }}
        animate={{
          opacity: isVisible && cursorText ? 1 : 0,
          scale: isVisible && cursorText ? 1 : 0,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {cursorText}
      </motion.div>
    </div>
  );
}
