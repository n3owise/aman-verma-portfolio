"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function LiquidGlassmorphism() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -12, y: x * 12 });
  };

  return (
    <div className="var-screen var-palette-5" onMouseMove={handleMouseMove}>
      {/* Background caustics */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, rgba(255, 111, 89, 0.2), transparent 50%), radial-gradient(circle at 75% 75%, rgba(38, 166, 154, 0.25), transparent 60%)", pointerEvents: "none" }} />

      {/* Header */}
      <header className="var-header" style={{ borderBottom: "1px solid rgba(255, 111, 89, 0.25)", background: "rgba(9, 32, 46, 0.6)", backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "0.7rem", background: "linear-gradient(135deg, #FF6F59, #26A69A)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.8rem", color: "#09202E" }}>
            AV
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#E0F2FE" }}>Aman Verma</div>
            <div style={{ fontSize: "0.65rem", color: "#FF6F59", fontFamily: "JetBrains Mono, monospace" }}>SPATIAL VISUAL ENGINE</div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", color: "#E0F2FE", fontWeight: 500 }}>
          {["Showcase", "Philosophy", "Studio"].map((item) => (
            <span key={item} style={{ cursor: "pointer" }}>{item}</span>
          ))}
        </nav>

        <button style={{ padding: "0.55rem 1.4rem", borderRadius: "9999px", background: "rgba(255, 111, 89, 0.15)", border: "1px solid #FF6F59", color: "#FF6F59", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
          Connect Direct
        </button>
      </header>

      {/* Spatial Stage */}
      <div className="var-stage">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "9999px", background: "rgba(255, 111, 89, 0.15)", border: "1px solid rgba(255, 111, 89, 0.4)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "#FF6F59", marginBottom: "1.25rem" }}>
            <span>•</span>
            <span>Marine Petrol &amp; Coral Papaya Glass</span>
          </div>

          <h1 style={{ fontSize: "clamp(3.2rem, 7.5vw, 7.2rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.88, color: "#E0F2FE", margin: "0 0 1.5rem 0" }}>
            CRAFTING FOR <br />
            <span style={{ background: "linear-gradient(90deg, #FF6F59, #26A69A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              FUTURE
            </span> <br />
            REALMS.
          </h1>

          <p style={{ fontSize: "1.2rem", color: "rgba(224, 242, 254, 0.8)", fontWeight: 300, maxWidth: "520px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Visionary brand identities, fluid 3D spatial motion, and generative interfaces that feel luminous and deeply harmonious.
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "0.85rem", background: "linear-gradient(135deg, #FF6F59, #26A69A)", color: "#09202E", fontWeight: 800, fontSize: "0.9rem", border: "none", cursor: "pointer", boxShadow: "0 10px 30px rgba(255, 111, 89, 0.4)" }}>
              Explore Showcase →
            </button>
            <button style={{ padding: "1.1rem 2.4rem", borderRadius: "0.85rem", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(224, 242, 254, 0.2)", color: "#E0F2FE", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", backdropFilter: "blur(10px)" }}>
              Design Philosophy
            </button>
          </div>
        </div>

        {/* Spatial 3D Glass Slab Card */}
        <div style={{ display: "flex", justifyContent: "center", perspective: "1000px" }}>
          <div
            style={{
              position: "relative",
              width: "clamp(280px, 32vw, 420px)",
              aspectRatio: "1 / 1",
              borderRadius: "2.5rem",
              padding: "16px",
              background: "rgba(16, 59, 84, 0.5)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 111, 89, 0.4)",
              boxShadow: "0 30px 70px rgba(9, 32, 46, 0.8), 0 0 50px rgba(38, 166, 154, 0.2)",
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "2rem", overflow: "hidden" }}>
              <Image
                src="/portrait-pro.png"
                alt="Aman Verma"
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem", right: "1.2rem", padding: "1rem", borderRadius: "1rem", background: "rgba(9, 32, 46, 0.8)", border: "1px solid rgba(255, 111, 89, 0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#E0F2FE" }}>Aman Verma</div>
                  <div style={{ fontSize: "0.7rem", color: "#FF6F59", fontFamily: "JetBrains Mono, monospace" }}>Visual Director</div>
                </div>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#26A69A", boxShadow: "0 0 10px #26A69A" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="var-footer" style={{ borderTop: "1px solid rgba(255, 111, 89, 0.2)", fontFamily: "JetBrains Mono, monospace", color: "rgba(224, 242, 254, 0.6)" }}>
        <div>NEW DELHI • 2026 EDITION</div>
        <div style={{ color: "#FF6F59" }}>PETROL &amp; CORAL COMPLEMENTARY SYSTEM</div>
      </footer>
    </div>
  );
}
