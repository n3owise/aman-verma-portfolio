"use client";

import React from "react";
import Image from "next/image";

export default function TypographicOrbit() {
  return (
    <div className="var-screen var-palette-8">
      {/* Header */}
      <header className="var-header" style={{ borderBottom: "1px solid rgba(0, 230, 118, 0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", background: "#00E676", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.8rem", color: "#300612" }}>
            AV
          </div>
          <div>
            <div style={{ fontFamily: "Aeonik TRIAL, sans-serif", fontSize: "0.9rem", color: "#FCE4EC", fontWeight: 700 }}>
              AMAN VERMA
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#00E676" }}>
              ORBITAL CORE // SOTD 2026
            </div>
          </div>
        </div>

        <button style={{ padding: "0.5rem 1.4rem", borderRadius: "9999px", background: "#00E676", color: "#300612", fontWeight: 800, fontSize: "0.8rem", border: "none", cursor: "pointer" }}>
          COMMISSION WORK
        </button>
      </header>

      {/* Orbital Stage */}
      <div className="var-stage">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "9999px", background: "rgba(0, 230, 118, 0.15)", border: "1px solid rgba(0, 230, 118, 0.4)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "#00E676", marginBottom: "1.25rem" }}>
            <span>🪐</span>
            <span>BORDEAUX &amp; RADIANT JADE</span>
          </div>

          <h1 style={{ fontSize: "clamp(3.2rem, 7.5vw, 7.2rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.88, color: "#FCE4EC", margin: "0 0 1.5rem 0" }}>
            GRAVITATIONAL <br />
            <span style={{ color: "#00E676" }}>CREATIVE</span> <br />
            FORCE.
          </h1>

          <p style={{ fontSize: "1.2rem", color: "rgba(252, 228, 236, 0.8)", fontWeight: 300, maxWidth: "520px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Imperial bordeaux velvet paired with electric radiant jade. Designing celestial brand architectures and 3D kinetic systems.
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "9999px", background: "#00E676", color: "#300612", fontWeight: 800, fontSize: "0.9rem", border: "none", cursor: "pointer", boxShadow: "0 0 35px rgba(0, 230, 118, 0.45)" }}>
              Orbit Projects →
            </button>
          </div>
        </div>

        {/* 3D Orbiting Centerpiece */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "relative", width: "clamp(280px, 32vw, 420px)", aspectRatio: "1 / 1" }}>
            {/* Outer Orbit Ring */}
            <div style={{ position: "absolute", inset: "-20px", border: "2px dashed rgba(0, 230, 118, 0.35)", borderRadius: "50%", pointerEvents: "none" }} />
            {/* Inner Ring */}
            <div style={{ position: "absolute", inset: "-40px", border: "1px solid rgba(252, 228, 236, 0.15)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "4px solid #00E676", padding: "6px", background: "#4A0E1F", boxShadow: "0 0 50px rgba(0, 230, 118, 0.35)" }}>
              <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
                <Image
                  src="/portrait-pro.png"
                  alt="Aman Verma Orbit"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "1px solid rgba(0, 230, 118, 0.25)", fontFamily: "JetBrains Mono, monospace", color: "rgba(252, 228, 236, 0.6)" }}>
        <div>ORBITAL SYSTEMS // 2026</div>
        <div style={{ color: "#00E676" }}>WINE &amp; JADE COMPLEMENTARY CHROMA</div>
      </footer>
    </div>
  );
}
