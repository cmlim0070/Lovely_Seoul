import { create } from "zustand";

const useAuth = create((set) => ({
    username: "",
    userage: "",
    isLoggedIn: false,
    setUsername: (name) => set({ username: name }),
    setUserage: (age) => set({ userage: age }),
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false, username: "", userage: "" }),
}));

export default useAuth;
