"use client";

import { motion } from "framer-motion";
import Plate from "@/components/Plate";
import { usePrefersReducedMotion } from "@/lib/hooks";

/* A portrait built from 9 slices of one plate that scatter apart and
   re-align with Framer Motion spring physics as you scroll */

export default function PortraitFragments({
  seed = "portrait-av",
  style = "letter",
}: {
  seed?: string;
  style?: "letter" | "specimen" | "halftone" | "mesh";
}) {
  const reduced = usePrefersReducedMotion();

  const cells = Array.from({ length: 9 }, (_, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const angle = (i / 9) * Math.PI * 2;
    const initX = Math.cos(angle) * 46;
    const initY = Math.sin(angle) * 38;
    const initRotate = i % 2 ? 4 : -4;
    return { col, row, key: i, initX, initY, initRotate };
  });

  return (
    <div className="portrait" aria-label="Portrait assembled from work fragments">
      {cells.map(({ col, row, key, initX, initY, initRotate }) => (
        <div
          className="portrait-cell"
          key={key}
          style={{
            left: `${(col / 3) * 100}%`,
            top: `${(row / 3) * 100}%`,
            width: "33.34%",
            height: "33.34%",
          }}
          aria-hidden="true"
        >
          <motion.div
            className="portrait-inner"
            style={{
              left: `${-col * 100}%`,
              top: `${-row * 100}%`,
              width: "300%",
              height: "300%",
            }}
            initial={reduced ? undefined : { x: initX, y: initY, rotate: initRotate, opacity: 0.8 }}
            whileInView={reduced ? undefined : { x: 0, y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 22,
              delay: key * 0.05,
            }}
          >
            <Plate
              seed={seed}
              style={style}
              ratio="4/5"
              dark
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
