import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../utils/axiosInstance";
const Deals = () => {
    const [products, setProducts] = useState([]);
    if (!products) {
        return <h1>Loading...</h1>;
    }
    useEffect(() => {
        api
            .get(`/api/product/all`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <div className="bg-slate-800 px-4 py-6 col-span-3 w-screen min-h-screen h-max flex flex-wrap gap-5 justify-center">
                {products.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </div>
        </>
    );
};
export default Deals;
