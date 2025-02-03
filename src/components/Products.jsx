import React from 'react';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import useAuthStore from '../store/store';
const Products = ({ data }) => {
    const { sortBy, category } = data;
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
    }, [data]);
    return (
        <div className='grid grid-cols-5 bg-slate-900'>
            <div className=' px-4 py-6 col-span-3 w-screen min-h-screen h-max flex flex-wrap gap-5 justify-center'>
                {
                    products.map((product) => {
                        return <ProductCard key={product.id} product={product} />
                    })
                }
            </div>
        </div >
    )
}
export default Products;