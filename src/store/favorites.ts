import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export const favoriteIds = persistentAtom<string[]>('nora_makovitz_favorites_v1', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const favoritesCount = atom<number>(0);

export function updateFavoritesCount() {
  favoritesCount.set(favoriteIds.get().length);
}

favoriteIds.subscribe(updateFavoritesCount);

export function isFavorite(id: string): boolean {
  return favoriteIds.get().includes(id);
}

export function toggleFavorite(id: string) {
  const current = favoriteIds.get();
  if (current.includes(id)) {
    favoriteIds.set(current.filter(i => i !== id));
  } else {
    favoriteIds.set([...current, id]);
  }
}

export function removeFavorite(id: string) {
  favoriteIds.set(favoriteIds.get().filter(i => i !== id));
}