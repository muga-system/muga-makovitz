"use client";

import { useFavoritesStore } from "@/store/favoritesStore";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesHydrated } from "@/store/hydration";
import { products } from "@/data/products";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { formatArs } from "@/utils/format";
import { toast } from "sonner";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/utils/image";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

export default function FavoritesClient() {
  const favoriteIds = useFavoritesStore((state) => state.ids);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const addToCart = useCartStore((state) => state.addToCart);
  const mounted = useFavoritesHydrated();

  const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

  if (!mounted) {
    return (
      <div className="state-loading">
        Cargando...
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="state-empty">
        <p>No tienes productos guardados en favoritos.</p>
        <Link href="/tienda" className="btn btn-primary state-empty-cta">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="favorite-grid">
      {favoriteProducts.map((product) => (
        <article key={product.id} className="product-card shop-card favorite-card">
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
              onClick={() => {
                removeFavorite(product.id);
                toast("Quitado de favoritos", { description: product.name });
              }}
              className="btn shop-fav-btn"
              aria-label="Quitar de favoritos"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="shop-content">
            <Link href={`/producto/${product.slug}`}>
              <h3 className="card-title">{product.name}</h3>
            </Link>
            <p className="card-price">{formatArs(product.price)}</p>
          </div>

          <div className="shop-actions">
            <button
              onClick={() => {
                addToCart({
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  stock: product.stock,
                  image: product.images[0],
                });
                toast.success("Agregado al carrito", {
                  description: `${product.name} • ${formatArs(product.price)}`,
                });
              }}
              className="btn btn-primary card-cta"
              disabled={product.stock <= 0}
            >
              <ShoppingCart size={16} className="btn-icon" />
              {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </button>
            <Link href={`/producto/${product.slug}`} className="btn btn-outline card-cta">
              Ver detalles
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
