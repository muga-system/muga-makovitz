"use client";

import Link from "next/link";
import Image from "next/image";

interface FeaturedProductCardProps {
  item: {
    name: string;
    price: string;
    slug: string;
    image: string;
  };
  ctaUrl: string;
}

export default function FeaturedProductCard({ item, ctaUrl }: FeaturedProductCardProps) {
  return (
    <article className="product-card">
      <Image src={item.image} alt={item.name} className="card-image card-image-product" width={800} height={800} />
      <span className="product-badge">Nuevo</span>
      <h3 className="card-title">{item.name}</h3>
      <p className="card-price">{item.price}</p>
      <Link href={ctaUrl} className="btn btn-primary" style={{ width: "100%" }}>
        Ver modelo
      </Link>
    </article>
  );
}
