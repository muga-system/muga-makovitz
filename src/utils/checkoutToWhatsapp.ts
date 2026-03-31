import type { CartItem } from "../store/cart";
import { formatArs } from "./format";

type CheckoutPayload = {
  customerName: string;
  customerPhone: string;
  notes: string;
  items: CartItem[];
};

export const buildCheckoutMessage = (payload: CheckoutPayload): string => {
  const orderId = `NM-${Math.floor(1000 + Math.random() * 9000)}`;
  const lines = payload.items.map(
    (item) => `- ${item.qty}x ${item.name} (${formatArs(item.price)}) = ${formatArs(item.qty * item.price)}`
  );
  const total = payload.items.reduce((acc, item) => acc + item.qty * item.price, 0);

  return [
    "Nuevo pedido desde la web Nora Makovitz",
    `Pedido: ${orderId}`,
    "",
    `Nombre: ${payload.customerName}`,
    `Telefono: ${payload.customerPhone}`,
    "Retiro: Coordinado",
    payload.notes ? `Notas: ${payload.notes}` : "Notas: -",
    "",
    "Productos:",
    ...lines,
    "",
    `Total: ${formatArs(total)}`,
    "",
    "Quiero confirmar este pedido."
  ].join("\n");
};
