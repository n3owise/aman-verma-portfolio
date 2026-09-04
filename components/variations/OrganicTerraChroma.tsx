"use client";

import React from "react";
import Image from "next/image";

export default function OrganicTerraChroma() {
  return (
    <div className="var-screen var-palette-7">
      {/* Header */}
      <header className="var-header" style={{ borderBottom: "1px solid rgba(221, 161, 94, 0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", background: "#DDA15E", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", color: "#1F2B12" }}>
            AV
          </div>
          <div>
            <div style={{ fontFamily: "Instrument Serif, serif", fontSize: "1.1rem", color: "#FEFAE0", fontStyle: "italic" }}>
              Aman Verma
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#DDA15E" }}>
              ORGANIC VISUAL BOTANICA
            </div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", color: "#FEFAE0", fontWeight: 400 }}>
          {["Works", "Ecosystem", "Craft", "Journal"].map((item) => (
            <span key={item} style={{ cursor: "pointer" }}>{item}</span>
          ))}
        </nav>

        <button style={{ padding: "0.5rem 1.4rem", borderRadius: "9999px", background: "#DDA15E", color: "#1F2B12", fontWeight: 700, fontSize: "0.8rem", border: "none", cursor: "pointer" }}>
          Inquire Direct
        </button>
      </header>

      {/* Main Organic Stage */}
      <div className="var-stage">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "9999px", background: "rgba(221, 161, 94, 0.15)", border: "1px solid rgba(221, 161, 94, 0.35)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "#DDA15E", marginBottom: "1.25rem" }}>
            <span>🌿</span>
            <span>EARTH OLIVE &amp; SUN SAFFRON</span>
          </div>

          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6.8rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 0.92, color: "#FEFAE0", margin: "0 0 1.5rem 0", fontFamily: "Instrument Serif, serif" }}>
            Cultivating <br />
            <span style={{ color: "#DDA15E", fontStyle: "italic" }}>
              Symbiotic Visuals
            </span> <br />
            &amp; Living Brands.
          </h1>

          <p style={{ fontSize: "1.2rem", color: "rgba(254, 250, 224, 0.85)", fontWeight: 300, maxWidth: "520px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Rooted in organic earth harmonies. Merging sensory art direction with fluid digital motion to grow authentic identities.
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "9999px", background: "#DDA15E", color: "#1F2B12", fontWeight: 800, fontSize: "0.9rem", border: "none", cursor: "pointer", boxShadow: "0 10px 30px rgba(221, 161, 94, 0.35)" }}>
              Explore Living Works →
            </button>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "9999px", border: "1px solid rgba(221, 161, 94, 0.4)", background: "transparent", color: "#FEFAE0", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>
              Studio Manifesto
            </button>
          </div>
        </div>

        {/* Morphing SVG Droplet Frame */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "clamp(280px, 32vw, 420px)", aspectRatio: "1 / 1", borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%", overflow: "hidden", border: "3px solid #DDA15E", padding: "6px", background: "#30401E", boxShadow: "0 25px 60px rgba(31, 43, 18, 0.8)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "inherit", overflow: "hidden" }}>
              <Image
                src="/portrait-pro.png"
                alt="Aman Verma"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "1px solid rgba(221, 161, 94, 0.25)", fontFamily: "JetBrains Mono, monospace", color: "rgba(254, 250, 224, 0.6)" }}>
        <div>EARTH BOTANICA // 2026</div>
        <div style={{ color: "#DDA15E" }}>NEW DELHI • ROOTED GLOBALLY</div>
      </footer>
    </div>
  );
}
