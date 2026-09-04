"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  animate,
} from "framer-motion";
import { lenisStore } from "@/lib/lenis-store";

/* -------------------------------------------------------------------------
   Torn Paper Deckle-Edge SVG Divider
   ------------------------------------------------------------------------- */
function TornEdgeDivider() {
  return (
    <div
      style={{
        position: "absolute",
        top: "-18px",
        left: 0,
        width: "100%",
        height: "22px",
        zIndex: 25,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 22"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <path
          d="M0,0 L1440,0 L1440,8 C1405,11 1375,5 1340,9 C1305,12 1275,6 1240,10 C1205,13 1175,7 1140,10 C1105,13 1075,6 1040,10 C1005,14 975,7 940,11 C905,13 875,6 840,10 C805,13 775,7 740,10 C705,14 675,8 640,11 C605,13 575,6 540,9 C505,12 475,7 440,11 C405,14 375,8 340,10 C305,13 275,6 240,9 C205,13 175,7 140,11 C105,14 75,8 40,10 C25,12 10,6 0,9 Z"
          fill="#F4F2EE"
        />
      </svg>
    </div>
  );
}

export type SelectedProject = {
  _id?: string;
  title: string;
  slug: string;
  index?: string;
  category: string;
  year?: string;
  coverImage?: {
    asset?: {
      url?: string;
    };
  };
  summary?: string;
};

const DEFAULT_PROJECTS: SelectedProject[] = [
  {
    title: "GSAA Global",
    slug: "gsaa-global",
    index: "01",
    category: "WEB & DIGITAL PLATFORM",
    year: "2025",
    coverImage: { asset: { url: "/work/gsaa-global.jpeg" } },
    summary: "A corporate digital platform built for GSAA Global Private Limited, delivering international logistics credibility and enterprise service clarity.",
  },
  {
    title: "Burn First Aid",
    slug: "burn-first-aid",
    index: "02",
    category: "MOBILE & ANDROID APP",
    year: "2025",
    coverImage: { asset: { url: "/work/burn-first-aid.png" } },
    summary: "A life-saving mobile emergency application designed to provide immediate, panic-free triage instructions and first aid guidance for burn trauma incidents.",
  },
];

/* -------------------------------------------------------------------------
   Nithin Warrier-Grade Showcase Card Stage Component (2-Stage Wipe)
   ------------------------------------------------------------------------- */
function NithinWipeCardStage({
  project,
  curtainRef,
  imageScale,
  cardContainerRef,
}: {
  project: SelectedProject;
  curtainRef: React.RefObject<HTMLDivElement | null>;
  imageScale: number;
  cardContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const imageUrl = project.coverImage?.asset?.url || "/work/brands.jpeg";

  const slug =
    typeof project.slug === "object"
      ? (project.slug as any)?.current
      : project.slug;

  const displayTitle = (project.title || "")
    .replace(/ Private Limited/i, "")
    .trim();

  return (
    <Link
      href={`/work/${slug}`}
      style={{
        display: "block",
        position: "relative",
        width: "100%",
        height: "100%",
        textDecoration: "none",
        cursor: "pointer",
      }}
      aria-label={`View ${displayTitle} Case Study`}
    >
      <div
        ref={cardContainerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          overflow: "hidden",
          border: "1px solid rgba(20, 21, 22, 0.15)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          userSelect: "none",
          backgroundColor: "#16181A",
        }}
      >
        {/* Zooming Underlying Content (1.15 -> 1.0 ease-out on transition) */}
        <motion.div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transform: `scale(${imageScale})`,
            transformOrigin: "center",
            willChange: "transform",
          }}
        >
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            style={{ objectFit: "cover" }}
          />

          {/* Subtle gradient vignette at bottom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(10, 12, 11, 0.75) 0%, rgba(10, 12, 11, 0) 50%)",
              pointerEvents: "none",
            }}
          />

          {/* Interactive Card Footer Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "24px",
              right: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#FFE862",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                {project.category} // {project.year}
              </span>
              <h3
                style={{
                  margin: "2px 0 0 0",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  fontFamily: "'Aeonik TRIAL', sans-serif",
                }}
              >
                {project.title}
              </h3>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "20px",
                backgroundColor: "#FFE862",
                color: "#141516",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                fontWeight: 700,
                boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
              }}
            >
              CASE STUDY ↗
            </div>
          </div>
        </motion.div>

        {/* Signature Yellow Curtain (#FFE862 from nithinmwarrier.com) */}
        <div
          ref={curtainRef}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFE862",
            borderRadius: "inherit",
            zIndex: 30,
            pointerEvents: "none",
            transform: "translateY(100%)",
            boxShadow: "inset 0 0 0 1px rgba(209, 187, 59, 0.6)",
            willChange: "transform",
          }}
        />
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------
   SelectedWork Component (2 Works Synchronized)
   ------------------------------------------------------------------------- */
