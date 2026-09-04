"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function WaveMeshBackground() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname?.startsWith("/variations")) return null;

  return (
    <div
      className="wave-mesh-container"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245, 249, 236, 0.95), transparent 70%), radial-gradient(ellipse 60% 50% at 85% 85%, rgba(204, 218, 184, 0.45), transparent 60%), radial-gradient(ellipse 70% 60% at 15% 95%, rgba(130, 166, 118, 0.3), transparent 70%)",
      }}
    />
  );
}
