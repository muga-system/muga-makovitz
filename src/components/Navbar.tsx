"use client";

import Link from "next/link";
import { selectCartCount, useCartStore } from "@/store/cartStore";
import { selectFavoriteCount, useFavoritesStore } from "@/store/favoritesStore";
import { useCartHydrated, useFavoritesHydrated } from "@/store/hydration";
import { ShoppingCart, Heart, Store, Menu, X, House } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const cartCount = useCartStore(selectCartCount);
  const favCount = useFavoritesStore(selectFavoriteCount);
  const cartHydrated = useCartHydrated();
  const favoritesHydrated = useFavoritesHydrated();
  const mounted = cartHydrated && favoritesHydrated;
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  if (!mounted) {
    return (
      <>
        <nav className="top-nav" aria-label="Navegación principal">
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "var(--header-height)" }}>
            <Link href="/" className="brand-link" aria-label="Ir al inicio">
              NM
            </Link>

            <button
              className="btn btn-secondary nav-menu-toggle"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="nav-actions">
              <Link href="/favoritos" className="btn btn-secondary nav-favorites" aria-label="Favoritos">
                <Heart size={20} />
                <span className="favorites-count" style={{ display: "none" }}>0</span>
              </Link>
              <Link href="/carrito" className="btn btn-secondary nav-cart" aria-label="Carrito vacío">
                <ShoppingCart size={20} />
                <span className="cart-count" style={{ display: "none" }}>0</span>
              </Link>
              <Link href="/tienda" className="btn btn-primary nav-tienda">
                <Store size={18} />
                <span className="tienda-label">Tienda</span>
              </Link>
            </div>
          </div>
        </nav>

        <div
          className={`nav-drawer-overlay ${menuOpen ? "is-open" : ""}`}
          onClick={closeMenu}
          aria-hidden={menuOpen ? "false" : "true"}
        />
        <aside className={`nav-drawer ${menuOpen ? "is-open" : ""}`} aria-label="Menú móvil">
          <button className="btn btn-secondary nav-drawer-close" onClick={closeMenu} aria-label="Cerrar menú">
            <X size={18} />
          </button>
          <nav className="nav-drawer-links">
            <Link href="/tienda" onClick={closeMenu}><Store size={16} /> Tienda</Link>
            <Link href="/favoritos" onClick={closeMenu}><Heart size={16} /> Favoritos</Link>
            <Link href="/carrito" onClick={closeMenu}><ShoppingCart size={16} /> Carrito</Link>
            <Link href="/" onClick={closeMenu}><House size={16} /> Inicio</Link>
          </nav>
        </aside>
      </>
    );
  }

  return (
    <>
      <nav className="top-nav" aria-label="Navegación principal">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "var(--header-height)" }}>
          <Link href="/" className="brand-link" aria-label="Ir al inicio">
            NM
          </Link>

          <button
            className="btn btn-secondary nav-menu-toggle"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} />
          </button>

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
            <Link href="/tienda" className="btn btn-primary nav-tienda">
              <Store size={18} />
              <span className="tienda-label">Tienda</span>
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={`nav-drawer-overlay ${menuOpen ? "is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden={menuOpen ? "false" : "true"}
      />
      <aside className={`nav-drawer ${menuOpen ? "is-open" : ""}`} aria-label="Menú móvil">
        <button className="btn btn-secondary nav-drawer-close" onClick={closeMenu} aria-label="Cerrar menú">
          <X size={18} />
        </button>
        <nav className="nav-drawer-links">
          <Link href="/tienda" onClick={closeMenu}><Store size={16} /> Tienda</Link>
          <Link href="/favoritos" onClick={closeMenu}><Heart size={16} /> Favoritos ({favCount})</Link>
          <Link href="/carrito" onClick={closeMenu}><ShoppingCart size={16} /> Carrito ({cartCount})</Link>
          <Link href="/" onClick={closeMenu}><House size={16} /> Inicio</Link>
        </nav>
      </aside>
    </>
  );
}
