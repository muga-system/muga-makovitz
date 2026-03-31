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
    id: "bb-001",
    slug: "bolso-mediano-de-tela",
    name: "Bolso mediano de tela",
    price: 28000,
    stock: 2,
    category: "bolsos",
    description: "Bolso de tela resistente, pensado para uso diario. Espacioso y facil de llevar.",
    use: "Ideal para trabajo, compras o salidas cotidianas.",
    cardBenefit: "Equilibrio entre espacio y comodidad",
    features: ["Tela resistente", "Costuras reforzadas", "Lavable", "Hecho a mano"],
    close: "Un bolso simple, bien hecho, para acompanarte todos los dias.",
    images: ["/2.png"],
    active: true
  },
  {
    id: "bb-002",
    slug: "cartera-chica-tela",
    name: "Cartera chica de tela",
    price: 24000,
    stock: 3,
    category: "carteras",
    description: "Cartera de tela liviana, de formato compacto para uso cotidiano.",
    use: "Ideal para salidas diarias y traslados cortos.",
    cardBenefit: "Liviana, practica y facil de llevar",
    features: ["Tela resistente", "Costuras reforzadas", "Lavable", "Hecho a mano"],
    close: "Una cartera comoda para usar todos los dias.",
    images: ["/2.png"],
    active: true
  },
  {
    id: "bb-003",
    slug: "bolso-grande-tela-resistente",
    name: "Bolso grande de tela resistente",
    price: 31000,
    stock: 2,
    category: "bolsos",
    description: "Bolso grande de tela resistente, con alta capacidad para uso diario.",
    use: "Ideal para trabajo, estudio o compras semanales.",
    cardBenefit: "Alta capacidad para uso diario",
    features: ["Tela resistente", "Costuras reforzadas", "Lavable", "Hecho a mano"],
    close: "Una pieza de uso real, hecha para durar.",
    images: ["/2.png"],
    active: true
  },
  {
    id: "bb-004",
    slug: "organizador-textil-lavable",
    name: "Organizador textil lavable",
    price: 42000,
    stock: 4,
    category: "organizadores",
    description: "Organizador de tela lavable para ordenar accesorios de uso diario.",
    use: "Ideal para cartera, bolso o valija.",
    cardBenefit: "Orden rapido para todos los dias",
    features: ["Tela resistente", "Lavable", "Compacto", "Hecho a mano"],
    close: "Un detalle practico para tener todo en orden.",
    images: ["/2.png"],
    active: true
  },
  {
    id: "bb-005",
    slug: "bolso-diario-arena",
    name: "Bolso diario de tela",
    price: 18500,
    stock: 5,
    category: "bolsos",
    description: "Bolso de tela liviano con capacidad media para rutina diaria.",
    use: "Ideal para oficina, compras y actividades diarias.",
    cardBenefit: "Uso diario con peso liviano",
    features: ["Tela resistente", "Costuras reforzadas", "Lavable", "Hecho a mano"],
    close: "Pensado para acompanarte sin complicaciones.",
    images: ["/2.png"],
    active: true
  },
  {
    id: "bb-006",
    slug: "cartera-mediana-de-tela",
    name: "Cartera mediana de tela",
    price: 12000,
    stock: 1,
    category: "carteras",
    description: "Cartera de tela con formato comodo para objetos esenciales.",
    use: "Ideal para salidas cotidianas.",
    cardBenefit: "Tamano comodo y funcional",
    features: ["Tela resistente", "Costuras reforzadas", "Lavable", "Hecho a mano"],
    close: "Una cartera que combina practicidad y simpleza.",
    images: ["/2.png"],
    active: true
  },
  {
    id: "bb-007",
    slug: "porta-anteojos-lino",
    name: "Porta anteojos de tela",
    price: 9500,
    stock: 5,
    category: "regalos",
    description: "Porta anteojos textil con interior suave y cierre seguro.",
    use: "Ideal para cartera o bolso diario.",
    cardBenefit: "Proteccion simple y practica",
    features: ["Tela resistente", "Interior suave", "Compacto", "Hecho a mano"],
    close: "Un accesorio chico, util y duradero.",
    images: ["/2.png"],
    active: true
  },
  {
    id: "bb-008",
    slug: "set-regalo-textil",
    name: "Set regalo textil",
    price: 36500,
    stock: 2,
    category: "regalos",
    description: "Set de piezas textiles listas para regalar.",
    use: "Ideal para regalo util y artesanal.",
    cardBenefit: "Regalo practico para uso real",
    features: ["Tela resistente", "Piezas combinadas", "Lavable", "Hecho a mano"],
    close: "Una opcion de regalo simple, funcional y hecha a mano.",
    images: ["/2.png"],
    active: true
  }
];

export const categories = [
  { slug: "all", label: "Todo" },
  { slug: "carteras", label: "Carteras" },
  { slug: "bolsos", label: "Bolsos" },
  { slug: "organizadores", label: "Organizadores" },
  { slug: "regalos", label: "Regalos" }
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug && product.active);
