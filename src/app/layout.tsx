import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import { siteConfig } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonical),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  icons: {
    icon: [
      { url: "/logos/logo.png", type: "image/png" },
      { url: "/logos/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logos/logo.png",
    shortcut: "/logos/logo.svg",
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${manrope.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <div id="app-shell">{children}</div>
        <ToastProvider />
        <Analytics />
      </body>
    </html>
  );
}
