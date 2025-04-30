import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  BaggageClaim,
  ShoppingCart,
  ChartBarStacked,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../store/store";
const LeftSidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();
  return (
    <div className="flex flex-col border-r-2 border-slate-300 py-4 items-center w-full">
      <div className="h-16">
        <Link className="font-bold text-xl" to="/admin">
          E-Commerce
        </Link>
      </div>
      <div className="flex border-gray-300 h-screen flex-col items-between">
        <div className="flex flex-col gap-2">
          <Link
            className={`flex ${location.pathname == "/admin" ? "bg-violet-500 text-white" : "text-black"} py-2 px-2 rounded-md  gap-2 items-center`}
            to="/admin"
          >
            <LayoutDashboard />
            Dashboard
          </Link>
          <Link
            className={`flex ${location.pathname == "/admin/products" ? "bg-violet-500 text-white" : "text-black"} py-2 px-2 rounded-md  gap-2 items-center`}
            to="/admin/products"
          >
            <BaggageClaim />
            Products
          </Link>
          <Link
            className={`flex ${location.pathname == "/admin/categories" ? "bg-violet-500 text-white" : "text-black"} py-2 px-2 rounded-md  gap-2 items-center`}
            to="/admin/categories"
          >
            <ChartBarStacked />
            Categories
          </Link>
          <Link
            className={`flex ${location.pathname == "/admin/orders" ? "bg-violet-500 text-white" : "text-black"} py-2 px-2 rounded-md  gap-2 items-center`}
            to="/admin/orders"
          >
            <ShoppingCart />
            Orders
          </Link>

          <div
            className={`flex py-2 px-2 rounded-md  gap-2 items-center`}
            onClick={() => logout()}
          >
            <LogOut />
            <button>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
