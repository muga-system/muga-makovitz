"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { selectIsFavorite, useFavoritesStore } from "@/store/favoritesStore";
import { useFavoritesHydrated } from "@/store/hydration";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { formatArs } from "@/utils/format";
import { toast } from "sonner";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/utils/image";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

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
  const isFav = useFavoritesStore(selectIsFavorite(product.id));
  const favoritesHydrated = useFavoritesHydrated();
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

  return (
    <article className="product-card shop-card">
      <div className="shop-media">
        <Link href={`/producto/${product.slug}`} className="shop-image-link" aria-label={`Ver ${product.name}`}>
          <ImageWithSkeleton
            src={product.images[0]}
            alt={product.name}
            className="card-image card-image-product shop-image"
            wrapperClassName="shop-image-shell"
            width={800}
            height={800}
            quality={IMAGE_QUALITY.listing}
            sizes={IMAGE_SIZES.productCard}
          />
        </Link>
        <button
          onClick={handleToggleFav}
          className={`btn shop-fav-btn ${favoritesHydrated ? "" : "btn-state-skeleton"}`}
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          disabled={!favoritesHydrated}
        >
          <Heart size={18} fill={isFav ? "currentColor" : "none"} className={favoritesHydrated ? "" : "btn-state-content-hidden"} />
        </button>
      </div>
      
      <div className="shop-content">
        <Link href={`/producto/${product.slug}`}>
          <h3 className="card-title">{product.name}</h3>
        </Link>
        <p className="card-price">{formatArs(product.price)}</p>
        
        {product.stock > 0 ? (
          <p className="shop-stock shop-stock-ok">
            Stock: {product.stock} unidades
          </p>
        ) : (
          <p className="shop-stock shop-stock-out">Sin stock</p>
        )}
      </div>

      <div className="shop-actions">
        {product.stock > 0 ? (
          <button
            onClick={handleAddToCart}
            className={`btn ${added ? "btn-secondary" : "btn-primary"} card-cta`}
            disabled={added}
          >
            <ShoppingCart size={16} className="btn-icon" />
            {added ? "Agregado" : "Agregar al carrito"}
          </button>
        ) : (
          <button
            className="btn btn-secondary card-cta is-disabled"
            disabled
          >
            Sin stock
          </button>
        )}
        <Link href={`/producto/${product.slug}`} className="btn btn-outline card-cta">
          Ver detalles
        </Link>
      </div>
    </article>
  );
}
