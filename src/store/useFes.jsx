import { create } from "zustand";

const useFes = create((set) => ({
    fesDataList: null,
    isLoading: false,
    setfesDataList: (data) => {
        set({ isLoading: true });
        set({ fesDataList: data, isLoading: false });
    },
}));

export default useFes;
