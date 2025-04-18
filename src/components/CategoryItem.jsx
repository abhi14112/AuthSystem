import React from 'react'
import { useNavigate } from 'react-router-dom'
const CategoryItem = ({ item }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("/products", { state: { category: item.categoryTitle } })} className=' hover:cursor-pointer h-[300px] w-[250px]   transition-all relative duration-400 hover:scale-103 '>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black rounded-md"></div>
            <img src={item.image} className='w-full rounded-md object-cover  bg-gradient-to-b from-transparent to-black' />
            <div className='absolute bottom-5 left-5'>
                <p className='text-white font-bold text-xl'>{item.categoryTitle}</p>
                <p className='text-slate-200'>{item.categoryDesc}</p>
            </div>
        </div>
    )
}

export default CategoryItem