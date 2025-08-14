"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  const handleAuth = async () => {
    if (isLogin && (!user.email || !user.password)) return;
    if (!isLogin && (!user.username || !user.email || !user.password)) return;

    try {
      setLoading(true);
      if (isLogin) {
        await axios.post("/api/users/login", user);
        toast.success("Login successful!");
        router.push("/profile");
      } else {
        await axios.post("/api/users/signup", user);
        toast.success("Signup successful! Please login.");
        setIsLogin(true);
        setUser({ username: "", email: "", password: "" });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-orange-200 via-orange-50 to-orange-200 overflow-hidden">

      {/* Background Illustration */}
      <motion.img
        src="/foodloginbg.png"
        alt="Food background"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl pointer-events-none select-none"
      />

      {/* Foody Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold text-orange-600 mb-10 drop-shadow-lg z-10"
      >
        <Link href='/'>
          Foody
        </Link>
      </motion.h1>

      {/* Card Container */}
      <div className="relative w-full max-w-md">
        {/* Sliding Card */}
        <motion.div
          key={isLogin ? "login" : "signup"}
          initial={{ x: isLogin ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isLogin ? -300 : 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full border border-orange-100 z-10"
        >
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 rounded-l-full font-semibold transition ${
                isLogin ? "bg-orange-600 text-white" : "bg-white text-orange-600"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 rounded-r-full font-semibold transition ${
                !isLogin ? "bg-orange-600 text-white" : "bg-white text-orange-600"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-600 mb-6">
                  Welcome Back
                </h2>

                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                />

                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="w-full p-3 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                />

                <button
                  onClick={handleAuth}
                  disabled={loading || !user.email || !user.password}
                  className={`w-full py-3 rounded-full font-semibold text-lg cursor-pointer transition duration-300 shadow-md ${
                    loading
                      ? "bg-orange-300 cursor-not-allowed"
                      : "bg-orange-600 text-white hover:bg-orange-500 hover:shadow-2xl"
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <div className="text-center mt-4">
                  <Link href="/forgotpassword" className="text-sm text-orange-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-600 mb-6">
                  Create Account
                </h2>

                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                />

                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                />

                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="w-full p-3 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                />

                <button
                  onClick={handleAuth}
                  disabled={loading || !user.username || !user.email || !user.password}
                  className={`w-full py-3 rounded-full font-semibold text-lg cursor-pointer transition duration-300 shadow-md ${
                    loading
                      ? "bg-orange-300 cursor-not-allowed"
                      : "bg-orange-600 text-white hover:bg-orange-500 hover:shadow-2xl"
                  }`}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                      className="text-orange-600 font-semibold hover:underline cursor-pointer"
                      onClick={() => setIsLogin(true)}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 mt-10 z-10">
        &copy; {year} Foody. All rights reserved.
      </footer>
    </div>
  );
}