export default function SelectedWork({
  initialProjects = [],
}: {
  initialProjects?: SelectedProject[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  // Dynamically use all featured projects from Sanity Content Lake
  const projects =
    initialProjects && initialProjects.length > 0
      ? initialProjects
      : DEFAULT_PROJECTS;

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [imageScale, setImageScale] = useState(1.0);

  const activeIndexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  // Framer Motion useScroll hook tracking runway progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Vertical drift on category stack
  const verticalStackShift = useTransform(scrollYProgress, [0, 1], ["0em", "-1.2em"]);

  // Exact Nithin Warrier Wipe Animation Execution
  const triggerWipe = useCallback(() => {
    isAnimatingRef.current = true;
    const curtain = curtainRef.current;
    if (!curtain) {
      setDisplayIndex(targetIndexRef.current);
      isAnimatingRef.current = false;
      return;
    }

    // Step 1: Slide UP from bottom to cover stage (0%)
    curtain.style.transform = "translateY(100%)";
    animate(
      curtain,
      { transform: "translateY(0%)" },
      {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          const next = targetIndexRef.current;
          setDisplayIndex(next);
          setImageScale(1.15);

          // Step 2: Slide OUT to top (-100%) to unveil
          animate(
            curtain,
            { transform: "translateY(-100%)" },
            {
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              onComplete: () => {
                curtain.style.transform = "translateY(100%)";
                isAnimatingRef.current = false;
                if (targetIndexRef.current !== next) {
                  triggerWipe();
                }
              },
            }
          );

          // Step 3: Underlying image scale smooth zoom from 1.15 to 1.0
          animate(1.15, 1.0, {
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest: number) => setImageScale(latest),
          });
        },
      }
    );
  }, []);

  const onPhaseChange = useCallback(
    (newIdx: number) => {
      targetIndexRef.current = newIdx;
      setActiveIndex(newIdx);
      if (!isAnimatingRef.current) {
        triggerWipe();
      }
    },
    [triggerWipe]
  );

  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize scroll runway progress with active project index (2 stages)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (isProgrammaticScrollRef.current) return;
    const t = Math.min(Math.floor(p * projects.length), projects.length - 1);
    if (t !== activeIndexRef.current) {
      activeIndexRef.current = t;
      onPhaseChange(t);
    }
  });

  // Smooth Lenis / window scroll navigation to specific phase
  const scrollToPhase = useCallback(
    (targetIdx: number) => {
      isProgrammaticScrollRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 1200);

      targetIndexRef.current = targetIdx;
      activeIndexRef.current = targetIdx;
      onPhaseChange(targetIdx);

      if (!containerRef.current) return;
      const top = containerRef.current.offsetTop;
      const height = containerRef.current.offsetHeight - window.innerHeight;

      const targetScroll = targetIdx === 0 ? top + 20 : top + height * 0.8;

      if (lenisStore.current) {
        lenisStore.current.scrollTo(targetScroll, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    },
    [onPhaseChange]
  );

  // Expose global controller hook to change active phase
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ index: number }>).detail;
      if (typeof detail?.index === "number" && detail.index !== activeIndexRef.current) {
        targetIndexRef.current = detail.index;
        activeIndexRef.current = detail.index;
        onPhaseChange(detail.index);
      }
    };
    window.addEventListener("av-change-selected-work", handler);
    (window as unknown as { __avSelectedWorkActiveIndex: number }).__avSelectedWorkActiveIndex = activeIndex;
    (window as unknown as { __avSelectedWorkCount: number }).__avSelectedWorkCount = projects.length;
    return () => {
      window.removeEventListener("av-change-selected-work", handler);
    };
  }, [activeIndex, projects.length, onPhaseChange]);

  const currentProject = projects[displayIndex] || projects[0];

  return (
    <div
      id="work"
      ref={containerRef}
      className="section-stage"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* 100vh Stage Container */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#F4F2EE",
          color: "#141516",
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(2rem, 4vh, 3.5rem) clamp(1.5rem, 5vw, 4.5rem)",
          userSelect: "none",
        }}
      >
        {/* Torn Paper Deckle-Edge Divider overlapping the dark section above */}
        <TornEdgeDivider />

        {/* Continuous Vertical Boundary Guide Lines */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "clamp(1.5rem, 5vw, 4.5rem)",
            width: "1px",
            height: "100%",
            backgroundColor: "rgba(20, 21, 22, 0.18)",
            pointerEvents: "none",
            zIndex: 3,
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: "clamp(1.5rem, 5vw, 4.5rem)",
            width: "1px",
            height: "100%",
            backgroundColor: "rgba(20, 21, 22, 0.18)",
            pointerEvents: "none",
            zIndex: 3,
          }}
          aria-hidden="true"
        />

        {/* Main Two-Column Full-Screen Stage with Balanced Equal Proportions */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1120px",
            width: "100%",
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(28px, 5vw, 56px)",
          }}
        >
          {/* Left Column: Introduction & 2 Hero Works Stack (Aligned to Right Edge) */}
          <div
            style={{
              flex: "1 1 48%",
              maxWidth: "460px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "right", marginBottom: "clamp(16px, 3vh, 28px)" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#141516",
                  backgroundColor: "#FFE862",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  textTransform: "uppercase",
                  display: "inline-block",
                  marginBottom: "8px",
                }}
              >
                SELECTED WORK
              </span>
              <p
                style={{
                  fontFamily: "'Aeonik TRIAL', 'Inter Tight', -apple-system, sans-serif",
                  fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                  color: "#242424",
                  fontWeight: 400,
                  lineHeight: 1.35,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  maxWidth: "320px",
                  whiteSpace: "normal",
                }}
              >
                Designing experiences that help brands grow through
              </p>
            </div>

            {/* 2 Works Interactive Category Stack */}
            <motion.nav
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "clamp(10px, 2vh, 18px)",
                y: verticalStackShift,
                width: "100%",
              }}
              role="tablist"
              aria-label="Selected Work Projects"
            >
              {projects.map((proj, idx) => {
                const isActive = activeIndex === idx;
                const cleanTitle = (proj.title || "")
                  .replace(/ Private Limited/i, "")
                  .trim()
                  .toUpperCase();
                const projSlug =
                  typeof proj.slug === "object"
                    ? (proj.slug as any)?.current
                    : proj.slug || `project-${idx}`;

                return (
                  <button
                    key={projSlug}
                    onClick={() => scrollToPhase(idx)}
                    role="tab"
                    aria-selected={isActive}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                      cursor: "pointer",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                      outline: "none",
                      display: "block",
                      transformOrigin: "right center",
                      transition:
                        "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, filter 0.45s ease",
                      transform: isActive ? "scale(1.0)" : "scale(0.85)",
                      opacity: isActive ? 1.0 : 0.28,
                      filter: isActive ? "none" : "grayscale(30%)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'Aeonik TRIAL', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 900,
                        fontSize:
                          projects.length <= 2
                            ? "clamp(2rem, 4.2vw, 3.8rem)"
                            : projects.length === 3
                            ? "clamp(1.7rem, 3.4vw, 3rem)"
                            : "clamp(1.35rem, 2.6vw, 2.3rem)",
                        letterSpacing: "-0.04em",
                        lineHeight: 0.95,
                        textTransform: "uppercase",
                        color: "#141516",
                        display: "inline-block",
                      }}
                    >
                      {cleanTitle}
                    </span>
                  </button>
                );
              })}
            </motion.nav>

            {/* Click to open case study note */}
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <Link
                href={`/work/${typeof currentProject.slug === "object" ? (currentProject.slug as any)?.current : currentProject.slug}`}
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#141516",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Read {(currentProject.title || "").replace(/ Private Limited/i, "").trim()} Case Study →
              </Link>
            </div>
          </div>

          {/* Right Column: Signature Yellow Wipe Stage */}
          <div
            style={{
              flex: "1 1 52%",
              maxWidth: "480px",
              width: "100%",
              height: "clamp(320px, 44vh, 380px)",
              position: "relative",
            }}
          >
            <NithinWipeCardStage
              project={currentProject}
              curtainRef={curtainRef}
              imageScale={imageScale}
              cardContainerRef={cardContainerRef}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
