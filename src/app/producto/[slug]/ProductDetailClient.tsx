"use client";

import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useFavoritesHydrated } from "@/store/hydration";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

interface ProductDetailClientProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    stock: number;
    images: string[];
  };
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFav = useFavoritesStore((state) => state.ids.includes(product.id));
  const hydrated = useFavoritesHydrated();
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

  if (!hydrated) {
    return (
      <div style={{ display: "grid", gap: "0.75rem", width: "min(100%, 360px)" }}>
        <button className="btn btn-primary" style={{ width: "100%" }} disabled>
          <ShoppingCart size={16} style={{ marginRight: "0.5rem" }} />
          Agregar al carrito
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "0.75rem", width: "min(100%, 360px)" }}>
      {product.stock > 0 ? (
        <button
          onClick={handleAddToCart}
          className={`btn ${added ? "btn-secondary" : "btn-primary"}`}
          style={{ width: "100%" }}
          disabled={added}
        >
          <ShoppingCart size={16} style={{ marginRight: "0.5rem" }} />
          {added ? "Agregado al carrito" : "Agregar al carrito"}
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
      <button
        onClick={handleToggleFav}
        className="btn btn-outline"
        style={{ width: "100%" }}
      >
        <Heart size={16} fill={isFav ? "currentColor" : "none"} style={{ marginRight: "0.5rem" }} />
        {isFav ? "Guardado en favoritos" : "Guardar en favoritos"}
      </button>
    </div>
  );
}
