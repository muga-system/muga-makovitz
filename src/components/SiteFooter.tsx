"use client";

import Link from "next/link";

interface SiteFooterProps {
  brand: string;
  instagram: string;
  instagramHandle: string;
  facebook?: string;
  facebookHandle?: string;
  whatsappUrl: string;
}

export default function SiteFooter({
  brand,
  instagram,
  facebook,
  whatsappUrl
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-shell">
        <div className="site-footer-top">
          <div className="site-footer-brand-block">
            <p className="site-footer-kicker">{brand}</p>
            <h2 className="site-footer-title">Hecho para durar</h2>
            <p className="site-footer-claim">Hecho a mano - Produccion limitada - Sin intermediarios.</p>
          </div>

          <div className="site-footer-links-block">
            <p className="site-footer-group-title">Navegacion</p>
            <nav className="site-footer-nav" aria-label="Footer navigation">
              <Link href="/tienda">Ver tienda</Link>
              <Link href="/carrito">Ir al carrito</Link>
            </nav>
          </div>

          <div className="site-footer-social-block">
            <p className="site-footer-group-title">Canales</p>
            <div className="site-footer-social" aria-label="Redes sociales">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">whatsapp</a>
              <a href={instagram} target="_blank" rel="noopener noreferrer">instagram</a>
              {facebook ? (
                <a href={facebook} target="_blank" rel="noopener noreferrer">facebook</a>
              ) : null}
            </div>
          </div>
        </div>

        <p className="site-footer-version">© {year} {brand}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
