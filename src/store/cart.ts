import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  stock: number;
  image: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  getCount: () => number;
  getTotal: () => number;
};

export const cartStore = createStore<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, qty: Math.min(i.qty + qty, item.stock) }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, qty: Math.min(qty, item.stock) }] };
        });
      },
      updateQty: (id, qty) => {
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, i.stock)) } : i))
            .filter((i) => i.qty > 0),
        }));
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },
      clear: () => set({ items: [] }),
      getCount: () => get().items.reduce((acc, i) => acc + i.qty, 0),
      getTotal: () => get().items.reduce((acc, i) => acc + i.qty * i.price, 0),
    }),
    { name: 'nora_makovitz_cart_v1' }
  )
);