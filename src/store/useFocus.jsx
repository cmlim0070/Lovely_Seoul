import { create } from "zustand";

const useFocus = create((set) => ({
    focusedPlace: null,
    setFocusedPlace: (place) => set({ focusedPlace: place }),
}));

export default useFocus;
