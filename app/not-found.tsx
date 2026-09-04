import Plate from "@/components/Plate";

export default function NotFound() {
  return (
    <section className="section wrap" style={{ minHeight: "80svh", display: "grid", alignContent: "center" }}>
      <p className="label accent">ERROR 404 — FRAME NOT FOUND</p>
      <h1 className="display-1" style={{ margin: "1rem 0 2rem" }}>
        This page cut<span className="accent">.</span>
      </h1>
      <div className="media" data-cursor="HMM" aria-hidden="true" style={{ maxWidth: "420px" }}>
        <Plate seed="not-found" style="scan" ratio="16/9" dark label="MISSING FOOTAGE" />
      </div>
      <a href="/" className="arrow-link" style={{ marginTop: "2.5rem", alignSelf: "start" }}>
        Back to the visual world <span className="arr">→</span>
      </a>
    </section>
  );
}
