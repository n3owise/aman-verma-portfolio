"use client";

import { useEffect } from "react";

/* Dev easter egg — ⌘G / Ctrl+G overlays the layout grid, reading the
   live --grid-columns variable. Inspired by the reference site's tooling. */

export default function GridOverlay() {
  useEffect(() => {
    let host: HTMLDivElement | null = null;
    let active = false;

    const build = () => {
      if (!host) return;
      host.innerHTML = "";
      const cols =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--grid-columns") ||
            getComputedStyle(document.documentElement).getPropertyValue("--cols"),
          10
        ) || 12;
      for (let i = 0; i < cols; i += 1) {
        const col = document.createElement("i");
        col.style.cssText = "flex:1;background:rgba(232,80,15,.07);border-inline:1px solid rgba(232,80,15,.12)";
        host.appendChild(col);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "g") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      active = !active;
      if (active) {
        if (!host) {
          host = document.createElement("div");
          host.id = "grid-overlay";
          host.setAttribute("aria-hidden", "true");
          host.style.cssText =
            "position:fixed;inset:0;z-index:1800;pointer-events:none;display:flex;gap:var(--gap);padding-inline:var(--pad)";
          document.body.appendChild(host);
          build();
          window.addEventListener("resize", build);
        }
        host.style.display = "flex";
      } else if (host) {
        host.style.display = "none";
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", build);
      host?.remove();
    };
  }, []);

  return null;
}
