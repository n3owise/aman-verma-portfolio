"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

export default function CyberpunkMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const points: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 40; i++) {
      points.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
      });
    }

    let mouseX = w / 2;
    let mouseY = h / 2;
    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    let rafId = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#FF4D4D";
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x < 0 || p1.x > w) p1.vx *= -1;
        if (p1.y < 0 || p1.y > h) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(255, 77, 77, ${1 - dist / 140})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        const mdx = mouseX - p1.x;
        const mdy = mouseY - p1.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 180) {
          ctx.strokeStyle = `rgba(0, 230, 118, ${1 - mdist / 180})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="var-screen var-palette-2">
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Header HUD */}
      <header className="var-header" style={{ borderBottom: "1px solid rgba(255, 77, 77, 0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ padding: "0.2rem 0.6rem", background: "#FF4D4D", color: "#062319", fontWeight: 900, fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace" }}>
            AV_HUD
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", color: "#D1FAE5", letterSpacing: "0.15em" }}>
            AMAN VERMA // KINETIC MATRIX
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", color: "#D1FAE5" }}>
          <div>PTR: [0, 0]</div>
          <div>LAT: 28.6139° N</div>
          <div style={{ color: "#FF4D4D", fontWeight: 700 }}>CHROMA: COMPLEMENTARY</div>
          <button style={{ padding: "0.4rem 1rem", border: "1px solid #FF4D4D", background: "transparent", color: "#FF4D4D", fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", cursor: "pointer" }}>
            CONNECT NODE →
          </button>
        </div>
      </header>

      {/* Main Matrix Stage */}
      <div className="var-stage">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.8rem", background: "rgba(255, 77, 77, 0.15)", border: "1px solid #FF4D4D", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "#FF4D4D", marginBottom: "1.25rem" }}>
            <span>▶</span>
            <span>SYSTEM DIRECTIVE MMXXVI</span>
          </div>

          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, color: "#D1FAE5", margin: "0 0 1.5rem 0", textTransform: "uppercase" }}>
            KINETIC <br />
            <span style={{ color: "#FF4D4D", textShadow: "0 0 30px rgba(255, 77, 77, 0.6)" }}>
              PRECISION
            </span> <br />
            ARCHITECTURE.
          </h1>

          <p style={{ fontSize: "1.2rem", color: "rgba(209, 250, 229, 0.8)", fontWeight: 300, maxWidth: "520px", lineHeight: 1.6, marginBottom: "2rem", fontFamily: "JetBrains Mono, monospace" }}>
            Architecting ultra-responsive interactive systems, high-tension brand identities, and kinetic 3D experiences.
          </p>

          {/* Metric Telemetry Chips */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: "520px", marginBottom: "2.5rem" }}>
            <div style={{ padding: "0.9rem", border: "1px solid rgba(255, 77, 77, 0.3)", background: "rgba(6, 35, 25, 0.6)", borderRadius: "0.5rem" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FF4D4D" }}>08+</div>
              <div style={{ fontSize: "0.65rem", fontFamily: "JetBrains Mono, monospace", color: "rgba(209, 250, 229, 0.7)" }}>SELECTED CASE STUDIES</div>
            </div>
            <div style={{ padding: "0.9rem", border: "1px solid rgba(255, 77, 77, 0.3)", background: "rgba(6, 35, 25, 0.6)", borderRadius: "0.5rem" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#D1FAE5" }}>120 FPS</div>
              <div style={{ fontSize: "0.65rem", fontFamily: "JetBrains Mono, monospace", color: "rgba(209, 250, 229, 0.7)" }}>HARDWARE ACCELERATED</div>
            </div>
            <div style={{ padding: "0.9rem", border: "1px solid rgba(255, 77, 77, 0.3)", background: "rgba(6, 35, 25, 0.6)", borderRadius: "0.5rem" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#D1FAE5" }}>100%</div>
              <div style={{ fontSize: "0.65rem", fontFamily: "JetBrains Mono, monospace", color: "rgba(209, 250, 229, 0.7)" }}>BESPOKE MOTION</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{ padding: "1.1rem 2.2rem", background: "#FF4D4D", color: "#062319", fontWeight: 900, fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", border: "none", cursor: "pointer", boxShadow: "0 0 30px rgba(255, 77, 77, 0.5)" }}>
              INITIALIZE WORK MATRIX →
            </button>
            <button style={{ padding: "1.1rem 2.2rem", border: "1px solid rgba(209, 250, 229, 0.4)", background: "transparent", color: "#D1FAE5", fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", cursor: "pointer" }}>
              SYSTEM ARCHIVES
            </button>
          </div>
        </div>

        {/* HUD Targeting Frame */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "clamp(280px, 32vw, 420px)", aspectRatio: "1 / 1", border: "2px solid #00E676", borderRadius: "1.5rem", padding: "12px", background: "rgba(6, 35, 25, 0.9)", boxShadow: "0 0 40px rgba(0, 230, 118, 0.25)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1rem", overflow: "hidden" }}>
              <Image
                src="/portrait-pro.png"
                alt="Target AV"
                fill
                style={{ objectFit: "cover" }}
              />
              {/* Target Crosshairs */}
              <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "1.5rem", height: "1.5rem", borderTop: "2px solid #FF4D4D", borderRight: "2px solid #FF4D4D" }} />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem", width: "1.5rem", height: "1.5rem", borderBottom: "2px solid #FF4D4D", borderLeft: "2px solid #FF4D4D" }} />
              <div style={{ position: "absolute", bottom: "1rem", right: "1rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#FF4D4D", fontWeight: 700 }}>
                AV_TARGET // LOCKED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "1px solid rgba(255, 77, 77, 0.25)", fontFamily: "JetBrains Mono, monospace", color: "rgba(209, 250, 229, 0.6)" }}>
        <div>[ NODE 02 ] NEW DELHI // GLOBAL RELAY</div>
        <div style={{ color: "#FF4D4D" }}>PINE EMERALD &amp; CORAL VERMILION CHROMA</div>
        <div>SYS_READY 2026</div>
      </footer>
    </div>
  );
}
