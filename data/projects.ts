import type { PlateStyle } from "@/components/Plate";

export type GalleryItem = {
  seed: string;
  style: PlateStyle;
  ratio: string;
  label: string;
  span?: "full" | "wide" | "half" | "tall";
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  role: string;
  tools: string[];
  summary: string;
  intro: string;
  context: string[];
  concept: { heading: string; body: string }[];
  pullQuote: string;
  systemNotes: string[];
  gallery: GalleryItem[];
  video?: { poster: string; src: string; title: string } | null;
  featured: boolean;
};

// NOTE: Years, credits and copy are editable starting points — replace with
// final details as projects are documented.
export const projects: Project[] = [
  {
    slug: "aurora-coffee",
    index: "01",
    title: "Aurora Coffee",
    category: "Brand Identity",
    year: "2025",
    role: "Identity, Packaging & Art Direction",
    tools: ["Illustrator", "Photoshop", "Figma"],
    summary:
      "A premium coffee identity built around deep work — industrial precision meets quiet mornings.",
    intro:
      "Aurora is a coffee brand for people who drink coffee to think. The identity pairs an industrial, almost mechanical grotesk with warm paper tones and precise packaging geometry.",
    context: [
      "Specialty coffee brands tend to shout. Craft badges, origin maps, latte art — a wall of sameness.",
      "Aurora takes the opposite position: silence, structure and a product that respects your focus.",
    ],
    concept: [
      {
        heading: "Deep work in a cup",
        body: "The brand treats coffee as fuel for concentration. Every layout decision favours calm: generous margins, restrained colour, typography that never competes with the ritual.",
      },
      {
        heading: "Industrial warmth",
        body: "Machinery-grade grids and stamped labels sit against unbleached stock and soft light. The tension between factory precision and morning softness became the identity's engine.",
      },
    ],
    pullQuote: "Coffee doesn't need noise. It needs ritual.",
    systemNotes: [
      "Wordmark with engineered letter-spacing and a machined cut on the R",
      "Label system built on a strict modular grid — every SKU aligns",
      "Monochrome base with a single ember-orange accent reserved for seals",
    ],
    gallery: [
      { seed: "aurora-hero", style: "specimen", ratio: "3/2", label: "WORDMARK SPECIMEN", span: "full" },
      { seed: "aurora-bag", style: "letter", ratio: "4/5", label: "PACKAGING FRONT", span: "half" },
      { seed: "aurora-grid", style: "grid", ratio: "4/5", label: "LABEL GRID", span: "half" },
      { seed: "aurora-cup", style: "halftone", ratio: "16/9", label: "CUPS IN SITU", span: "wide" },
    ],
    video: null,
    featured: true,
  },
  {
    slug: "airbnb-brand-study",
    index: "02",
    title: "Airbnb Brand Study",
    category: "Brand Analysis",
    year: "2025",
    role: "Research, Visual Analysis & Layout",
    tools: ["Figma", "Illustrator"],
    summary:
      "A visual teardown of how one interface became a feeling — belonging, translated into shape and type.",
    intro:
      "A study, not a client project. I took Airbnb apart visually to understand how an interface earns emotional vocabulary — and rebuilt the findings as an editorial document.",
    context: [
      "Most brand studies are essays with screenshots attached.",
      "I wanted the reverse: a document where the analysis is carried entirely by composition, scale and rhythm.",
    ],
    concept: [
      {
        heading: "Reading a brand like a specimen book",
        body: "Each spread isolates one decision — the Bélo's geometry, photographic warmth, sentence-case trust — and treats it like a specimen under glass.",
      },
      {
        heading: "Analysis as design artefact",
        body: "The deliverable itself had to prove the thesis. If the study about clarity wasn't clear, it failed.",
      },
    ],
    pullQuote: "Belonging isn't illustrated. It's engineered.",
    systemNotes: [
      "Annotation language: numbered callouts, hairline leaders, mono captions",
      "Two-typeface rule — one grotesk for findings, one serif for doubt",
      "Every spread answers exactly one question",
    ],
    gallery: [
      { seed: "airbnb-cover", style: "letter", ratio: "4/5", label: "COVER SPREAD", span: "half" },
      { seed: "airbnb-belotest", style: "grid", ratio: "4/5", label: "BÉLO GEOMETRY", span: "half" },
      { seed: "airbnb-spreads", style: "halftone", ratio: "16/9", label: "SPREAD SYSTEM", span: "wide" },
    ],
    video: null,
    featured: true,
  },
  {
    slug: "ai-visual-lab",
    index: "03",
    title: "AI Visual Lab",
    category: "AI Direction",
    year: "2026",
    role: "Creative Direction, Prompt Systems & Retouch",
    tools: ["Midjourney", "Photoshop", "Firefly"],
    summary:
      "AI treated as a junior collaborator with no taste — directed, corrected and finished into deliberate imagery.",
    intro:
      "An ongoing lab where generated images are pushed through a director's process: reference boards, prompt systems, rejection rounds and manual finishing.",
    context: [
      "Generated imagery fails in a predictable way — it is average. Average lighting, average faces, average ideas.",
      "The interesting work starts after generation: editing, compositing and grading until the image has an opinion.",
    ],
    concept: [
      {
        heading: "Prompt as brief, not as button",
        body: "Prompts are written like creative briefs — intent, constraints, references — then iterated against a defined art direction instead of vibes.",
      },
      {
        heading: "RAW → DIRECTED",
        body: "Every final visual passes through the same pipeline: raw output on the left, directed finish on the right. The distance between them is the actual work.",
      },
    ],
    pullQuote: "The model generates. The director decides.",
    systemNotes: [
      "Reference-first workflow — boards before prompts",
      "Consistent grade applied across every accepted frame",
      "Manual compositing and retouch as the final, non-negotiable pass",
    ],
    gallery: [
      { seed: "ailab-rawpair", style: "mesh", ratio: "16/9", label: "RAW VS DIRECTED", span: "full" },
      { seed: "ailab-board", style: "grid", ratio: "4/5", label: "REFERENCE BOARD", span: "half" },
      { seed: "ailab-finish", style: "scan", ratio: "4/5", label: "FINISH PASSES", span: "half" },
    ],
    video: null,
    featured: true,
  },
  {
    slug: "editorial-systems",
    index: "04",
    title: "Editorial Systems",
    category: "Editorial & Social",
    year: "2024–26",
    role: "Design System, Layout & Typography",
    tools: ["Figma", "Photoshop"],
    summary:
      "A carousel design language with comic-book bones — panels, gutters and pacing borrowed from print storytelling.",
    intro:
      "A repeatable editorial system for social carousels that borrows its grammar from comics: panel grids, beat-by-beat pacing and typographic voice.",
    context: [
      "Carousels are usually decorated captions. Scroll after scroll of centred quotes on gradients.",
      "Treated as print — panels, spreads, cliffhangers — the format becomes a story instead of a slideshow.",
    ],
    concept: [
      {
        heading: "Comics did engagement first",
        body: "Panel rhythm controls reading speed. Gutter size sets tone. The last panel is a hook, not a logo. All of it predates the feed by decades.",
      },
      {
        heading: "System over template",
        body: "Not locked layouts but a kit: panel weights, type scales, annotation styles and transition beats that survive any topic.",
      },
    ],
    pullQuote: "Swipe right is just a page turn.",
    systemNotes: [
      "12-column panel grid with intentional breaks per story beat",
      "Display type carries emotion; captions stay quiet and small",
      "Numbered frames give readers a sense of progress",
    ],
    gallery: [
      { seed: "editorial-panels", style: "stripes" as PlateStyle, ratio: "4/5", label: "PANEL GRID", span: "half" },
      { seed: "editorial-spread", style: "halftone", ratio: "4/5", label: "SPREAD BEAT", span: "half" },
      { seed: "editorial-type", style: "specimen", ratio: "16/9", label: "TYPE VOICE", span: "wide" },
    ],
    video: null,
    featured: true,
  },
  {
    slug: "motion-reel",
    index: "05",
    title: "Motion & Cut",
    category: "Video Editing",
    year: "2024–26",
    role: "Editing, Motion Graphics & Grade",
    tools: ["Premiere Pro", "After Effects"],
    summary:
      "Edits and motion pieces where timing does the talking — rhythm first, effects second.",
    intro:
      "Selected cuts and motion experiments. The through-line is rhythm: cuts land on breath, type moves like percussion, effects only appear when the story asks for them.",
    context: [
      "Video work rarely gets shown like design work — dumped in links, stripped of context.",
      "This chapter treats each edit as a designed object: framed, paced and presented with intent.",
    ],
    concept: [
      {
        heading: "Rhythm is the design",
        body: "Before any effect, the cut. Beat-mapped timelines, breathing-room pauses and deliberate pace changes carry more personality than transitions ever will.",
      },
      {
        heading: "Type in time",
        body: "Motion typography treated like a drum pattern — accents, rests, fills. Kinetic type that supports narration instead of decorating it.",
      },
    ],
    pullQuote: "If the cut works silent, it works.",
    systemNotes: [
      "Edit grammar: hard cuts on beat, holds before payoffs",
      "Grade kept consistent across every piece in the reel",
      "Sound designed even for muted-first versions",
    ],
    gallery: [
      { seed: "reel-frame1", style: "scan", ratio: "16/9", label: "STILL — OPENING CUT", span: "full" },
      { seed: "reel-frame2", style: "mesh", ratio: "4/5", label: "KINETIC TYPE STUDY", span: "half" },
      { seed: "reel-frame3", style: "halftone", ratio: "4/5", label: "GRADE PASS", span: "half" },
    ],
    video: null,
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);
