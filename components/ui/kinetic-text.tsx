"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface KineticTextProps {
  lines: string[];
  fontSize?: string;
  className?: string;
  color?: string;
}

export function KineticText({
  lines = ["AMAN", "VERMA"],
  fontSize = "clamp(3.2rem, 6.5vw, 6.2rem)",
  className = "",
  color = "#141516",
}: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterElsRef = useRef<HTMLSpanElement[]>([]);
  const targetStrokesRef = useRef<Float32Array>(new Float32Array(0));
  const currentStrokesRef = useRef<Float32Array>(new Float32Array(0));
  const targetScalesRef = useRef<Float32Array>(new Float32Array(0));
  const currentScalesRef = useRef<Float32Array>(new Float32Array(0));
  const targetDisplacesRef = useRef<Float32Array>(new Float32Array(0));
  const currentDisplacesRef = useRef<Float32Array>(new Float32Array(0));

  const animFrameIdRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const letterRectsRef = useRef<{ left: number; top: number; width: number; height: number; cx: number; cy: number }[]>([]);

  // Flatten letters with index metadata
  const totalLetters = lines.reduce((acc, line) => acc + line.length, 0);

  // Initialize buffer arrays
  if (targetStrokesRef.current.length !== totalLetters) {
    targetStrokesRef.current = new Float32Array(totalLetters);
    currentStrokesRef.current = new Float32Array(totalLetters);
    targetScalesRef.current = new Float32Array(totalLetters).fill(1);
    currentScalesRef.current = new Float32Array(totalLetters).fill(1);
    targetDisplacesRef.current = new Float32Array(totalLetters);
    currentDisplacesRef.current = new Float32Array(totalLetters);
  }

  // Cache letter bounding rects
  const updateRects = useCallback(() => {
    if (!containerRef.current) return;
    const els = Array.from(containerRef.current.querySelectorAll<HTMLSpanElement>("[data-char-idx]"));
    letterElsRef.current = els;
    letterRectsRef.current = els.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };
    });
  }, []);

  // Continuous smooth Spring animation loop (120 FPS GPU Composited)
  const animateLoop = useCallback(() => {
    let needsContinue = false;
    const total = totalLetters;
    const lerpFactor = 0.18; // Smooth exponential spring response

    for (let i = 0; i < total; i++) {
      const dStroke = targetStrokesRef.current[i] - currentStrokesRef.current[i];
      const dScale = targetScalesRef.current[i] - currentScalesRef.current[i];
      const dDisp = targetDisplacesRef.current[i] - currentDisplacesRef.current[i];

      if (Math.abs(dStroke) > 0.005 || Math.abs(dScale) > 0.002 || Math.abs(dDisp) > 0.01) {
        currentStrokesRef.current[i] += dStroke * lerpFactor;
        currentScalesRef.current[i] += dScale * lerpFactor;
        currentDisplacesRef.current[i] += dDisp * lerpFactor;
        needsContinue = true;
      } else {
        currentStrokesRef.current[i] = targetStrokesRef.current[i];
        currentScalesRef.current[i] = targetScalesRef.current[i];
        currentDisplacesRef.current[i] = targetDisplacesRef.current[i];
      }

      // Apply to DOM node exclusively via GPU-composited transform (zero reflow/layout thrashing)
      const el = letterElsRef.current[i];
      if (el) {
        const scale = currentScalesRef.current[i];
        const dispY = currentDisplacesRef.current[i];
        el.style.transform = `translate3d(0, ${dispY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      }
    }

    if (needsContinue) {
      animFrameIdRef.current = requestAnimationFrame(animateLoop);
    } else {
      isAnimatingRef.current = false;
    }
  }, [totalLetters]);

  const startAnimation = useCallback(() => {
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      animFrameIdRef.current = requestAnimationFrame(animateLoop);
    }
  }, [animateLoop]);

  // Handle Mouse Move kinetic ripple calculation
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (letterRectsRef.current.length === 0) {
        updateRects();
      }

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const radius = 220; // Proximity wave influence radius

      letterRectsRef.current.forEach((rect, i) => {
        const dx = rect.cx - mouseX;
        const dy = rect.cy - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          // Quadratic falloff curve for rich organic elasticity
          const norm = 1 - dist / radius;
          const power = Math.pow(norm, 1.6);

          targetScalesRef.current[i] = 1 + power * 0.14; // Subtle scale swell
          targetDisplacesRef.current[i] = -power * 12; // Kinetic lift on Y-axis
        } else {
          targetScalesRef.current[i] = 1;
          targetDisplacesRef.current[i] = 0;
        }
      });

      startAnimation();
    },
    [startAnimation, updateRects]
  );

  const onMouseLeave = useCallback(() => {
    targetScalesRef.current.fill(1);
    targetDisplacesRef.current.fill(0);
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    updateRects();
    window.addEventListener("resize", updateRects);
    if ("fonts" in document) {
      document.fonts.ready.then(updateRects);
    }
    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener("resize", updateRects);
    };
  }, [updateRects, fontSize]);

  let globalLetterIdx = 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`select-none cursor-default ${className}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color,
        lineHeight: 0.88,
        letterSpacing: "-0.04em",
      }}
    >
      {lines.map((line, lineIdx) => (
        <div
          key={lineIdx}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            overflow: "visible",
          }}
        >
          {line.split("").map((char) => {
            const currentIdx = globalLetterIdx++;
            return (
              <span
                key={currentIdx}
                data-char-idx={currentIdx}
                style={{
                  display: "inline-block",
                  fontSize,
                  fontWeight: 800,
                  fontFamily: "'Aeonik TRIAL', -apple-system, BlinkMacSystemFont, 'Inter Tight', sans-serif",
                  willChange: "transform",
                  transformOrigin: "center center",
                  transition: "none", // Controlled via requestAnimationFrame for 120 FPS physics
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
