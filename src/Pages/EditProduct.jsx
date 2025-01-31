import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditProduct = () => {
    const location = useLocation();
    const product = location.state;
    const navigate = useNavigate();
    console.log(product);
    const [productData, setProductData] = useState({
        "productName": product.productName,
        "description": product.description,
        "price": product.price,
        "image": product.image,
        "category": product.category
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            console.log(productData);
            const response = await axios.put(`https://localhost:7249/api/product/update/${product.id}`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            alert("Product Updated successfully!");
            setProductData({
                productName: "",
                description: "",
                price: "",
                image: "",
                category: "",
            });
            navigate("/");

        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to Update product.");
        }
    };
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Update Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                value={productData.productName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter product description"
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter product price"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={productData.image}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter image URL"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter product category"
                                required
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditProduct;