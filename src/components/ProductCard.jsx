import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState({
        "ProductId": product.id,
        "Quantity": "1"
    })
    const handleAddToCart = async () => {
        try {
            await api.post("/api/cart/AddToCart", cartData);
            toast.success("Product Added to Cart Successfully");
        } catch (error) {
            toast.error("Failed to add in cart");
            console.log(error);
        }
    }
    return (
        <div className="max-w-sm  p-4 bg-white rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-102 hover:shadow-2xl h-max w-[23%]">
            <img
                src={product.image}
                alt={product.productName}
                className="w-full cursor-pointer h-48 object-cover rounded-t-2xl"
                onClick={() => navigate(`/product/item/${product.id}`, { state: { product } })}
            />
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 truncate">
                    {product.productName}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                    {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-green-600">
                        ${product.price.toFixed(2)}
                    </span>
                    <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium cursor-pointer rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;