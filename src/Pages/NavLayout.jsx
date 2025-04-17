import React from 'react'
import NavSidebar from '../components/NavSidebar'
import { Outlet } from 'react-router-dom'
const NavLayout = () => {
    return (
        <div className='w-full  h-[80vh] flex justify-center items-center'>

            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} className='bg-gray-100 h-[90%] w-[70%] grid grid-cols-3 '>
                <div className='col-span-1 overflow-y-scroll min-h-[105%]' >
                    <NavSidebar />
                </div>
                <div className=' col-span-2 min-h-[100%] overflow-y-scroll '>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}
export default NavLayout