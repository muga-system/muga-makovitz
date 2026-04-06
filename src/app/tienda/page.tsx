import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import ProductCard from "@/components/ProductCard";

const footerWhatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  "Hola! Quiero consultar una pieza de Nora Makovitz."
);

export default function TiendaPage() {
  const activeProducts = products.filter(p => p.active);

  return (
    <>
      <Navbar />
      
      <main id="contenido">
        <section className="section" aria-labelledby="shop-title">
          <div className="container">
            <div className="shop-header">
              <h1 id="shop-title" className="section-title">Tienda</h1>
              <p className="section-subtitle">Todos los modelos disponibles</p>
            </div>

            <div className="shop-products-grid">
              {activeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
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
