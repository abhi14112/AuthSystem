import React, { useState } from "react";
import { useParams } from "react-router-dom";
const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full">
                <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-6">
                    <h2 className="text-2xl font-bold text-gray-800">{product.productName}</h2>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-gray-900 font-semibold text-xl mt-4">${product.price}</p>
                    <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProductDetail;