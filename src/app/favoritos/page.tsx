import { siteConfig } from "@/data/site";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import FavoritesClient from "./FavoritesClient";

const footerWhatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  "Hola! Quiero consultar una pieza de Nora Makovitz."
);

export default function FavoritosPage() {
  return (
    <>
      <Navbar />
      
      <main id="contenido" className="section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: "0.5rem" }}>Favoritos</h1>
          <p className="section-subtitle" style={{ marginBottom: "2rem" }}>Productos guardados para después</p>
          
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
