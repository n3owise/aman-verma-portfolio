"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import EditorialAtelier from "@/components/variations/EditorialAtelier";
import CyberpunkMatrix from "@/components/variations/CyberpunkMatrix";
import SnellenbergMinimal from "@/components/variations/SnellenbergMinimal";
import NeoBrutalistBauhaus from "@/components/variations/NeoBrutalistBauhaus";
import LiquidGlassmorphism from "@/components/variations/LiquidGlassmorphism";
import RetroY2KArcade from "@/components/variations/RetroY2KArcade";
import OrganicTerraChroma from "@/components/variations/OrganicTerraChroma";
import TypographicOrbit from "@/components/variations/TypographicOrbit";
import VogueMonolith from "@/components/variations/VogueMonolith";
import GenerativeAINeural from "@/components/variations/GenerativeAINeural";

const VARIATIONS = [
  { id: 1, title: "Sapphire & Marigold", tag: "Complementary Navy", component: EditorialAtelier },
  { id: 2, title: "Pine Emerald & Coral", tag: "Complementary Green", component: CyberpunkMatrix },
  { id: 3, title: "Nordic Moss & Citron", tag: "Analogous Triad", component: SnellenbergMinimal },
  { id: 4, title: "Rust Cacao & Amber", tag: "Analogous Fire", component: NeoBrutalistBauhaus },
  { id: 5, title: "Marine Petrol & Coral", tag: "Complementary Petrol", component: LiquidGlassmorphism },
  { id: 6, title: "Midnight Cobalt & Cyan", tag: "Analogous Blue", component: RetroY2KArcade },
  { id: 7, title: "Earth Olive & Saffron", tag: "Complementary Earth", component: OrganicTerraChroma },
  { id: 8, title: "Bordeaux & Jade", tag: "Complementary Wine", component: TypographicOrbit },
  { id: 9, title: "Ultramarine & Citron", tag: "Electric Complementary", component: VogueMonolith },
  { id: 10, title: "Steel Navy & Tangerine", tag: "Complementary Tech", component: GenerativeAINeural },
];

export default function VariationsPage() {
  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "9") {
        setActiveId(parseInt(e.key, 10));
      } else if (e.key === "0") {
        setActiveId(10);
      } else if (e.key === "ArrowRight") {
        setActiveId((prev) => (prev % 10) + 1);
      } else if (e.key === "ArrowLeft") {
        setActiveId((prev) => (prev === 1 ? 10 : prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const ActiveComponent = VARIATIONS.find((v) => v.id === activeId)?.component || EditorialAtelier;

  return (
    <main style={{ position: "relative", width: "100vw", minHeight: "100vh", overflowX: "hidden", background: "#071933" }}>
      {/* Top Quick Navigation Bar */}
      <div style={{ position: "fixed", top: "1.25rem", left: "1.25rem", zIndex: 99999, display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link
          href="/"
          style={{
            padding: "0.6rem 1.25rem",
            background: "rgba(8, 24, 48, 0.9)",
            color: "#E2F1F8",
            fontSize: "0.75rem",
            fontFamily: "monospace",
            textTransform: "uppercase",
            fontWeight: 700,
            borderRadius: "9999px",
            border: "1px solid rgba(255, 183, 3, 0.4)",
            backdropFilter: "blur(20px)",
            textDecoration: "none",
            boxShadow: "0 10px 30px rgba(4,12,24,0.6)",
          }}
        >
          ← Back to Main Portfolio
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.85rem", background: "rgba(8, 24, 48, 0.8)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "9999px", fontSize: "0.7rem", fontFamily: "monospace", color: "rgba(226, 241, 248, 0.75)" }}>
          <span>Hotkeys:</span>
          <span style={{ padding: "0.15rem 0.4rem", background: "rgba(255, 183, 3, 0.2)", borderRadius: "4px", color: "#FFB703", fontWeight: 700 }}>1–9</span>
          <span style={{ padding: "0.15rem 0.4rem", background: "rgba(255, 183, 3, 0.2)", borderRadius: "4px", color: "#FFB703", fontWeight: 700 }}>0</span>
          <span>or</span>
          <span style={{ padding: "0.15rem 0.4rem", background: "rgba(255, 183, 3, 0.2)", borderRadius: "4px", color: "#FFB703", fontWeight: 700 }}>← →</span>
        </div>
      </div>

      {/* Render Active Animated Variation */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ width: "100%", minHeight: "100vh" }}
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>

      {/* Floating Bottom Variation Dock */}
      <div className="var-dock-container">
        <div className="var-dock-pill">
          {VARIATIONS.map((v) => {
            const isActive = v.id === activeId;
            return (
              <button
                key={v.id}
                onClick={() => setActiveId(v.id)}
                className={`var-dock-btn ${isActive ? "is-active" : ""}`}
              >
                <span className="var-dock-badge">
                  {v.id === 10 ? "0" : v.id}
                </span>
                <span>{v.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
