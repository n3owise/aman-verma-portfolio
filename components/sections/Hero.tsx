"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { KineticText } from "@/components/ui/kinetic-text";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_LETTER = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------
   Letter-by-letter kinetic text roll component (Exact Nithin Warrier)
   ------------------------------------------------------------------------- */
function StaggerText({
  text,
  delay = 0,
  className = "",
  style = {},
}: {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={{ ...style, display: "inline-flex", overflow: "hidden" }}>
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.7, delay: delay + 0.035 * idx, ease: EASE_LETTER }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------
   Exact Nithin Warrier Hero Section with Sticky Scroll Hold
   ------------------------------------------------------------------------- */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLarge, setIsLarge] = useState(false);

  // Parallax exit scroll tracking across the 140vh track (holds for a moment, then exits)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  useEffect(() => {
    const onResize = () => setIsLarge(window.innerWidth >= 1440);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="section-stage"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f7f1ed",
        color: "#242424",
      }}
    >
      {/* 100vh Sticky Viewport Screen */}
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#f7f1ed",
        }}
      >
        {/* Background Technical Grid with Fade-out Mask */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `
              linear-gradient(rgba(20, 21, 22, 0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 21, 22, 0.055) 1px, transparent 1px)
            `,
            backgroundSize: "clamp(36px, 3.8vw, 54px) clamp(36px, 3.8vw, 54px)",
            backgroundPosition: "center",
            maskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {/* Fixed Vertical Margin Framing Lines (Left & Right at 5%) */}
        <div
          style={{
            position: "fixed",
            left: "5%",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "#ACACAC",
            zIndex: 50,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "fixed",
            right: "5%",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "#ACACAC",
            zIndex: 50,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {/* Right Fixed W. Honors Badge */}
        <div
          id="awwwards"
          style={{
            position: "fixed",
            zIndex: 999,
            transform: "translateY(-50%)",
            top: "50%",
            right: 0,
          }}
        >
          <div
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              padding: "16px 9px",
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
            }}
          >
            <span style={{ fontFamily: "'Aeonik TRIAL', var(--font-sans), sans-serif", fontSize: "14px", fontWeight: 900 }}>
              W.
            </span>
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                opacity: 0.8,
              }}
            >
              Honors
            </span>
          </div>
        </div>

        {/* Center Stage: Name Headline + Horizontal Lines with Smooth Exit Parallax */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            userSelect: "none",
            y: heroY,
            opacity: heroOpacity,
          }}
        >
          {/* Left Line + Visual Designer Label */}
          <motion.div
            style={{
              position: "absolute",
              left: "5%",
              right: "50%",
              display: "flex",
              alignItems: "center",
              marginRight: "clamp(140px, 15vw, 240px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              style={{
                flex: "1 1 0%",
                height: "1px",
                backgroundColor: "#ACACAC",
                transformOrigin: "left center",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE_OUT }}
            />
            <div style={{ paddingLeft: "16px", overflow: "hidden", whiteSpace: "nowrap" }}>
              <StaggerText
                text="Visual Designer"
                delay={0.4}
                style={{
                  fontFamily: "'Aeonik TRIAL', 'Inter Tight', sans-serif",
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  color: "#242424",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              />
            </div>
          </motion.div>

          {/* Center Name: AMAN VERMA in 2 Lines with 120 FPS Magnetic Kinetic Wave */}
          <div style={{ whiteSpace: "nowrap", textAlign: "center", zIndex: 12 }}>
            <KineticText
              lines={["AMAN", "VERMA"]}
              fontSize="clamp(3.2rem, 6.5vw, 6.2rem)"
              color="#141516"
            />
          </div>

          {/* Right Line + Based in India Label */}
          <motion.div
            style={{
              position: "absolute",
              right: "5%",
              left: "50%",
              display: "flex",
              alignItems: "center",
              marginLeft: "clamp(140px, 15vw, 240px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ paddingRight: "16px", overflow: "hidden", whiteSpace: "nowrap" }}>
              <StaggerText
                text="Based in India"
                delay={0.4}
                style={{
                  fontFamily: "'Aeonik TRIAL', 'Inter Tight', sans-serif",
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  color: "#242424",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              />
            </div>
            <motion.div
              style={{
                flex: "1 1 0%",
                height: "1px",
                backgroundColor: "#ACACAC",
                transformOrigin: "right center",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE_OUT }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
