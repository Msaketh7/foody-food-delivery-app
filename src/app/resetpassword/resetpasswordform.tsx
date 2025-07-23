"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  const inputClasses = darkMode
    ? "bg-gray-800 text-white border-gray-600"
    : "bg-gray-100 text-gray-900 border-gray-300";

  const handleSubmit = async () => {
    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.patch("/api/users/resetpassword", {
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
    <div className={`${themeClasses} min-h-screen flex flex-col transition duration-300`}>
      {/* Header */}
      <header className="w-full p-6 border-b border-gray-700 flex items-center justify-between bg-white shadow-xl/30 shadow-indigo-500 rounded-b-lg">
        <h1 className="text-2xl font-bold text-indigo-500">MyApp</h1>
        <nav className="flex gap-6 text-sm sm:text-base font-medium font-mono space-x-4 text-indigo-700">
          <Link href="/" className="hover:underline underline-offset-4">Home</Link>
          <Link href="#" className="hover:underline underline-offset-4">About</Link>
          <Link href="#" className="hover:underline underline-offset-4">Contact</Link>
        </nav>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-600 text-sm"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Main Section */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="bg-white text-gray-900 rounded-2xl shadow-xl/30 shadow-indigo-500 p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">Reset Password</h2>
          <p className="text-sm text-center mb-6 text-gray-600">Enter your new password to reset your account.</p>

          <label className="text-sm text-gray-700 mb-1 font-medium" htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClasses} w-full p-3 mb-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full p-3 rounded-md font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Remembered your password?{" "}
            <Link href="/login" className="text-indigo-500 hover:underline">Login</Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 border-t border-gray-700 text-center text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}
