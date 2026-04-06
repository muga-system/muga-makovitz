import { siteConfig } from "@/data/site";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import CartClient from "./CartClient";

const footerWhatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  "Hola! Quiero consultar una pieza de Nora Makovitz."
);

export default function CarritoPage() {
  return (
    <>
      <Navbar />
      
      <main id="contenido" className="section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: "0.5rem" }}>Carrito</h1>
          <p className="section-subtitle" style={{ marginBottom: "2rem" }}>Resumen de tu compra</p>
          
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
