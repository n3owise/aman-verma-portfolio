"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import { tools } from "@/data/tools";

export default function ToolsWall() {
  const [active, setActive] = useState(0);

  return (
    <div
      id="tools"
      className="section-stage"
      style={{
        position: "relative",
        height: "140vh",
        backgroundColor: "#F4F2EE",
        color: "#141516",
      }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#F4F2EE",
          color: "#141516",
          overflow: "hidden",
        }}
      >
        <div className="wrap">
          <div className="sec-head">
            <p className="label" style={{ color: "var(--accent)", marginBottom: "1rem" }}>
              05 — THE WORKFLOW STACK
            </p>
            <TextReveal as="h2" className="display-1">
              Tools are not
              <br />
              the point<span className="accent">.</span>
            </TextReveal>
            <p className="body-copy" style={{ maxWidth: "36ch", marginTop: "1rem" }}>
              Software changes continuously. Taste and craft don’t. Here is how each tool is directed in my daily workflow.
            </p>
          </div>

          {/* Studio Beliefs Pill Banner */}
          <div
            style={{
              marginBlock: "clamp(1.5rem, 3vh, 2.5rem)",
              padding: "0.85rem 1.4rem",
              borderRadius: "20px",
              backgroundColor: "rgba(20, 21, 22, 0.04)",
              border: "1px solid rgba(20, 21, 22, 0.08)",
              display: "flex",
              flexWrap: "wrap",
              gap: "1.2rem",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              color: "rgba(20, 21, 22, 0.7)",
            }}
          >
            <span>✦ IDEAS FIRST</span>
            <span>✦ TOOLS SECOND</span>
            <span>✦ TASTE ALWAYS</span>
            <span>✦ GRID DISCIPLINE</span>
            <span>✦ MOTION IS MEANING</span>
          </div>

          {/* Interactive 8-Card Tool Stack Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "16px",
              marginTop: "1rem",
            }}
            role="tablist"
            aria-label="Design Tools"
          >
            {tools.map((t, i) => {
              const isSelected = i === active;
              return (
                <motion.div
                  key={t.name}
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "18px 20px",
                    borderRadius: "20px",
                    backgroundColor: isSelected ? "#141516" : "#ffffff",
                    color: isSelected ? "#F4F2EE" : "#141516",
                    border: isSelected ? "1px solid #141516" : "1px solid rgba(20, 21, 22, 0.08)",
                    boxShadow: isSelected
                      ? "0 16px 36px rgba(0, 0, 0, 0.16)"
                      : "0 4px 16px rgba(0, 0, 0, 0.03)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "135px",
                    transition: "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "6px",
                        backgroundColor: isSelected ? "#FFE862" : "rgba(20, 21, 22, 0.06)",
                        color: isSelected ? "#141516" : "#141516",
                      }}
                    >
                      {t.short}
                    </span>
                    <span style={{ fontSize: "0.8rem", opacity: isSelected ? 0.8 : 0.4 }}>
                      {isSelected ? "● ACTIVE" : "○"}
                    </span>
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-sans), 'Aeonik TRIAL', sans-serif",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        margin: "10px 0 4px 0",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {t.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        lineHeight: 1.4,
                        color: isSelected ? "rgba(244, 242, 238, 0.8)" : "rgba(20, 21, 22, 0.65)",
                        margin: 0,
                      }}
                    >
                      {t.note}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
