"use client";

import { selectCartItems, selectCartTotal, useCartStore } from "@/store/cartStore";
import { useCartHydrated } from "@/store/hydration";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { formatArs } from "@/utils/format";

export default function CartClient() {
  const items = useCartStore(selectCartItems);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore(selectCartTotal);
  const mounted = useCartHydrated();

  if (!mounted) {
    return (
      <div className="state-loading">
        Cargando...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="state-empty">
        <ShoppingCart size={48} className="state-empty-icon" />
        <p>Tu carrito está vacío.</p>
        <Link href="/tienda" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <Image
              src={item.image}
              alt={item.name}
              width={220}
              height={220}
              className="cart-thumb"
            />
            
            <div className="cart-body">
              <div className="cart-item-head">
                <Link href={`/producto/${item.slug}`} className="cart-item-name">{item.name}</Link>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn cart-remove-btn"
                  aria-label="Eliminar del carrito"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <p className="card-price">{formatArs(item.price)}</p>
              
              <div className="cart-qty-row">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="btn btn-secondary"
                  style={{ minWidth: "34px", minHeight: "34px", padding: 0 }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ minWidth: "2rem", textAlign: "center" }}>{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="btn btn-secondary"
                  style={{ minWidth: "34px", minHeight: "34px", padding: 0 }}
                  disabled={item.qty >= item.stock}
                >
                  <Plus size={16} />
                </button>
                <span className="cart-stock-label">
                  Stock: {item.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total-row">
          <span>Total</span>
          <span>{formatArs(total)}</span>
        </div>
        
        <p className="cart-summary-note">
          Envío a coordinar por WhatsApp
        </p>

        <div className="cart-summary-actions">
          <Link href="/checkout" className="btn btn-primary" style={{ flex: 1 }}>
            Continuar compra
          </Link>
          <button
            onClick={() => {
              if (confirm("¿Vaciar el carrito?")) {
                clearCart();
              }
            }}
            className="btn btn-secondary"
          >
            Vaciar
          </button>
        </div>
      </div>
    </div>
  );
}
