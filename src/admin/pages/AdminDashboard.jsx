import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance.js";
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const processData = (data) => {
  const statusCount = data.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.keys(statusCount).map((status) => ({
    name: status,
    value: statusCount[status],
  }));
  const dateCount = data.reduce((acc, order) => {
    let formattedDate = new Date(order.createdAt).toLocaleDateString();
    acc[formattedDate] = (acc[formattedDate] || 0) + 1;
    return acc;
  }, {});
  const dailyData = Object.keys(dateCount)
    .map((date) => ({ date, orders: dateCount[date] }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const dateRevenue = data.reduce((acc, order) => {
    let formattedDate = new Date(order.createdAt).toLocaleDateString();
    acc[formattedDate] = (acc[formattedDate] || 0) + order.totalAmount;
    return acc;
  }, {});
  const revenueData = Object.keys(dateRevenue)
    .map((date) => ({ date, revenue: dateRevenue[date] }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    statusData,
    dailyData,
    revenueData,
  };
};

export default function AdminDashboard() {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/order/admin");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const { statusData, dailyData, revenueData } = processData(data);
  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  const totalOrders = data.length;
  const totalRevenue = data.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Dashboard</h1>
        <p className="text-gray-600">Key metrics overview</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Total Orders
          </h2>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Total Revenue
          </h2>
          <p className="text-3xl font-bold">${totalRevenue}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Average Order Value
          </h2>
          <p className="text-3xl font-bold">${averageOrderValue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Order Status Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Revenue by Date
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Orders Per Day
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8884d8" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Revenue Per Day
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff7300"
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
