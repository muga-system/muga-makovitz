export const buildWhatsAppUrl = (phone: string, message: string): string => {
  const normalized = phone.replace(/[^\d]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
};

export const productMessage = (name: string): string =>
  `Hola! Quiero ver opciones de ${name}. Me compartis disponibilidad y precio?`;

type OrderLine = {
  qty: number;
  name: string;
  unitPrice: string;
  lineTotal: string;
};

type OrderMessageInput = {
  orderId: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  total: string;
  lines: OrderLine[];
};

export const buildOrderWhatsAppMessage = ({
  orderId,
  customerName,
  customerPhone,
  notes,
  total,
  lines,
}: OrderMessageInput): string => {
  const now = new Date();
  const date = now.toLocaleDateString("es-AR");
  const time = now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

  const productLines = lines.map(
    (line, index) => `${index + 1}. ${line.name} x${line.qty} | ${line.unitPrice} | Subtotal: ${line.lineTotal}`
  );

  return [
    "*NUEVO PEDIDO WEB - NORA MAKOVITZ*",
    "-----------------------------------",
    `*Pedido:* ${orderId}`,
    `*Fecha:* ${date} ${time}`,
    "",
    "*CLIENTE*",
    `- Nombre: ${customerName}`,
    `- WhatsApp: ${customerPhone}`,
    "- Entrega: A coordinar por WhatsApp",
    `- Notas: ${notes && notes.trim().length > 0 ? notes.trim() : "Sin notas"}`,
    "",
    "*DETALLE*",
    ...productLines,
    "",
    `*TOTAL:* ${total}`,
    "",
    "Quiero confirmar este pedido. Gracias.",
  ].join("\n");
};
