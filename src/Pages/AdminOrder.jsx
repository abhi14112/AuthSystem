import React, { useEffect, useState } from 'react'
import api from '../utils/axiosInstance'
import { ArrowDown, ArrowUp } from 'lucide-react';
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

    const StatusBadge = ({ status, type }) => {
        const getStatusColor = () => {
            if (type === 'order') {
                switch (status.toLowerCase()) {
                    case 'received': return 'bg-green-100 text-green-800';
                    case 'pending': return 'bg-yellow-100 text-yellow-800';
                    case 'declined': return 'bg-red-100 text-red-800';
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
                                            <StatusBadge status={order.orderStatus} type="order" />
                                        </td>
                                    </tr>
                                </tbody>
                            })
                        }
                    </table>
                </div>
            </div>
        </>

    );
}
export default AdminOrder