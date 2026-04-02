"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { formatArs } from "@/utils/format";
import { useRouter } from "next/navigation";

export default function CartClient() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = getTotal();

  if (!mounted) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-muted)" }}>
        Cargando...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", border: "1px dashed var(--color-border)", borderRadius: "var(--radius-sm)", color: "var(--color-text-muted)" }}>
        <ShoppingCart size={48} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
        <p>Tu carrito está vacío.</p>
        <Link href="/tienda" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      <div style={{ display: "grid", gap: "1.25rem" }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "1rem", padding: "1rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "color-mix(in srgb, var(--color-surface) 50%, transparent)", boxShadow: "0 8px 20px rgba(56, 49, 40, 0.06)" }}>
            <Image
              src={item.image}
              alt={item.name}
              width={220}
              height={220}
              style={{ width: "100%", borderRadius: "var(--radius-sm)", objectFit: "cover", aspectRatio: "1/1" }}
            />
            
            <div style={{ display: "grid", gap: "0.5rem", alignContent: "start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <Link href={`/producto/${item.slug}`} style={{ fontWeight: 600 }}>{item.name}</Link>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn"
                  style={{ padding: "0.25rem", minHeight: "auto", background: "transparent", border: "none" }}
                  aria-label="Eliminar del carrito"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <p className="card-price">{formatArs(item.price)}</p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
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
                <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginLeft: "0.5rem" }}>
                  Stock: {item.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2rem", display: "grid", gap: "0.75rem", maxWidth: "400px", marginLeft: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.08rem", fontWeight: 600 }}>
          <span>Total</span>
          <span>{formatArs(total)}</span>
        </div>
        
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginTop: "-0.5rem" }}>
          Envío a coordinar por WhatsApp
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
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
