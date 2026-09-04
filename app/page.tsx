import { client } from "@/lib/sanity/client";
import {
  FEATURED_PROJECTS_QUERY,
  WORK_SAMPLES_QUERY,
} from "@/lib/sanity/queries";
import Hero from "@/components/sections/Hero";
import PortraitStage from "@/components/sections/PortraitStage";
import SelectedWork from "@/components/sections/SelectedWork";
import GraphicWork from "@/components/sections/GraphicWork";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Immediate real-time rendering on every refresh

export default async function HomePage() {
  // Fetch from Sanity Content Lake
  let featuredProjects: any[] = [];
  let workSamples: any[] = [];

  try {
    [featuredProjects, workSamples] = await Promise.all([
      client.fetch(FEATURED_PROJECTS_QUERY),
      client.fetch(WORK_SAMPLES_QUERY),
    ]);
  } catch (err) {
    console.warn("Could not fetch Sanity documents for HomePage:", err);
  }

  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* 1. Hero Screen (Name Headline & Identity) */}
      <Hero />

      {/* 2. Portrait Screen (Full Portrait Stage) */}
      <PortraitStage />

      {/* 3. Selected Work (2 Hero Case Studies with Wipe) */}
      <SelectedWork initialProjects={featuredProjects} />

      {/* 4. Work Samples (Grid with Carousel / Video Lightbox) */}
      <GraphicWork initialSamples={workSamples} />
    </main>
  );
}
