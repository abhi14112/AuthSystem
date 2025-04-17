import React from "react";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/store";
const OrdersPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useAuthStore((state) => state.user);
    useEffect(() => {
        api.get(`/api/Order/${user.emailAddress}`)
            .then((response) => {
                setOrders(response.data);
                console.log(response.data);

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
        <div className="max-w-4xl mx-auto p-6  bg-gray-100 ">
            <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="flex mb-2 border-b border-slate-400 py-3 justify-between items-center" key={order.id}>
                        <div className="flex gap-2 items-center">
                            <div>
                                <img
                                    className="w-[40px] h-[40px] rounded-full object-cover" src={order?.products[0].imageUrl}
                                />
                            </div>
                            <div className="">
                                <div className="flex gap-3 items-center">
                                    <p className="font-bold">ORDER ID : {order.id}</p>
                                    <p className="font-bold">.</p>
                                    <p className="font-semibold">&#8377; {order.totalAmount}</p>
                                </div>
                                <div>
                                    <p>Placed on {new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div>
                                <button className="bg-purple-500 rounded-lg text-sm py-1 px-2 text-white">Shipped</button>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => navigate(`orderdetails/${order.id}`, { state: order })} className="text-green-600 cursor-default outline-none py-1 px-2 rounded-md border-1 text-sm border-slate-400">View Details</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
export default OrdersPage;
