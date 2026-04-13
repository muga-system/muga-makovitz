export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  stock: number;
  category: "carteras" | "bolsos" | "organizadores" | "regalos" | "bordados";
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
    price: 25000,
    stock: 1,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa original. Ideal para uso diario, trabajo o compras.",
    use: "",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa original exclusiva", "Hecho a mano"],
    close: "Un bolso de tela para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/original.webp"],
    active: true
  },
  {
    id: "bl-002",
    slug: "bolso-ligero-fresh",
    name: "Bolso Ligero - Fresh",
    price: 25000,
    stock: 1,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa fresh. Ideal para uso diario, trabajo o compras.",
    use: "",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa fresh exclusiva", "Hecho a mano"],
    close: "Un bolso de tela para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/fresh.webp"],
    active: true
  },
  {
    id: "bl-003",
    slug: "bolso-ligero-chic",
    name: "Bolso Ligero - Chic",
    price: 25000,
    stock: 1,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa chic. Ideal para uso diario, trabajo o compras.",
    use: "",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa chic exclusiva", "Hecho a mano"],
    close: "Un bolso para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/chic.webp"],
    active: true
  },
  {
    id: "bl-004",
    slug: "bolso-ligero-organic",
    name: "Bolso Ligero - Organic",
    price: 25000,
    stock: 1,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa organic. Ideal para uso diario, trabajo o compras.",
    use: "",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa organic exclusiva", "Hecho a mano"],
    close: "Un bolso para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/organic.webp"],
    active: true
  },
  {
    id: "bl-005",
    slug: "bolso-ligero-magnolia",
    name: "Bolso Ligero - Magnolia",
    price: 25000,
    stock: 1,
    category: "bolsos",
    description: "Bolso de tela resistente con estampa magnolia. Ideal para uso diario, trabajo o compras.",
    use: "",
    cardBenefit: "Espacioso, resistente y con estilo unico",
    features: ["Tela resistente de alta calidad", "Estampa magnolia exclusiva", "Hecho a mano"],
    close: "Un bolso para acompañarte todos los días con estilo.",
    images: ["/bolso-simple/magnolia.webp"],
    active: true
  },
  {
    id: "bd-001",
    slug: "bordado-bird",
    name: "Bordado Bird",
    price: 35000,
    stock: 1,
    category: "bordados",
    description: "Bordado artesanal con diseno Bird en tonalidades suaves para sumar textura y color al espacio.",
    use: "",
    cardBenefit: "Pieza unica hecha a mano",
    features: ["Bordado artesanal", "Diseno exclusivo", "Produccion limitada"],
    close: "Una pieza bordada para destacar cualquier rincon.",
    images: ["/bordados/bird.png"],
    active: true
  },
  {
    id: "bd-002",
    slug: "bordado-bird-red",
    name: "Bordado Bird Red",
    price: 35000,
    stock: 1,
    category: "bordados",
    description: "Bordado artesanal con diseno Bird Red y contraste intenso para una presencia visual marcada.",
    use: "",
    cardBenefit: "Pieza unica hecha a mano",
    features: ["Bordado artesanal", "Paleta en tonos rojos", "Produccion limitada"],
    close: "Un bordado con caracter para espacios con personalidad.",
    images: ["/bordados/bird-red.png"],
    active: true
  },
  {
    id: "bd-003",
    slug: "bordado-dear",
    name: "Bordado Dear",
    price: 35000,
    stock: 1,
    category: "bordados",
    description: "Bordado artesanal Dear con composicion delicada y acabado textil de alta presencia.",
    use: "",
    cardBenefit: "Pieza unica hecha a mano",
    features: ["Bordado artesanal", "Terminacion detallada", "Produccion limitada"],
    close: "Una pieza de autor para sumar calidez y detalle.",
    images: ["/bordados/dear.png"],
    active: true
  },
  {
    id: "bd-004",
    slug: "bordado-flower-pink",
    name: "Bordado Flower Pink",
    price: 35000,
    stock: 1,
    category: "bordados",
    description: "Bordado artesanal Flower Pink con tonos rosados y trazos organicos inspirados en botanica.",
    use: "",
    cardBenefit: "Pieza unica hecha a mano",
    features: ["Bordado artesanal", "Paleta rosa", "Produccion limitada"],
    close: "Una propuesta bordada suave y expresiva.",
    images: ["/bordados/fower-pink.png"],
    active: true
  },
  {
    id: "bd-005",
    slug: "bordado-horse",
    name: "Bordado Horse",
    price: 35000,
    stock: 1,
    category: "bordados",
    description: "Bordado artesanal Horse con lineas definidas y presencia grafica para composiciones contemporaneas.",
    use: "",
    cardBenefit: "Pieza unica hecha a mano",
    features: ["Bordado artesanal", "Diseno figurativo", "Produccion limitada"],
    close: "Una pieza de coleccion para quienes valoran lo hecho a mano.",
    images: ["/bordados/horse.png"],
    active: true
  }
];

export const categories = [
  { slug: "bolsos", label: "Bolsos" },
  { slug: "bordados", label: "Bordados" }
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug && product.active);
