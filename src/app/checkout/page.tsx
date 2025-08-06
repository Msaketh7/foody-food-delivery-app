"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!name || !address) {
      alert("Please fill in all fields.");
      return;
    }

    const orderData = {
      customerName: name,
      address,
      items: cart,
      total: totalPrice,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/orders", orderData);
      localStorage.removeItem("cart"); // Clear cart after order
      alert("Order placed successfully!");
      router.push("/orders");
    } catch (err) {
      console.error(err);
      alert("Error placing order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🧾 Checkout</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="block mt-4 mb-2 font-medium">Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      <ul className="mb-4">
        {cart.map((item) => (
          <li key={item._id}>
            {item.name} × {item.quantity} = ${item.price * item.quantity}
          </li>
        ))}
      </ul>

      <p className="text-lg font-semibold mb-4">Total: ${totalPrice.toFixed(2)}</p>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
