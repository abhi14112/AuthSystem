import React from 'react'
import CategoryItem from '../components/CategoryItem'
const CategoryPage = () => {
    const categories = [
        {
            categoryTitle: 'Gadgets',
            categoryDesc: 'Explore Gadgets',
            image: 'https://businessglimpse.com/storage/page/gadgets.jpg'
        },
        {
            categoryTitle: 'Fashion',
            categoryDesc: 'Explore Fashion',
            image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            categoryTitle: 'Footwear',
            categoryDesc: 'Explore Shoes',
            image: 'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg'
        },
        {
            categoryTitle: 'Smartphones',
            categoryDesc: 'Explore Smartphones',
            image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
    ]
    return (
        <div className="bg-slate-800 py-6  min-h-screen flex flex-col gap-2 ">
            <h1 className='text-5xl text-center text-white font-bold'>Explore Our Categories</h1>
            <p className='text-slate-200 text-xl text-center'>Discover the latest trends in eco-friendly fashion</p>
            <div className='mt-3 grid grid-cols-2 px-24 items-center w-full gap-6 '>
                {
                    categories.map((item) => (
                        <CategoryItem item={item} />
                    ))
                }
            </div>
        </div>
    )
}
export default CategoryPage;