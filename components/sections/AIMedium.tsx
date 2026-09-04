"use client";

import TextReveal from "@/components/TextReveal";
import AIDiffSlider from "@/components/AIDiffSlider";

const PIPELINE = ["IDEA", "PROMPT", "IMAGE", "EDIT", "FINAL"];

export default function AIMedium() {
  return (
    <div
      id="ai"
      className="section-stage"
      style={{
        position: "relative",
        height: "145vh",
        backgroundColor: "#101311",
        color: "#FFF8E2",
      }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#101311",
          color: "#FFF8E2",
          overflow: "hidden",
        }}
      >
        <div className="wrap">
          <div className="sec-head">
            <p className="label" style={{ color: "var(--accent)", marginBottom: "1rem" }}>
              07 — AI AS A MEDIUM
            </p>
            <TextReveal as="h2" className="display-1">
              AI is a
              <br />
              medium<span className="accent">.</span>
            </TextReveal>
            <p className="body-copy" style={{ maxWidth: "36ch", color: "var(--muted-dark)", marginTop: "1rem" }}>
              Not a magic button and not a threat. Another instrument in the atelier — directed, curated, composited, and finished by human hand.
            </p>
          </div>

          <p className="label" aria-label="Process pipeline" style={{ marginTop: "1.2rem" }}>
            {PIPELINE.map((step, i) => (
              <span key={step}>
                <b style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</b> {step}
                {i < PIPELINE.length - 1 && <span aria-hidden="true" style={{ opacity: 0.4 }}> → </span>}
              </span>
            ))}
          </p>

          <div style={{ marginTop: "clamp(1.5rem, 3.5vh, 2.5rem)" }}>
            <AIDiffSlider />
          </div>

          <p className="body-copy" style={{ marginTop: "1.2rem", color: "var(--muted-dark)", maxWidth: "52ch", fontSize: "0.88rem" }}>
            Same initial frame, same composition — the right side passed through reference moodboards, prompt engineering, rejection passes, manual compositing in Photoshop, and color grade. That distance is the craft.
          </p>
        </div>
      </section>
    </div>
  );
}
