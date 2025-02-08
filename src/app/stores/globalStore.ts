import { create } from 'zustand';
// Note: 'create' as a default export is a deprecated import. 

type Store = {
  scale: number;
  setScale: (scale: number) => void;
};

const useStore = create<Store>((set) => ({
  scale: 1,
  setScale: (scale: number) => set((state) => ({ ...state, scale })),
}));

export default useStore;