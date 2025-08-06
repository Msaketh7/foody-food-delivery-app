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
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                🧑 {order.customerName}
              </h2>
              <p className="text-sm text-gray-700 mb-2">📍 {order.address}</p>
              <p className="text-sm text-gray-500 mb-4">
                🕒 {new Date(order.createdAt).toLocaleString()}
              </p>
              <ul className="mb-2">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.quantity} = ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
