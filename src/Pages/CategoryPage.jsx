import React from 'react'
import CategoryItem from '../components/CategoryItem'
import Deals from '../components/Deals'
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
        <>

            <div className="bg-slate-800 py-6   flex items-center flex-col gap-2 ">
                <h1 className='text-3xl  text-white font-bold mb-3'>Explore Our Top Categories</h1>
                <div className='flex flex-wrap gap-4'>
                    {
                        categories.map((item) => (
                            <CategoryItem item={item} />
                        ))
                    }
                </div>
            </div>
            <h1 className='text-white bg-slate-800 text-center text-3xl font-bold'>Best Deals For You</h1>
            <Deals />
        </>

    )
}
export default CategoryPage;