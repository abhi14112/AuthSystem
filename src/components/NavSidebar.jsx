import React from 'react'
import useAuthStore from '../store/store'
import { ArrowLeft, HousePlus, ScrollText, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const NavSidebar = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    return (
        <div className='px-2 py-4'>
            <div onClick={() => navigate("/")} className='flex gap-2 p-2 text-xl items-center cursor-pointer border-b border-slate-300 hover:bg-slate-300'>
                <ArrowLeft />
                <p>Go Back</p>
            </div>
            <div onClick={() => navigate("account")} className='flex hover:bg-slate-300 gap-4 text-xl border-b border-slate-400 p-2 cursor-pointer '>

                <div>
                    <img className='w-[50px] h-[50px] rounded-full object-cover' src='https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' />
                </div>
                <div>
                    <p>{user?.firstName}</p>
                    <p>{user?.emailAddress}</p>
                </div>
            </div>
            <div onClick={() => navigate("")} className='flex gap-4 hover:bg-slate-300 border-b p-2 border-slate-400  cursor-pointer '>
                <ScrollText />
                <p>
                    My Orders
                </p>
            </div>
            <div onClick={() => { navigate("address") }} className='flex gap-4 border-b p-2 hover:bg-slate-300 border-slate-400  cursor-pointer '>
                <HousePlus />
                <p>
                    Saved Addresses
                </p>
            </div>
            <div onClick={logout} className='flex hover:bg-red-100 gap-4 text-red-500 border-b p-2 border-slate-400  cursor-pointer '>
                <User />
                <p>Logout</p>
            </div>
        </div>
    )
}
export default NavSidebar