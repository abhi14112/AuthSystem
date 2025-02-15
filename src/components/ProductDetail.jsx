import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
const ProductDetail = () => {
    const location = useLocation();
    const product = location?.state?.product;
    const [cartData, setCartData] = useState({
        "ProductId": product.id,
        "Quantity": "1"
    })
    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
                    <p className="text-gray-600 mt-4">Product is not available.</p>
                </div>
            </div>
        );
    }
    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem("token");
            await api.post("/api/cart/AddToCart", cartData);
            toast.success("Product Added to Cart Successfully");
        } catch (error) {
            toast.error("Failed to add in cart");
            console.log(error);
        }
    }
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-[80%]  ">
                <div className="  rounded-2xl p-6 max-w-4xl w-full">
                    <div className="flex gap-4">
                        <img
                            src={product.image}
                            alt={product.productName}
                            className="w-1/2 h-auto object-cover rounded-xl mr-6"
                        />
                        <div className="w-1/2 flex flex-col justify-around text-center px-8">
                            <div>

                                <h2 className="text-2xl font-bold text-gray-800">{product.productName}</h2>

                                <p className="text-gray-600 mt-2">{product.description}</p>

                                <div className="mt-4">
                                    <span className="text-2xl font-bold text-gray-800">${product.price}</span>

                                </div>
                            </div>


                            <div>

                                <button onClick={handleAddToCart} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold cursor-pointer hover:bg-blue-700 transition">
                                    Add to Cart
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductDetail;