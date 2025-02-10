import axios from "axios";
const api = axios.create({
    baseURL: "https://localhost:7249",
    headers: {
        "Content-Type": "application/json",
    },
});
api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.warn("Session expired. Logging out...");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
export default api;