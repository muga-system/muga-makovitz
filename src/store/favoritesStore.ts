import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesStore {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getCount: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ids: [],
      
      addFavorite: (id) => {
        if (!get().ids.includes(id)) {
          set({ ids: [...get().ids, id] });
        }
      },
      
      removeFavorite: (id) => {
        set({ ids: get().ids.filter(i => i !== id) });
      },
      
      toggleFavorite: (id) => {
        if (get().ids.includes(id)) {
          set({ ids: get().ids.filter(i => i !== id) });
        } else {
          set({ ids: [...get().ids, id] });
        }
      },
      
      isFavorite: (id) => get().ids.includes(id),
      
      getCount: () => get().ids.length
    }),
    {
      name: 'nora-makovitz-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
