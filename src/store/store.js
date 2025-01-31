import { create } from "zustand";
const useAuthStore = create((set) => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    setAuth: (userData) => set({ user: userData }),
    setToken: (Token) => set({ token: Token }),
    logout: () => {
        localStorage.removeItem("user");
        set({ user: null })
    },
}));
export default useAuthStore;