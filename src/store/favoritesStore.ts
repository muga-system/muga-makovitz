import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesStore {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

type PersistedFavoritesState = Pick<FavoritesStore, 'ids'>;

const FAVORITES_STORE_VERSION = 1;

const migrateFavoritesState = (persistedState: unknown, version: number): PersistedFavoritesState => {
  if (!persistedState || typeof persistedState !== 'object') {
    return { ids: [] };
  }

  const legacy = persistedState as { ids?: unknown };
  const ids = Array.isArray(legacy.ids)
    ? (legacy.ids as unknown[]).filter((id): id is string => typeof id === 'string')
    : [];

  if (version <= 0) {
    return { ids };
  }

  return { ids };
};

export const selectFavoriteIds = (state: FavoritesStore) => state.ids;
export const selectFavoriteCount = (state: FavoritesStore) => state.ids.length;
export const selectIsFavorite = (id: string) => (state: FavoritesStore) =>
  state.ids.includes(id);

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
    }),
    {
      name: 'nora-makovitz-favorites',
      storage: createJSONStorage(() => localStorage),
      version: FAVORITES_STORE_VERSION,
      partialize: (state) => ({ ids: state.ids }),
      migrate: migrateFavoritesState,
    }
  )
);
