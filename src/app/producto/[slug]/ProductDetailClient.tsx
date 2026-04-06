"use client";

import { useCartStore } from "@/store/cartStore";
import { selectIsFavorite, useFavoritesStore } from "@/store/favoritesStore";
import { useFavoritesHydrated } from "@/store/hydration";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatArs } from "@/utils/format";

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
  const isFav = useFavoritesStore(selectIsFavorite(product.id));
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
    toast.success("Agregado al carrito", {
      description: `${product.name} • ${formatArs(product.price)}`,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleFav = () => {
    const wasFavorite = isFav;
    toggleFavorite(product.id);
    if (wasFavorite) {
      toast("Quitado de favoritos", { description: product.name });
    } else {
      toast.success("Guardado en favoritos", { description: product.name });
    }
  };

  if (!hydrated) {
    return (
      <div className="detail-actions">
        <button className="btn btn-primary detail-action-btn" disabled>
          <ShoppingCart size={16} className="btn-icon" />
          Agregar al carrito
        </button>
      </div>
    );
  }

  return (
    <div className="detail-actions">
      {product.stock > 0 ? (
        <button
          onClick={handleAddToCart}
          className={`btn ${added ? "btn-secondary" : "btn-primary"} detail-action-btn`}
          disabled={added}
        >
          <ShoppingCart size={16} className="btn-icon" />
          {added ? "Agregado al carrito" : "Agregar al carrito"}
        </button>
      ) : (
        <button
          className="btn btn-secondary detail-action-btn is-disabled"
          disabled
        >
          Sin stock
        </button>
      )}
      <button
        onClick={handleToggleFav}
        className="btn btn-outline detail-action-btn"
      >
        <Heart size={16} fill={isFav ? "currentColor" : "none"} className="btn-icon" />
        {isFav ? "Guardado en favoritos" : "Guardar en favoritos"}
      </button>
    </div>
  );
}
