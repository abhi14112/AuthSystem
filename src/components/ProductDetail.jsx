import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { MinusIcon, PlusIcon } from "lucide-react";

const ProductDetail = () => {
    const location = useLocation();
    const product = location?.state?.product;

    const [cartData, setCartData] = useState({
        ProductId: product?.id,
        Quantity: 1
    });

    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("red");

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
            await api.post("/api/cart/AddToCart", cartData);
            toast.success("Product Added to Cart Successfully");
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    };

    const handleQuantityChange = (change) => {
        setCartData((prev) => {
            const newQuantity = Math.max(1, prev.Quantity + change);
            return { ...prev, Quantity: newQuantity };
        });
    };

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-8 mt-8">
                {/* Product Image */}
                <div className="w-full md:w-1/2 border-2 border-blue-500 rounded-xl p-4 flex items-center justify-center">
                    <img src={product.image} alt={product.productName} className="object-contain max-h-[400px]" />
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">{product.productName}</h2>

                    <div className="flex items-center gap-2">
                        <span className="text-yellow-500 text-lg">★★★★☆</span>
                        <span className="text-sm text-gray-600">(150 Reviews)</span>
                        <span className="text-green-600 font-medium ml-2">In Stock</span>
                    </div>

                    <p className="text-2xl font-bold">${product.price}</p>

                    <p className="text-gray-600 text-sm">{product.description}</p>

                    
                    

                    

                    {/* Quantity + Buy Now */}
                    <div className="flex items-center gap-4 mt-6">
                        <div className="flex items-center border rounded px-2">
                            <button onClick={() => handleQuantityChange(-1)}><MinusIcon size={16} /></button>
                            <span className="px-4">{cartData.Quantity}</span>
                            <button onClick={() => handleQuantityChange(1)}><PlusIcon size={16} /></button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-6 border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">Free Delivery</h4>
                                <p className="text-sm text-gray-500">Enter your postal code for delivery availability</p>
                            </div>
                        </div>
                        <div className="border-t pt-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">Return Delivery</h4>
                                <p className="text-sm text-gray-500">Free 30 Days Delivery Returns.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
