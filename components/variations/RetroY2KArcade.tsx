"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function RetroY2KArcade() {
  const [score, setScore] = useState(2600);

  return (
    <div className="var-screen var-palette-6">
      {/* CRT Scanline Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)", backgroundSize: "100% 4px", pointerEvents: "none", zIndex: 10, opacity: 0.6 }} />

      {/* Header */}
      <header className="var-header" style={{ borderBottom: "2px solid #00F0FF", zIndex: 11 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ padding: "0.3rem 0.6rem", background: "#00F0FF", color: "#081530", fontWeight: 900, fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem" }}>
            P1_READY
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", color: "#00F0FF", letterSpacing: "0.15em", fontWeight: 800 }}>
            AMAN_VERMA.EXE
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem", fontFamily: "JetBrains Mono, monospace" }}>
          <div style={{ color: "#E0F2FE", fontSize: "0.8rem" }}>
            SCORE: <span style={{ color: "#00F0FF", fontWeight: 900 }}>{score}</span>
          </div>
          <button
            onClick={() => setScore((s) => s + 100)}
            style={{ padding: "0.4rem 1rem", background: "#00F0FF", color: "#081530", fontWeight: 900, fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", border: "none", cursor: "pointer", boxShadow: "0 0 15px rgba(0, 240, 255, 0.6)" }}
          >
            INSERT COIN (+100)
          </button>
        </div>
      </header>

      {/* Arcade Stage */}
      <div className="var-stage" style={{ zIndex: 11 }}>
        <div>
          <div style={{ display: "inline-block", padding: "0.3rem 0.8rem", background: "rgba(0, 240, 255, 0.15)", border: "1px solid #00F0FF", color: "#00F0FF", fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", marginBottom: "1.25rem" }}>
            ARCADE RIG // MIDNIGHT COBALT &amp; LASER CYAN
          </div>

          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, color: "#E0F2FE", margin: "0 0 1.5rem 0", textTransform: "uppercase" }}>
            LEVEL UP <br />
            <span style={{ color: "#00F0FF", textShadow: "0 0 25px rgba(0, 240, 255, 0.7)" }}>
              DIGITAL WORLDS.
            </span>
          </h1>

          <p style={{ fontSize: "1.2rem", color: "rgba(224, 242, 254, 0.85)", fontFamily: "JetBrains Mono, monospace", maxWidth: "520px", lineHeight: 1.6, marginBottom: "2rem" }}>
            High-octane 3D motion, kinetic brand identities, and playful retro-futuristic web systems.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{ padding: "1.1rem 2.4rem", background: "#00F0FF", color: "#081530", fontWeight: 900, fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", border: "none", cursor: "pointer", boxShadow: "0 0 35px rgba(0, 240, 255, 0.6)" }}>
              START GAME (VIEW WORK) →
            </button>
            <button style={{ padding: "1.1rem 2.4rem", border: "1px solid #00F0FF", background: "transparent", color: "#00F0FF", fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", cursor: "pointer" }}>
              HIGH SCORES
            </button>
          </div>
        </div>

        {/* 8-Bit Pixel Frame */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "clamp(280px, 32vw, 420px)", aspectRatio: "1 / 1", border: "4px solid #00F0FF", padding: "8px", background: "#0F2A66", boxShadow: "0 0 45px rgba(0, 240, 255, 0.4)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
              <Image
                src="/portrait-pro.png"
                alt="Aman Verma Arcade"
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", top: "1rem", left: "1rem", padding: "0.4rem 0.8rem", background: "#081530", border: "1px solid #00F0FF", color: "#00F0FF", fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", fontWeight: 900 }}>
                100% HEALTH
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "2px solid #00F0FF", fontFamily: "JetBrains Mono, monospace", color: "#00F0FF", zIndex: 11 }}>
        <div>PRESS ANY KEY TO PLAY</div>
        <div>ANALOGOUS BLUE ARC // 2026</div>
      </footer>
    </div>
  );
}
