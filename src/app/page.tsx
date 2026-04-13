import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import SiteFooter from "@/components/SiteFooter";
import { categoryItems, featuredProducts, siteConfig, weeklyWorks } from "@/data/site";
import { products } from "@/data/products";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import Link from "next/link";

const footerWhatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  "Hola! Quiero consultar una pieza de Nora Makovitz."
);

export default function Home() {
  const activeCategorySlugs = new Set(products.filter((product) => product.active).map((product) => product.category));
  const hasUpcomingCategories = categoryItems.some((item) => !activeCategorySlugs.has(item.slug));

  return (
    <>
      <Navbar />
      
      <Hero
        brand={siteConfig.brand}
        heading={siteConfig.hero.heading}
        subtext={siteConfig.hero.subtext}
        reinforcement={siteConfig.hero.reinforcement}
        heroImageSrc={siteConfig.assets.heroImage}
        primaryCta={{ label: "Ver colección", href: "/tienda" }}
        secondaryCta={{ label: "Elegir modelo", href: "/tienda" }}
      />

      <main id="contenido">
        <section className="section" aria-labelledby="categories-title">
          <div className="container">
            <div className="section-head">
              <p className="section-kicker">Colección</p>
              <h2 id="categories-title" className="section-title">Colección</h2>
              <p className="section-subtitle">Bolsos y bordados hechos a mano para uso diario.</p>
            </div>

            <div className="categories-grid">
              {categoryItems.map((item) => (
                <CategoryCard
                  key={item.slug}
                  item={item}
                  ctaUrl={activeCategorySlugs.has(item.slug) ? `/tienda/${item.slug}` : "#"}
                />
              ))}
            </div>
            {hasUpcomingCategories ? <p className="upcoming-categories-hint">Más categorías próximamente</p> : null}
          </div>
        </section>

        <section className="section" aria-labelledby="featured-title">
          <div className="container">
            <p className="section-kicker">Selección</p>
            <h2 id="featured-title" className="section-title">Modelos seleccionados</h2>
            <p className="section-subtitle">Nombre claro, uso real y compra simple.</p>

            <div className="featured-grid">
              {featuredProducts.slice(0, 3).map((item) => (
                <FeaturedProductCard
                  key={item.slug}
                  item={item}
                  ctaUrl={`/producto/${item.slug}`}
                />
              ))}
            </div>

            <div className="section-cta-center">
              <Link href="/tienda" className="btn btn-primary">
                Ver más
              </Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="weekly-title">
          <div className="container">
            <p className="section-kicker">Confianza</p>
            <h2 id="weekly-title" className="section-title">Confianza</h2>
            <p className="section-subtitle">Información clara para comprar sin dudas.</p>

            <ol className="trust-flow" aria-label="Recorrido de compra">
              {weeklyWorks.map((item, index) => (
                <li key={item.title} className="trust-step">
                  <div className="trust-index-wrap">
                    <p className="trust-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <h3 className="trust-title">{item.title}</h3>
                  <span className="trust-tooltip" role="tooltip">{item.note}</span>
                </li>
              ))}
            </ol>

            <div className="trust-cta-wrap">
              <a
                className="btn btn-secondary"
                href={buildWhatsAppUrl(siteConfig.whatsappNumber, "Hola! Quiero consultar sobre los tiempos y disponibilidad.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar por WhatsApp
              </a>
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
