"use client";

import Link from "next/link";
import { Handbag, Package, Volleyball } from "lucide-react";

interface CategoryCardProps {
  item: {
    name: string;
    meta: string;
    cta: string;
    slug: string;
  };
  ctaUrl: string;
}

export default function CategoryCard({ item, ctaUrl }: CategoryCardProps) {
  const isComingSoon = ctaUrl === "#";
  const Icon = item.slug === "bordados" ? Volleyball : item.slug === "bolsos" ? Handbag : Package;
  
  return (
    <article className={`category-card ${isComingSoon ? "category-coming-soon" : ""}`}>
      <div className="category-icon">
        <Icon size={24} />
      </div>
      <h3 className="card-title">{item.name}</h3>
      <p className="card-meta">{item.meta}</p>
      <Link href={ctaUrl} className="btn btn-secondary card-cta">
        {isComingSoon ? "Pronto" : item.cta}
      </Link>
    </article>
  );
}
