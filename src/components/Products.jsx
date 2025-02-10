import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../utils/axiosInstance";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
const Products = () => {
    const location = useLocation();
    const [sortBy, setSortBy] = useState("price-asc");
    const [category, setCategory] = useState(location.state.category);
    const [products, setProducts] = useState([]);
    if (!products) {
        return <h1>Loading...</h1>;
    }
    useEffect(() => {
        api
            .get(`/api/product/all/${sortBy}/${category}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [sortBy, category]);
    return (
        <>
            <Navbar />
            <div className="col-span-1 bg-slate-900 flex gap-3 p-2 px-10 text-white">
                <select
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                    }}
                    className="mt-1 p-2 border bg-slate-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="price-asc">Price Low to High</option>
                    <option value="price-desc">Price High to Low</option>
                    <option value="name-asc">A-Z</option>
                    <option value="name-desc">Z-A</option>
                </select>
            </div>
            <div className="grid grid-cols-5 bg-slate-900">
                <div className=" px-4 py-6 col-span-3 w-screen min-h-screen h-max flex flex-wrap gap-5 justify-center">
                    {products.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
                </div>
            </div>
        </>
    );
};
export default Products;
