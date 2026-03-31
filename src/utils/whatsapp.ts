export const buildWhatsAppUrl = (phone: string, message: string): string => {
  const normalized = phone.replace(/[^\d]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
};

export const productMessage = (name: string): string =>
  `Hola! Quiero ver opciones de ${name}. Me compartis disponibilidad y precio?`;
