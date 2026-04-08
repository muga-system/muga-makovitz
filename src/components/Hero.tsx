"use client";

import Link from "next/link";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/utils/image";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

interface HeroProps {
  brand: string;
  heading: string;
  subtext: string;
  reinforcement?: string;
  heroImageSrc: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export default function Hero({
  brand,
  heading,
  subtext,
  reinforcement,
  heroImageSrc,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-badge">Bolsos</p>
          <h1>{heading}</h1>
          <p className="hero-copy">{subtext}</p>
          {reinforcement ? <p className="hero-reinforcement">{reinforcement}</p> : null}
          <div className="hero-actions">
            <Link href={primaryCta.href} className="btn btn-primary">
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className="btn btn-secondary">
              {secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <ImageWithSkeleton
            src={heroImageSrc}
            alt={brand}
            className="hero-photo"
            wrapperClassName="hero-photo-shell"
            width={1200}
            height={900}
            quality={IMAGE_QUALITY.hero}
            sizes={IMAGE_SIZES.hero}
            priority
          />
        </div>
      </div>
    </section>
  );
}
