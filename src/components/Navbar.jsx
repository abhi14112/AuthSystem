import React from 'react'

import { Link, NavLink } from 'react-router-dom'
import useAuthStore from '../store/store';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
const Navbar = () => {
    const navigate = useNavigate();
    
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    if (user?.role == 'admin') {
        return (
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center px-5 ">
                <Link to="/"><h1 className="text-2xl">Admin Panel</h1></Link>
                <div className="flex items-center gap-4">
                    <NavLink to="/add" className="bg-blue-500 text-white font-semibold text-xl rounded-md cursor-pointer px-2 py-1">Add Product</NavLink>
                    <button onClick={logout} className="bg-red-500 text-white font-semibold text-xl rounded-md cursor-pointer px-2 py-1">Logout</button>
                </div>
            </div>
        );
    }
    return (
        <div className='w-full bg-gray-800 text-white p-2 flex px-12 justify-between items-center'>
            <div className='flex items-center'>
                <h1 className='text-2xl font-semibold'>
                    <Link to="/">E-Commerce</Link>
                </h1>
            </div>
            <div className='flex gap-3 items-center'>


                <button className="focus:outline-none cursor-pointer text-white bg-yellow-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => { navigate("/cart") }}>
                    <ShoppingCart size={18} />
                </button>

                <button type="button" onClick={logout} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
            </div>
        </div>
    )
}
export default Navbar