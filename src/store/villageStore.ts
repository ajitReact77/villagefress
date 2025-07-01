// src/store/villageStore.ts
import { create } from 'zustand';

interface Village {
  id: number;
  name: string;
}

interface VillageState {
  selectedVillage: Village | null;
  setVillage: (village: Village) => void;
}

export const useVillageStore = create<VillageState>((set) => ({
  selectedVillage: null,
  setVillage: (village) => set({ selectedVillage: village }),
}));
