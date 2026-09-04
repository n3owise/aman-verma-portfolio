"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function NeoBrutalistBauhaus() {
  const [stampActive, setStampActive] = useState(false);

  return (
    <div className="var-screen var-palette-4">
      {/* Header */}
      <header className="var-header" style={{ borderBottom: "4px solid #FFB800" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ padding: "0.4rem 0.8rem", background: "#FFB800", color: "#381A12", fontWeight: 900, fontSize: "0.85rem", border: "2px solid #FF5722" }}>
            AMAN VERMA
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", color: "#FFD8A8", fontWeight: 700 }}>
            VOL. 04 // STAMPED BROADSHEET
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => setStampActive(!stampActive)}
            style={{
              padding: "0.5rem 1.2rem",
              background: stampActive ? "#FF5722" : "#FFB800",
              color: "#381A12",
              fontWeight: 900,
              border: "3px solid #381A12",
              boxShadow: "4px 4px 0px #FF5722",
              cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.75rem",
            }}
          >
            {stampActive ? "★ APPROVED" : "PRESS TO STAMP"}
          </button>
        </div>
      </header>

      {/* Broadsheet Stage */}
      <div className="var-stage">
        <div>
          <div style={{ display: "inline-block", padding: "0.3rem 0.8rem", background: "#FF5722", color: "#FFF8E7", fontWeight: 900, fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", marginBottom: "1.25rem", transform: "rotate(-2deg)" }}>
            ANALOGOUS FIRE // RUST CACAO &amp; AMBER
          </div>

          <h1 style={{ fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.86, color: "#FFF8E7", margin: "0 0 1.5rem 0", textTransform: "uppercase" }}>
            RAW FORM. <br />
            <span style={{ color: "#FFB800", textDecoration: "underline", textDecorationColor: "#FF5722" }}>
              UNFILTERED
            </span> <br />
            IMPACT.
          </h1>

          <p style={{ fontSize: "1.25rem", color: "rgba(255, 248, 231, 0.85)", fontWeight: 400, maxWidth: "540px", lineHeight: 1.5, marginBottom: "2rem", borderLeft: "4px solid #FFB800", paddingLeft: "1rem" }}>
            Stripping away digital pretense. Heavy editorial geometry, high-velocity kinetic typography, and unapologetic physical weight.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{ padding: "1.2rem 2.6rem", background: "#FFB800", color: "#381A12", fontWeight: 900, fontSize: "0.95rem", border: "4px solid #381A12", boxShadow: "6px 6px 0px #FF5722", cursor: "pointer", textTransform: "uppercase" }}>
              EXPLORE WORKS →
            </button>
            <button style={{ padding: "1.2rem 2.6rem", background: "transparent", color: "#FFF8E7", fontWeight: 800, fontSize: "0.95rem", border: "3px solid #FFB800", boxShadow: "4px 4px 0px rgba(255, 184, 0, 0.4)", cursor: "pointer", textTransform: "uppercase" }}>
              READ MANIFESTO
            </button>
          </div>
        </div>

        {/* Physical Stamped Portrait Card */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "clamp(280px, 32vw, 420px)", aspectRatio: "4 / 5", border: "5px solid #FFB800", padding: "10px", background: "#4D261B", boxShadow: "12px 12px 0px #FF5722" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
              <Image
                src="/portrait-pro.png"
                alt="Aman Verma"
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem", padding: "0.75rem 1rem", background: "#FFB800", color: "#381A12", fontWeight: 900, fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", border: "3px solid #381A12", textAlign: "center" }}>
                AV_MMXXVI // PROOF OF CONCEPT
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "4px solid #FFB800", fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: "#FFD8A8" }}>
        <div>BROADSHEET STAMPED // 2026 EDITION</div>
        <div style={{ color: "#FFB800" }}>RUST CACAO + MOLTEN SOLAR AMBER</div>
      </footer>
    </div>
  );
}
