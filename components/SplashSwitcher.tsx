"use client";

import { useEffect, useState } from "react";

export default function SplashSwitcher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const replaySplash = () => {
    window.dispatchEvent(new CustomEvent("av-replay-splash"));
  };

  if (!mounted) return null;

  return (
    <aside className="dennis-replay-dock" aria-label="Replay Dennis Snellenberg Splash">
      <button
        type="button"
        className="dennis-replay-btn"
        onClick={replaySplash}
        title="Replay Dennis Snellenberg Curved Splash Animation"
      >
        <span className="dennis-replay-dot" />
        <span>▶ Replay Splash</span>
      </button>
    </aside>
  );
}
