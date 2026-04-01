import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  stock: number;
  image: string;
};

export const cartItems = persistentAtom<CartItem[]>('nora_makovitz_cart_v1', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const cartCount = atom<number>(0);

export function updateCartCount() {
  const items = cartItems.get();
  cartCount.set(items.reduce((acc, item) => acc + item.qty, 0));
}

cartItems.subscribe(updateCartCount);

export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1) {
  const current = cartItems.get();
  const existing = current.find(i => i.id === item.id);
  if (existing) {
    cartItems.set(current.map(i => 
      i.id === item.id 
        ? { ...i, qty: Math.min(i.qty + qty, item.stock) }
        : i
    ));
  } else {
    cartItems.set([...current, { ...item, qty: Math.min(qty, item.stock) }]);
  }
}

export function updateCartQty(id: string, qty: number) {
  const current = cartItems.get();
  if (qty <= 0) {
    cartItems.set(current.filter(i => i.id !== id));
  } else {
    cartItems.set(current.map(i => 
      i.id === id ? { ...i, qty: Math.min(qty, i.stock) } : i
    ));
  }
}

export function removeFromCart(id: string) {
  cartItems.set(cartItems.get().filter(i => i.id !== id));
}

export function clearCart() {
  cartItems.set([]);
}