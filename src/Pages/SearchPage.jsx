import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
const SearchPage = () => {
    const [searchData, setSearchData] = useState([]);
    const location = useLocation();
    const { searchKey } = location.state;
    console.log(searchKey);
    const perFormSearch = () => {
        const token = localStorage.getItem("token");
        axios.get(`https://localhost:7249/api/product/search/${searchKey}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                setSearchData(response.data);
            })
            .catch((error) => {
                toast.error("Error while get data");
                console.log(error)
            })
    }
    useEffect(() => {
        perFormSearch();
    }, [searchKey]);
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Results for "{searchKey}"</h2>
                {searchData.length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {searchData.map((product) => (
                            <ProductCard key={product?.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
export default SearchPage