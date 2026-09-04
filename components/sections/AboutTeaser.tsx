"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import portraitImg from "@/public/portrait.png";

const PRINCIPLES = [
  {
    num: "01",
    title: "Brand Identity & Dielines",
    desc: "Rigorous typographic hierarchy, packaging anatomy, bespoke grid systems, and modular design tokens that scale effortlessly.",
  },
  {
    num: "02",
    title: "AI Art Direction & Compositing",
    desc: "Directing generative engines with strict moodboards and prompt systems, followed by meticulous multi-layer hand compositing and color grading in Photoshop.",
  },
  {
    num: "03",
    title: "Kinetic Motion & Interaction",
    desc: "Rhythm, timing, critically damped spring physics, and 120 FPS GPU-composited interaction where motion serves meaning.",
  },
];

export default function AboutTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 0.5, 1], ["20px", "0px", "-20px"]);

  return (
    <div
      id="about-teaser"
      ref={containerRef}
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
      <div className="wrap grid" style={{ alignItems: "center", gap: "clamp(2rem, 5vw, 4rem)" }}>
        {/* Left Column: Tactile Portrait Card with Live Status */}
        <div style={{ gridColumn: "1 / span 5", position: "relative" }}>
          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "380px",
                margin: "0 auto",
                borderRadius: "28px",
                overflow: "hidden",
                backgroundColor: "#16181b",
                border: "1px solid rgba(20, 21, 22, 0.15)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.18)",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", overflow: "hidden" }}>
                <Image
                  src={portraitImg}
                  alt="Aman Verma — Visual Designer"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  style={{ objectFit: "cover" }}
                  priority
                />
                {/* Subtle gradient overlay at bottom */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(16,18,20,0.85) 100%)",
                  }}
                />
              </div>

              {/* Bottom Card Bar */}
              <div
                style={{
                  padding: "16px 20px",
                  backgroundColor: "#141618",
                  color: "#FFF8E2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#FFE862", fontWeight: 700 }}>
                    AMAN VERMA // 2026
                  </span>
                  <p style={{ margin: "2px 0 0 0", fontSize: "12px", opacity: 0.7 }}>
                    Visual & Brand Designer
                  </p>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(39, 201, 63, 0.15)",
                    border: "1px solid rgba(39, 201, 63, 0.4)",
                    color: "#27C93F",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#27C93F" }} />
                  <span>AVAILABLE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Statement & 3 Pillars */}
        <div style={{ gridColumn: "6 / span 7" }}>
          <p className="label" style={{ color: "var(--accent)", marginBottom: "1.2rem" }}>
            04 — ABOUT & CRAFT
          </p>
          <TextReveal as="h2" className="statement" style={{ color: "#141516" }}>
            I design things that make <em className="serif-i accent">ideas visible</em> — then animate,
            direct or engineer whatever else the concept demands.
          </TextReveal>
          <p className="body-copy" style={{ marginTop: "1.4rem", maxWidth: "42ch" }}>
            Working between graphic design, brand identity systems, AI visual direction, and kinetic motion. I focus on creating work that feels thoughtful, balanced, and uncompromising in its typography.
          </p>

          {/* 3 Pillars Grid */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "clamp(2rem, 3.5vh, 3rem)",
            }}
          >
            {PRINCIPLES.map((p, idx) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "16px 20px",
                  borderRadius: "16px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(20, 21, 22, 0.08)",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    paddingTop: "2px",
                  }}
                >
                  {p.num}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans), 'Aeonik TRIAL', sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      margin: 0,
                      color: "#141516",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.84rem",
                      color: "rgba(20, 21, 22, 0.65)",
                      lineHeight: 1.45,
                      margin: "4px 0 0 0",
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);
}
