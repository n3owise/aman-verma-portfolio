"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "@/components/TextReveal";

export type WorkSampleItem = {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  category: string;
  mediaType?: "image" | "video";
  image?:
    | {
        asset?: {
          url?: string;
        };
      }
    | string;
  gallery?: Array<{
    _key?: string;
    caption?: string;
    alt?: string;
    asset?: {
      url?: string;
    };
  }>;
  videoUrl?: string;
  videoFile?: {
    asset?: {
      url?: string;
    };
  };
  ratio?: string;
  year?: string;
  clientOrBrand?: string;
  description?: string;
  tags?: string[];
  featured?: boolean;
};

const DEFAULT_GRAPHIC_ITEMS: WorkSampleItem[] = [
  {
    id: "g-01",
    title: "Cereal Packaging & Box Structure",
    category: "PACKAGING",
    mediaType: "image",
    image: "/posters/poster-cereal.jpeg",
    gallery: [
      { asset: { url: "/posters/poster-cereal.jpeg" }, caption: "Front carton typography & vibrant blocking" },
      { asset: { url: "/posters/poster-makhana.jpeg" }, caption: "Structural dieline and side panel lineup" },
      { asset: { url: "/posters/poster-vector.jpeg" }, caption: "Full vector production proof" },
    ],
    year: "2026",
    ratio: "4/5",
    description: "Multi-angle carton structure study with bold typography and vibrant color blocking.",
    tags: ["Packaging", "Dieline", "Carton"],
  },
  {
    id: "g-02",
    title: "Vintage Screenprint & Halftone Study",
    category: "SCREENPRINT",
    mediaType: "image",
    image: "/posters/poster-screenprint.jpeg",
    gallery: [
      { asset: { url: "/posters/poster-screenprint.jpeg" }, caption: "Analog halftone texture pass" },
      { asset: { url: "/posters/poster-duotone.png" }, caption: "Macro halftone dot grid detail" },
    ],
    year: "2026",
    ratio: "3/4",
    description: "Analog halftone texture pass and tactile print distress overlay.",
    tags: ["Screenprint", "Halftone"],
  },
  {
    id: "g-03",
    title: "Farmest Makhana Luxury Carton Specimen",
    category: "PACKAGING",
    mediaType: "image",
    image: "/posters/poster-makhana.jpeg",
    gallery: [
      { asset: { url: "/posters/poster-makhana.jpeg" }, caption: "Luxury foil carton finish" },
      { asset: { url: "/posters/poster-cereal.jpeg" }, caption: "Variant packaging lineup" },
      { asset: { url: "/posters/poster-vector.jpeg" }, caption: "Gold foil stamp placement guide" },
    ],
    year: "2026",
    ratio: "1/1",
    description: "Botanical product branding, estate dieline structure, and typography hierarchy.",
    tags: ["Packaging", "Luxury", "Botanical"],
  },
  {
    id: "g-04",
    title: "Geometric Flat Character Series",
    category: "POSTERS",
    mediaType: "image",
    image: "/posters/poster-geometric.jpeg",
    gallery: [
      { asset: { url: "/posters/poster-geometric.jpeg" }, caption: "Primary character poster" },
      { asset: { url: "/posters/poster-duotone.png" }, caption: "Negative space study" },
    ],
    year: "2026",
    ratio: "3/4",
    description: "Minimal vector character explorations with sharp geometric grid constraints.",
    tags: ["Posters", "Geometric", "Vector"],
  },
  {
    id: "g-05",
    title: "Vector Packaging Artwork System",
    category: "PACKAGING",
    mediaType: "image",
    image: "/posters/poster-vector.jpeg",
    year: "2026",
    ratio: "4/5",
    description: "Precision vector recreation, die-cuts, and label documentation.",
    tags: ["Vector", "Dieline"],
  },
  {
    id: "g-06",
    title: "Blue Cyanotype Duotone Print Study",
    category: "STUDIES",
    mediaType: "image",
    image: "/posters/poster-duotone.png",
    year: "2026",
    ratio: "1/1",
    description: "High-contrast duotone tonal balance and digital cyanotype aesthetic.",
    tags: ["Cyanotype", "Duotone"],
  },
  {
    id: "g-07",
    title: "Motion Reel & Kinetic Rhythm 2026",
    category: "MOTION",
    mediaType: "video",
    image: "/posters/poster-screenprint.jpeg",
    videoUrl: "/video/reel-main.mp4",
    year: "2026",
    ratio: "16/9",
    description: "High-energy compilation of kinetic branding, 3D physics experiments, and motion graphics.",
    tags: ["Motion", "Video", "Reel"],
  },
];

