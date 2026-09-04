import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aman Verma — Graphic Designer, AI Visual Creator & Video Editor";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12100a",
          color: "#f1ede4",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, color: "#a79e8b" }}>
          AMAN VERMA — PORTFOLIO © 2026
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: -4,
            textTransform: "uppercase",
          }}
        >
          A mind
          <br />
          in motion.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 120, height: 8, background: "#e8500f" }} />
          <div style={{ fontSize: 28, color: "#a79e8b" }}>
            Graphic designer · AI visual creator · Video editor
          </div>
        </div>
      </div>
    ),
    size
  );
}
