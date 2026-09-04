"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* -------------------------------------------------------------------------
   Interactive 120 FPS HTML5 Canvas Dot Grid
   Supports both Standard Dark (Section 2) and Inverted Luminous (Section 3) modes
   ------------------------------------------------------------------------- */
export default function InteractiveDotCanvas({
  dotColor = [50, 50, 50],
  hoverColor = [80, 80, 80],
  gridSpacing = 18,
  baseDotSize = 1.2,
  maxRadius = 3.5,
  proximityRadius = 290,
  interactive = true,
  inverted = false,
}: {
  dotColor?: [number, number, number];
  hoverColor?: [number, number, number];
  gridSpacing?: number;
  baseDotSize?: number;
  maxRadius?: number;
  proximityRadius?: number;
  interactive?: boolean;
  inverted?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentPos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const targetPos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const isDirty = useRef<boolean>(true);
  const rafId = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const mx = currentPos.current.x;
    const my = currentPos.current.y;
    const cols = Math.ceil(w / gridSpacing) + 1;
    const rows = Math.ceil(h / gridSpacing) + 1;

    // Fast path: If mouse is outside interaction bounds, draw all dots in a single batch
    if (!interactive || mx < -400 || my < -400) {
      ctx.fillStyle = `rgb(${dotColor[0]},${dotColor[1]},${dotColor[2]})`;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.rect(
            gridSpacing * c - baseDotSize / 2,
            gridSpacing * r - baseDotSize / 2,
            baseDotSize,
            baseDotSize
          );
        }
      }
      ctx.fill();
      return;
    }

    // Active path: Draw base grid in single batch
    ctx.fillStyle = `rgb(${dotColor[0]},${dotColor[1]},${dotColor[2]})`;
    ctx.beginPath();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = gridSpacing * c;
        const y = gridSpacing * r;
        const dx = x - mx;
        const dy = y - my;
        if (dx * dx + dy * dy >= proximityRadius * proximityRadius) {
          ctx.rect(
            x - baseDotSize / 2,
            y - baseDotSize / 2,
            baseDotSize,
            baseDotSize
          );
        }
      }
    }
    ctx.fill();

    // Render dilated proximity dots around cursor
    const minCol = Math.max(0, Math.floor((mx - proximityRadius) / gridSpacing));
    const maxCol = Math.min(cols, Math.ceil((mx + proximityRadius) / gridSpacing));
    const minRow = Math.max(0, Math.floor((my - proximityRadius) / gridSpacing));
    const maxRow = Math.min(rows, Math.ceil((my + proximityRadius) / gridSpacing));

    for (let r = minRow; r < maxRow; r++) {
      for (let c = minCol; c < maxCol; c++) {
        const x = gridSpacing * c;
        const y = gridSpacing * r;
        const dx = x - mx;
        const dy = y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < proximityRadius * proximityRadius) {
          const proximity = 1 - Math.sqrt(distSq) / proximityRadius;
          const radius = inverted
            ? Math.max(0.5, maxRadius - (maxRadius - 1) * proximity)
            : 1 + (maxRadius - 1) * proximity;

          const red = Math.round(dotColor[0] + (hoverColor[0] - dotColor[0]) * proximity);
          const green = Math.round(dotColor[1] + (hoverColor[1] - dotColor[1]) * proximity);
          const blue = Math.round(dotColor[2] + (hoverColor[2] - dotColor[2]) * proximity);

          ctx.fillStyle = `rgb(${red},${green},${blue})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  }, [dotColor, hoverColor, gridSpacing, baseDotSize, maxRadius, proximityRadius, interactive, inverted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          isDirty.current = true;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        targetPos.current = { x, y };
        isDirty.current = true;
      } else {
        targetPos.current = { x: -1000, y: -1000 };
        isDirty.current = true;
      }
    };

    const onPointerLeave = () => {
      targetPos.current = { x: -1000, y: -1000 };
      isDirty.current = true;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    let running = true;
    const animate = () => {
      if (!running) return;

      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        currentPos.current.x += dx * 0.22;
        currentPos.current.y += dy * 0.22;
        isDirty.current = true;
      } else {
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
      }

      if (isDirty.current) {
        draw();
        if (
          currentPos.current.x === targetPos.current.x &&
          currentPos.current.y === targetPos.current.y &&
          (targetPos.current.x < -400 || targetPos.current.y < -400)
        ) {
          isDirty.current = false;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [isVisible, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
