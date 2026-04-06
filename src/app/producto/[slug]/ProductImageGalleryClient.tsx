"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/utils/image";

interface ProductImageGalleryClientProps {
  images: string[];
  productName: string;
}

export default function ProductImageGalleryClient({
  images,
  productName,
}: ProductImageGalleryClientProps) {
  const normalizedImages = useMemo(() => {
    const clean = images.filter(Boolean);
    if (clean.length === 0) {
      return [];
    }
    return Array.from(new Set(clean));
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  if (normalizedImages.length === 0) {
    return null;
  }

  const activeImage = normalizedImages[activeIndex] ?? normalizedImages[0];
  const hasMultipleImages = normalizedImages.length > 1;

  return (
    <div className="detail-gallery">
      <div className="detail-main-image-frame" aria-label={`Imagen de ${productName}`}>
          <Image
            id="detail-main-image"
            src={activeImage}
            alt={productName}
            width={1200}
            height={1500}
            quality={IMAGE_QUALITY.detailMain}
            sizes={IMAGE_SIZES.detailMain}
            className="detail-main-image"
          />
      </div>

      {hasMultipleImages ? (
        <div className="detail-thumbs-grid">
          {normalizedImages.map((img, index) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`detail-thumb-btn ${index === activeIndex ? "is-active" : ""}`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} vista ${index + 1}`}
                width={220}
                height={220}
                quality={IMAGE_QUALITY.detailThumb}
                sizes={IMAGE_SIZES.detailThumb}
                className="detail-thumb-image"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
