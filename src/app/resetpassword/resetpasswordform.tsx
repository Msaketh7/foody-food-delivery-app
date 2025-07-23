"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      toast.success(data.message || "Password reset successful!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-6 bg-white drop-shadow-xl/30 opacity-75">
        <h1 className="text-gray-900 bg-gray-300 px-10 py-2 rounded-tl-3xl rounded-br-3xl rounded-bl-md rounded-tr-md font-serif font-bold tracking-wider mb-5 outline outline-offset-2">
          Reset Password
        </h1>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-4 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent outline outline-offset-2"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-gray-700 rounded-lg p-2 cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
