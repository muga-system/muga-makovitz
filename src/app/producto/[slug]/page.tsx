import { products, getProductBySlug } from "@/data/products";
import { siteConfig } from "@/data/site";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { formatArs } from "@/utils/format";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import Image from "next/image";

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

  const detailImages = (() => {
    const base = product?.images?.length ? [...product.images] : [siteConfig.assets.heroImage];
    while (base.length < 4) {
      base.push(base[0]);
    }
    return base.slice(0, 4);
  })();

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
      
      <main id="contenido" className="section">
        <div className="container" style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "1fr", alignItems: "start" }}>
          <figure style={{ margin: 0 }}>
            <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "1fr", alignItems: "stretch" }}>
              <Image
                id="detail-main-image"
                src={detailImages[0]}
                alt={product.name}
                width={1200}
                height={1500}
                style={{ 
                  width: "100%", 
                  aspectRatio: "auto", 
                  maxHeight: "500px", 
                  objectFit: "cover", 
                  borderRadius: "var(--radius-lg)", 
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-md)"
                }}
              />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {detailImages.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    style={{ 
                      padding: 0, 
                      border: "1px solid var(--color-border)", 
                      borderRadius: "12px", 
                      overflow: "hidden", 
                      background: "transparent", 
                      cursor: "pointer",
                      opacity: index === 0 ? 1 : 0.75
                    }}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} vista ${index + 1}`}
                      width={220}
                      height={220}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </figure>

          <div style={{ display: "grid", gap: "1rem" }}>
            <p style={{ letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
              {product.category}
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1.1 }}>{product.name}</h1>
            <p className="detail-price" style={{ fontSize: "1.1rem", fontWeight: 700 }}>{formatArs(product.price)}</p>
            <p style={{ color: "var(--color-text-muted)", maxWidth: "52ch" }}>{product.description}</p>

            <div style={{ display: "grid", gap: "0.5rem", padding: "1rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }}>
              <p style={{ fontWeight: 600 }}>¿Para quién es?</p>
              <p style={{ color: "var(--color-text-muted)" }}>{product.use}</p>
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", lineHeight: 1.2 }}>Características</h2>
              <ul style={{ display: "grid", gap: "0.5rem", paddingLeft: "1.1rem", color: "var(--color-text-muted)" }}>
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <p style={{ color: "var(--color-text)", fontWeight: 500, maxWidth: "52ch" }}>{product.close}</p>

            <p style={{ 
              fontSize: product.stock > 0 ? "0.9rem" : "0.9rem", 
              color: product.stock > 0 ? "var(--color-primary-strong)" : "#9d5a5a",
              fontWeight: 500
            }}>
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
