export type Tool = {
  name: string;
  short: string;
  note: string;
};

export const tools: Tool[] = [
  { name: "Photoshop", short: "PS", note: "Compositing, retouch and every AI frame's final pass." },
  { name: "Illustrator", short: "AI", note: "Logos, packaging dielines and grid systems." },
  { name: "Figma", short: "FG", note: "Layout systems, carousels and brand documentation." },
  { name: "After Effects", short: "AE", note: "Kinetic type, title design and motion experiments." },
  { name: "Premiere Pro", short: "PR", note: "Editing — where rhythm and pacing are decided." },
  { name: "Blender", short: "BL", note: "Packaging mockups and light studies." },
  { name: "Midjourney", short: "MJ", note: "Directed generation inside strict reference boards." },
  { name: "Three.js", short: "3J", note: "Interactive fragments like the ones behind this page." },
];

export const toolTicker = [
  "IDEAS FIRST",
  "TOOLS SECOND",
  "TASTE ALWAYS",
  "GRID DISCIPLINE",
  "TYPE IS VOICE",
  "MOTION IS MEANING",
  "AI IS A MEDIUM",
];
