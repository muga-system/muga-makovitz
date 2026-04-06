import { products, getProductBySlug } from "@/data/products";
import { siteConfig } from "@/data/site";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { formatArs } from "@/utils/format";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductDetailClient from "./ProductDetailClient";
import ProductImageGalleryClient from "./ProductImageGalleryClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products
    .filter((product) => product.active)
    .map((product) => ({ slug: product.slug }));
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const detailImages = product?.images?.length ? product.images : [siteConfig.assets.heroImage];
  const categoryLabel = `${product.category.charAt(0).toUpperCase()}${product.category.slice(1)}`;

  const footerWhatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    `Hola! Quiero consultar ${product.name} de Nora Makovitz.`
  );

  const getStockLabel = (stock: number): string => {
    if (stock <= 0) return "Sin stock";
    if (stock <= 2) return `Últimas unidades (${stock})`;
    return `Disponible (${stock})`;
  };

  return (
    <>
      <Navbar />
      
      <main id="contenido" className="section detail-page-section">
        <div className="container detail-layout">
          <nav className="detail-breadcrumb" aria-label="Breadcrumb">
            <ol className="detail-breadcrumb-list detail-breadcrumb-list-mobile">
              <li><Link href="/tienda">Tienda</Link></li>
              <li className="detail-breadcrumb-current" aria-current="page">{product.name}</li>
            </ol>

            <ol className="detail-breadcrumb-list detail-breadcrumb-list-desktop">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/tienda">Tienda</Link></li>
              <li><Link href={`/tienda/${product.category}`}>{categoryLabel}</Link></li>
              <li className="detail-breadcrumb-current" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <figure className="detail-figure">
            <ProductImageGalleryClient images={detailImages} productName={product.name} />
          </figure>

          <div className="detail-content">
            <p className="detail-category">
              {product.category}
            </p>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-price">{formatArs(product.price)}</p>
            <p className="detail-description">{product.description}</p>

            <div className="detail-usage-box">
              <p className="detail-usage-title">¿Para quién es?</p>
              <p className="detail-usage-copy">{product.use}</p>
            </div>

            <div className="detail-features">
              <h2 className="detail-features-title">Características</h2>
              <ul className="detail-features-list">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <p className="detail-close-copy">{product.close}</p>

            <p className={`detail-stock ${product.stock > 0 ? "detail-stock-ok" : "detail-stock-out"}`}>
              {getStockLabel(product.stock)}
            </p>

            <ProductDetailClient product={product} />
          </div>
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
