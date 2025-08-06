"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  customerName: string;
  address: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  createdAt: string;
  status: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.put(`/api/orders/${id}`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`/api/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-1">
              🧑 {order.customerName}
            </h2>
            <p className="text-gray-700 mb-1">📍 {order.address}</p>
            <p className="text-gray-500 mb-2">
              🕒 {new Date(order.createdAt).toLocaleString()}
            </p>
            <ul className="mb-2">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} × {item.quantity} = $
                  {(item.quantity * item.price).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="font-semibold mb-2">
              💵 Total: ${order.total.toFixed(2)}
            </p>
            <p className="mb-2">📦 Status: <strong>{order.status || "Pending"}</strong></p>
            <div className="flex gap-4 mt-2">
              <select
                value={order.status || "Pending"}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button
                onClick={() => deleteOrder(order._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
