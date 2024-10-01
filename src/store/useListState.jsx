import { create } from "zustand";

const useListState = create((set) => ({
    nowListState: 1,
    setnowListState: (category) => set({ nowListState: category }),
}));

export default useListState;
