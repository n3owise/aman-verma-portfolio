"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lenisStore } from "@/lib/lenis-store";
import { site, socials } from "@/data/site";

const NAV_ITEMS = [
  { num: "01", label: "Hero & Identity", target: "#hero" },
  { num: "02", label: "Portrait Stage", target: "#portrait-stage" },
  { num: "03", label: "Selected Work", target: "#work" },
  { num: "04", label: "Work Samples", target: "#graphic-work" },
];

function DrawerTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time || "12:00:00"} IST</span>;
}

export default function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onToggle = () => setIsOpen((prev) => !prev);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("av-open-menu", onOpen);
    window.addEventListener("av-close-menu", onClose);
    window.addEventListener("av-toggle-menu", onToggle);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("av-open-menu", onOpen);
      window.removeEventListener("av-close-menu", onClose);
      window.removeEventListener("av-toggle-menu", onToggle);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleNavigate = (targetSelector: string) => {
    setIsOpen(false);
    if (targetSelector.startsWith("/")) {
      window.location.href = targetSelector;
      return;
    }
    setTimeout(() => {
      const el = document.querySelector(targetSelector) as HTMLElement;
      if (!el) {
        window.location.href = "/" + targetSelector;
        return;
      }
      if (lenisStore.current) {
        lenisStore.current.scrollTo(el, { duration: 1.4, offset: -20 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 320);
  };

  return (
    <>
      {/* Floating Bottom Pill Menu (Globally Accessible across All Chapters) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: "clamp(20px, 4vh, 32px)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 900,
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={() => setIsOpen(true)}
              data-cursor="MENU"
              aria-label="Open Navigation Menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                borderRadius: "30px",
                backgroundColor: "#FFE862",
                color: "#141516",
                fontFamily: "'Aeonik TRIAL', var(--font-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                border: "1px solid rgba(209, 187, 59, 0.5)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.16)",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06)";
                e.currentTarget.style.boxShadow = "0 14px 30px rgba(255, 232, 98, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.16)";
              }}
            >
              <span>Menu</span>
              <span style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1 }}>＝</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Navigation Index Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="drawer-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(10, 12, 11, 0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "clamp(1.5rem, 4vh, 3.5rem) clamp(1.5rem, 5vw, 4.5rem)",
              color: "#FFF8E2",
            }}
          >
            {/* Top Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255, 248, 226, 0.12)",
                paddingBottom: "1.2rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.18em",
                    color: "#FFE862",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  NAVIGATION INDEX // 2026
                </span>
                <p style={{ margin: "2px 0 0 0", fontSize: "0.85rem", opacity: 0.6 }}>
                  Aman Verma — Visual Designer & AI Director
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                data-cursor="CLOSE"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 20px",
                  borderRadius: "30px",
                  backgroundColor: "#FFE862",
                  color: "#141516",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 20px rgba(255, 232, 98, 0.25)",
                }}
              >
                <span>CLOSE [ESC]</span>
                <span>✕</span>
              </button>
            </div>

            {/* Main Links Grid */}
            <nav
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "clamp(1rem, 2.5vh, 2rem) clamp(1.5rem, 4vw, 3rem)",
                marginBlock: "auto",
                paddingBlock: "2rem",
              }}
            >
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.num}
                  onClick={() => handleNavigate(item.target)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    padding: "0.8rem 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1.2rem",
                    borderBottom: "1px solid rgba(255, 248, 226, 0.08)",
                    color: "#FFF8E2",
                    transition: "all 0.25s ease",
                  }}
                  whileHover={{ x: 8, color: "#FFE862" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      color: "#E05414",
                      fontWeight: 700,
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans), 'Aeonik TRIAL', sans-serif",
                      fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Footer Metadata */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
                borderTop: "1px solid rgba(255, 248, 226, 0.12)",
                paddingTop: "1.2rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "rgba(255, 248, 226, 0.65)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#27C93F",
                    boxShadow: "0 0 8px #27C93F",
                  }}
                />
                <span>STUDIO: AVAILABLE FOR Q4 WORK</span>
              </div>

              <div>
                <DrawerTime />
              </div>

              <div style={{ display: "flex", gap: "1.2rem" }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ color: "#FFE862", textDecoration: "none" }}
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
