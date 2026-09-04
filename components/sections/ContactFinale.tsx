"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";
import { socials, site } from "@/data/site";

export default function ContactFinale() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    navigator.clipboard?.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2600);
  };

  return (
    <section
      className="section section--dark section-stage"
      id="contact"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#101311",
        color: "#FFF8E2",
        paddingTop: "clamp(4rem, 8vh, 6rem)",
        paddingBottom: "clamp(4rem, 8vh, 6rem)",
        overflow: "hidden",
      }}
    >
      <div className="wrap">
        <p className="label" style={{ color: "var(--accent)", marginBottom: "1.5rem" }}>
          08 — THE FINALE
        </p>

        <TextReveal as="h2" className="display-1 finale-title" style={{ color: "#FFF8E2" }}>
          Have an idea?
          <br />
          Let&rsquo;s make it{" "}
          <em className="serif-i accent">visible.</em>
        </TextReveal>

        {/* Magnetic Interactive Email CTA */}
        <div style={{ marginTop: "clamp(2rem, 5vh, 4rem)", position: "relative", display: "inline-block" }}>
          <Magnetic strength={0.25}>
            <button
              onClick={handleCopyEmail}
              className="finale-email"
              data-cursor="COPY"
              style={{
                background: "transparent",
                border: "none",
                textAlign: "left",
                padding: 0,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span>{site.email}</span>
              <span
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 2rem)",
                  padding: "8px 18px",
                  borderRadius: "30px",
                  backgroundColor: "#FFE862",
                  color: "#141516",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {copied ? "COPIED! ✓" : "CLICK TO COPY ↗"}
              </span>
            </button>
          </Magnetic>

          {/* Copy Toast Alert */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: "absolute",
                  bottom: "-38px",
                  left: "0",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "#FFE862",
                  letterSpacing: "0.08em",
                }}
              >
                ✓ Email copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3-Column Studio Index Grid */}
        <div
          className="contact-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(2rem, 4vw, 4rem)",
            marginTop: "clamp(3.5rem, 7vh, 6rem)",
            borderTop: "1px solid rgba(255, 248, 226, 0.12)",
            paddingTop: "clamp(2rem, 4vh, 3.5rem)",
          }}
        >
          <div className="contact-col">
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              ELSEWHERE
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      color: "#FFF8E2",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFE862")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF8E2")}
                  >
                    <span>{s.label}</span>
                    <span style={{ fontSize: "12px", opacity: 0.6 }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-col">
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              AVAILABLE FOR
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0 0", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", opacity: 0.85 }}>
              <li>Brand Identity & Dielines</li>
              <li>AI Visual Direction & Compositing</li>
              <li>Kinetic Motion & Title Design</li>
              <li>120 FPS Interactive Web Experiences</li>
            </ul>
          </div>

          <div className="contact-col">
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              STUDIO STATUS
            </h3>
            <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", opacity: 0.85 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#27C93F", boxShadow: "0 0 10px #27C93F" }} />
                <span style={{ color: "#27C93F", fontWeight: 600 }}>Booking Select Q4 2026 Projects</span>
              </div>
              <p style={{ margin: "4px 0 0 0" }}>Based in India (Asia/Kolkata IST)</p>
              <p style={{ margin: 0, opacity: 0.6, fontSize: "13px" }}>Direct replies within 24–48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
