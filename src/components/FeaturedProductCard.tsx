"use client";

import Link from "next/link";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/utils/image";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

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
  const [family, variant] = item.name.split(" - ");

  return (
    <article className="product-card featured-card">
      <Link href={ctaUrl} className="featured-image-link" aria-label={`Ver ${item.name}`}>
        <ImageWithSkeleton
          src={item.image}
          alt={item.name}
          className="card-image card-image-product featured-image"
          wrapperClassName="featured-image-shell"
          width={800}
          height={800}
          quality={IMAGE_QUALITY.listing}
          sizes={IMAGE_SIZES.productCard}
        />
        <span className="product-badge featured-badge">Bolso</span>
      </Link>

      <div className="featured-content">
        <p className="featured-kicker">Edicion destacada</p>
        <h3 className="card-title featured-title">{family}</h3>
        {variant ? <p className="featured-variant">{variant}</p> : null}
        <p className="card-price featured-price">{item.price}</p>
      </div>

      <Link href={ctaUrl} className="btn btn-primary featured-cta">
        Ver modelo
      </Link>
    </article>
  );
}
