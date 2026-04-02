"use client";

import Link from "next/link";

interface SiteFooterProps {
  brand: string;
  instagram: string;
  instagramHandle: string;
  whatsappUrl: string;
}

export default function SiteFooter({ brand, instagram, instagramHandle, whatsappUrl }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "auto 1fr", alignItems: "center" }}>
            <span className="site-footer-brand">{brand}</span>
            <nav className="site-footer-nav" aria-label="Footer navigation">
              <Link href="/tienda">Tienda</Link>
              <Link href="/carrito">Carrito</Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={instagram} target="_blank" rel="noopener noreferrer">{instagramHandle}</a>
            </nav>
          </div>
          <p className="site-footer-version">
            © {new Date().getFullYear()} {brand}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
