"use client";

import { useEffect, useState, type CSSProperties, type ReactElement } from "react";

export type PlateStyle =
  | "halftone"
  | "specimen"
  | "scan"
  | "mesh"
  | "letter"
  | "grid"
  | "stripes";

/* Deterministic integer RNG so SSR and client render identical plates */

function fnv(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;

const PALETTE = {
  light: {
    bg: "#E9E3D6",
    fg: "#181510",
    soft: "#B4AC9A",
    faint: "#D5CDBB",
    accent: "#E8500F",
  },
  dark: {
    bg: "#211E17",
    fg: "#EDE8DC",
    soft: "#57503F",
    faint: "#33301F26",
    accent: "#FF5A1F",
  },
};

function parseRatio(ratio: string): [number, number] {
  const [a, b] = ratio.split("/").map(Number);
  if (!a || !b) return [3, 2];
  return [a, b];
}

const GLYPHS = "AVRMNKXQG#&§*".split("");

/* ------------------------------------------------------------------ */
/* Style renderers                                                     */
/* ------------------------------------------------------------------ */

type SceneProps = { rng: Rng; w: number; h: number; c: typeof PALETTE.light };

function Halftone({ rng, w, h, c }: SceneProps) {
  const step = Math.round(w / 34);
  const cx = Math.round(rng() * w);
  const cy = Math.round(rng() * h);
  const cr = Math.round(w * (0.22 + rng() * 0.2));
  const dots: ReactElement[] = [];
  for (let y = step; y < h; y += step) {
    for (let x = step / 2; x < w; x += step) {
      const wave =
        Math.sin((x / w) * Math.PI * 2.2 + rng() * 0.4) *
          Math.cos((y / h) * Math.PI * 1.8) +
        1;
      const r = Number((1 + wave * step * 0.36).toFixed(1));
      if (r < 1.4) continue;
      const inAccent = (x - cx) ** 2 + (y - cy) ** 2 < cr * cr;
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={Math.round(x)}
          cy={Math.round(y)}
          r={r}
          fill={inAccent ? c.accent : c.fg}
        />
      );
    }
  }
  return <>{dots}</>;
}

function Specimen({ rng, w, h, c }: SceneProps) {
  const glyph =
    GLYPHS[Math.floor(rng() * GLYPHS.length)] +
    GLYPHS[Math.floor(rng() * GLYPHS.length)];
  const size = Math.round(h * (1.15 + rng() * 0.35));
  const x = Math.round(w * (rng() * 0.25 - 0.05));
  const baselines: ReactElement[] = [];
  const count = 7 + Math.floor(rng() * 4);
  for (let i = 0; i < count; i += 1) {
    const ly = Math.round((h / count) * i + h / count / 2);
    baselines.push(
      <line key={i} x1={0} y1={ly} x2={w} y2={ly} stroke={c.fg} strokeWidth={1} opacity={i % 3 === 0 ? 0.28 : 0.12} />
    );
  }
  return (
    <>
      {baselines}
      <text
        x={x}
        y={Math.round(h * 0.86)}
        fontSize={size}
        fontWeight={900}
        letterSpacing="-0.04em"
        fill={c.fg}
        style={{ fontFamily: "var(--font-sans), sans-serif" }}
      >
        {glyph}
      </text>
      <rect x={Math.round(w * 0.72)} y={Math.round(h * 0.1)} width={Math.round(w * 0.16)} height={Math.round(h * 0.02)} fill={c.accent} />
      <text
        x={Math.round(w * 0.72)}
        y={Math.round(h * 0.17)}
        fontSize={Math.round(w * 0.016)}
        fill={c.fg}
        opacity={0.65}
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        CAP HEIGHT — UNDER REVIEW
      </text>
    </>
  );
}

function Scan({ rng, w, h, c }: SceneProps) {
  const rows: ReactElement[] = [];
  let y = 0;
  while (y < h) {
    const th = Number((1.5 + rng() ** 2 * 9).toFixed(1));
    if (rng() > 0.24) {
      rows.push(
        <rect key={`r${y}`} x={Math.round(w * rng() * 0.08)} y={Math.round(y)} width={Math.round(w * (0.84 + rng() * 0.16))} height={th} fill={c.fg} opacity={Number((0.16 + rng() * 0.3).toFixed(2))} />
      );
    }
    y += th + 3 + rng() * 14;
  }
  const bandY = Math.round(h * (0.3 + rng() * 0.4));
  return (
    <>
      {rows}
      <rect x={Math.round(w * 0.06)} y={bandY} width={Math.round(w * 0.88)} height={Math.round(h * 0.075)} fill={c.accent} />
      <rect x={Math.round(w * 0.06)} y={bandY} width={Math.round(w * 0.88)} height={Math.round(h * 0.075)} fill="none" stroke={c.fg} strokeWidth={1.5} />
      <text
        x={Math.round(w * 0.09)}
        y={Math.round(bandY + h * 0.052)}
        fontSize={Math.round(w * 0.018)}
        fontWeight={500}
        fill={c.bg}
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        FRAME {(1000 + Math.floor(rng() * 8999)).toString()}
      </text>
    </>
  );
}

