"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import FigmaMotionBadge from "@/components/FigmaMotionBadge";
import ClaudeMotionBadge from "@/components/ClaudeMotionBadge";
import InteractiveDotCanvas from "@/components/InteractiveDotCanvas";

/* -------------------------------------------------------------------------
   Tapered Calligraphic Multi-Path Segment
   Replicates exact math & strokeDasharray slice interpolation 
   ------------------------------------------------------------------------- */
function PathSegment({
  d,
  index,
  total,
  pathLength,
  minWidth,
  maxWidth,
  progress,
  color,
}: {
  d: string;
  index: number;
  total: number;
  pathLength: number;
  minWidth: number;
  maxWidth: number;
  progress: MotionValue<number>;
  color: string;
}) {
  const segmentLength = pathLength / total;
  const startOffset = index * segmentLength;

  const strokeDasharray = useTransform(progress, (p) => {
    if (p <= 0.45) return `0 ${pathLength}`;
    const currentDrawn = Math.min(
      ((p - 0.45) / 0.55) * pathLength,
      startOffset + segmentLength
    );
    if (currentDrawn <= startOffset) return `0 ${pathLength}`;
    return `0 ${startOffset} ${currentDrawn - startOffset} ${pathLength}`;
  });

  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={minWidth + (index / (total - 1)) * (maxWidth - minWidth)}
      strokeLinecap="butt"
      strokeLinejoin="round"
      fill="none"
      style={{ strokeDasharray }}
    />
  );
}

/* -------------------------------------------------------------------------
   Joined SVG Line extending seamlessly from the bottom stem of the letter 'p'
   ------------------------------------------------------------------------- */
