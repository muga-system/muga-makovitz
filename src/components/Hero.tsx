"use client";

import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  brand: string;
  heading: string;
  subtext: string;
  reinforcement: string;
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
          <h1>{heading}</h1>
          <p className="hero-copy">{subtext}</p>
          <p className="hero-reinforcement">{reinforcement}</p>
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
          <Image src={heroImageSrc} alt={brand} className="hero-photo" width={1200} height={900} priority />
        </div>
      </div>
    </section>
  );
}
