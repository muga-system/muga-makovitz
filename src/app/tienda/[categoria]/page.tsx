import { products, categories } from "@/data/products";
import { siteConfig } from "@/data/site";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface Props {
  params: Promise<{ categoria: string }>;
}

const footerWhatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  "Hola! Quiero consultar una pieza de Nora Makovitz."
);

const availableCategories = new Set(["bolsos", "carteras", "organizadores", "regalos"]);

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const safeCategory = availableCategories.has(categoria) ? categoria : "all";
  const activeProducts = products.filter(p => p.active && (safeCategory === "all" || p.category === safeCategory));

  const categoryLabel = categories.find(c => c.slug === categoria)?.label || categoria;

  return (
    <>
      <Navbar />
      
      <main id="contenido">
        <section className="section" aria-labelledby="shop-title">
          <div className="container">
            <div className="shop-header" style={{ paddingBottom: "1.5rem" }}>
              <h1 id="shop-title" className="section-title">{categoryLabel}</h1>
              <p className="section-subtitle">{activeProducts.length} modelo{activeProducts.length !== 1 ? "s" : ""} disponible{activeProducts.length !== 1 ? "s" : ""}</p>
            </div>

            <div className="category-filter" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <Link href="/tienda" className="filter-chip" style={{ padding: "0 1rem", borderRadius: "999px", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text)", textDecoration: "none" }}>
                Todos
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.slug} 
                  href={`/tienda/${cat.slug}`} 
                  className="filter-chip"
                  style={{ 
                    padding: "0 1rem", 
                    borderRadius: "999px", 
                    border: "1px solid var(--color-border)", 
                    background: categoria === cat.slug ? "var(--color-primary-soft)" : "transparent", 
                    color: "var(--color-text)",
                    textDecoration: "none"
                  }}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            <div className="shop-products-grid">
              {activeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {activeProducts.length === 0 && (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-muted)" }}>
                <p>No hay productos disponibles en esta categoría.</p>
                <Link href="/tienda" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                  Ver todos los productos
                </Link>
              </div>
            )}
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
