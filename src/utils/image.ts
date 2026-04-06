export const IMAGE_QUALITY = {
  hero: 88,
  listing: 84,
  detailMain: 92,
  detailThumb: 86,
  cartThumb: 82,
} as const;

export const IMAGE_SIZES = {
  hero: "(min-width: 1024px) 50vw, 100vw",
  productCard: "(min-width: 1120px) 33vw, (min-width: 700px) 50vw, 100vw",
  detailMain: "(min-width: 1024px) 50vw, 100vw",
  detailThumb: "(min-width: 1024px) 12vw, 22vw",
  cartThumb: "110px",
} as const;
