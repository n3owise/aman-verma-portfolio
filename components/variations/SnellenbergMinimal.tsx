"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SnellenbergMinimal() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="var-screen var-palette-3">
      {/* Header */}
      <header className="var-header" style={{ borderBottom: "1px solid rgba(204, 255, 0, 0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "#CCFF00", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.75rem", color: "#132D20" }}>
            AV
          </div>
          <div>
            <div style={{ fontFamily: "Aeonik TRIAL, sans-serif", fontSize: "0.9rem", color: "#F0FDF4", fontWeight: 700, letterSpacing: "0.08em" }}>
              AMAN VERMA
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#CCFF00" }}>
              DESIGN DIRECTOR &amp; 3D MOTION
            </div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: "1.5rem", fontSize: "0.85rem", fontWeight: 600, color: "#F0FDF4" }}>
          {["Work", "Manifesto", "Services", "Archive"].map((item) => (
            <span key={item} style={{ cursor: "pointer" }}>{item}</span>
          ))}
        </nav>

        <button style={{ padding: "0.5rem 1.4rem", borderRadius: "9999px", background: "#CCFF00", color: "#132D20", fontWeight: 800, fontSize: "0.8rem", border: "none", cursor: "pointer" }}>
          GET IN TOUCH
        </button>
      </header>

      {/* Main Poster Stage */}
      <div className="var-stage">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "9999px", background: "rgba(204, 255, 0, 0.15)", border: "1px solid rgba(204, 255, 0, 0.3)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "#CCFF00", fontWeight: 700, marginBottom: "1.25rem" }}>
            <span>01 / 10</span>
            <span>NORDIC MOSS &amp; CITRON LIME</span>
          </div>

          <h1 style={{ fontSize: "clamp(3.2rem, 7.5vw, 7rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.88, color: "#F0FDF4", margin: "0 0 1.5rem 0" }}>
            CREATING <br />
            <span style={{ color: "#CCFF00" }}>HIGH-TENSION</span> <br />
            BRAND CRAFT.
          </h1>

          <p style={{ fontSize: "1.2rem", color: "rgba(240, 253, 244, 0.8)", fontWeight: 300, maxWidth: "520px", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Deep forest stillness combined with sharp neon focus. Crafting digital products and kinetic design systems.
          </p>

          {/* Interactive Category Filter Chips */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {["All", "Brand Systems", "3D Motion", "Creative Direction", "AI Art"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontFamily: "JetBrains Mono, monospace",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: filter === cat ? "#CCFF00" : "rgba(255, 255, 255, 0.05)",
                  color: filter === cat ? "#132D20" : "#F0FDF4",
                  border: filter === cat ? "none" : "1px solid rgba(204, 255, 0, 0.2)",
                  fontWeight: filter === cat ? 800 : 500,
                }}
              >
                /{cat}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "9999px", background: "#CCFF00", color: "#132D20", fontWeight: 800, fontSize: "0.9rem", border: "none", cursor: "pointer", boxShadow: "0 0 35px rgba(204, 255, 0, 0.4)" }}>
              View Projects ({filter}) →
            </button>
          </div>
        </div>

        {/* Minimal Swiss Portrait Frame */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "clamp(280px, 32vw, 420px)", aspectRatio: "3 / 4", borderRadius: "2rem", overflow: "hidden", border: "2px solid #CCFF00", padding: "6px", background: "rgba(19, 45, 32, 0.8)", boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 35px rgba(204, 255, 0, 0.25)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1.6rem", overflow: "hidden" }}>
              <Image
                src="/portrait-pro.png"
                alt="Aman Verma"
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem", padding: "0.6rem 1.1rem", borderRadius: "9999px", background: "rgba(19, 45, 32, 0.9)", border: "1px solid #CCFF00", color: "#CCFF00", fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", fontWeight: 800 }}>
                FIG. 2026 // AMAN VERMA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "1px solid rgba(204, 255, 0, 0.2)", fontFamily: "JetBrains Mono, monospace", color: "rgba(240, 253, 244, 0.6)" }}>
        <div>ANALOGOUS FOREST TRIAD // NORDIC MOSS</div>
        <div style={{ color: "#CCFF00" }}>AVAILABLE FOR SELECT COMMISSIONS</div>
      </footer>
    </div>
  );
}
