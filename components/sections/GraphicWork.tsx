"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type WorkSampleItem = {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  category: string;
  mediaType?: "image" | "video" | "pdf";
  pdfFile?: {
    asset?: {
      url?: string;
    };
  };
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
    category: "Packaging",
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
  },
  {
    id: "g-02",
    title: "Vintage Screenprint & Halftone Study",
    category: "Screenprint",
    mediaType: "image",
    image: "/posters/poster-screenprint.jpeg",
    gallery: [
      { asset: { url: "/posters/poster-screenprint.jpeg" }, caption: "Analog halftone texture pass" },
      { asset: { url: "/posters/poster-duotone.png" }, caption: "Macro halftone dot grid detail" },
    ],
    year: "2026",
    ratio: "3/4",
    description: "Analog halftone texture pass and tactile print distress overlay.",
  },
  {
    id: "g-03",
    title: "Farmest Makhana Luxury Carton Specimen",
    category: "Packaging",
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
  },
  {
    id: "g-04",
    title: "Geometric Flat Character Series",
    category: "Posters",
    mediaType: "image",
    image: "/posters/poster-geometric.jpeg",
    gallery: [
      { asset: { url: "/posters/poster-geometric.jpeg" }, caption: "Primary character poster" },
      { asset: { url: "/posters/poster-duotone.png" }, caption: "Negative space study" },
    ],
    year: "2026",
    ratio: "3/4",
    description: "Minimal vector character explorations with sharp geometric grid constraints.",
  },
  {
    id: "g-05",
    title: "Vector Packaging Artwork System",
    category: "Packaging",
    mediaType: "image",
    image: "/posters/poster-vector.jpeg",
    year: "2026",
    ratio: "4/5",
    description: "Precision vector recreation, die-cuts, and label documentation.",
  },
  {
    id: "g-06",
    title: "Blue Cyanotype Duotone Print Study",
    category: "Studies",
    mediaType: "image",
    image: "/posters/poster-duotone.png",
    year: "2026",
    ratio: "1/1",
    description: "High-contrast duotone tonal balance and digital cyanotype aesthetic.",
  },
  {
    id: "g-07",
    title: "Motion Reel & Kinetic Rhythm",
    category: "Motion",
    mediaType: "video",
    image: "/posters/poster-screenprint.jpeg",
    videoUrl: "/video/reel-main.mp4",
    year: "2026",
    ratio: "16/9",
    description: "Compilation of kinetic branding, 3D physics experiments, and motion graphics.",
  },
];

// Helper: load Mozilla PDF.js dynamically
let pdfjsPromise: Promise<any> | null = null;
function loadPdfJs(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject("SSR");
  if ((window as unknown as { pdfjsLib?: any }).pdfjsLib) {
    return Promise.resolve((window as unknown as { pdfjsLib: any }).pdfjsLib);
  }
  if (!pdfjsPromise) {
    pdfjsPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.async = true;
      script.onload = () => {
        const pdfjs = (window as unknown as { pdfjsLib?: any }).pdfjsLib;
        if (pdfjs) {
          pdfjs.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          resolve(pdfjs);
        } else {
          reject(new Error("pdfjsLib not found"));
        }
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return pdfjsPromise;
}

// PDF Canvas Slide Component for Modal Carousel
function PdfSlideCanvas({ url, pageNumber }: { url: string; pageNumber: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    let renderTask: any = null;

    setLoading(true);
    loadPdfJs()
      .then((pdfjs) => pdfjs.getDocument(url).promise)
      .then((pdfDoc) => pdfDoc.getPage(pageNumber))
      .then((page) => {
        if (isCancelled || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 2 : 2;
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(
          (960 / unscaledViewport.width) * 1.35,
          (600 / unscaledViewport.height) * 1.35
        );
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        renderTask = page.render({ canvasContext: ctx, viewport });
        return renderTask.promise;
      })
      .then(() => {
        if (!isCancelled) setLoading(false);
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error("PDF render error:", err);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
      if (renderTask && renderTask.cancel) renderTask.cancel();
    };
  }, [url, pageNumber]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && (
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "12px",
            letterSpacing: "0.06em",
          }}
        >
          LOADING SLIDE {pageNumber}...
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: loading ? "none" : "block",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          borderRadius: "8px",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.45)",
        }}
      />
    </div>
  );
}

