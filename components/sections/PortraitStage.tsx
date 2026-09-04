"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import portraitImg from "@/public/portrait.png";

import { lenisStore } from "@/lib/lenis-store";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function PortraitStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (!el) return;
    if (lenisStore.current) {
      lenisStore.current.scrollTo(el, { duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Trigger entrance animation once when scrolled into view (NO OUT ANIMATION)
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.18,
  });

  // Interactive 3D cursor micro-parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 140, damping: 22 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 140, damping: 22 });

  const portraitTiltX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const portraitTiltY = useTransform(smoothMouseY, [-1, 1], [6, -6]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    const ny = (e.clientY - rect.top) / rect.height * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="portrait-stage"
      className="section-stage"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundColor: "#FFE862",
        zIndex: 20,
      }}
    >
      {/* 100vh Viewport Screen */}
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#FFE862",
        }}
      >
        {/* Seamless Transition Gradient at Top Edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to bottom, #f7f1ed 0%, rgba(255, 232, 98, 0) 100%)",
            pointerEvents: "none",
            zIndex: 6,
          }}
          aria-hidden="true"
        />

        {/* Halftone Dot Matrix Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(rgba(20, 21, 22, 0.13) 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
            pointerEvents: "none",
            zIndex: 1,
          }}
          aria-hidden="true"
        />

        {/* Continuous 5% Margin Framing Lines (Connecting seamlessly from Home Screen) */}
        <div
          style={{
            position: "absolute",
            left: "5%",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "rgba(20, 21, 22, 0.16)",
            zIndex: 3,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "rgba(20, 21, 22, 0.16)",
            zIndex: 3,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {/* Center Cutout Portrait (Animates IN once with rising momentum and stays) */}
        <motion.div
          style={{
            position: "relative",
            width: "clamp(310px, 44vw, 560px)",
            height: "clamp(460px, 76vh, 760px)",
            zIndex: 4,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            x: portraitTiltX,
            y: portraitTiltY,
          }}
          initial={{ y: 130, opacity: 0, scale: 0.92 }}
          animate={
            isInView
              ? { y: 0, opacity: 1, scale: 1 }
              : { y: 130, opacity: 0, scale: 0.92 }
          }
          transition={{ duration: 1.05, delay: 0.1, ease: EASE_OUT }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={portraitImg}
              alt="Aman Verma Portrait"
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              priority
              style={{
                objectFit: "contain",
                objectPosition: "bottom center",
                pointerEvents: "none",
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))",
              }}
            />
          </div>
        </motion.div>

        {/* 3 Floating Dark Pill Badges (Animate IN once with staggered spring and stay) */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(48px, 10vh, 88px)",
            left: 0,
            right: 0,
            zIndex: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 clamp(1.5rem, 7vw, 7rem)",
            pointerEvents: "none",
          }}
        >
          {/* Left Badge: Brand Designer */}
          <motion.div
            initial={{ x: -70, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -70, opacity: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: EASE_OUT }}
          >
            <motion.div
              onClick={scrollToWork}
              data-cursor="WORK"
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "clamp(9px, 1.4vh, 13px) clamp(18px, 2.2vw, 28px)",
                borderRadius: "36px",
                backgroundColor: "#141516",
                color: "#FFFFFF",
                fontFamily: "'Aeonik TRIAL', var(--font-sans), sans-serif",
                fontSize: "clamp(12px, 1.2vw, 15px)",
                fontWeight: 600,
                boxShadow: "0 12px 28px rgba(0, 0, 0, 0.28)",
                pointerEvents: "auto",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              Brand Designer
            </motion.div>
          </motion.div>

          {/* Center Badge: Web Designer (Over collar/chest) */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.85, delay: 0.48, ease: EASE_OUT }}
          >
            <motion.div
              onClick={scrollToWork}
              data-cursor="WORK"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "clamp(9px, 1.4vh, 13px) clamp(18px, 2.2vw, 28px)",
                borderRadius: "36px",
                backgroundColor: "#141516",
                color: "#FFFFFF",
                fontFamily: "'Aeonik TRIAL', var(--font-sans), sans-serif",
                fontSize: "clamp(12px, 1.2vw, 15px)",
                fontWeight: 600,
                boxShadow: "0 12px 28px rgba(0, 0, 0, 0.28)",
                pointerEvents: "auto",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              Web Designer
            </motion.div>
          </motion.div>

          {/* Right Badge: Product Designer */}
          <motion.div
            initial={{ x: 70, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 70, opacity: 0 }}
            transition={{ duration: 0.85, delay: 0.62, ease: EASE_OUT }}
          >
            <motion.div
              onClick={scrollToWork}
              data-cursor="WORK"
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "clamp(9px, 1.4vh, 13px) clamp(18px, 2.2vw, 28px)",
                borderRadius: "36px",
                backgroundColor: "#141516",
                color: "#FFFFFF",
                fontFamily: "'Aeonik TRIAL', var(--font-sans), sans-serif",
                fontSize: "clamp(12px, 1.2vw, 15px)",
                fontWeight: 600,
                boxShadow: "0 12px 28px rgba(0, 0, 0, 0.28)",
                pointerEvents: "auto",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              Product Designer
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
