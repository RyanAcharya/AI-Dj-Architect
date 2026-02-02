import { create } from "zustand";

interface SetStore {
    setResult: any | null;
    setSetResult: (data: any) => void;
    clearResult: () => void;
}

export const useSetStore = create<SetStore>((set) => ({
    setResult: null,
    setSetResult: (data) => set({ setResult: data }),
    clearResult: () => set({ setResult: null }),
}));