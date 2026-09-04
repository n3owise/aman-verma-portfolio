"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

interface FigmaMotionBadgeProps {
  style?: React.CSSProperties | any;
  className?: string;
}

export default function FigmaMotionBadge({
  style,
  className = "",
}: FigmaMotionBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHoveredRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.currentTime = 0;
    video.pause();

    const handleEnter = () => {
      isHoveredRef.current = true;
      if (video) {
        video.muted = true;
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    const handleLeave = () => {
      isHoveredRef.current = false;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };

    const handleClick = () => {
      if (video) {
        video.muted = true;
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);
    el.addEventListener("click", handleClick);

    // Runs on a 6s cycle, offset from Claude
    const interval = setInterval(() => {
      if (!isHoveredRef.current && videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 6000);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
      el.removeEventListener("click", handleClick);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`manifesto-3d-badge manifesto-3d-badge--figma ${className}`}
      style={style}
      aria-label="Interactive Figma Motion Badge"
    >
      {/* Ambient Organic Floating Movement */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer pointer-events-auto"
        animate={{
          y: [-7, 7, -7],
          x: [-3, 3, -3],
        }}
        transition={{
          repeat: Infinity,
          duration: 5.4,
          ease: "easeInOut",
        }}
      >
        {/* User's Exact WebM Motion Video (Plays once per hover, frameless & transparent) */}
        <video
          ref={videoRef}
          src="/figma-motion.webm?v=2"
          preload="auto"
          muted
          playsInline
          loop={false}
          onLoadedData={(e) => {
            const v = e.currentTarget;
            v.muted = true;
            v.defaultMuted = true;
            setIsLoaded(true);
          }}
          className="manifesto-figma-video pointer-events-none"
          style={{
            opacity: isLoaded ? 1 : 0.8,
            transition: "opacity 0.2s ease",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
