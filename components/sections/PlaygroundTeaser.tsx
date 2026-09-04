"use client";

import Marquee from "@/components/Marquee";

export default function PlaygroundTeaser() {
  return (
    <section className="section" id="playground-teaser" aria-label="Playground">
      <Marquee
        items={Array.from({ length: 4 }, () => "THINGS I MADE BECAUSE I COULDN'T NOT.")}
        speed={80}
        ariaLabel="Playground marquee"
      />
    </section>
  );
}
