"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

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
            <ImageWithSkeleton
              src={siteConfig.assets.logo}
              alt={`${brand} logo`}
              width={40}
              height={40}
              className="site-footer-logo"
              wrapperClassName="site-footer-logo-shell"
            />
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

        <div className="site-footer-meta">
          <p className="site-footer-version">{year} {brand}.</p>
          <p className="site-footer-credit">
            {siteConfig.appVersion}{" "}
            <a href={siteConfig.builtBy.url} target="_blank" rel="noopener noreferrer">
              {siteConfig.builtBy.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
