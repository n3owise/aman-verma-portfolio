"use client";

import type Lenis from "lenis";

/** Shared handle so overlays (menu) can stop/start smooth scrolling. */
export const lenisStore: { current: Lenis | null } = { current: null };
