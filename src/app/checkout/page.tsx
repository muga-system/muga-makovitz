import { siteConfig } from "@/data/site";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import CheckoutClient from "./CheckoutClient";
import Link from "next/link";

const footerWhatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  "Hola! Quiero consultar una pieza de Nora Makovitz."
);

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      
      <main id="contenido" className="section section-compact-top">
        <div className="container">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <ol className="detail-breadcrumb-list">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/carrito">Carrito</Link></li>
              <li className="detail-breadcrumb-current" aria-current="page">Finalizar compra</li>
            </ol>
          </nav>

          <h1 className="section-title page-title-tight">Finalizar compra</h1>
          <p className="section-subtitle page-subtitle-spaced">Completá tus datos para confirmar el pedido</p>
          
          <CheckoutClient />
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
