import { create } from "zustand";

const useFes = create((set) => ({
    fesDataList: null,
    setfesDataList: (data) => set({ fesDataList: data }),
}));

export default useFes;
