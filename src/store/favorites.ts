import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

type FavoritesState = {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

export const favoritesStore = createStore<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) => set((state) => ({ ids: state.ids.includes(id) ? state.ids : [...state.ids, id] })),
      remove: (id) => set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
      toggle: (id) => {
        const current = get().ids;
        const next = current.includes(id) ? current.filter((i) => i !== id) : [...current, id];
        set({ ids: next });
      },
      has: (id) => get().ids.includes(id),
    }),
    { name: 'nora_makovitz_favorites_v1' }
  )
);

export const isFavorite = (id: string): boolean => favoritesStore.getState().has(id);
export const toggleFavorite = (id: string) => favoritesStore.getState().toggle(id);
export const getFavorites = (): string[] => favoritesStore.getState().ids;
export const removeFavorite = (id: string) => favoritesStore.getState().remove(id);