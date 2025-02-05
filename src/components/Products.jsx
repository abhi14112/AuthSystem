import React from 'react';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import useAuthStore from '../store/store';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
const Products = () => {
    const location = useLocation();
    const [sortBy, setSortBy] = useState("price-asc");
    const [category, setCategory] = useState(location.state.category);

    const logout = useAuthStore((state) => state.logout);

    const [products, setProducts] = useState([])
    if (!products) {
        return <h1>Loading...</h1>
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`https://localhost:7249/api/product/all/${sortBy}/${category}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                logout();
                console.log(error)
            })
    }, [sortBy, category]);
    return (
        <>
            <Navbar />
            <div className='col-span-1 bg-slate-900 flex gap-3 p-2 px-10 text-white'>
                {/* <select value={category} onChange={(e) => { setCategory(e.target.value) }} className="mt-1 bg-slate-900 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="all">All</option>
                    <option value="gadgets">Gadgets</option>
                    <option value="smartphones">SmartPhones</option>
                    <option value="footwear">Footwear</option>
                    <option value="fashion">Fashion</option>
                </select> */}
                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value) }} className="mt-1 p-2 border bg-slate-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="price-asc">Price Low to High</option>
                    <option value="price-desc">Price High to Low</option>
                    <option value="name-asc">A-Z</option>
                    <option value="name-desc">Z-A</option>
                </select>
            </div>
            <div className='grid grid-cols-5 bg-slate-900'>
                <div className=' px-4 py-6 col-span-3 w-screen min-h-screen h-max flex flex-wrap gap-5 justify-center'>
                    {
                        products.map((product) => {
                            return <ProductCard key={product.id} product={product} />
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default Products;