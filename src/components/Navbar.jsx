import React, { useState } from "react";
import { CircleUserRound, Search } from "lucide-react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import useAuthStore from "../store/store";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
const Navbar = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [searchKeyword, setSearchKeyword] = useState("");
    if (user?.role == "admin") {
        return (
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center px-5 ">
                <Link to="/">
                    <h1 className="text-2xl">Admin Panel</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <NavLink
                        to="/add"
                        className="bg-blue-500 text-white font-semibold text-xl rounded-md cursor-pointer px-2 py-1"
                    >
                        Add Product
                    </NavLink>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white font-semibold text-xl rounded-md cursor-pointer px-2 py-1"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="w-full  bg-gray-800 text-white py-6 flex px-12 justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold">
                    <Link to="/">E-Commerce</Link>
                </h1>
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative">
                    <input
                        value={searchKeyword}
                        className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Search For Products"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button
                        className="absolute top-1 cursor-pointer right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button" onClick={() => {
                            if (searchKeyword != "")
                                navigate("/search", { state: { searchKey: searchKeyword } });
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 mr-2"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Search
                    </button>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <button onClick={() => { navigate("/profile") }} className="focus:outline-none relative cursor-pointer text-white bg-blue-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    <CircleUserRound size={18} />
                </button>
                <button
                    className="focus:outline-none relative cursor-pointer text-white bg-yellow-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    onClick={() => {

                        navigate("/cart");
                    }}
                >
                    <ShoppingCart size={18} />
                </button>
                <button
                    type="button"
                    onClick={logout}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
export default Navbar;
