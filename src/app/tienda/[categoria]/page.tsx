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
        <section className="section section-compact-top" aria-labelledby="shop-title">
          <div className="container">
            <nav className="page-breadcrumb" aria-label="Breadcrumb">
              <ol className="detail-breadcrumb-list">
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/tienda">Tienda</Link></li>
                <li className="detail-breadcrumb-current" aria-current="page">{categoryLabel}</li>
              </ol>
            </nav>

            <div className="shop-header">
              <h1 id="shop-title" className="section-title">{categoryLabel}</h1>
              <p className="section-subtitle">{activeProducts.length} modelo{activeProducts.length !== 1 ? "s" : ""} disponible{activeProducts.length !== 1 ? "s" : ""}</p>
            </div>

            <div className="category-filter">
              <Link href="/tienda" className="filter-chip">
                Todos
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.slug} 
                  href={`/tienda/${cat.slug}`} 
                  className={`filter-chip ${categoria === cat.slug ? "is-active" : ""}`}
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
              <div className="state-loading">
                <p>No hay productos disponibles en esta categoría.</p>
                <Link href="/tienda" className="btn btn-primary state-empty-cta">
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
