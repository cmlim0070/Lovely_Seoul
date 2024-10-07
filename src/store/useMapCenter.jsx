import { create } from "zustand";

const centerOfSeoul = {
    lat: 37.5665,
    lng: 126.978,
};

const useMapCenter = create((set) => ({
    mapCenter: centerOfSeoul,
    mapLevel: 6,
    setMapCenter: (newCenter) => set({ mapCenter: newCenter }),
    setMapLevel: (newLevel) => set({ mapLevel: newLevel }),
}));

export default useMapCenter;
