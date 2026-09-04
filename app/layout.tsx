import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import GridOverlay from "@/components/GridOverlay";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import WaveMeshBackground from "@/components/WaveMeshBackground";
import NavigationDrawer from "@/components/NavigationDrawer";
import CustomCursor from "@/components/CustomCursor";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Aman Verma — Graphic Designer, AI Visual Creator & Video Editor",
    template: "%s — Aman Verma",
  },
  description: site.description,
  keywords: [
    "Aman Verma",
    "graphic designer",
    "AI visuals",
    "video editor",
    "brand identity",
    "portfolio",
    "India",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Aman Verma",
    title: "Aman Verma — A Visual World",
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Verma — A Visual World",
    description: site.description,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f1ede4",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: ["Graphic Designer", "AI Visual Creator", "Video Editor"],
  knowsAbout: [
    "Graphic Design",
    "Brand Identity",
    "AI-assisted Imagery",
    "Motion Graphics",
    "Video Editing",
  ],
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <noscript>
          <style>{`.loader,.dennis-loader-container,.cursor{display:none!important}`}</style>
        </noscript>
        <Loader />
        <GridOverlay />
        <WaveMeshBackground />
        <CustomCursor />
        <Providers>
          <NavigationDrawer />
          <div id="content-root" style={{ position: "relative", width: "100%" }}>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