function Mesh({ rng, w, h, c }: SceneProps) {
  const n = 5 + Math.floor(rng() * 3);
  const blobs: ReactElement[] = [];
  const fills = [c.fg, c.accent, c.fg, c.soft];
  for (let i = 0; i < n; i += 1) {
    blobs.push(
      <circle
        key={`b${i}`}
        cx={Math.round(w * (0.2 + rng() * 0.6))}
        cy={Math.round(h * (0.2 + rng() * 0.6))}
        r={Math.round(Math.min(w, h) * (0.14 + rng() * 0.22))}
        fill={fills[i % fills.length]}
        opacity={Number((0.13 + rng() * 0.14).toFixed(2))}
      />
    );
  }
  const ox = Math.round(w * (0.42 + rng() * 0.16));
  const oy = Math.round(h * (0.38 + rng() * 0.24));
  const or = Math.round(Math.min(w, h) * 0.3);
  return (
    <>
      {blobs}
      <circle cx={ox} cy={oy} r={or} fill="none" stroke={c.fg} strokeWidth={1.5} opacity={0.55} />
      <circle cx={Math.round(ox + w * 0.015)} cy={Math.round(oy - h * 0.012)} r={or} fill="none" stroke={c.accent} strokeWidth={1.5} opacity={0.85} />
      <line x1={ox - or - 20} y1={oy} x2={ox + or + 20} y2={oy} stroke={c.fg} strokeWidth={0.75} opacity={0.4} />
      <line x1={ox} y1={oy - or - 20} x2={ox} y2={oy + or + 20} stroke={c.fg} strokeWidth={0.75} opacity={0.4} />
    </>
  );
}

function Letter({ rng, w, h, c }: SceneProps) {
  const g = GLYPHS[Math.floor(rng() * GLYPHS.length)];
  const rot = Number((-14 + rng() * 28).toFixed(1));
  const size = Math.round(h * (1.5 + rng() * 0.4));
  const x = Math.round(w * (0.3 + rng() * 0.3));
  const y = Math.round(h * (0.95 + rng() * 0.15));
  const figNum = Math.floor(rng() * 90) + 10;
  const common = {
    fontSize: size,
    fontWeight: 900,
    style: { fontFamily: "var(--font-sans), sans-serif" },
  } as const;
  return (
    <>
      <g transform={`rotate(${rot} ${x} ${y})`}>
        <text {...common} x={Math.round(x + w * 0.018)} y={Math.round(y - h * 0.012)} fill={c.accent}>
          {g}
        </text>
        <text {...common} x={x} y={y} fill={c.fg}>
          {g}
        </text>
      </g>
      <rect x={0} y={Math.round(h * 0.82)} width={w} height={1.5} fill={c.fg} opacity={0.35} />
      <text
        x={Math.round(w * 0.04)}
        y={Math.round(h * 0.9)}
        fontSize={Math.round(w * 0.02)}
        fill={c.fg}
        opacity={0.7}
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        FIG. {figNum} — CROP STUDY
      </text>
    </>
  );
}

