import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "Nora Makovitz | Bolsos y carteras de tela hechos a mano",
  description: "Bolsos y carteras de tela hechos a mano, pensados para el uso diario. Produccion limitada, compra simple y cierre rapido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${manrope.variable} ${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
