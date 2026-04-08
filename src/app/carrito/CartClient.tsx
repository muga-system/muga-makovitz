"use client";

import { selectCartItems, selectCartTotal, useCartStore } from "@/store/cartStore";
import { useCartHydrated } from "@/store/hydration";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { formatArs } from "@/utils/format";
import { useState } from "react";
import { toast } from "sonner";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/utils/image";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

export default function CartClient() {
  const items = useCartStore(selectCartItems);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore(selectCartTotal);
  const mounted = useCartHydrated();
  const [confirmingClear, setConfirmingClear] = useState(false);

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
        <Link href="/tienda" className="btn btn-primary state-empty-cta">
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
            <ImageWithSkeleton
              src={item.image}
              alt={item.name}
              width={220}
              height={220}
              className="cart-thumb"
              wrapperClassName="cart-thumb-shell"
              quality={IMAGE_QUALITY.cartThumb}
              sizes={IMAGE_SIZES.cartThumb}
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
              
              <div className="cart-meta-row">
                <div className="cart-qty-group">
                  <span className="cart-qty-label">Cantidad</span>
                  <div className="cart-qty-row">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="btn btn-secondary qty-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="cart-qty-value">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="btn btn-secondary qty-btn"
                      disabled={item.qty >= item.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <span className="cart-stock-label">
                  Stock disponible: {item.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total-row">
          <span className="cart-total-label">Total</span>
          <span className="cart-total-value">{formatArs(total)}</span>
        </div>
        
        <p className="cart-summary-note">
          Envío a coordinar por WhatsApp
        </p>

        <div className="cart-summary-actions">
          <Link href="/checkout" className="btn btn-primary cart-checkout-btn">
            Continuar compra
          </Link>
          {confirmingClear ? (
            <>
              <button
                onClick={() => {
                  clearCart();
                  setConfirmingClear(false);
                  toast("Carrito vaciado");
                }}
                className="btn btn-primary cart-action-btn"
              >
                Confirmar vaciado
              </button>
              <button
                onClick={() => setConfirmingClear(false)}
                className="btn btn-secondary cart-action-btn"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmingClear(true)}
              className="btn btn-secondary cart-action-btn"
            >
              Vaciar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
