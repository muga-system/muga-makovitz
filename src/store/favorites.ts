const FAVORITES_KEY = "nora_makovitz_favorites_v1";

const safeParse = (raw: string | null): string[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(FAVORITES_KEY));
};

const saveFavorites = (ids: string[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
};

export const isFavorite = (id: string): boolean => getFavorites().includes(id);

export const toggleFavorite = (id: string) => {
  const current = getFavorites();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  saveFavorites(next);
  return next;
};

export const removeFavorite = (id: string) => {
  const next = getFavorites().filter((item) => item !== id);
  saveFavorites(next);
  return next;
};
