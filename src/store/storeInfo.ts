import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Store {
  name: string;
  ownerName: string;
  phone: string;
  address: string;
  whatsappNumber: string;
}

interface StoreState {
  store: Store;
  setStore: (newStore: Store) => void;
}

const defaultStore: Store = {
  name: 'Village Store',
  ownerName: 'Store Owner',
  phone: '+9198989898',
  address: 'Khukhundoo Store',
  whatsappNumber: '+917617028576',
};

export const useStoreInfo = create<StoreState>()(
  persist(
    (set) => ({
      store: defaultStore,
      setStore: (newStore) => set({ store: newStore }),
    }),
    {
      name: 'village-fresh-store', // key in localStorage
    }
  )
);
