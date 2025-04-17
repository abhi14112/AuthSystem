import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js";
const AdminPage = () => {
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState("price-asc");
    const [category, setCategory] = useState("all");
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get(`/api/product/all/${sortBy}/${category}`);
                setAllProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [category, sortBy]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/product/delete/${id}`);
            setAllProducts(allProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <div className="container mx-auto p-6">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Product List</h2>
                    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-md">
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Sort By:</label>
                            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value) }} className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="price-asc">Price Low to High</option>
                                <option value="price-desc">Price High to Low</option>
                                <option value="name-asc">A-Z</option>
                                <option value="name-desc">Z-A</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Category:</label>
                            <select value={category} onChange={(e) => { setCategory(e.target.value) }} className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="all">All</option>
                                <option value="gadgets">Gadgets</option>
                                <option value="smartphones">SmartPhones</option>
                                <option value="footwear">Footwear</option>
                                <option value="fashion">Fashion</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden border rounded-lg shadow-md">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Image</th>
                                <th className="py-3 px-6 text-left">Product Name</th>
                                <th className="py-3 px-6 text-left">Description</th>
                                <th className="py-3 px-6 text-left">Category</th>
                                <th className="py-3 px-6 text-left">Price</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {allProducts.map((product, index) => (
                                <tr key={product.id} className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                    <td className="py-3 px-6 text-left">
                                        <img src={product.image} alt={product.productName} className="w-16 h-16 object-cover rounded-lg border" />
                                    </td>
                                    <td className="py-3 px-6 text-left font-medium">{product.productName}</td>
                                    <td className="py-3 px-6 text-left">{product.description}</td>
                                    <td className="py-3 px-6 text-left">{product.category}</td>
                                    <td className="py-3 px-6 text-left font-semibold">${product.price.toFixed(2)}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            onClick={() => { navigate("/update", { state: product }) }}
                                            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { confirm("Do you want to delete this product?") ? handleDelete(product.id) : null }}
                                            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
