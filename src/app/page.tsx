"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  return (
    <div className={`${themeClasses} min-h-screen flex flex-col transition-colors duration-300`}>
      {/* Header */}
      <header className="w-full p-6 border-b border-gray-700 flex items-center justify-between bg-white  shadow-xl/30  shadow-indigo-500 rounded-b-lg ">
        <h1 className="text-2xl font-bold text-indigo-500">MyApp</h1>
        <nav className="flex gap-6 text-sm sm:text-base font-medium font-mono space-x-4  text-indigo-700">
          <Link href="#" className="hover:underline underline-offset-4">Home</Link>
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
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Welcome to <span className="text-indigo-500">MyApp</span>
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
