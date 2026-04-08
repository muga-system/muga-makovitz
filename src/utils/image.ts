export const IMAGE_QUALITY = {
  hero: 90,
  listing: 85,
  detailMain: 95,
  detailThumb: 85,
  cartThumb: 75,
} as const;

export const IMAGE_SIZES = {
  hero: "(min-width: 1024px) 50vw, 100vw",
  productCard: "(min-width: 1120px) 33vw, (min-width: 700px) 50vw, 100vw",
  detailMain: "(min-width: 1024px) 50vw, 100vw",
  detailThumb: "(min-width: 1024px) 12vw, 22vw",
  cartThumb: "110px",
} as const;
