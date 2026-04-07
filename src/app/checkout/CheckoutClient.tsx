"use client";

import { selectCartItems, selectCartTotal, useCartStore } from "@/store/cartStore";
import { useCartHydrated } from "@/store/hydration";
import { useState } from "react";
import { formatArs } from "@/utils/format";
import { buildOrderWhatsAppMessage, buildWhatsAppUrl } from "@/utils/whatsapp";
import { siteConfig } from "@/data/site";

export default function CheckoutClient() {
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const mounted = useCartHydrated();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderId = `NM-${Math.floor(1000 + Math.random() * 9000)}`;
    const lines = items.map((item) => ({
      qty: item.qty,
      name: item.name,
      unitPrice: formatArs(item.price),
      lineTotal: formatArs(item.qty * item.price),
    }));

    const message = buildOrderWhatsAppMessage({
      orderId,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      notes,
      total: formatArs(total),
      lines,
    });

    const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber, message);

    clearCart();
    window.location.href = whatsappUrl;
  };

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
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <form onSubmit={handleSubmit} className="checkout-form">
        <h2 className="checkout-title">Datos de contacto</h2>
        
        <label className="checkout-label">
          Nombre completo *
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="checkout-input"
          />
        </label>

        <label className="checkout-label">
          Teléfono (WhatsApp) *
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="5491150076209"
            className="checkout-input"
          />
        </label>

        <label className="checkout-label">
          Notas (opcional)
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="checkout-input checkout-textarea"
          />
        </label>

        <button type="submit" className="btn btn-primary checkout-submit">
          Confirmar pedido por WhatsApp
        </button>
      </form>

      <div className="checkout-summary">
        <h2 className="checkout-title">Resumen del pedido</h2>
        
        {items.map((item) => (
          <div key={item.id} className="checkout-summary-item">
            <span>{item.qty}x {item.name}</span>
            <span>{formatArs(item.qty * item.price)}</span>
          </div>
        ))}

        <div className="checkout-summary-total">
          <span>Total</span>
          <span>{formatArs(total)}</span>
        </div>

        <p className="checkout-summary-note">
          Envío a coordinar por WhatsApp
        </p>
      </div>
    </div>
  );
}
