"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function VogueMonolith() {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  return (
    <div
      className="var-screen var-palette-9"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255, 234, 0, 0.12), transparent 45%), #09176B`,
      }}
    >
      {/* Header */}
      <header className="var-header" style={{ borderBottom: "1px solid rgba(255, 234, 0, 0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontFamily: "Instrument Serif, serif", fontSize: "1.4rem", color: "#FFEA00", fontStyle: "italic" }}>
            Aman Verma
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#E3F2FD" }}>
            EDITION N° 2026 // HAUTE COUTURE
          </div>
        </div>

        <button style={{ padding: "0.5rem 1.4rem", borderRadius: "9999px", background: "#FFEA00", color: "#09176B", fontWeight: 800, fontSize: "0.8rem", border: "none", cursor: "pointer" }}>
          PRIVATE INQUIRY
        </button>
      </header>

      {/* Runway Monolith Stage */}
      <div className="var-stage">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "9999px", background: "rgba(255, 234, 0, 0.15)", border: "1px solid rgba(255, 234, 0, 0.35)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "#FFEA00", marginBottom: "1.25rem" }}>
            <span>★</span>
            <span>ULTRAMARINE &amp; SOLAR CITRON</span>
          </div>

          <h1 style={{ fontSize: "clamp(3.5rem, 8vw, 7.8rem)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 0.88, color: "#E3F2FD", margin: "0 0 1.5rem 0", fontFamily: "Instrument Serif, serif" }}>
            Monumental <br />
            <span style={{ color: "#FFEA00", fontStyle: "italic" }}>
              Aesthetic
            </span> <br />
            Presence.
          </h1>

          <p style={{ fontSize: "1.2rem", color: "rgba(227, 242, 253, 0.85)", fontWeight: 300, maxWidth: "520px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Yves Klein electric ultramarine illuminated by solar citron light. Sculpting high-fashion editorial digital landmarks.
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "9999px", background: "#FFEA00", color: "#09176B", fontWeight: 800, fontSize: "0.9rem", border: "none", cursor: "pointer", boxShadow: "0 10px 35px rgba(255, 234, 0, 0.4)" }}>
              View Haute Works →
            </button>
          </div>
        </div>

        {/* Monolith Portrait Sizing */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "clamp(280px, 32vw, 420px)", aspectRatio: "3 / 4", borderRadius: "2rem", overflow: "hidden", border: "3px solid #FFEA00", padding: "6px", background: "#132799", boxShadow: "0 30px 70px rgba(9, 23, 107, 0.9)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1.6rem", overflow: "hidden" }}>
              <Image
                src="/portrait-pro.png"
                alt="Aman Verma Monolith"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "1px solid rgba(255, 234, 0, 0.2)", fontFamily: "JetBrains Mono, monospace", color: "rgba(227, 242, 253, 0.6)" }}>
        <div>YVES KLEIN ULTRAMARINE // 2026</div>
        <div style={{ color: "#FFEA00" }}>HIGH-CONTRAST COMPLEMENTARY COUTURE</div>
      </footer>
    </div>
  );
}
