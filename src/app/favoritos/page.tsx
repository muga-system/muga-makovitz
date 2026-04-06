import { siteConfig } from "@/data/site";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import FavoritesClient from "./FavoritesClient";
import Link from "next/link";

const footerWhatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  "Hola! Quiero consultar una pieza de Nora Makovitz."
);

export default function FavoritosPage() {
  return (
    <>
      <Navbar />
      
      <main id="contenido" className="section section-compact-top">
        <div className="container">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <ol className="detail-breadcrumb-list">
              <li><Link href="/">Inicio</Link></li>
              <li className="detail-breadcrumb-current" aria-current="page">Favoritos</li>
            </ol>
          </nav>

          <h1 className="section-title page-title-tight">Favoritos</h1>
          <p className="section-subtitle page-subtitle-spaced">Productos guardados para después</p>
          
          <FavoritesClient />
        </div>
      </main>

      <SiteFooter
        brand={siteConfig.brand}
        instagram={siteConfig.instagram}
        instagramHandle={siteConfig.instagramHandle}
        facebook={siteConfig.facebook}
        facebookHandle={siteConfig.facebookHandle}
        whatsappUrl={footerWhatsappUrl}
      />
    </>
  );
}
