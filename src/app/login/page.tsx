"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "../context/themeprovider";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  const inputClasses = darkMode
    ? "bg-gray-800 text-white border-gray-600"
    : "bg-gray-100 text-gray-900 border-gray-300";

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || error.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className={`${themeClasses} min-h-screen flex flex-col transition duration-300`}>
      {/* Header */}
      <header className="w-full p-6 border-b border-gray-700 flex items-center justify-between bg-white shadow-xl/30 shadow-indigo-500 rounded-b-lg">
        <h1 className="text-2xl font-bold text-indigo-500">MyApp</h1>
        <nav className="flex gap-6 text-sm sm:text-base font-medium font-mono space-x-4 text-indigo-700">
          <Link href="/" className="hover:underline underline-offset-4">Home</Link>
          <Link href="/signup" className="hover:underline underline-offset-4">Signup</Link>
        </nav>
         <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={!darkMode}
      onChange={() => toggleDarkMode(!darkMode)}
    />
    <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer dark:bg-gray-600 peer-checked:bg-indigo-500 transition-all"></div>
    <div className="absolute left-1 top-2 bg-none w-2 h-2  transition-all peer-checked:translate-x-5 flex items-center justify-cente">
      {darkMode ? "🌙" : "☀️"}
    </div>
  </label>
      </header>

      {/* Login Form Section */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="bg-white text-gray-900 rounded-2xl shadow-xl/30 shadow-indigo-500 p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">Sign In</h2>

          <label className="block mb-2 text-sm font-mono text-gray-700" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={`${inputClasses} w-full p-3 mb-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />

          <label className="block mb-2 text-sm font-mono text-gray-700" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className={`${inputClasses} w-full p-3 mb-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />

          <button
            disabled={buttonDisabled || loading}
            onClick={handleLogin}
            className={`w-full bg-indigo-600 text-white p-3 rounded-md transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-500"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-4">
            <Link href="/forgotpassword" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <p className="text-sm text-center mt-2 text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
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
