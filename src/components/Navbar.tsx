"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { ShoppingCart, Heart, Store } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const cartCount = useCartStore((state) => state.getCount());
  const favCount = useFavoritesStore((state) => state.getCount());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="top-nav" aria-label="Navegación principal">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "var(--header-height)" }}>
          <Link href="/" className="brand-link" aria-label="Ir al inicio">
            NM
          </Link>
          <div className="nav-actions">
            <Link href="/favoritos" className="btn btn-secondary nav-favorites" aria-label="Favoritos">
              <Heart size={20} />
              <span className="favorites-count" style={{ display: "none" }}>0</span>
            </Link>
            <Link href="/carrito" className="btn btn-secondary nav-cart" aria-label="Carrito vacío">
              <ShoppingCart size={20} />
              <span className="cart-count" style={{ display: "none" }}>0</span>
            </Link>
            <Link href="/" className="btn btn-primary nav-tienda">
              <Store size={18} />
              <span className="tienda-label" style={{ marginLeft: "0.375rem" }}>Tienda</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="top-nav" aria-label="Navegación principal">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "var(--header-height)" }}>
        <Link href="/" className="brand-link" aria-label="Ir al inicio">
          NM
        </Link>

        <div className="nav-actions">
          <Link
            href="/favoritos"
            className={`btn nav-favorites ${favCount > 0 ? "btn-primary" : "btn-secondary"}`}
            aria-label={favCount > 0 ? `Favoritos (${favCount})` : "Favoritos vacío"}
          >
            <Heart size={20} fill={favCount > 0 ? "currentColor" : "none"} />
            {favCount > 0 && <span className="favorites-count">{favCount}</span>}
          </Link>
          <Link
            href="/carrito"
            className={`btn nav-cart ${cartCount > 0 ? "btn-primary" : "btn-secondary"}`}
            aria-label={cartCount > 0 ? `Carrito con ${cartCount} productos` : "Carrito vacío"}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link href="/" className="btn btn-primary nav-tienda">
            <Store size={18} />
            <span className="tienda-label" style={{ marginLeft: "0.375rem" }}>Tienda</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
