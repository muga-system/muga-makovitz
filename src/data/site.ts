export type CategoryItem = {
  name: string;
  meta: string;
  cta: string;
  slug: string;
  image: string;
};

export type FeaturedProduct = {
  name: string;
  price: string;
  slug: string;
  image: string;
};

export type WeeklyWork = {
  title: string;
  note: string;
  image: string;
};

export const siteConfig = {
  brand: "Nora Makovitz",
  assets: {
    logo: "/logo.png",
    heroImage: "/bolso-simple/original.webp"
  },
  instagram: "https://instagram.com/nora.makovitz",
  instagramHandle: "@nora.makovitz",
  whatsappNumber: "5491150076209",
  canonical: "https://nora-makovitz.vercel.app",
  seo: {
    title: "Nora Makovitz | Bolsos y carteras de tela hechos a mano",
    description:
      "Bolsos y carteras de tela hechos a mano, pensados para el uso diario. Produccion limitada, compra simple y cierre rapido.",
    ogImage: "/og-babushka.svg"
  },
  hero: {
    heading: "Nora Makovitz",
    subtext: "Bolso Ligero: diseñado para acompañarte todos los días",
    reinforcement: "Tela resistente, estampa única, hecho a mano",
    primaryCta: "Comprar ahora",
    secondaryCta: "Ver detalles"
  },
  navLinks: [
    { label: "Tienda", href: "/" },
    { label: "Carrito", href: "/carrito" }
  ]
};

export const categoryItems: CategoryItem[] = [
  {
    name: "Carteras",
    meta: "Livianas, practicas y faciles de llevar",
    cta: "Elegir modelo",
    slug: "carteras",
    image: "/2.webp"
  },
  {
    name: "Bolsos",
    meta: "Mayor capacidad para uso diario",
    cta: "Elegir modelo",
    slug: "bolsos",
    image: "/2.webp"
  },
  {
    name: "Organizadores",
    meta: "Orden simple para cartera o bolso",
    cta: "Elegir modelo",
    slug: "organizadores",
    image: "/2.webp"
  },
  {
    name: "Regalos",
    meta: "Piezas chicas para regalar o uso personal",
    cta: "Elegir modelo",
    slug: "regalos",
    image: "/2.webp"
  }
];

export const featuredProducts: FeaturedProduct[] = [
  { name: "Bolso Ligero - Original", price: "$28.000", slug: "bolso-ligero-original", image: "/bolso-simple/original.webp" },
  { name: "Bolso Ligero - Fresh", price: "$28.000", slug: "bolso-ligero-fresh", image: "/bolso-simple/fresh.webp" },
  { name: "Bolso Ligero - Chic", price: "$28.000", slug: "bolso-ligero-chic", image: "/bolso-simple/chic.webp" },
  { name: "Bolso Ligero - Organic", price: "$28.000", slug: "bolso-ligero-organic", image: "/bolso-simple/organic.webp" },
  { name: "Bolso Ligero - Magnolia", price: "$28.000", slug: "bolso-ligero-magnolia", image: "/bolso-simple/magnolia.webp" }
];

export const weeklyWorks: WeeklyWork[] = [
  {
    title: "Original",
    note: "El clasico atemporal",
    image: "/bolso-simple/original.webp"
  },
  {
    title: "Fresh",
    note: "Energia y vitalidad",
    image: "/bolso-simple/fresh.webp"
  },
  {
    title: "Chic",
    note: "Elegancia moderna",
    image: "/bolso-simple/chic.webp"
  },
  {
    title: "Organic",
    note: "Naturaleza pura",
    image: "/bolso-simple/organic.webp"
  },
  {
    title: "Magnolia",
    note: "Delicadeza floral",
    image: "/bolso-simple/magnolia.webp"
  }
];
