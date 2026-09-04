"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AIDiffSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  };

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "980px", margin: "0 auto" }}>
      <div
        className="diff"
        ref={ref}
        data-cursor="DRAG"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="slider"
        aria-label="Compare raw generated frame with directed final pass"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
          if (e.key === "PageDown") setPos((p) => Math.max(4, p - 15));
          if (e.key === "PageUp") setPos((p) => Math.min(96, p + 15));
          if (e.key === "Home") setPos(4);
          if (e.key === "End") setPos(96);
        }}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: "28px",
          overflow: "hidden",
          border: "1px solid rgba(255, 248, 226, 0.15)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
          cursor: "ew-resize",
          userSelect: "none",
          backgroundColor: "#0d0f0e",
        }}
      >
        {/* Layer 1: Left / Raw Output */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/ai-raw.jpeg"
            alt="Raw AI Prompt Output"
            fill
            sizes="(max-width: 980px) 100vw, 980px"
            style={{ objectFit: "cover", filter: "brightness(0.9)" }}
            priority
          />
          {/* Label Over Image */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: "rgba(10, 12, 11, 0.8)",
              backdropFilter: "blur(10px)",
              color: "#FFF8E2",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            RAW PROMPT OUTPUT
          </div>
        </div>

        {/* Layer 2: Right / Directed & Finished (Clipped) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 0 0 ${pos}%)`,
          }}
        >
          <Image
            src="/images/ai-final.jpeg"
            alt="Hand-Composited and Graded Artwork"
            fill
            sizes="(max-width: 980px) 100vw, 980px"
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Label Over Image */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: "rgba(224, 84, 20, 0.9)",
              backdropFilter: "blur(10px)",
              color: "#FFFFFF",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              boxShadow: "0 4px 14px rgba(224, 84, 20, 0.4)",
            }}
          >
            DIRECTED & COMPOSITED PASS
          </div>
        </div>

        {/* Tactile Split Slider Handle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${pos}%`,
            width: "3px",
            backgroundColor: "#FFE862",
            boxShadow: "0 0 16px rgba(255, 232, 98, 0.8)",
            transform: "translateX(-50%)",
            pointerEvents: "none",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "#141516",
              border: "2px solid #FFE862",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFE862",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            ↔
          </div>
        </div>
      </div>

      {/* Footer Sub-Labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "rgba(255, 248, 226, 0.5)",
          letterSpacing: "0.08em",
        }}
      >
        <span>← RAW GENERATIVE OUTPUT</span>
        <span style={{ color: "#FFE862" }}>DRAG SLIDER TO REVEAL</span>
        <span>FINAL COMPOSITE & GRADE →</span>
      </div>
    </div>
  );
}
