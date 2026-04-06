import { siteConfig } from "@/data/site";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import CartClient from "./CartClient";
import Link from "next/link";

const footerWhatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  "Hola! Quiero consultar una pieza de Nora Makovitz."
);

export default function CarritoPage() {
  return (
    <>
      <Navbar />
      
      <main id="contenido" className="section section-compact-top">
        <div className="container">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <ol className="detail-breadcrumb-list">
              <li><Link href="/">Inicio</Link></li>
              <li className="detail-breadcrumb-current" aria-current="page">Carrito</li>
            </ol>
          </nav>

          <h1 className="section-title page-title-tight">Carrito</h1>
          <p className="section-subtitle page-subtitle-spaced">Resumen de tu compra</p>
          
          <CartClient />
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
