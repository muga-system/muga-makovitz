"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarCompensation = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarCompensation > 0) {
      document.body.style.paddingRight = `${scrollbarCompensation}px`;
    }
    document.body.setAttribute("data-image-modal-open", "true");
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    const raf = window.requestAnimationFrame(() => {
      const media = mediaRef.current;
      if (!media) {
        return;
      }
      media.scrollLeft = Math.max(0, (media.scrollWidth - media.clientWidth) / 2);
      media.scrollTop = Math.max(0, (media.scrollHeight - media.clientHeight) / 2);
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.removeAttribute("data-image-modal-open");
      window.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(raf);
    };
  }, [isModalOpen]);

  if (normalizedImages.length === 0) {
    return null;
  }

  const activeImage = normalizedImages[activeIndex] ?? normalizedImages[0];
  const hasMultipleImages = normalizedImages.length > 1;

  return (
    <>
      <div className="detail-gallery">
        <button
          type="button"
          className="detail-main-image-btn"
          onClick={() => setIsModalOpen(true)}
          aria-label={`Ampliar imagen de ${productName}`}
        >
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
        </button>
        <p className="detail-zoom-hint">Tocá la imagen para ampliar</p>

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

      {typeof document !== "undefined" && isModalOpen
        ? createPortal(
        <div
          className="image-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${productName}`}
          onClick={closeModal}
        >
          <div className="image-modal-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="btn btn-secondary image-modal-close"
              onClick={closeModal}
              aria-label="Cerrar imagen ampliada"
            >
              <X size={18} />
            </button>

            <div ref={mediaRef} className="image-modal-media is-mobile-zoomed">
              <Image
                src={activeImage}
                alt={`${productName} ampliada`}
                width={2400}
                height={2400}
                quality={100}
                sizes="200vw"
                className="image-modal-image"
                priority
              />
            </div>
          </div>
        </div>,
        document.body
      )
        : null}
    </>
  );
}
