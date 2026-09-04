"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import Plate from "@/components/Plate";

const FRAMES = [
  {
    id: "reel-01",
    title: "2026 KINETIC SHOWREEL — DIRECTOR CUT",
    video: "/video/reel-main.mp4",
    duration: "00:45",
    main: true,
    desc: "Kinetic typography, brand rhythm, pacing, and 120 FPS web motion studies.",
  },
  {
    id: "reel-02",
    title: "TITLE DESIGN & KINETIC TYPE PASS",
    video: "/video/reel-main.mp4",
    duration: "00:18",
    style: "mesh" as const,
    desc: "Variable font weight interpolation, leading shifts, and spring overshoot choreography.",
  },
  {
    id: "reel-03",
    title: "COLOR GRADE & COMPOSITING PASS",
    video: "/video/reel-main.mp4",
    duration: "00:24",
    style: "halftone" as const,
    desc: "Grain curves, halation balance, and film stock emulation.",
  },
];

export default function MotionReel() {
  const [activeVideo, setActiveVideo] = useState<(typeof FRAMES)[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const handleOpenVideo = (frame: (typeof FRAMES)[0]) => {
    setActiveVideo(frame);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVideo]);

  return (
    <div
      id="motion"
      className="section-stage"
      style={{
        position: "relative",
        height: "145vh",
        backgroundColor: "#101311",
        color: "#FFF8E2",
      }}
    >
      <section
        className="section section--dark"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#101311",
          color: "#FFF8E2",
          overflow: "hidden",
        }}
      >
      {/* Organic Curved Deckle Transition from Act II Cream to Act III Dark */}
      <div
        style={{
          position: "absolute",
          top: "-18px",
          left: 0,
          width: "100%",
          height: "20px",
          zIndex: 10,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 1440 20" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
          <path
            d="M0,0 L1440,0 L1440,8 C1380,14 1320,6 1240,11 C1160,16 1080,7 980,12 C880,17 780,6 680,12 C580,18 480,8 380,13 C280,18 180,6 80,12 L0,8 Z"
            fill="#F4F2EE"
          />
        </svg>
      </div>

      <div className="wrap">
        <div className="sec-head">
          <p className="label" style={{ color: "var(--accent)", marginBottom: "1rem" }}>
            06 — KINETIC MOTION REEL
          </p>
          <TextReveal as="h2" className="display-1">
            Stuff in
            <br />
            motion<span className="accent">.</span>
          </TextReveal>
          <p className="body-copy" style={{ maxWidth: "36ch", color: "var(--muted-dark)", marginTop: "1rem" }}>
            Cuts, title design, and motion pieces where rhythm does the heavy lifting. Muted by default — sound is your call.
          </p>
        </div>

        {/* Video Reel Showcase Grid */}
        <div className="reel-grid" style={{ marginTop: "clamp(2.5rem, 5vh, 4rem)" }}>
          {FRAMES.map((f) => (
            <motion.div
              key={f.id}
              className={`reel-frame ${f.main ? "reel-main" : "reel-side"}`}
              onClick={() => handleOpenVideo(f)}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                cursor: "pointer",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(255, 248, 226, 0.12)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                className="media"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: f.main ? "21/9" : "16/10",
                  backgroundColor: "#000000",
                  overflow: "hidden",
                }}
              >
                {/* Embedded Video Loop Preview for Main Reel */}
                {f.main ? (
                  <video
                    src={f.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.85,
                      filter: "brightness(0.9)",
                    }}
                  />
                ) : (
                  <Plate seed={f.id} style={f.style ?? "mesh"} ratio="16/10" dark label={f.title} />
                )}

                {/* Floating Play Ring Pill */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      width: f.main ? "68px" : "52px",
                      height: f.main ? "68px" : "52px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(20, 22, 21, 0.75)",
                      backdropFilter: "blur(10px)",
                      border: "1.5px solid rgba(255, 232, 98, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFE862",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                      transition: "transform 0.25s ease, background-color 0.25s ease",
                    }}
                  >
                    <span style={{ fontSize: f.main ? "20px" : "16px", marginLeft: "3px" }}>▶</span>
                  </div>
                </div>
              </div>

              {/* Caption Footer */}
              <div
                className="reel-cap label"
                style={{
                  padding: "14px 18px",
                  backgroundColor: "#161917",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid rgba(255, 248, 226, 0.08)",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  color: "#FFF8E2",
                }}
              >
                <span style={{ fontWeight: 600 }}>{f.title}</span>
                <span style={{ color: "#FFE862", fontWeight: 700 }}>{f.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Luxury Full-Screen Video Cinema Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              backgroundColor: "rgba(8, 10, 9, 0.95)",
              backdropFilter: "blur(24px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(1.5rem, 4vw, 3rem)",
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeVideo.title}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "960px",
                width: "100%",
                backgroundColor: "#121513",
                borderRadius: "28px",
                overflow: "hidden",
                border: "1px solid rgba(255, 248, 226, 0.15)",
                boxShadow: "0 35px 70px rgba(0, 0, 0, 0.7)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Cinema Header */}
              <div
                style={{
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255, 248, 226, 0.1)",
                  color: "#FFF8E2",
                }}
              >
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#FFE862", fontWeight: 700 }}>
                    CINEMA PLAYER // 120 FPS
                  </span>
                  <h4 style={{ margin: "2px 0 0 0", fontSize: "1.1rem", fontWeight: 700 }}>
                    {activeVideo.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    backgroundColor: "#FFE862",
                    color: "#141516",
                    border: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Close [ESC]
                </button>
              </div>

              {/* Video Viewport */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", backgroundColor: "#000000" }}>
                <video
                  ref={videoPlayerRef}
                  src={activeVideo.video}
                  autoPlay
                  controls
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              {/* Cinema Footer Description */}
              <div
                style={{
                  padding: "16px 24px",
                  backgroundColor: "#0D0F0E",
                  borderTop: "1px solid rgba(255, 248, 226, 0.08)",
                  fontSize: "0.86rem",
                  color: "rgba(255, 248, 226, 0.75)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{activeVideo.desc}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#FFE862" }}>
                  H.264 // 24FPS
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </section>
    </div>
  );
}
