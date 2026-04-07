export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  stock: number;
  category: "carteras" | "bolsos" | "organizadores" | "regalos";
  description: string;
  use: string;
  cardBenefit: string;
  features: string[];
  close: string;
  images: string[];
  active: boolean;
};

export const products: Product[] = [
  {
    id: "bl-001",
    slug: "bolso-ligero-original",
    name: "Bolso Ligero - Original",
    price: 20000,
    stock: 5,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa original. Ideal para uso diario, trabajo o compras.",
    use: "Perfecto para el dia a dia: trabajo, compras, universidad o salidas.",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa original exclusiva", "Correas reforzadas", "Interior con bolsillo", "Hecho a mano"],
    close: "Un bolso de tela para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/original.png"],
    active: true
  },
  {
    id: "bl-002",
    slug: "bolso-ligero-fresh",
    name: "Bolso Ligero - Fresh",
    price: 20000,
    stock: 5,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa fresh. Ideal para uso diario, trabajo o compras.",
    use: "Perfecto para el dia a dia: trabajo, compras, universidad o salidas.",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa fresh exclusiva", "Correas reforzadas", "Interior con bolsillo", "Hecho a mano"],
    close: "Un bolso de tela para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/fresh.png"],
    active: true
  },
  {
    id: "bl-003",
    slug: "bolso-ligero-chic",
    name: "Bolso Ligero - Chic",
    price: 20000,
    stock: 5,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa chic. Ideal para uso diario, trabajo o compras.",
    use: "Perfecto para el dia a dia: trabajo, compras, universidad o salidas.",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa chic exclusiva", "Correas reforzadas", "Interior con bolsillo", "Hecho a mano"],
    close: "Un bolso para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/chic.png"],
    active: true
  },
  {
    id: "bl-004",
    slug: "bolso-ligero-organic",
    name: "Bolso Ligero - Organic",
    price: 20000,
    stock: 5,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa organic. Ideal para uso diario, trabajo o compras.",
    use: "Perfecto para el dia a dia: trabajo, compras, universidad o salidas.",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa organic exclusiva", "Correas reforzadas", "Interior con bolsillo", "Hecho a mano"],
    close: "Un bolso para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/organic.png"],
    active: true
  },
  {
    id: "bl-005",
    slug: "bolso-ligero-magnolia",
    name: "Bolso Ligero - Magnolia",
    price: 20000,
    stock: 5,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa magnolia. Ideal para uso diario, trabajo o compras.",
    use: "Perfecto para el dia a dia: trabajo, compras, universidad o salidas.",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa magnolia exclusiva", "Correas reforzadas", "Interior con bolsillo", "Hecho a mano"],
    close: "Un bolso para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/magnolia.png"],
    active: true
  }
];

export const categories = [
  { slug: "bolsos", label: "Bolsos" }
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug && product.active);
