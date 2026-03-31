export type CategoryItem = {
  name: string;
  meta: string;
  cta: string;
  slug: string;
  image: string;
};

export type Product = {
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
    heroImage: "/2.png"
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
    heading: "Bolsos y carteras de tela hechos a mano",
    subtext: "Disenados para acompanarte todos los dias",
    reinforcement: "Resistentes, simples y durables",
    primaryCta: "Ver coleccion",
    secondaryCta: "Elegir modelo"
  },
  navLinks: [
    { label: "Tienda", href: "/tienda" },
    { label: "Favoritos", href: "/favoritos" },
    { label: "Carrito", href: "/carrito" }
  ]
};

export const categoryItems: CategoryItem[] = [
  {
    name: "Carteras",
    meta: "Livianas, practicas y faciles de llevar",
    cta: "Elegir modelo",
    slug: "carteras",
    image: "/2.png"
  },
  {
    name: "Bolsos",
    meta: "Mayor capacidad para uso diario",
    cta: "Elegir modelo",
    slug: "bolsos",
    image: "/2.png"
  },
  {
    name: "Organizadores",
    meta: "Orden simple para cartera o bolso",
    cta: "Elegir modelo",
    slug: "organizadores",
    image: "/2.png"
  },
  {
    name: "Regalos",
    meta: "Piezas chicas para regalar o uso personal",
    cta: "Elegir modelo",
    slug: "regalos",
    image: "/2.png"
  }
];

export const featuredProducts: Product[] = [
  { name: "Bolso grande de tela resistente", price: "$31.000", slug: "bolso-grande-tela-resistente", image: "/2.png" },
  { name: "Cartera chica de tela", price: "$24.000", slug: "cartera-chica-tela", image: "/2.png" },
  { name: "Bolso mediano de tela", price: "$28.000", slug: "bolso-mediano-de-tela", image: "/2.png" }
];

export const weeklyWorks: WeeklyWork[] = [
  {
    title: "Proceso real",
    note: "Cada pieza se trabaja a mano, sin produccion en serie.",
    image: "/2.png"
  },
  {
    title: "Expectativa clara",
    note: "Las variaciones leves forman parte del trabajo artesanal.",
    image: "/2.png"
  },
  {
    title: "Transparencia",
    note: "Produccion limitada segun disponibilidad de trabajo.",
    image: "/2.png"
  }
];
