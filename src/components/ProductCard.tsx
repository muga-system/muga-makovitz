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
    <article className="product-card shop-card">
      <div className="shop-media">
        <Link href={`/producto/${product.slug}`} className="shop-image-link" aria-label={`Ver ${product.name}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            className="card-image card-image-product shop-image"
            width={800}
            height={800}
          />
        </Link>
        <button
          onClick={handleToggleFav}
          className="btn shop-fav-btn"
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart size={18} fill={isFav ? "currentColor" : "none"} />
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
