import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import SiteFooter from "@/components/SiteFooter";
import { categoryItems, featuredProducts, siteConfig, weeklyWorks } from "@/data/site";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import Link from "next/link";

const footerWhatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  "Hola! Quiero consultar una pieza de Nora Makovitz."
);

export default function Home() {
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
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ width: "fit-content", marginBottom: "0.75rem", padding: "0.22rem 0.56rem", border: "1px solid var(--color-border)", borderRadius: "999px", color: "var(--color-text-muted)", fontSize: "0.74rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Colección</p>
              <h2 id="categories-title" className="section-title">Colección</h2>
              <p className="section-subtitle">Bolsos, carteras y organizadores para uso diario.</p>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: 0, listStyle: "none", marginTop: "1rem" }}>
                <li style={{ color: "var(--color-text-muted)", fontSize: "0.84rem" }}>Hecho a mano</li>
                <li style={{ color: "var(--color-text-muted)", fontSize: "0.84rem" }}>Uso real</li>
                <li style={{ color: "var(--color-text-muted)", fontSize: "0.84rem" }}>Producción limitada</li>
              </ul>
            </div>

            <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
              {categoryItems.map((item) => (
                <CategoryCard
                  key={item.slug}
                  item={item}
                  ctaUrl={item.slug !== "bolsos" ? "#" : `/tienda/${item.slug}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="featured-title">
          <div className="container">
            <p style={{ width: "fit-content", marginBottom: "0.75rem", padding: "0.22rem 0.56rem", border: "1px solid var(--color-border)", borderRadius: "999px", color: "var(--color-text-muted)", fontSize: "0.74rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Selección</p>
            <h2 id="featured-title" className="section-title">Modelos seleccionados</h2>
            <p className="section-subtitle">Nombre claro, uso real y compra simple.</p>

            <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {featuredProducts.slice(0, 3).map((item) => (
                <FeaturedProductCard
                  key={item.slug}
                  item={item}
                  ctaUrl={`/producto/${item.slug}`}
                />
              ))}
            </div>

            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <Link href="/tienda" className="btn btn-primary">
                Ver más
              </Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="weekly-title">
          <div className="container">
            <p style={{ width: "fit-content", marginBottom: "0.75rem", padding: "0.22rem 0.56rem", border: "1px solid var(--color-border)", borderRadius: "999px", color: "var(--color-text-muted)", fontSize: "0.74rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Confianza</p>
            <h2 id="weekly-title" className="section-title">Confianza</h2>
            <p className="section-subtitle">Información clara para comprar sin dudas.</p>

            <ol className="trust-flow" aria-label="Recorrido de compra">
              {weeklyWorks.map((item, index) => (
                <li key={item.title} className="trust-step">
                  <div className="trust-index-wrap">
                    <p className="trust-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <span className="trust-tooltip" role="tooltip">{item.note}</span>
                  </div>
                  <h3 className="trust-title">{item.title}</h3>
                </li>
              ))}
            </ol>

            <div style={{ marginTop: "1.5rem" }}>
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

        <section className="section" aria-labelledby="reinforcement-title">
          <div className="container">
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "var(--color-surface)", padding: "2rem", boxShadow: "var(--shadow-sm)" }}>
              <h2 id="reinforcement-title" className="section-title">Hecho para durar</h2>
              <p className="section-subtitle">Hecho a mano - Producción limitada - Sin intermediarios.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        brand={siteConfig.brand}
        instagram={siteConfig.instagram}
        instagramHandle={siteConfig.instagramHandle}
        whatsappUrl={footerWhatsappUrl}
      />
    </>
  );
}
