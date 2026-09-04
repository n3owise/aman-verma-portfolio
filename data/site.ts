export const site = {
  name: "Aman Verma",
  shortName: "AV",
  roles: ["Graphic Designer", "AI Visual Creator", "Video Editor"],
  tagline: "I turn ideas into things you can see.",
  location: "India",
  timezone: "Asia/Kolkata",
  email: "hello@amanverma.design",
  description:
    "Aman Verma is an independent visual creator working across graphic design, brand identity, AI-assisted imagery, motion and video editing — turning ideas into things you can see.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://amanverma.design",
} as const;

export const socials = [
  { label: "Instagram", href: "#", handle: "@amanverma" },
  { label: "Behance", href: "#", handle: "/amanverma" },
  { label: "LinkedIn", href: "#", handle: "/in/amanverma" },
] as const;

export const availability = [
  "Branding",
  "Visual Design",
  "AI Visuals",
  "Motion",
  "Video",
] as const;
