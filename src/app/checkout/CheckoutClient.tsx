"use client";

import { useCartStore } from "@/store/cartStore";
import { useCartHydrated } from "@/store/hydration";
import { useState } from "react";
import { formatArs } from "@/utils/format";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { siteConfig } from "@/data/site";

export default function CheckoutClient() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const mounted = useCartHydrated();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const total = getTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderId = `NM-${Math.floor(1000 + Math.random() * 9000)}`;
    const lines = items.map(
      (item) => `- ${item.qty}x ${item.name} (${formatArs(item.price)}) = ${formatArs(item.qty * item.price)}`
    );

    const message = [
      "Nuevo pedido desde la web Nora Makovitz",
      `Pedido: ${orderId}`,
      "",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      "Retiro: Coordinado",
      notes ? `Notas: ${notes}` : "Notas: -",
      "",
      "Productos:",
      ...lines,
      "",
      `Total: ${formatArs(total)}`,
      "",
      "Quiero confirmar este pedido."
    ].join("\n");

    const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber, message);
    
    clearCart();
    window.location.href = whatsappUrl;
  };

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
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr", alignItems: "start" }}>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: "500px" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Datos de contacto</h2>
        
        <label style={{ display: "grid", gap: "0.5rem", fontWeight: 500 }}>
          Nombre completo *
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-surface)", padding: "0.75rem 0.85rem", font: "inherit" }}
          />
        </label>

        <label style={{ display: "grid", gap: "0.5rem", fontWeight: 500 }}>
          Teléfono (WhatsApp) *
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="5491150076209"
            style={{ width: "100%", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-surface)", padding: "0.75rem 0.85rem", font: "inherit" }}
          />
        </label>

        <label style={{ display: "grid", gap: "0.5rem", fontWeight: 500 }}>
          Notas (opcional)
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={{ width: "100%", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-surface)", padding: "0.75rem 0.85rem", font: "inherit", resize: "vertical" }}
          />
        </label>

        <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
          Confirmar pedido por WhatsApp
        </button>
      </form>

      <div style={{ padding: "1.25rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", display: "grid", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem" }}>Resumen del pedido</h2>
        
        {items.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--color-border)" }}>
            <span>{item.qty}x {item.name}</span>
            <span>{formatArs(item.qty * item.price)}</span>
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.08rem", fontWeight: 700 }}>
          <span>Total</span>
          <span>{formatArs(total)}</span>
        </div>

        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginTop: "0" }}>
          Envío a coordinar por WhatsApp
        </p>
      </div>
    </div>
  );
}
