import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const ProductCard = ({ product }) => {
    const [cartData, setCartData] = useState({
        "ProductId": product.id,
        "Quantity": "1"
    })
    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post("https://localhost:7249/api/cart/AddToCart", cartData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Product Added to Cart Successfully");
        } catch (error) {
            toast.error("Failed to add in cart");
            console.log(error);
        }
    }
    return (
        <div className="max-w-sm  p-4 bg-white rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl h-max w-[23%]">
            <img
                src={product.image}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-t-2xl"
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
                    <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;