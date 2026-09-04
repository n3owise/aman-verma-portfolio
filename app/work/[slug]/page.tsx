import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import {
  FEATURED_PROJECTS_QUERY,
  FEATURED_PROJECT_BY_SLUG_QUERY,
} from "@/lib/sanity/queries";

export const revalidate = 30; // ISR revalidate every 30 seconds

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const projects = await client.fetch(FEATURED_PROJECTS_QUERY);
    return projects.map((p: any) => ({
      slug: p.slug,
    }));
  } catch {
    return [{ slug: "gsaa-global" }, { slug: "burn-first-aid" }];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch(FEATURED_PROJECT_BY_SLUG_QUERY, { slug });

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Selected Case Study`,
    description: project.summary || project.intro,
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch current project & all featured projects for next-project link
  const [project, allProjects] = await Promise.all([
    client.fetch(FEATURED_PROJECT_BY_SLUG_QUERY, { slug }),
    client.fetch(FEATURED_PROJECTS_QUERY),
  ]);

  if (!project) {
    notFound();
  }

  // Find next project in circular order
  const currentIndex = allProjects.findIndex((p: any) => p.slug === slug);
  const nextProject =
    allProjects[(currentIndex + 1) % allProjects.length] || allProjects[0];

  const coverImageUrl =
    project.coverImage?.asset?.url || "/work/brands.jpeg";

  return (
    <article
      style={{
        backgroundColor: "#F4F2EE",
        color: "#141516",
        minHeight: "100vh",
        paddingTop: "clamp(5rem, 10vh, 8rem)",
        paddingBottom: "clamp(6rem, 12vh, 10rem)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        {/* Top Navigation & Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "24px",
            borderBottom: "1px solid rgba(20, 21, 22, 0.12)",
            marginBottom: "clamp(2rem, 5vh, 4rem)",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <Link
            href="/#work"
            style={{
              color: "#141516",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: "rgba(20, 21, 22, 0.05)",
              border: "1px solid rgba(20, 21, 22, 0.1)",
              transition: "all 0.2s ease",
            }}
          >
            ← Back to Selected Works
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "rgba(20, 21, 22, 0.6)" }}>
            <span>PROJECT {project.index || "01"}</span>
            <span>//</span>
            <span>{project.year || "2026"}</span>
          </div>
        </div>

        {/* Hero Title & Category Header */}
        <header style={{ marginBottom: "clamp(2.5rem, 6vh, 4.5rem)" }}>
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#141516",
                backgroundColor: "#FFE862",
                padding: "4px 12px",
                borderRadius: "14px",
                textTransform: "uppercase",
              }}
            >
              {project.category}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Aeonik TRIAL', 'Inter Tight', -apple-system, sans-serif",
              fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              margin: "0 0 1.5rem 0",
              color: "#141516",
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
              lineHeight: 1.4,
              color: "#2C2D30",
              maxWidth: "46ch",
              margin: "0 0 2rem 0",
              fontWeight: 400,
            }}
          >
            {project.summary || project.intro}
          </p>

          {/* Project Metadata Strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "24px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(20, 21, 22, 0.1)",
            }}
          >
            {project.role && (
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "10px", fontFamily: "var(--font-mono, monospace)", color: "rgba(20, 21, 22, 0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Role & Scope
                </p>
                <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#141516" }}>
                  {project.role}
                </p>
              </div>
            )}

            {project.year && (
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "10px", fontFamily: "var(--font-mono, monospace)", color: "rgba(20, 21, 22, 0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Timeline
                </p>
                <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#141516" }}>
                  {project.year}
                </p>
              </div>
            )}

            {project.tools && project.tools.length > 0 && (
              <div>
                <p style={{ margin: "0 0 6px 0", fontSize: "10px", fontFamily: "var(--font-mono, monospace)", color: "rgba(20, 21, 22, 0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Tools & Disciplines
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {project.tools.map((tool: string) => (
                    <span
                      key={tool}
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-mono, monospace)",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(20, 21, 22, 0.06)",
                        color: "#141516",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* 1. Main Stage Hero Image / Mockup */}
        <section style={{ marginBottom: "clamp(3.5rem, 8vh, 6rem)" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(380px, 65vh, 680px)",
              borderRadius: "28px",
              overflow: "hidden",
              border: "1px solid rgba(20, 21, 22, 0.12)",
              backgroundColor: "#16181A",
              boxShadow: "0 30px 60px -15px rgba(20, 21, 22, 0.15)",
            }}
          >
            <Image
              src={coverImageUrl}
              alt={project.title || "Project Hero"}
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </section>

        {/* 2. Structured Case Study Breakdown (Consistent Across Projects) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(3rem, 7vh, 5.5rem)" }}>
          {/* Section A: The Brief & Context */}
          {project.context && project.context.length > 0 && (
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "clamp(2rem, 5vw, 4rem)",
                paddingTop: "2.5rem",
                borderTop: "1px solid rgba(20, 21, 22, 0.12)",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "rgba(20, 21, 22, 0.5)",
                    textTransform: "uppercase",
                  }}
                >
                  01 // CONTEXT & PROBLEM
                </span>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    marginTop: "8px",
                    color: "#141516",
                  }}
                >
                  The premise behind the artifact.
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {project.context.map((para: string, idx: number) => (
                  <p
                    key={idx}
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: 1.6,
                      color: "#383A3F",
                      margin: 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Section B: Concept & Creative Direction */}
          {project.concept && project.concept.length > 0 && (
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "clamp(2rem, 5vw, 4rem)",
                paddingTop: "2.5rem",
                borderTop: "1px solid rgba(20, 21, 22, 0.12)",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "rgba(20, 21, 22, 0.5)",
                    textTransform: "uppercase",
                  }}
                >
                  02 // CREATIVE DIRECTION
                </span>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    marginTop: "8px",
                    color: "#141516",
                  }}
                >
                  Core ideas executed into shape.
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {project.concept.map((block: any, idx: number) => (
                  <div
                    key={block._key || idx}
                    style={{
                      padding: "24px",
                      borderRadius: "20px",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      border: "1px solid rgba(20, 21, 22, 0.08)",
                      boxShadow: "0 10px 25px -10px rgba(0,0,0,0.04)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        margin: "0 0 8px 0",
                        color: "#141516",
                      }}
                    >
                      {block.heading}
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        color: "rgba(20, 21, 22, 0.75)",
                        margin: 0,
                      }}
                    >
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section C: Editorial Pull Quote */}
          {project.pullQuote && (
            <section
              style={{
                backgroundColor: "#16181A",
                color: "#F4F2EE",
                padding: "clamp(3rem, 6vh, 4.5rem) clamp(2rem, 5vw, 3.5rem)",
                borderRadius: "28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#FFE862",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                // Core Philosophy
              </span>
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: "'Aeonik TRIAL', 'Inter Tight', sans-serif",
                  fontSize: "clamp(1.8rem, 3.8vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  maxWidth: "28ch",
                }}
              >
                “{project.pullQuote}”
              </blockquote>
            </section>
          )}

          {/* Section D: Design System & Structural Notes */}
          {project.systemNotes && project.systemNotes.length > 0 && (
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "clamp(2rem, 5vw, 4rem)",
                paddingTop: "2.5rem",
                borderTop: "1px solid rgba(20, 21, 22, 0.12)",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "rgba(20, 21, 22, 0.5)",
                    textTransform: "uppercase",
                  }}
                >
                  03 // SYSTEM ARCHITECTURE
                </span>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    marginTop: "8px",
                    color: "#141516",
                  }}
                >
                  Rules, scales, and engineered details.
                </h2>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {project.systemNotes.map((note: string, idx: number) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                      fontSize: "1.05rem",
                      lineHeight: 1.5,
                      color: "#2C2D30",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#141516",
                        backgroundColor: "#FFE862",
                        padding: "2px 6px",
                        borderRadius: "6px",
                        flexShrink: 0,
                        marginTop: "3px",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Section E: Artifacts, Mockups & Gallery Specimens */}
          {project.gallery && project.gallery.length > 0 && (
            <section
              style={{
                paddingTop: "2.5rem",
                borderTop: "1px solid rgba(20, 21, 22, 0.12)",
              }}
            >
              <div style={{ marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "rgba(20, 21, 22, 0.5)",
                    textTransform: "uppercase",
                  }}
                >
                  04 // SPECIMEN GALLERY & MOCKUPS
                </span>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    marginTop: "8px",
                    color: "#141516",
                  }}
                >
                  Tangible artifacts & production passes.
                </h2>
              </div>

              {/* Gallery Grid with Responsive Spans */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gap: "24px",
                }}
              >
                {project.gallery.map((item: any, idx: number) => {
                  const imgUrl = item.image?.asset?.url || coverImageUrl;
                  // Map layout span
                  let colSpan = "span 6";
                  if (item.span === "full") colSpan = "span 12";
                  else if (item.span === "wide") colSpan = "span 8";
                  else if (item.span === "tall") colSpan = "span 4";

                  // Height according to aspect ratio
                  let height = "420px";
                  if (item.ratio === "16/9") height = "480px";
                  else if (item.ratio === "3/2") height = "450px";
                  else if (item.ratio === "4/5") height = "520px";
                  else if (item.ratio === "1/1") height = "420px";

                  return (
                    <div
                      key={item._key || idx}
                      style={{
                        gridColumn: colSpan,
                        borderRadius: "24px",
                        overflow: "hidden",
                        backgroundColor: "#E9E6DF",
                        border: "1px solid rgba(20, 21, 22, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: height,
                        }}
                      >
                        <Image
                          src={imgUrl}
                          alt={item.label || `${project.title} Specimen`}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div
                        style={{
                          padding: "14px 20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#FFFFFF",
                          borderTop: "1px solid rgba(20, 21, 22, 0.08)",
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          color: "#141516",
                        }}
                      >
                        <span>{item.label || `SPECIMEN 0${idx + 1}`}</span>
                        <span style={{ color: "rgba(20, 21, 22, 0.45)" }}>
                          {item.style || "SPECIMEN"} // {item.ratio || "3:2"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* 3. Next Project Footer Navigation */}
        {nextProject && (
          <nav
            style={{
              marginTop: "clamp(5rem, 10vh, 8rem)",
              paddingTop: "3rem",
              borderTop: "2px solid #141516",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "rgba(20, 21, 22, 0.5)",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              NEXT SELECTED WORK ↗
            </span>

            <Link
              href={`/work/${nextProject.slug}`}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "24px",
                color: "#141516",
                transition: "opacity 0.2s ease",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Aeonik TRIAL', 'Inter Tight', sans-serif",
                  fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                {nextProject.title}
              </h3>
              <span
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                →
              </span>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
