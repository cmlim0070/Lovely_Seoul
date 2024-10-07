import { create } from "zustand";

const useAllData = create((set) => ({
    AllData: [],
    setAllData: (data) => set({ AllData: data }),
}));

export default useAllData;