function getImageUrl(itemImage?: { asset?: { url?: string } } | string): string {
  if (!itemImage) return "/posters/poster-cereal.jpeg";
  if (typeof itemImage === "string") return itemImage;
  return itemImage.asset?.url || "/posters/poster-cereal.jpeg";
}

export default function GraphicWork({
  initialSamples = [],
}: {
  initialSamples?: WorkSampleItem[];
}) {
  const items =
    initialSamples && initialSamples.length > 0
      ? initialSamples
      : DEFAULT_GRAPHIC_ITEMS;

  // Extract unique categories for filter pills
  const availableCategories = Array.from(
    new Set(items.map((i) => i.category.toUpperCase()))
  );
  const FILTERS = ["ALL", ...availableCategories];

  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedItem, setSelectedItem] = useState<WorkSampleItem | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Reset slide when opening new item
  const openModal = useCallback((item: WorkSampleItem) => {
    setSelectedItem(item);
    setActiveSlide(0);
  }, []);

  // Keyboard navigation & body scroll lock for modal & carousel
  useEffect(() => {
    if (!selectedItem) return;

    // Lock background page scroll
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const slidesCount =
      selectedItem.gallery && selectedItem.gallery.length > 0
        ? selectedItem.gallery.length
        : 1;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowRight") {
        setActiveSlide((prev) => (prev + 1) % slidesCount);
      } else if (e.key === "ArrowLeft") {
        setActiveSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedItem]);

  const filteredItems =
    activeFilter === "ALL"
      ? items
      : items.filter(
          (item) => item.category.toUpperCase() === activeFilter.toUpperCase()
        );

  // Modal active media calculation
  const isVideo =
    selectedItem?.mediaType === "video" ||
    !!selectedItem?.videoUrl ||
    !!selectedItem?.videoFile;

  const videoSrc =
    selectedItem?.videoFile?.asset?.url || selectedItem?.videoUrl || "";

  const slides =
    selectedItem?.gallery && selectedItem.gallery.length > 0
      ? selectedItem.gallery.map((g) => ({
          url: g.asset?.url || getImageUrl(selectedItem.image),
          caption: g.caption || selectedItem.description || "",
          alt: g.alt || selectedItem.title,
        }))
      : selectedItem
      ? [
          {
            url: getImageUrl(selectedItem.image),
            caption: selectedItem.description || "",
            alt: selectedItem.title,
          },
        ]
      : [];

  const currentSlide = slides[activeSlide] || slides[0];

  return (
    <section
      className="section section-stage"
      id="graphic-work"
      style={{
        backgroundColor: "#F4F2EE",
        color: "#141516",
        paddingTop: "clamp(2rem, 3.5vh, 3rem)",
        paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
      }}
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="sec-head" style={{ marginBottom: "clamp(1.5rem, 3vh, 2.2rem)" }}>
          <p className="label" style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>
            04 — WORK SAMPLES ARCHIVE
          </p>
          <TextReveal as="h2" className="display-1">
            Work samples
            <br />
            & graphics<span className="accent">.</span>
          </TextReveal>
          <p className="body-copy" style={{ maxWidth: "42ch", marginTop: "1rem" }}>
            Visual artifacts, logos, packaging dielines, and print explorations. Click any sample to expand into an interactive multi-slide carousel or motion playback.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "clamp(2rem, 4vh, 3.5rem)",
          }}
          role="tablist"
          aria-label="Filter graphic work"
        >
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            const count =
              f === "ALL"
                ? items.length
                : items.filter((i) => i.category.toUpperCase() === f.toUpperCase()).length;

            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                role="tab"
                aria-selected={isActive}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 18px",
                  borderRadius: "24px",
                  border: isActive ? "1px solid #141516" : "1px solid rgba(20, 21, 22, 0.12)",
                  backgroundColor: isActive ? "#141516" : "transparent",
                  color: isActive ? "#F4F2EE" : "#141516",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                <span>{f}</span>
                <span
                  style={{
                    fontSize: "9px",
                    opacity: isActive ? 0.75 : 0.45,
                  }}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid of Work Samples */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "clamp(20px, 3vw, 32px)",
          }}
        >
          <AnimatePresence>
            {filteredItems.map((item) => {
              const coverImg = getImageUrl(item.image);
              const hasMultiple = item.gallery && item.gallery.length > 1;
              const hasVideo =
                item.mediaType === "video" || !!item.videoUrl || !!item.videoFile;

              return (
                <motion.div
                  layout
                  key={item._id || item.id || item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => openModal(item)}
                  style={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(20, 21, 22, 0.08)",
                    boxShadow: "0 8px 24px -10px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
                  }}
                  whileHover={{ y: -6, boxShadow: "0 18px 36px -12px rgba(0,0,0,0.12)" }}
                >
                  {/* Thumbnail Viewport */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "320px",
                      backgroundColor: "#16181A",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={coverImg}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />

                    {/* Format Badge (Carousel or Video) */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "14px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 12px",
                        borderRadius: "14px",
                        backgroundColor: "rgba(10, 12, 11, 0.82)",
                        backdropFilter: "blur(8px)",
                        color: "#FFE862",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        zIndex: 2,
                      }}
                    >
                      {hasVideo ? (
                        <span>▶ VIDEO CLIP</span>
                      ) : hasMultiple ? (
                        <span>📸 CAROUSEL ({item.gallery?.length})</span>
                      ) : (
                        <span>VIEW ARTIFACT</span>
                      )}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div
                    style={{
                      padding: "18px 22px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "rgba(20, 21, 22, 0.5)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      <span>{item.category}</span>
                      <span>{item.year || "2026"}</span>
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        lineHeight: 1.25,
                        color: "#141516",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {item.title}
                    </h3>

                    {item.description && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.85rem",
                          lineHeight: 1.45,
                          color: "rgba(20, 21, 22, 0.65)",
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-Screen Interactive Modal (Carousel or Video) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              backgroundColor: "rgba(10, 12, 11, 0.94)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(1rem, 3vw, 2.5rem)",
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedItem.title}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "960px",
                width: "100%",
                maxHeight: "92vh",
                backgroundColor: "#16181A",
                borderRadius: "28px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 30px 70px rgba(0, 0, 0, 0.6)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Modal Top Bar */}
              <div
                style={{
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#FFF8E2",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "10px",
                      color: "#FFE862",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {selectedItem.category} // {selectedItem.year || "2026"}
                  </span>
                  <h4 style={{ margin: "2px 0 0 0", fontSize: "1.15rem", fontWeight: 700 }}>
                    {selectedItem.title}
                  </h4>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  {slides.length > 1 && !isVideo && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "11px",
                        color: "rgba(255, 255, 255, 0.6)",
                        fontWeight: 600,
                      }}
                    >
                      SLIDE {activeSlide + 1} / {slides.length}
                    </span>
                  )}
                  <button
                    onClick={() => setSelectedItem(null)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      backgroundColor: "#FFE862",
                      color: "#141516",
                      border: "none",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Close [✕]
                  </button>
                </div>
              </div>

              {/* Modal Media Body */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(380px, 58vh, 580px)",
                  backgroundColor: "#0d0e10",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isVideo ? (
                  /* Video Player */
                  <video
                    src={videoSrc}
                    controls
                    autoPlay
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      maxHeight: "100%",
                    }}
                  />
                ) : (
                  /* Interactive Carousel / Image Viewport */
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {currentSlide && (
                      <Image
                        key={currentSlide.url}
                        src={currentSlide.url}
                        alt={currentSlide.alt || selectedItem.title}
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    )}

                    {/* Carousel Navigation Arrows */}
                    {slides.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setActiveSlide(
                              (prev) => (prev - 1 + slides.length) % slides.length
                            )
                          }
                          style={{
                            position: "absolute",
                            left: "18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(20, 22, 24, 0.75)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            color: "#FFFFFF",
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            zIndex: 10,
                            transition: "background-color 0.2s ease",
                          }}
                          aria-label="Previous Slide"
                        >
                          ←
                        </button>

                        <button
                          onClick={() =>
                            setActiveSlide((prev) => (prev + 1) % slides.length)
                          }
                          style={{
                            position: "absolute",
                            right: "18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(20, 22, 24, 0.75)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            color: "#FFFFFF",
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            zIndex: 10,
                            transition: "background-color 0.2s ease",
                          }}
                          aria-label="Next Slide"
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Bottom Bar: Captions, Carousel Dots, and Tags */}
              <div
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: "#16181A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      color: "rgba(255, 255, 255, 0.85)",
                      fontSize: "0.9rem",
                      lineHeight: 1.45,
                    }}
                  >
                    {!isVideo && currentSlide.caption
                      ? currentSlide.caption
                      : selectedItem.description}
                  </p>
                </div>

                {/* Carousel Dots */}
                {!isVideo && slides.length > 1 && (
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    {slides.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveSlide(dotIdx)}
                        style={{
                          width: dotIdx === activeSlide ? "22px" : "8px",
                          height: "8px",
                          borderRadius: "4px",
                          backgroundColor:
                            dotIdx === activeSlide ? "#FFE862" : "rgba(255, 255, 255, 0.25)",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                        }}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
