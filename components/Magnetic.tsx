"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { damping: 15, stiffness: 180, mass: 0.1 });
  const springY = useSpring(rawY, { damping: 15, stiffness: 180, mass: 0.1 });

  const handlePointerMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    rawX.set(deltaX);
    rawY.set(deltaY);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        x: springX,
        y: springY,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.span>
  );
}
