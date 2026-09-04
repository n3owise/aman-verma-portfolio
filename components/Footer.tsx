"use client";

import { useEffect, useState } from "react";
import { lenisStore } from "@/lib/lenis-store";
import { socials } from "@/data/site";
import Magnetic from "@/components/Magnetic";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span>{time || "12:00:00"} IST</span>;
}

export default function Footer() {
  const scrollToTop = () => {
    if (lenisStore.current) {
      lenisStore.current.scrollTo(0, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        position: "relative",
        backgroundColor: "#0d0f0e",
        color: "#FFF8E2",
        borderTop: "1px solid rgba(255, 248, 226, 0.12)",
        paddingTop: "clamp(4rem, 8vh, 6rem)",
        paddingBottom: "clamp(2.5rem, 5vh, 4rem)",
        overflow: "hidden",
        zIndex: 10,
      }}
      aria-label="Site Colophon & Footer"
    >
      <div className="wrap">
        {/* Top Massive Signature Display */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            marginBottom: "clamp(3rem, 6vh, 5rem)",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                color: "var(--accent)",
                textTransform: "uppercase",
                fontWeight: 700,
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              COLOPHON // 2026
            </span>
            <h2
              style={{
                fontFamily: "'Aeonik TRIAL', var(--font-sans), sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                margin: 0,
                color: "#FFFFFF",
                textTransform: "uppercase",
              }}
            >
              AMAN VERMA<span style={{ color: "var(--accent)" }}>.</span>
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.25rem)",
                color: "rgba(255, 248, 226, 0.7)",
                margin: "0.75rem 0 0 0",
                maxWidth: "36ch",
              }}
            >
              Visual Designer, AI Art Director & Video Editor based in India.
            </p>
          </div>

          {/* Magnetic Back to Top Button */}
          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              aria-label="Scroll to top of page"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "9999px",
                backgroundColor: "#FFE862",
                color: "#141516",
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(255, 232, 98, 0.22)",
                transition: "transform 0.25s ease, background-color 0.25s ease",
              }}
            >
              <span>BACK TO TOP</span>
              <span style={{ fontSize: "16px", fontWeight: 900 }}>↑</span>
            </button>
          </Magnetic>
        </div>

        {/* Middle Metadata & Quick Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(2rem, 4vw, 3.5rem)",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255, 248, 226, 0.08)",
          }}
        >
          {/* Col 1: Studio Status & Time */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: "rgba(255, 248, 226, 0.5)",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              STUDIO STATUS
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#27C93F",
                  boxShadow: "0 0 10px #27C93F",
                }}
              />
              <span style={{ fontSize: "0.88rem", color: "#FFFFFF", fontWeight: 600 }}>
                Available for Select Q4 Projects
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "rgba(255, 248, 226, 0.6)", margin: 0 }}>
              Local Time: <LiveClock />
            </p>
          </div>

          {/* Col 2: Socials */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: "rgba(255, 248, 226, 0.5)",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              NETWORK
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    fontSize: "0.86rem",
                    color: "#FFF8E2",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFE862")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF8E2")}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Colophon Specs */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: "rgba(255, 248, 226, 0.5)",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              CRAFT STACK
            </h3>
            <p style={{ fontSize: "0.82rem", color: "rgba(255, 248, 226, 0.65)", margin: 0, lineHeight: 1.5 }}>
              Engineered with Next.js 15, Framer Motion, GSAP, Lenis Smooth Scroll, TypeScript & 120 FPS Composited Transforms.
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "clamp(2.5rem, 5vh, 4rem)",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255, 248, 226, 0.08)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.74rem",
            color: "rgba(255, 248, 226, 0.45)",
          }}
        >
          <span>© 2026 AMAN VERMA. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED & DIRECTED WITH INTENTION.</span>
        </div>
      </div>
    </footer>
  );
}
