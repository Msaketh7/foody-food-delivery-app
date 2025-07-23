"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  const inputClasses = darkMode
    ? "bg-gray-800 text-white border-gray-600"
    : "bg-gray-100 text-gray-900 border-gray-300";

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success(
        "Signup successful! Please check your email to verify your account."
      );
      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || error.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className={`${themeClasses} min-h-screen flex flex-col transition duration-300`}>
      {/* Header */}
      <header className="w-full p-6 border-b border-gray-700 flex items-center justify-between bg-white shadow-xl/30 shadow-indigo-500 rounded-b-lg">
        <h1 className="text-2xl font-bold text-indigo-500">MyApp</h1>
        <nav className="flex gap-6 text-sm sm:text-base font-medium font-mono space-x-4 text-indigo-700">
          <Link href="/" className="hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/login" className="hover:underline underline-offset-4">
            Login
          </Link>
        </nav>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-600 text-sm"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Signup Form Section */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="bg-white text-gray-900 rounded-2xl shadow-xl/30 shadow-indigo-500 p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
            Sign Up
          </h2>

          <label
            className="block mb-2 text-sm font-mono text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className={`${inputClasses} w-full p-3 mb-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />

          <label
            className="block mb-2 text-sm font-mono text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={`${inputClasses} w-full p-3 mb-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />

          <label
            className="block mb-2 text-sm font-mono text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
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
            onClick={onSignup}
            className={`w-full bg-indigo-600 text-white p-3 rounded-md transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-500"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 border-t border-gray-700 text-center text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}
