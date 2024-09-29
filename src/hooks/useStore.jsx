import create from "zustand";

const useStore = create((set) => ({
    hotspots: [],
    setHotspots: (data) => set({ hotspots: data }),
}));

export default useStore;
