"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Reset link sent. Check your inbox!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-2xl p-6 bg-white drop-shadow-xl/30 opacity-75">
      <h1 className="text-gray-900 bg-gray-300 px-10 py-2 rounded-tl-3xl  rounded-br-3xl rounded-bl-md rounded-tr-md font-serif font-bold tracking-wider mb-5 outline outline-offset-2">Forgot Password</h1>
      <input className="p-2 border border-gray-300 rounded-md mb-4 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent outline outline-offset-2"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-gray-700 rounded-lg p-2 cursor-pointer">Send Reset Link</button>
      </div>
    </div>
  );
}
