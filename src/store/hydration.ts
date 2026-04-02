"use client";

import { useSyncExternalStore } from "react";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";

type PersistedStore = {
  persist: {
    hasHydrated: () => boolean;
    onHydrate: (listener: () => void) => () => void;
    onFinishHydration: (listener: () => void) => () => void;
  };
};

const createHydrationHook = (store: PersistedStore) => {
  return function useHydrated() {
    return useSyncExternalStore(
      (listener) => {
        const unsubscribeHydrate = store.persist.onHydrate(listener);
        const unsubscribeFinish = store.persist.onFinishHydration(listener);

        return () => {
          unsubscribeHydrate();
          unsubscribeFinish();
        };
      },
      () => store.persist.hasHydrated(),
      () => false
    );
  };
};

export const useCartHydrated = createHydrationHook(useCartStore as PersistedStore);
export const useFavoritesHydrated = createHydrationHook(useFavoritesStore as PersistedStore);
