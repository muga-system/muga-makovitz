import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  stock: number;
  image: string;
};

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (item, qty = 1) => {
        const current = get().items;
        const existing = current.find(i => i.id === item.id);
        
        if (existing) {
          set({
            items: current.map(i =>
              i.id === item.id
                ? { ...i, qty: Math.min(i.qty + qty, item.stock) }
                : i
            )
          });
        } else {
          set({ items: [...current, { ...item, qty: Math.min(qty, item.stock) }] });
        }
      },
      
      removeFromCart: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },
      
      updateQty: (id, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter(i => i.id !== id) });
        } else {
          set({
            items: get().items.map(i =>
              i.id === id ? { ...i, qty: Math.min(qty, i.stock) } : i
            )
          });
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((acc, item) => acc + item.qty * item.price, 0);
      },
      
      getCount: () => {
        return get().items.reduce((acc, item) => acc + item.qty, 0);
      }
    }),
    {
      name: 'nora-makovitz-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
