import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://localhost:7249/api/product/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("All products:", response.data);
                setAllProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://localhost:7249/api/product/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAllProducts(allProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Product List</h2>
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
