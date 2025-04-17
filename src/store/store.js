import { create } from "zustand";
const useAuthStore = create((set) => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    address: [],
    cartItems: [],
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    cartItemsCount: 0,
    setUserAddress: (data) => set({ address: data }),
    setCartItemsCount: (state) => set({ cartItemsCount: state }),
    setAuth: (userData) => set({ user: userData }),
    setToken: (Token) => set({ token: Token }),
    setCartItems: (cartData) => {
        set(({ cartItems: cartData }));
    },
    logout: () => {
        localStorage.removeItem("user");
        set(({ cartItems: [] }))
        set({ user: null })
        set({ token: null });
        localStorage.removeItem("token");
    },
}));
export default useAuthStore;