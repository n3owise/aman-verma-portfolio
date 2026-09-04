"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function GenerativeAINeural() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeChip, setActiveChip] = useState("Brand Systems");

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

    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
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

      for (let i = 0; i < nodes.length; i++) {
        const p1 = nodes[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x < 0 || p1.x > w) p1.vx *= -1;
        if (p1.y < 0 || p1.y > h) p1.vy *= -1;

        ctx.fillStyle = "#FF6B00";
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(255, 107, 0, ${1 - dist / 130})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        const mdx = mouseX - p1.x;
        const mdy = mouseY - p1.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 170) {
          ctx.strokeStyle = `rgba(6, 182, 212, ${1 - mdist / 170})`;
          ctx.lineWidth = 0.9;
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
    <div className="var-screen var-palette-10">
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Header */}
      <header className="var-header" style={{ borderBottom: "1px solid rgba(255, 107, 0, 0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "0.6rem", background: "linear-gradient(135deg, #FF6B00, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.8rem", color: "#0C1724", boxShadow: "0 0 16px rgba(255, 107, 0, 0.5)" }}>
            AV
          </div>
          <div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#E0F2FE", fontWeight: 800 }}>
              Aman Verma
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#FF6B00" }}>
              SYNAPSE V4.2 ACTIVE // SOTD 2026
            </div>
          </div>
        </div>

        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", color: "#06B6D4", fontWeight: 700 }}>
          NEURAL PIPELINE: OPTIMAL
        </div>
      </header>

      {/* Main Neural Stage */}
      <div className="var-stage">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "9999px", background: "rgba(255, 107, 0, 0.15)", border: "1px solid rgba(255, 107, 0, 0.4)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "#FF6B00", fontWeight: 800, marginBottom: "1.25rem" }}>
            <span>⚡</span>
            <span>COMPLEMENTARY STEEL &amp; TANGERINE</span>
          </div>

          <h1 style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.9, color: "#E0F2FE", margin: "0 0 1.5rem 0" }}>
            AMPLIFYING <br />
            <span style={{ background: "linear-gradient(90deg, #FF6B00, #06B6D4, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              HUMAN INTELLECT.
            </span>
          </h1>

          <p style={{ fontSize: "1.15rem", color: "rgba(224, 242, 254, 0.85)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Midnight steel navy depth balanced by hyper tangerine energy — bridging cutting-edge Generative AI models with classical art direction.
          </p>

          {/* Interactive Neural Prompt Chips */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {["Brand Systems", "Generative 3D", "Motion Design", "Creative Direction", "Claude Workflows"].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveChip(tag)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontFamily: "JetBrains Mono, monospace",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeChip === tag ? "linear-gradient(90deg, #FF6B00, #06B6D4)" : "rgba(255, 255, 255, 0.06)",
                  border: activeChip === tag ? "none" : "1px solid rgba(255, 107, 0, 0.25)",
                  color: "#ffffff",
                  boxShadow: activeChip === tag ? "0 4px 18px rgba(255, 107, 0, 0.45)" : "none",
                  fontWeight: activeChip === tag ? 800 : 500,
                }}
              >
                /{tag}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", fontWeight: 800 }}>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "0.75rem", background: "linear-gradient(90deg, #FF6B00, #06B6D4)", color: "#0C1724", border: "none", cursor: "pointer", boxShadow: "0 0 35px rgba(255, 107, 0, 0.5)" }}>
              GENERATE COLLABORATION →
            </button>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "0.75rem", border: "1px solid rgba(255, 107, 0, 0.4)", background: "transparent", color: "#E0F2FE", cursor: "pointer" }}>
              INSPECT ARTIFACTS
            </button>
          </div>
        </div>

        {/* Dual AI Avatar Frame */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "clamp(270px, 30vw, 360px)", aspectRatio: "1 / 1", borderRadius: "1.5rem", overflow: "hidden", border: "3px solid #FF6B00", padding: "6px", background: "rgba(12, 23, 36, 0.9)", boxShadow: "0 0 50px rgba(255, 107, 0, 0.4)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1.25rem", overflow: "hidden" }}>
              <Image
                src="/portrait-pro.png"
                alt="Neural Avatar"
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0C1724 0%, transparent 60%)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "1px solid rgba(255, 107, 0, 0.25)", fontFamily: "JetBrains Mono, monospace", color: "rgba(224, 242, 254, 0.6)" }}>
        <div>STEEL &amp; TANGERINE 2026 // AMAN VERMA</div>
        <div style={{ color: "#FF6B00", fontWeight: 700 }}>NEW DELHI, INDIA • AVAILABLE GLOBALLY</div>
      </footer>
    </div>
  );
}
