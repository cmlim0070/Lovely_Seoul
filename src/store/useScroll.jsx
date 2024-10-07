import create from "zustand";

const useScroll = create((set) => ({
    carRef: [],
    scrollPosition: 0,
    setScrollPosition: (position) => set({ scrollPosition: position }),
    setCardRef: (index, ref) =>
        set((state) => {
            const newCardRefs = [...state.cardRefs];
            newCardRefs[index] = ref;
            return { cardRefs: newCardRefs };
        }),
    resetCardRefs: () => set({ cardRefs: [] }),
}));

export default useScroll;
