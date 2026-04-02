"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { formatArs } from "@/utils/format";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    description: string;
    images: string[];
    features: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFav = useFavoritesStore((state) => state.ids.includes(product.id));
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleFav = () => {
    toggleFavorite(product.id);
  };

  return (
    <article className="product-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ position: "relative" }}>
        <Link href={`/producto/${product.slug}`} className="shop-image-link">
          <Image
            src={product.images[0]}
            alt={product.name}
            className="card-image card-image-product"
            style={{ aspectRatio: "1/1" }}
            width={800}
            height={800}
          />
        </Link>
        <button
          onClick={handleToggleFav}
          className="btn"
          style={{ 
            position: "absolute", 
            top: "0.75rem", 
            right: "0.75rem",
            width: "40px",
            height: "40px",
            padding: 0,
            borderRadius: "999px",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart size={18} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div style={{ flex: 1, display: "grid", gap: "0.5rem" }}>
        <Link href={`/producto/${product.slug}`}>
          <h3 className="card-title">{product.name}</h3>
        </Link>
        <p className="card-price">{formatArs(product.price)}</p>
        
        {product.stock > 0 ? (
          <p style={{ fontSize: "0.9rem", color: "var(--color-primary-strong)" }}>
            Stock: {product.stock} unidades
          </p>
        ) : (
          <p style={{ fontSize: "0.9rem", color: "#9d5a5a" }}>Sin stock</p>
        )}
      </div>

      <div className="shop-actions" style={{ display: "grid", gap: "0.75rem", marginTop: "0.75rem" }}>
        {product.stock > 0 ? (
          <button
            onClick={handleAddToCart}
            className={`btn ${added ? "btn-secondary" : "btn-primary"}`}
            style={{ width: "100%" }}
            disabled={added}
          >
            <ShoppingCart size={16} style={{ marginRight: "0.5rem" }} />
            {added ? "Agregado" : "Agregar al carrito"}
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            style={{ width: "100%", opacity: 0.6, cursor: "not-allowed" }}
            disabled
          >
            Sin stock
          </button>
        )}
        <Link href={`/producto/${product.slug}`} className="btn btn-outline" style={{ width: "100%" }}>
          Ver detalles
        </Link>
      </div>
    </article>
  );
}
