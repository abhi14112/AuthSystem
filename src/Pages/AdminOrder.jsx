import React, { useEffect, useState } from 'react'
import api from '../utils/axiosInstance'
import axiosInstance from "../utils/axiosInstance";
import { ArrowDown, ArrowUp } from 'lucide-react';
import toast from 'react-hot-toast';
const AdminOrder = () => {
    const [sortBy, setSortBy] = useState({ "key": null, "order": "desc" });
    const [orders, setOrders] = useState([]);

    const handleSort = (key) => {
        let order = sortBy.order == "desc" ? "asc" : "desc";
        const sorted = [...orders].sort((a, b) => {
            if (a[key] < b[key]) return order === "asc" ? -1 : 1;
            if (a[key] > b[key]) return order === "asc" ? 1 : -1;
            return 0;
        });
        setOrders(sorted);
        setSortBy({ "key": key, "order": order });
    }
    const getOrders = async () => {
        const res = await api.get("/api/order/admin");
        setOrders(res.data);
    }
    useEffect(() => {
        getOrders();
    }, []);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };
    const updateOrder = async (id, newOrderStatus) => {
        const data = {
            orderId: id,
            status: newOrderStatus
        }
        try {
            await axiosInstance.post("/api/order/updateOrderStatus", data);
            toast.success("status updated successfully");
            getOrders();
        } catch (error) {
            toast.error("Faild to update status");
        }

    }
    const StatusBadge = ({ status, type }) => {
        const getStatusColor = () => {
            if (type === 'order') {
                switch (status.toLowerCase()) {
                    case 'delivered': return 'bg-green-500 text-white';
                    case 'pending': return 'bg-yellow-500 text-white';
                    case 'cancelled': return 'bg-red-500 text-white';
                    case 'shipped': return 'bg-purple-500 text-white';

                    default: return 'bg-gray-100 text-gray-800';
                }
            } else {
                return status.toLowerCase() === 'paid'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800';
            }
        };
        if (!orders) {
            return <h1>Loading...</h1>
        }
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
                {status}
            </span>
        );
    };
    const status = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned",];
    return (
        <>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th onClick={() => handleSort("id")} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex  cursor-pointer items-center">
                                    <p>
                                        Order ID
                                    </p>
                                    {
                                        sortBy.key == "id" ? sortBy.order == "asc" ? <ArrowUp size={18} /> : <ArrowDown size={18} /> : ""
                                    }
                                </th>
                                <th onClick={() => handleSort("createdAt")} scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <p className='flex'>
                                        Created
                                        {
                                            sortBy.key == "createdAt" ? sortBy.order == "asc" ? <ArrowUp size={18} /> : <ArrowDown size={18} /> : ""
                                        }
                                    </p>

                                </th>
                                <th onClick={() => handleSort("items")} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <p className='flex'>
                                        Items
                                        {
                                            sortBy.key == "items" ? sortBy.order == "asc" ? <ArrowUp size={18} /> : <ArrowDown size={18} /> : ""
                                        }
                                    </p>
                                </th>
                                <th onClick={() => handleSort("totalAmount")} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <p className='flex'>
                                        Amount
                                        {
                                            sortBy.key == "totalAmount" ? sortBy.order == "asc" ? <ArrowUp size={18} /> : <ArrowDown size={18} /> : ""
                                        }
                                    </p>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order Status
                                </th>
                            </tr>
                        </thead>
                        {
                            orders.map((order, index) => {
                                return <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-blue-600">#{order.id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{order.items}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">${order.totalAmount}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={order.paymentStatus} type="payment" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select onChange={(e) => { updateOrder(order.id, e.target.value) }} className={`${order.orderStatus == "Pending" ? 'bg-yellow-500' : order.orderStatus == "Delivered" ? 'bg-green-500' : order.orderStatus == "Cancelled" ? 'bg-red-500' : order.orderStatus == "Shipped" ? 'bg-purple-500' : order.orderStatus == "Returned" ? 'bg-gray-500' : order.orderStatus == "Processing" ? 'bg-blue-500' : ''} rounded-lg text-sm py-1 px-2 text-white`}>
                                                <option value={order?.orderStatus}>
                                                    {order.orderStatus}
                                                </option>
                                                {
                                                    status.map((item) => {
                                                        if (item.toLowerCase() != order.orderStatus.toLowerCase()) {
                                                            return <option value={item}>{item}</option>
                                                        }
                                                    })
                                                }
                                            </select>

                                        </td>
                                    </tr>
                                </tbody>
                            })
                        }
                    </table>
                </div>
            </div >
        </>

    );
}
export default AdminOrder