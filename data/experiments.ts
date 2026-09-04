export type Experiment = {
  slug: string;
  title: string;
  kind: "type" | "ai" | "motion" | "interaction";
  note: string;
  seed: string;
};

export const experiments: Experiment[] = [
  {
    slug: "variable-voice",
    title: "Variable Voice",
    kind: "type",
    note: "One word, one axis, weight driven by your pointer.",
    seed: "exp-variable",
  },
  {
    slug: "halftone-self",
    title: "Halftone Self",
    kind: "ai",
    note: "Generated portrait pushed through print halftones.",
    seed: "exp-halftone",
  },
  {
    slug: "cut-study-01",
    title: "Cut Study 01",
    kind: "motion",
    note: "Twelve frames. One beat drop. Nothing else.",
    seed: "exp-cut",
  },
  {
    slug: "registration-error",
    title: "Registration Error",
    kind: "interaction",
    note: "CMYK plates that refuse to line up until you hold still.",
    seed: "exp-registration",
  },
  {
    slug: "specimen-machine",
    title: "Specimen Machine",
    kind: "type",
    note: "A specimen sheet that re-typesets itself while you watch.",
    seed: "exp-specimen",
  },
  {
    slug: "prompt-graveyard",
    title: "Prompt Graveyard",
    kind: "ai",
    note: "The prompts that didn't survive contact with taste.",
    seed: "exp-graveyard",
  },
];
