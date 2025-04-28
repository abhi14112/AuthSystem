import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/store";
import Home from "../Pages/Home";
import AdminPage from "../Pages/AdminProducts";
import Analytics from "../Pages/Analytics";
const PrivateRoute = () => {
    const user = useAuthStore((state) => state.user);
    if (!user)
        return <Navigate to="/login" />;
    else if (user?.role == 'admin')
        return <Analytics />;
    else if (user?.role == 'customer')
        return <Home />;
};
export default PrivateRoute;