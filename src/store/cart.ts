export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  stock: number;
  image: string;
};

const CART_KEY = "nora_makovitz_cart_v1";
const LEGACY_CART_KEY = "babushka_cart_v1";

const safeParse = (raw: string | null): CartItem[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  const nextRaw = window.localStorage.getItem(CART_KEY);
  if (nextRaw !== null) {
    return safeParse(nextRaw);
  }

  const legacyRaw = window.localStorage.getItem(LEGACY_CART_KEY);
  const legacyItems = safeParse(legacyRaw);

  if (legacyItems.length) {
    window.localStorage.setItem(CART_KEY, JSON.stringify(legacyItems));
    window.localStorage.removeItem(LEGACY_CART_KEY);
  }

  return legacyItems;
};

const saveCart = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (incoming: Omit<CartItem, "qty">, qty = 1) => {
  const current = getCart();
  const existing = current.find((item) => item.id === incoming.id);

  if (existing) {
    existing.qty = Math.min(existing.qty + qty, incoming.stock);
  } else {
    current.push({ ...incoming, qty: Math.min(qty, incoming.stock) });
  }

  saveCart(current);
  return current;
};

export const updateCartQty = (id: string, qty: number) => {
  const current = getCart();
  const next = current
    .map((item) => {
      if (item.id !== id) return item;
      return { ...item, qty: Math.max(1, Math.min(qty, item.stock)) };
    })
    .filter((item) => item.qty > 0);

  saveCart(next);
  return next;
};

export const removeFromCart = (id: string) => {
  const next = getCart().filter((item) => item.id !== id);
  saveCart(next);
  return next;
};

export const clearCart = () => {
  saveCart([]);
};

export const getCartTotals = () => {
  const items = getCart();
  const count = items.reduce((acc, item) => acc + item.qty, 0);
  const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  return { count, total };
};
