"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Props = {
  items: React.ReactNode[];
  speed?: number;
  reverse?: boolean;
  outline?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function Marquee({
  items,
  speed = 60,
  reverse = false,
  outline = false,
  className,
  ariaLabel,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const widthRef = useRef(0);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const measure = () => {
      const firstChild = inner.children[0] as HTMLElement;
      if (firstChild) {
        widthRef.current = firstChild.offsetWidth;
      } else {
        widthRef.current = inner.scrollWidth / 2;
      }
    };

    measure();
    window.addEventListener("resize", measure);
    if ("fonts" in document) document.fonts.ready.then(measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (reduced || document.hidden) return;
    const w = widthRef.current;
    if (w <= 0) return;

    // Convert speed (px/sec) to frame distance
    const pxPerFrame = (speed * (delta / 1000));
    const dir = reverse ? 1 : -1;
    let nextX = x.get() + dir * pxPerFrame;

    // Wrap continuously
    if (dir < 0) {
      if (nextX <= -w) nextX += w;
    } else {
      if (nextX >= 0) nextX -= w;
    }

    x.set(nextX);
  });

  const row = (
    <div style={{ display: "flex", flexShrink: 0, gap: "inherit" }}>
      {items.map((item, i) => (
        <span className="marquee-item" key={i} aria-hidden={i > 0 || undefined}>
          {item}
          <i className="dot" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`marquee${outline ? " marquee--outline" : ""}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      style={{ overflow: "hidden" }}
    >
      <motion.div
        ref={innerRef}
        className="marquee-inner"
        style={{
          x,
          display: "flex",
          width: "max-content",
        }}
      >
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