function PJoinedLine({ progress }: { progress: MotionValue<number> }) {
  const pathRef = useRef<SVGPathElement>(null);
  const totalLengthRef = useRef<number>(3442);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isDrawn, setIsDrawn] = useState<boolean>(false);

  const pathData =
    "M 2 0 L 2 30 C 2 80 -20 230 -150 150 S -300 360 -500 200 S -800 440 -1470 370 S -2200 300 -3200 360";

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) {
        totalLengthRef.current = len;
        setIsReady(true);
      }
    }
  }, []);

  useEffect(() => {
    return progress.on("change", (p) => {
      const triggered = p >= 0.45;
      setIsDrawn((prev) => (prev !== triggered ? triggered : prev));
    });
  }, [progress]);

  return (
    <svg
      viewBox="0 0 200 600"
      preserveAspectRatio="none"
      fill="none"
      className="manifesto-p-joined-svg"
      style={{
        position: "absolute",
        left: "0.07em",
        top: "0.72em",
        width: "2em",
        height: "6em",
        overflow: "visible",
        pointerEvents: "none",
        opacity: isReady && isDrawn ? 1 : 0,
        zIndex: 10,
      }}
      aria-hidden="true"
    >
      <path ref={pathRef} d={pathData} stroke="none" fill="none" />
      {Array.from({ length: 12 }, (_, n) => (
        <PathSegment
          key={n}
          d={pathData}
          index={n}
          total={12}
          pathLength={totalLengthRef.current}
          minWidth={8}
          maxWidth={16}
          progress={progress}
          color="#f7f1ed"
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Word Groups matching customized statement
   ------------------------------------------------------------------------- */
const WORD_GROUPS = [
  [
    { text: "Creating", bold: true },
    { text: "visual", bold: true },
    { text: "stories", bold: false },
  ],
  [
    { text: "through", bold: false },
    { text: "graphics,", bold: false },
    { text: "identity", bold: false },
    { text: "and", bold: false },
  ],
  [
    { text: "design", bold: false },
    { text: "that", bold: false },
    { text: "holds", bold: false },
    { text: "up", bold: false },
  ],
];
const ALL_WORDS = WORD_GROUPS.flat();

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mouseState, setMouseState] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end end"],
  });

  const wireScale = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const verticalLineScale = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current = { x, y };
      setMouseState({ x, y });
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Flat entrance animations coordinated with line drawing from 'p' (starts at progress 0.45)
  const figmaOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
  const figmaScale = useTransform(scrollYProgress, [0.42, 0.54], [0.6, 1]);
  const figmaY = useTransform(scrollYProgress, [0.42, 0.56, 1], [32, 0, -16]);
  const figmaX = useTransform(scrollYProgress, [0.42, 0.56], [-24, 0]);

  const claudeOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const claudeScale = useTransform(scrollYProgress, [0.45, 0.57], [0.6, 1]);
  const claudeY = useTransform(scrollYProgress, [0.45, 0.59, 1], [32, 0, 16]);
  const claudeX = useTransform(scrollYProgress, [0.45, 0.59], [24, 0]);

  return (
    <div className="manifesto-scroll-track" ref={containerRef} style={{ height: "185vh" }}>
      <section className="manifesto-sticky-section" aria-label="Design Philosophy">
        {/* Interactive 120 FPS HTML5 Canvas Dot Grid */}
        <div className="manifesto-canvas-layer">
          <InteractiveDotCanvas
            dotColor={[50, 50, 50]}
            hoverColor={[80, 80, 80]}
            interactive={true}
          />
        </div>

        {/* Two Vertical Guide Lines (Left & Right) that frame the section and join the horizontal lines */}
        <div className="manifesto-vertical-guide manifesto-vertical-guide--left" aria-hidden="true" />
        <div className="manifesto-vertical-guide manifesto-vertical-guide--right" aria-hidden="true" />

        {/* Flanking horizontal lines that draw smoothly from the left/right vertical lines to the center */}
        <div className="manifesto-flank-line manifesto-flank-line--left" aria-hidden="true">
          <motion.div
            className="manifesto-flank-bar manifesto-flank-bar--left"
            style={{ scaleX: wireScale, background: "#ACACAC" }}
          />
        </div>
        <div className="manifesto-flank-line manifesto-flank-line--right" aria-hidden="true">
          <motion.div
            className="manifesto-flank-bar manifesto-flank-bar--right"
            style={{ scaleX: wireScale, background: "#ACACAC" }}
          />
        </div>

        <div className="manifesto-pin-container">
          {/* 1. Flat Interactive Figma Motion Badge (Enters as 'p' line starts drawing) */}
          <FigmaMotionBadge
            style={{
              opacity: figmaOpacity,
              scale: figmaScale,
              x: figmaX,
              y: figmaY,
            }}
          />

          {/* 2. Flat Interactive Claude Code Motion Badge (Hover + 5s Auto-play) */}
          <ClaudeMotionBadge
            style={{
              opacity: claudeOpacity,
              scale: claudeScale,
              x: claudeX,
              y: claudeY,
            }}
          />

          {/* 3. Main Central Statement with the Word "up" & Joined Fluid Line */}
          <div className="manifesto-center-stage">
            <h2 className="manifesto-headline">
              {WORD_GROUPS.map((group, gIdx) => {
                const startIndex = WORD_GROUPS.slice(0, gIdx).reduce(
                  (acc, curr) => acc + curr.length,
                  0
                );
                return (
                  <div key={gIdx} className="manifesto-line-row">
                    {group.map((w, wIdx) => {
                      const overallIndex = startIndex + wIdx;
                      const isLast = overallIndex === ALL_WORDS.length - 1;
                      const leadIn = ((overallIndex + 1) / ALL_WORDS.length) * 0.45;
                      const startIn = (overallIndex / ALL_WORDS.length) * 0.45;

                      if (isLast) {
                        return (
                          <motion.span
                            key={overallIndex}
                            className="manifesto-word-wrapper"
                            style={{
                              opacity: useTransform(scrollYProgress, (p) =>
                                p >= leadIn ? 1 : p >= startIn ? 0.4 : 0.2
                              ),
                            }}
                          >
                            <span className="manifesto-word">
                              u
                            </span>
                            <span
                              className="manifesto-letter-p-wrap"
                              style={{ position: "relative", display: "inline-block" }}
                            >
                              <span className="manifesto-word">
                                p
                              </span>
                              {/* Seamless Joined SVG Line */}
                              <PJoinedLine progress={scrollYProgress} />
                            </span>
                          </motion.span>
                        );
                      }

                      return (
                        <motion.span
                          key={overallIndex}
                          style={{
                            opacity: useTransform(scrollYProgress, (p) =>
                              overallIndex === 0
                                ? 1
                                : p >= leadIn
                                ? 1
                                : p >= startIn
                                ? 0.4
                                : 0.2
                            ),
                          }}
                          className={`manifesto-word ${
                            w.bold ? "manifesto-word--bold" : ""
                          }`}
                        >
                          {w.text}{" "}
                        </motion.span>
                      );
                    })}
                  </div>
                );
              })}
            </h2>
          </div>

          {/* End of Manifesto Badges & Headline */}
        </div>
      </section>
    </div>
  );
}
