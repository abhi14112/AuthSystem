import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import useAuthStore from "../store/store";
const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useAuthStore((state) => state.user);
    useEffect(() => {
        api.get(`/api/Order/${user.emailAddress}`)
            .then((response) => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <div className="text-center text-lg mt-10">Loading orders...</div>;
    }

    return (
        <>

            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
                <div>
                    <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
                    {orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white p-4 rounded-lg shadow-md mb-4"
                            >
                                <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                                <p className="text-sm text-gray-600">
                                    Created At: {new Date(order.createdAt).toLocaleString()}
                                </p>
                                <p className="font-semibold mt-2">
                                    Total Amount: ${order.totalAmount}
                                </p>
                                <p className="text-sm text-green-600">
                                    Payment Status: {order.paymentStatus}
                                </p>
                                <div className="mt-4">
                                    {order.products.map((product) => (
                                        <div
                                            key={product.productId}
                                            className="flex items-center border-b py-2"
                                        >
                                            <img
                                                src={product.imageUrl}
                                                alt={product.productName}
                                                className="w-16 h-16 object-cover mr-4 rounded"
                                            />
                                            <div>
                                                <h3 className="text-md font-medium">
                                                    {product.productName}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {product.productDescription}
                                                </p>
                                                <p className="text-sm">
                                                    Price: ${product.price} x {product.quantity} = {product.price * product.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>

    );
};
export default OrdersPage;
