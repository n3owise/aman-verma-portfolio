"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Plate from "@/components/Plate";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Item =
  | { kind: "plate"; seed: string; style: "halftone" | "specimen" | "scan" | "mesh" | "letter" | "grid" | "stripes"; ratio: string; label: string }
  | { kind: "swatch"; title: string; colors: { name: string; hex: string }[]; label: string }
  | { kind: "note"; text: string; title: string; tape?: boolean };

const ITEMS: (Item & { dy: string; dx: string; dw: string; dr: string; speed: number })[] = [
  { kind: "note", title: "NOTE TO SELF", text: "Try cutting the grid at 45° — see if the chaos survives.", tape: true, dy: "6%", dx: "6%", dw: "240px", dr: "-5deg", speed: 0.4 },
  { kind: "plate", seed: "desk-letter", style: "letter", ratio: "3/4", label: "AKIRA // CROP STUDY", dy: "4%", dx: "30%", dw: "300px", dr: "3deg", speed: 1 },
  {
    kind: "swatch",
    title: "BRAND PALETTE PASS",
    label: "SWATCH SPECIMEN",
    colors: [
      { name: "SAFFRON OXIDE", hex: "#E05414" },
      { name: "LEMON GOLD", hex: "#FFE862" },
      { name: "WARM PAPER", hex: "#F4F2EE" },
      { name: "OBSIDIAN NOIR", hex: "#141516" },
    ],
    dy: "10%",
    dx: "62%",
    dw: "250px",
    dr: "-7deg",
    speed: 1.4,
  },
  { kind: "note", title: "SHOT LIST // MOTION", text: "pour → steam → hands → window light → cut on the beat.", tape: true, dy: "42%", dx: "10%", dw: "260px", dr: "4deg", speed: 0.8 },
  { kind: "plate", seed: "desk-specimen", style: "specimen", ratio: "3/4", label: "TYPE SPECIMEN 01", dy: "46%", dx: "40%", dw: "290px", dr: "-3deg", speed: 1.2 },
  { kind: "plate", seed: "desk-scan", style: "scan", ratio: "4/5", label: "FILM FRAME 24FPS", dy: "52%", dx: "68%", dw: "210px", dr: "6deg", speed: 1.7 },
  { kind: "plate", seed: "desk-grid", style: "grid", ratio: "3/4", label: "DIELINE GEOMETRY", dy: "78%", dx: "26%", dw: "250px", dr: "-4deg", speed: 1.05 },
];

function DeskCollageItem({
  item,
  sectionProgress,
}: {
  item: (typeof ITEMS)[0];
  sectionProgress: any;
}) {
  const reduced = usePrefersReducedMotion();
  const yParallax = useTransform(
    sectionProgress,
    [0, 1],
    reduced ? [0, 0] : [50 * item.speed, -50 * item.speed]
  );

  const cls =
    item.kind === "note"
      ? `desk-item desk-note${item.tape ? " desk-tape" : ""}`
      : "desk-item media";

  return (
    <motion.div
      className={cls}
      data-cursor={item.kind === "note" ? "READ" : "INSPECT"}
      style={
        {
          "--dy": item.dy,
          "--dx": item.dx,
          "--dw": item.dw,
          "--dr": item.dr,
          y: yParallax,
        } as any
      }
      drag
      dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
      whileHover={{ scale: 1.05, zIndex: 25 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {item.kind === "plate" ? (
        <Plate seed={item.seed} style={item.style} ratio={item.ratio} label={item.label} />
      ) : item.kind === "swatch" ? (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid rgba(20, 21, 22, 0.12)",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
            <span>{item.title}</span>
            <span style={{ opacity: 0.5 }}>FIG. 04</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {item.colors.map((c) => (
              <div key={c.hex} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ width: "100%", height: "42px", borderRadius: "6px", backgroundColor: c.hex, border: "1px solid rgba(0,0,0,0.1)" }} />
                <span style={{ fontSize: "8px", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{c.name}</span>
                <span style={{ fontSize: "8px", fontFamily: "var(--font-mono)", opacity: 0.6 }}>{c.hex}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "6px", fontSize: "9px", fontFamily: "var(--font-mono)", opacity: 0.5, textAlign: "right" }}>
            {item.label}
          </div>
        </div>
      ) : (
        <>
          <b>{item.title}</b>
          {item.text}
        </>
      )}
    </motion.div>
  );
}

export default function DeskCollage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="section desk" ref={sectionRef} id="desk" style={{ backgroundColor: "#F4F2EE", color: "#141516" }}>
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label" style={{ color: "var(--accent)", marginBottom: "1rem" }}>
            03 — THE ATELIER
          </p>
          <h2 className="display-1">
            The Creative
            <br />
            Desk<span className="accent">.</span>
          </h2>
          <p className="body-copy" style={{ maxWidth: "32ch", marginTop: "1rem" }}>
            Where prints, packaging dielines and half-formed visual ideas live until they become something. Drag any item to inspect.
          </p>
        </motion.div>
      </div>

      <div className="wrap">
        <div className="desk-surface">
          {ITEMS.map((item, i) => (
            <DeskCollageItem key={i} item={item} sectionProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
