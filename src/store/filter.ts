import { createStore } from 'zustand/vanilla';

export type FilterState = {
  activeCategory: string;
  setCategory: (category: string) => void;
};

export const filterStore = createStore<FilterState>((set) => ({
  activeCategory: 'all',
  setCategory: (category) => set({ activeCategory: category }),
}));

export const getActiveCategory = () => {
  if (typeof window === 'undefined') return 'all';
  return filterStore.getState().activeCategory;
};

export const setActiveCategory = (category: string) => {
  filterStore.getState().setCategory(category);
};