function Grid({ w, h, c }: SceneProps) {
  const cx = Math.round(w / 2);
  const cy = Math.round(h / 2);
  const r = Math.round(Math.min(w, h) * 0.33);
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line key={`v${i}`} x1={Math.round((w / 8) * i)} y1={0} x2={Math.round((w / 8) * i)} y2={h} stroke={c.fg} strokeWidth={0.75} opacity={0.14} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`hz${i}`} x1={0} y1={Math.round((h / 5) * i)} x2={w} y2={Math.round((h / 5) * i)} stroke={c.fg} strokeWidth={0.75} opacity={0.14} />
      ))}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={c.fg} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={Math.round(r * 0.62)} fill="none" stroke={c.fg} strokeWidth={1} strokeDasharray="4 6" />
      <circle cx={cx} cy={cy} r={Math.round(r * 0.24)} fill={c.accent} />
      <line x1={cx - r - 30} y1={cy} x2={cx + r + 30} y2={cy} stroke={c.fg} strokeWidth={1} />
      <line x1={cx} y1={cy - r - 30} x2={cx} y2={cy + r + 30} stroke={c.fg} strokeWidth={1} />
      <path d={`M ${cx - r} ${cy - r - 14} L ${cx - r} ${cy - r - 22} L ${cx + r} ${cy - r - 22} L ${cx + r} ${cy - r - 14}`} fill="none" stroke={c.fg} strokeWidth={1} />
      <text
        x={cx}
        y={cy - r - 30}
        fontSize={Math.round(w * 0.017)}
        textAnchor="middle"
        fill={c.fg}
        opacity={0.75}
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        Ø {(Math.floor(r * 1.618) / 10).toFixed(2)}
      </text>
    </>
  );
}

function Stripes({ rng, w, h, c }: SceneProps) {
  const bars: ReactElement[] = [];
  let x = -w * 0.05;
  let i = 0;
  while (x < w) {
    const bw = Math.round(w * (0.04 + rng() * 0.13));
    const roll = rng();
    if (roll > 0.45) {
      bars.push(
        <rect key={`s${i}`} x={Math.round(x)} y={0} width={bw} height={h} fill={roll > 0.92 ? c.accent : c.fg} opacity={roll > 0.92 ? 1 : Number((0.82 - rng() * 0.35).toFixed(2))} />
      );
    } else if (roll > 0.36) {
      bars.push(
        <rect key={`o${i}`} x={Math.round(x)} y={Math.round(h * 0.12)} width={bw} height={Math.round(h * 0.76)} fill="none" stroke={c.fg} strokeWidth={1.5} />
      );
    }
    x += bw + w * (0.02 + rng() * 0.05);
    i += 1;
  }
  const py = Math.round(h * (0.62 + rng() * 0.15));
  return (
    <>
      {bars}
      <rect x={Math.round(w * 0.58)} y={py} width={Math.round(w * 0.3)} height={Math.round(h * 0.16)} fill={c.bg} stroke={c.fg} strokeWidth={1.5} />
      <text
        x={Math.round(w * 0.605)}
        y={Math.round(py + h * 0.105)}
        fontSize={Math.round(w * 0.02)}
        fontWeight={700}
        fill={c.fg}
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        PANEL {(Math.floor(rng() * 8) + 1)}/{Math.floor(rng() * 3) + 8}
      </text>
    </>
  );
}

const SCENES: Record<PlateStyle, (p: SceneProps) => ReactElement> = {
  halftone: Halftone,
  specimen: Specimen,
  scan: Scan,
  mesh: Mesh,
  letter: Letter,
  grid: Grid,
  stripes: Stripes,
};

/* ------------------------------------------------------------------ */

export type PlateProps = {
  seed: string;
  style?: PlateStyle;
  ratio?: string;
  label?: string;
  dark?: boolean;
  className?: string;
};

export default function Plate({
  seed,
  style = "halftone",
  ratio = "3/2",
  label,
  dark = false,
  className,
}: PlateProps) {
  const [mounted, setMounted] = useState(false);
  const [rw, rh] = parseRatio(ratio);
  const w = 800;
  const h = Math.round((w * rh) / rw);
  const c = dark ? PALETTE.dark : PALETTE.light;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className={className}
        role="img"
        aria-label={label ? `${label} (placeholder artwork)` : "Placeholder artwork"}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width={w} height={h} fill={c.bg} />
      </svg>
    );
  }

  const rng = mulberry32(fnv(seed));
  const Scene = SCENES[style] ?? Halftone;
  const code = `AV·${fnv(seed).toString(36).slice(0, 4).toUpperCase()}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      role="img"
      aria-label={label ? `${label} (placeholder artwork)` : "Placeholder artwork"}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={w} height={h} fill={c.bg} />
      <Scene rng={rng} w={w} h={h} c={c} />
      <rect x={10} y={10} width={w - 20} height={h - 20} fill="none" stroke={c.fg} strokeWidth={1.25} opacity={0.4} />
      <text
        x={22}
        y={34}
        fontSize={13}
        fill={c.fg}
        opacity={0.6}
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        {code}
      </text>
      {label && (
        <text
          x={w - 22}
          y={h - 22}
          fontSize={13}
          textAnchor="end"
          fill={c.fg}
          opacity={0.6}
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          {label}
        </text>
      )}
    </svg>
  );
}
