import { LogOut, Logs, MapPin, User } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/store';
const ProfileSidebar = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    return (
        <div className='bg-slate-200 px-12 min-h-screen rounded-md shadow-xl py-4 '>
            <div className='mb-6'>
                <p className='font-semibold'>Abhishek Kumar</p>
                <p>abhi@gmail.com</p>
            </div>
            <div className='flex flex-col gap-3'>
                <div onClick={() => navigate("/user/profile")} className='flex hover:cursor-pointer justify-center gap-2 cursor-pointer items-center '>
                    <User size={18} />
                    <p>Profile</p>
                </div>
                <div onClick={() => navigate("/user/address")} className='hover:cursor-pointer justify-center flex gap-2 cursor-pointer items-center'>
                    <MapPin size={18} />
                    <p>Address</p>
                </div>
                
                <div onClick={() => logout()} className=' hover:cursor-pointer flex gap-2 cursor-pointer items-center bg-red-500 text-white font-semibold py-1  justify-center shadow-sm  rounded-md'>
                    <LogOut size={18} />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default ProfileSidebar;