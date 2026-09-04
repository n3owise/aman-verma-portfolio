"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function EditorialAtelier() {
  const [time, setTime] = useState("12:00:00 UTC");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-GB", { timeZone: "UTC" }) + " UTC");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="var-screen var-palette-1">
      {/* Background kinetic marquee track */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: 0,
          right: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          opacity: 0.05,
          zIndex: 0,
          transform: "translateY(-50%)",
        }}
      >
        <div style={{ fontSize: "20vw", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em", color: "#FFB703" }}>
          AMAN VERMA • VISUAL ATELIER • BRAND IDENTITY • MOTION DESIGN •
        </div>
      </div>

      {/* Header */}
      <header className="var-header" style={{ borderBottom: "1px solid rgba(255, 183, 3, 0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "#FFB703", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.75rem", color: "#071933" }}>
            AV
          </div>
          <div>
            <div style={{ fontFamily: "Aeonik TRIAL, sans-serif", fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFB703", fontWeight: 700 }}>
              Aman Verma
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "rgba(255, 183, 3, 0.7)" }}>
              VISUAL ATELIER // SOTD 2026
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.8rem", borderRadius: "9999px", background: "rgba(255, 183, 3, 0.1)", border: "1px solid rgba(255, 183, 3, 0.2)", fontSize: "0.7rem", fontFamily: "JetBrains Mono, monospace", color: "#FFB703" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00E676" }} />
            <span>{time}</span>
          </div>
          <button style={{ padding: "0.5rem 1.25rem", borderRadius: "9999px", background: "#FFB703", color: "#071933", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", border: "none", cursor: "pointer" }}>
            LET&apos;S TALK
          </button>
        </div>
      </header>

      {/* Main Stage */}
      <div className="var-stage">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "9999px", background: "rgba(255, 183, 3, 0.12)", border: "1px solid rgba(255, 183, 3, 0.3)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "#FFB703", fontWeight: 700, marginBottom: "1.25rem" }}>
            <span>•</span>
            <span>INDEPENDENT DESIGN PRACTICE</span>
          </div>

          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.92, color: "#E0F2FE", margin: "0 0 1.5rem 0" }}>
            SCULPTING <br />
            <span style={{ fontStyle: "italic", fontFamily: "Instrument Serif, serif", fontWeight: 400, color: "#FFB703" }}>
              UNFORGETTABLE
            </span> <br />
            BRAND WORLDS.
          </h1>

          <p style={{ fontSize: "1.2rem", color: "rgba(224, 242, 254, 0.8)", fontWeight: 300, maxWidth: "540px", lineHeight: 1.6, marginBottom: "2rem" }}>
            Blending classical art direction with generative motion narratives to establish timeless digital landmarks.
          </p>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {["Brand Systems", "Kinetic Motion", "3D Worlds", "Art Direction", "Generative AI"].map((tag) => (
              <span key={tag} style={{ padding: "0.4rem 0.9rem", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 183, 3, 0.2)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "#E0F2FE" }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "9999px", background: "#FFB703", color: "#071933", fontWeight: 800, fontSize: "0.9rem", border: "none", cursor: "pointer", boxShadow: "0 0 35px rgba(255, 183, 3, 0.45)" }}>
              Explore Case Studies (08) →
            </button>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "9999px", border: "1px solid rgba(255, 183, 3, 0.35)", background: "transparent", color: "#E0F2FE", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}>
              Studio Manifesto
            </button>
          </div>
        </div>

        {/* Asymmetric 3D Portrait Card */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "clamp(280px, 32vw, 420px)", aspectRatio: "4 / 5", borderRadius: "2rem", overflow: "hidden", border: "2px solid #FFB703", padding: "8px", background: "rgba(7, 25, 51, 0.7)", boxShadow: "0 25px 60px rgba(7, 25, 51, 0.9), 0 0 40px rgba(255, 183, 3, 0.2)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1.5rem", overflow: "hidden" }}>
              <Image
                src="/portrait-pro.png"
                alt="Aman Verma"
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem", right: "1.2rem", padding: "1rem 1.25rem", borderRadius: "1rem", background: "rgba(7, 25, 51, 0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 183, 3, 0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "Aeonik TRIAL, sans-serif", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB703", fontWeight: 800 }}>
                    Aman Verma
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#E0F2FE", fontWeight: 300 }}>
                    Visual Director &amp; Motion Lead
                  </div>
                </div>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "#FFB703", color: "#071933", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>
                  ↗
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "1px solid rgba(255, 183, 3, 0.18)", fontFamily: "JetBrains Mono, monospace" }}>
        <div>© 2026 AMAN VERMA STUDIO</div>
        <div style={{ color: "#FFB703" }}>SCROLL DOWN TO REVEAL ↓</div>
      </footer>
    </div>
  );
}