// PDF Thumbnail for Grid (Renders Page 1 if no custom cover was uploaded)
function PdfThumbnailCover({ url, title }: { url: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let renderTask: any = null;

    loadPdfJs()
      .then((pdfjs) => pdfjs.getDocument(url).promise)
      .then((pdfDoc) => pdfDoc.getPage(1))
      .then((page) => {
        if (isCancelled || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 2 : 2;
        const unscaled = page.getViewport({ scale: 1 });
        const scale = 360 / unscaled.height;
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.objectFit = "cover";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderTask = page.render({ canvasContext: ctx, viewport });
        return renderTask.promise;
      })
      .then(() => {
        if (!isCancelled) setRendered(true);
      })
      .catch(console.error);

    return () => {
      isCancelled = true;
      if (renderTask && renderTask.cancel) renderTask.cancel();
    };
  }, [url]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#16181A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!rendered && (
        <div
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "11px",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.06em",
          }}
        >
          📄 {title}
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: rendered ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

function getImageUrl(itemImage?: { asset?: { url?: string } } | string): string | null {
  if (!itemImage) return null;
  if (typeof itemImage === "string") return itemImage;
  return itemImage.asset?.url || null;
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

  const [selectedItem, setSelectedItem] = useState<WorkSampleItem | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [pdfPageCount, setPdfPageCount] = useState<number>(1);

  // Open modal and reset slide
  const openModal = useCallback((item: WorkSampleItem) => {
    setSelectedItem(item);
    setActiveSlide(0);
  }, []);

  // Determine media type
  const isVideo =
    selectedItem?.mediaType === "video" ||
    !!selectedItem?.videoUrl ||
    !!selectedItem?.videoFile;

  const isPdf =
    selectedItem?.mediaType === "pdf" || !!selectedItem?.pdfFile?.asset?.url;

  const pdfUrl = selectedItem?.pdfFile?.asset?.url || "";

  // Load PDF page count when PDF modal opens
  useEffect(() => {
    if (!selectedItem || !isPdf || !pdfUrl) {
      setPdfPageCount(1);
      return;
    }

    loadPdfJs()
      .then((pdfjs) => pdfjs.getDocument(pdfUrl).promise)
      .then((pdf) => {
        setPdfPageCount(pdf.numPages || 1);
      })
      .catch(console.error);
  }, [selectedItem, isPdf, pdfUrl]);

  // Keyboard navigation & body scroll lock for modal
  useEffect(() => {
    if (!selectedItem) return;

    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const totalSlides = isPdf
      ? pdfPageCount
      : selectedItem.gallery && selectedItem.gallery.length > 0
      ? selectedItem.gallery.length
      : 1;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowRight") {
        setActiveSlide((prev) => (prev + 1) % totalSlides);
      } else if (e.key === "ArrowLeft") {
        setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedItem, isPdf, pdfPageCount]);

  const videoSrc =
    selectedItem?.videoFile?.asset?.url || selectedItem?.videoUrl || "";

  const slides =
    selectedItem?.gallery && selectedItem.gallery.length > 0
      ? selectedItem.gallery.map((g) => ({
          url: g.asset?.url || getImageUrl(selectedItem.image) || "/posters/poster-cereal.jpeg",
          caption: g.caption || selectedItem.description || "",
          alt: g.alt || selectedItem.title,
        }))
      : selectedItem
      ? [
          {
            url: getImageUrl(selectedItem.image) || "/posters/poster-cereal.jpeg",
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
        paddingTop: "clamp(3rem, 6vh, 5rem)",
        paddingBottom: "clamp(4rem, 8vh, 6rem)",
        minHeight: "100vh",
      }}
    >
      <div
        className="wrap"
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3.5rem)",
        }}
      >
        {/* Clean, Consistent Header */}
        <div style={{ marginBottom: "clamp(2rem, 4.5vh, 3.5rem)" }}>
          <span
            style={{
              backgroundColor: "#FFE862",
              color: "#141516",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              padding: "5px 12px",
              borderRadius: "6px",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "1.2rem",
            }}
          >
            WORK SAMPLES
          </span>

          <h2
            style={{
              fontFamily:
                "'Aeonik TRIAL', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 5.5vw, 4.4rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: "#141516",
              margin: 0,
            }}
          >
            GRAPHICS & VISUALS<span style={{ color: "#FFE862" }}>.</span>
          </h2>
        </div>

        {/* Clean Grid of Work Samples */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "clamp(24px, 3.5vw, 36px)",
          }}
        >
          {items.map((item) => {
            const coverImg = getImageUrl(item.image);
            const itemIsPdf =
              item.mediaType === "pdf" || !!item.pdfFile?.asset?.url;
            const itemPdfUrl = item.pdfFile?.asset?.url;

            return (
              <motion.article
                key={item._id || item.id || item.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openModal(item)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
                whileHover="hover"
              >
                {/* Visual Thumbnail Frame */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "360px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "#E6E3DC",
                    border: "1px solid rgba(20, 21, 22, 0.08)",
                  }}
                >
                  <motion.div
                    style={{ position: "relative", width: "100%", height: "100%" }}
                    variants={{
                      hover: { scale: 1.035 },
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {coverImg ? (
                      <Image
                        src={coverImg}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : itemIsPdf && itemPdfUrl ? (
                      <PdfThumbnailCover url={itemPdfUrl} title={item.title} />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#16181A",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFFFFF",
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "12px",
                        }}
                      >
                        {item.title}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Typography: Title & Category Metadata */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily:
                        "'Aeonik TRIAL', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.2rem",
                      lineHeight: 1.25,
                      color: "#141516",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "rgba(20, 21, 22, 0.45)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.category?.replace(/_/g, " ")} {item.year ? `// ${item.year}` : ""}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Interactive Lightbox / Carousel / Video / PDF Modal */}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "1020px",
                width: "100%",
                maxHeight: "94vh",
                backgroundColor: "#16181A",
                borderRadius: "24px",
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
                    {selectedItem.category?.replace(/_/g, " ")}{" "}
                    {selectedItem.year ? `// ${selectedItem.year}` : ""}
                  </span>
                  <h4
                    style={{
                      margin: "2px 0 0 0",
                      fontFamily:
                        "'Aeonik TRIAL', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "#FFFFFF",
                    }}
                  >
                    {selectedItem.title}
                  </h4>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  {/* Slide Counter for PDF Carousel */}
                  {isPdf && pdfPageCount > 1 && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "11px",
                        color: "rgba(255, 255, 255, 0.6)",
                        fontWeight: 600,
                      }}
                    >
                      PAGE {activeSlide + 1} / {pdfPageCount}
                    </span>
                  )}

                  {/* Slide Counter for Image Gallery */}
                  {!isPdf && slides.length > 1 && !isVideo && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "11px",
                        color: "rgba(255, 255, 255, 0.6)",
                        fontWeight: 600,
                      }}
                    >
                      {activeSlide + 1} / {slides.length}
                    </span>
                  )}

                  {/* Download PDF button if available */}
                  {isPdf && pdfUrl && (
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#FFFFFF",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "11px",
                        fontWeight: 600,
                        textDecoration: "none",
                        letterSpacing: "0.04em",
                      }}
                    >
                      PDF ↗
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedItem(null)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "20px",
                      backgroundColor: "#FFE862",
                      color: "#141516",
                      border: "none",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      cursor: "pointer",
                    }}
                  >
                    CLOSE [✕]
                  </button>
                </div>
              </div>

              {/* Modal Media Body */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(420px, 64vh, 640px)",
                  backgroundColor: "#0d0e10",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isVideo ? (
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
                ) : isPdf && pdfUrl ? (
                  /* Multi-Page PDF Carousel Slide View */
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <PdfSlideCanvas url={pdfUrl} pageNumber={activeSlide + 1} />

                    {/* Navigation Arrows for PDF Slides */}
                    {pdfPageCount > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlide(
                              (prev) => (prev - 1 + pdfPageCount) % pdfPageCount
                            );
                          }}
                          style={{
                            position: "absolute",
                            left: "18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(20, 21, 22, 0.8)",
                            color: "#FFFFFF",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            backdropFilter: "blur(6px)",
                            zIndex: 10,
                          }}
                          aria-label="Previous page"
                        >
                          ←
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlide((prev) => (prev + 1) % pdfPageCount);
                          }}
                          style={{
                            position: "absolute",
                            right: "18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(20, 21, 22, 0.8)",
                            color: "#FFFFFF",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            backdropFilter: "blur(6px)",
                            zIndex: 10,
                          }}
                          aria-label="Next page"
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  /* Standard Image Carousel Viewport */
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlide(
                              (prev) => (prev - 1 + slides.length) % slides.length
                            );
                          }}
                          style={{
                            position: "absolute",
                            left: "18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(20, 21, 22, 0.8)",
                            color: "#FFFFFF",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            backdropFilter: "blur(6px)",
                            zIndex: 10,
                          }}
                          aria-label="Previous slide"
                        >
                          ←
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlide((prev) => (prev + 1) % slides.length);
                          }}
                          style={{
                            position: "absolute",
                            right: "18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(20, 21, 22, 0.8)",
                            color: "#FFFFFF",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            backdropFilter: "blur(6px)",
                            zIndex: 10,
                          }}
                          aria-label="Next slide"
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Caption Footer */}
              {selectedItem.description && (
                <div
                  style={{
                    padding: "14px 24px",
                    backgroundColor: "#16181A",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.9rem",
                    lineHeight: 1.4,
                    fontFamily:
                      "'Aeonik TRIAL', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}
                >
                  {selectedItem.description}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
