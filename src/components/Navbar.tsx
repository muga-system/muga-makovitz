"use client";

import Link from "next/link";
import { selectCartCount, useCartStore } from "@/store/cartStore";
import { selectFavoriteCount, useFavoritesStore } from "@/store/favoritesStore";
import { useCartHydrated, useFavoritesHydrated } from "@/store/hydration";
import { ShoppingCart, Heart, Store, Menu, X, House } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

export default function Navbar() {
  const cartCount = useCartStore(selectCartCount);
  const favCount = useFavoritesStore(selectFavoriteCount);
  const cartHydrated = useCartHydrated();
  const favoritesHydrated = useFavoritesHydrated();
  const mounted = cartHydrated && favoritesHydrated;
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      document.body.removeAttribute("data-nav-open");
      return;
    }

    document.body.setAttribute("data-nav-open", "true");
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.removeAttribute("data-nav-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  if (!mounted) {
    return (
      <>
        <nav className="top-nav" aria-label="Navegación principal">
          <div className="container top-nav-inner">
            <Link href="/" className="brand-link" aria-label="Ir al inicio">
              <ImageWithSkeleton
                src={siteConfig.assets.logotype}
                alt={siteConfig.brand}
                width={160}
                height={44}
                className="brand-logotype"
                wrapperClassName="brand-logotype-shell"
                priority
              />
            </Link>

            <button
              className="btn btn-secondary nav-menu-toggle"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls={drawerId}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="nav-actions">
              <Link href="/favoritos" className="btn btn-secondary nav-favorites" aria-label="Favoritos">
                <span className="nav-icon-skeleton" aria-hidden="true" />
                <span className="nav-badge-skeleton" aria-hidden="true" />
              </Link>
              <Link href="/carrito" className="btn btn-secondary nav-cart" aria-label="Carrito vacío">
                <span className="nav-icon-skeleton" aria-hidden="true" />
                <span className="nav-badge-skeleton" aria-hidden="true" />
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
          aria-hidden={!menuOpen}
        />
        <aside id={drawerId} className={`nav-drawer ${menuOpen ? "is-open" : ""}`} aria-label="Menú móvil" aria-hidden={!menuOpen}>
          <button ref={closeButtonRef} className="btn btn-secondary nav-drawer-close" onClick={closeMenu} aria-label="Cerrar menú">
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
        <div className="container top-nav-inner">
          <Link href="/" className="brand-link" aria-label="Ir al inicio">
            <ImageWithSkeleton
              src={siteConfig.assets.logotype}
              alt={siteConfig.brand}
              width={160}
              height={44}
              className="brand-logotype"
              wrapperClassName="brand-logotype-shell"
              priority
            />
          </Link>

          <button
            className="btn btn-secondary nav-menu-toggle"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls={drawerId}
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
        aria-hidden={!menuOpen}
      />
      <aside id={drawerId} className={`nav-drawer ${menuOpen ? "is-open" : ""}`} aria-label="Menú móvil" aria-hidden={!menuOpen}>
        <button ref={closeButtonRef} className="btn btn-secondary nav-drawer-close" onClick={closeMenu} aria-label="Cerrar menú">
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
