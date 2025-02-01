import React from 'react';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import useAuthStore from '../store/store';
const Products = () => {
    const logout = useAuthStore((state) => state.logout);

    const [products, setProducts] = useState([])
    if (!products) {
        return <h1>Loading...</h1>
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get('https://localhost:7249/api/product/all', {
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
    }, []);
    return (
        <div className='bg-slate-900 px-4 py-6 w-screen min-h-screen h-max flex flex-wrap gap-5 justify-center'>
            {
                products.map((product) => {
                    return <ProductCard key={product.id} product={product} />
                })
            }
        </div>
    )
}
export default Products