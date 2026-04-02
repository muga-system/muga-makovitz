"use client";

import Link from "next/link";
import { Package } from "lucide-react";

interface CategoryCardProps {
  item: {
    name: string;
    meta: string;
    cta: string;
    slug: string;
    image: string;
  };
  ctaUrl: string;
}

export default function CategoryCard({ item, ctaUrl }: CategoryCardProps) {
  const isComingSoon = item.slug !== "bolsos";
  
  return (
    <article className={`category-card ${isComingSoon ? "category-coming-soon" : ""}`}>
      <div className="category-icon">
        <Package size={24} />
      </div>
      <h3 className="card-title">{item.name}</h3>
      <p className="card-meta">{item.meta}</p>
      <Link href={ctaUrl} className="btn btn-secondary" style={{ width: "100%" }}>
        {isComingSoon ? "Pronto" : item.cta}
      </Link>
    </article>
  );
}
