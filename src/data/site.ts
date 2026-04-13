import type { Product } from "@/data/products";

export type CategoryItem = {
  name: string;
  meta: string;
  cta: string;
  slug: Product["category"];
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
  appVersion: "v0.1.0",
  builtBy: {
    name: "muga.dev",
    url: "https://muga.dev"
  },
  assets: {
    logo: "/logos/logo.svg",
    logotype: "/logos/logo-tipo.svg",
    heroImage: "/bolso-simple/original.webp"
  },
  instagram: "https://www.instagram.com/babushka.arg/",
  instagramHandle: "@babushka.arg",
  facebook: "https://www.facebook.com/nora.makovitz?locale=es_LA",
  facebookHandle: "Facebook Nora Makovitz",
  whatsappNumber: "5491150076209",
  canonical: "https://muga-makovitz.vercel.app",
  seo: {
    title: "Nora Makovitz | Bolsos y carteras de tela hechos a mano",
    description:
      "Bolsos y carteras de tela hechos a mano, pensados para el uso diario. Produccion limitada, compra simple y cierre rapido.",
    ogImage: "/logos/logo-tipo.png"
  },
  hero: {
    heading: "Nora Makovitz",
    subtext: "Bolso Ligero: diseñado para acompañarte todos los días",
    reinforcement: "",
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
    name: "Bordados",
    meta: "Piezas bordadas de produccion limitada",
    cta: "Elegir modelo",
    slug: "bordados"
  },
  {
    name: "Bolsos",
    meta: "Mayor capacidad para uso diario",
    cta: "Elegir modelo",
    slug: "bolsos"
  },
  {
    name: "Carteras",
    meta: "Livianas, practicas y faciles de llevar",
    cta: "Elegir modelo",
    slug: "carteras"
  },
  {
    name: "Organizadores",
    meta: "Orden simple para cartera o bolso",
    cta: "Elegir modelo",
    slug: "organizadores"
  }
];

export const featuredProducts: FeaturedProduct[] = [
  { name: "Bolso Ligero - Original", price: "$25.000", slug: "bolso-ligero-original", image: "/bolso-simple/original.webp" },
  { name: "Bolso Ligero - Fresh", price: "$25.000", slug: "bolso-ligero-fresh", image: "/bolso-simple/fresh.webp" },
  { name: "Bolso Ligero - Chic", price: "$25.000", slug: "bolso-ligero-chic", image: "/bolso-simple/chic.webp" },
  { name: "Bolso Ligero - Organic", price: "$25.000", slug: "bolso-ligero-organic", image: "/bolso-simple/organic.webp" },
  { name: "Bolso Ligero - Magnolia", price: "$25.000", slug: "bolso-ligero-magnolia", image: "/bolso-simple/magnolia.webp" }
];

export const weeklyWorks: WeeklyWork[] = [
  {
    title: "Elegi categoria",
    note: "Entra a Tienda y filtra por el tipo de pieza que estas buscando.",
    image: "/bolso-simple/original.webp"
  },
  {
    title: "Mira detalles",
    note: "Abri cada producto para revisar fotos, caracteristicas y stock disponible.",
    image: "/bolso-simple/fresh.webp"
  },
  {
    title: "Guarda o agrega",
    note: "Sumalo a favoritos o al carrito para ordenar la decision de compra.",
    image: "/bolso-simple/chic.webp"
  },
  {
    title: "Completa checkout",
    note: "Carga tu nombre y WhatsApp para dejar el pedido listo en un minuto.",
    image: "/bolso-simple/organic.webp"
  },
  {
    title: "Confirma por WhatsApp",
    note: "Hace click en consultar por WhatsApp y cerramos disponibilidad, envio y pago.",
    image: "/bolso-simple/magnolia.webp"
  }
];
