"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./context/themeprovider";

export default function LandingPage() {

  const { darkMode, toggleDarkMode } = useTheme();

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  return (
    <div className={`${themeClasses} min-h-screen flex flex-col transition-colors duration-300`}>
      
      {/* Header */}
     <header className="p-4 sm:p-6 border-b border-gray-700 flex flex-col sm:flex-row items-center sm:justify-between bg-white shadow-xl/30 shadow-indigo-500 rounded-b-lg">
     
  <h1 className="text-2xl font-bold text-indigo-500 mb-2 sm:mb-0">MySite</h1>
  <nav className="flex gap-4 sm:gap-6 text-sm sm:text-base font-medium font-mono text-indigo-700 flex-wrap justify-center sm:justify-center sm:flex-1">
    <Link href="#" className="hover:underline underline-offset-4">Home</Link>
    <Link href="/about" className="hover:underline underline-offset-4">About</Link> 
    <Link href="#" className="hover:underline underline-offset-4">Contact</Link>
  </nav>
</header>
 <div className="  flex justify-end items-center gap-2  sm:fixed top-5  right-2  rounded-full p-2 ">
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
</div>  

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Welcome to <span className="text-indigo-500">MySite</span>
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Your one-stop platform for secure login, seamless booking, and personalized experiences.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-white text-indigo-600 px-6 py-2 rounded-md border border-indigo-600 hover:bg-indigo-100 transition"
            >
              Register
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 border-t border-gray-700 text-center text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}
