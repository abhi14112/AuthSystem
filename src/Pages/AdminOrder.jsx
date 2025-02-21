import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../utils/axiosInstance'
const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
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
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Amount
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