"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import { FaTruck, FaUserTie, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const features = [
  {
    title: "Fresh Ingredients",
    desc: "We deliver only the freshest local produce directly to your kitchen.",
    img: "veggies.png",
  },
  {
    title: "Fast Delivery",
    desc: "Lightning-fast delivery from your favorite restaurants.",
    img: "delivery.png",
  },
  {
    title: "Easy Payments",
    desc: "Multiple payment methods with seamless checkout.",
    img: "payments.png",
  },
  {
    title: "24/7 Support",
    desc: "Our customer service team is available around the clock for any help.",
    img: "customer-service.png",
  },
  {
    title: "AI Recommendations",
    desc: "Smart suggestions tailored to your taste using advanced AI.",
    img: "bot.png",
  },
  {
    title: "Automated Ordering",
    desc: "One-click reordering and scheduled deliveries made effortless.",
    img: "Ai.png",
  },
];

export default function HomePage() {
  const [showStickyNav, setShowStickyNav] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryRef = useRef(null);
  const cuisinesRef = useRef(null);
  

 const scroll = (ref, direction) => {
  if (ref.current) {
    const scrollAmount = 200; // pixels to scroll
    if (direction === "left") ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    if (direction === "right") ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};


  const categories = [
    { name: "Pizza", img: "pizza.png" },
    { name: "Burgers", img: "burger.png" },
    { name: "Indian", img: "indian.png" },
    { name: "Chinese", img: "chinese.png" },
    { name: "Desserts", img: "desserts.png" },
    { name: "Salads", img: "salads.png" },
    { name: "Drinks", img: "drinks.png" },
  ];

  const cuisines = [
    { name: "Italian", img: "italian.png" },
    { name: "Mexican", img: "mexican.png" },
    { name: "Thai", img: "thai.png" },
    { name: "Japanese", img: "japanese.png" },
    { name: "American", img: "american.png" },
    { name: "Mediterranean", img: "mediterranean.png" },
    { name: "Korean", img: "korean.png" },
    { name: "French", img: "french.png" },
  ];

  return (
    <main className="text-white font-sans">
      <Toaster position="top-right" />

      {/* Nav */}
      <nav className={`w-full px-6 py-4 fixed top-0 left-0 z-50 flex justify-between items-center transition-all duration-500 ${
        showStickyNav ? "bg-orange-600 shadow-md" : "bg-transparent"
      }`}>
        <h1 className="text-3xl font-bold">Foody</h1>
        <div className="space-x-4">
          <Link href="/signup" className={`text-white px-4 py-2 rounded-full font-semibold text-xl hover:bg-red-700/50 transition ${
            showStickyNav ? "bg-red-600 shadow-md" : "bg-red-700/70"
          }`}>
            Sign Up
          </Link>
          <Link href="/login" className="bg-white text-orange-700 px-4 py-2 rounded-full font-semibold text-xl hover:bg-gray-200 transition">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen w-full bg-cover bg-center relative px-6 flex flex-col justify-center items-center text-center" style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,87,34,1), rgba(0, 0, 0, 0.3)), url('/foodyhomebg.jpg')",
      }}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10">
          <motion.h1 initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} className="text-6xl md:text-7xl font-extrabold drop-shadow-xl">
            Foody
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl mt-6 max-w-xl mx-auto drop-shadow-md">
            Discover your next favorite meal. Explore, order, and enjoy delicious food from top-rated restaurants.
          </motion.p>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }} onClick={() => scrollToSection("features")} className="mt-10 px-8 py-3 bg-white text-orange-600 text-lg font-semibold rounded-full shadow hover:shadow-lg">
            Explore the Food
          </motion.button>
        </motion.div>
        <motion.button onClick={() => scrollToSection("features")} whileHover={{ scale: 1.2 }} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-20 z-10">
          <ChevronDoubleDownIcon className="w-10 h-10 text-white cursor-pointer animate-bounce" />
        </motion.button>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white min-w-screen min-h-screen text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <h2 className="text-4xl font-bold text-center text-orange-600 dark:text-orange-400 mb-16">
          Why Choose Foody?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.2 }} className="bg-gradient-to-br from-orange-50 to-white dark:from-gray-800 dark:to-gray-700 border border-orange-300 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all p-10 text-center relative group">
              <span className="pointer-events-none absolute inset-0 rounded-3xl z-0 border border-transparent group-hover:border-orange-500 group-hover:shadow-[0_0_12px_2px_rgba(255,87,34,0.6)] transition-all duration-300" />
              <div className="relative z-10">
                <img src={`/icons/${feature.img}`} alt={feature.title} className="w-24 h-24 mx-auto mb-6 object-contain" />
                <h3 className="text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Explore Foods Section */}
      <section className="bg-orange-50 py-24 px-6 ">
  <div className="max-w-6xl mx-auto min-h-screen">
    <h2 className="text-3xl font-bold text-orange-600 mb-12 text-center">Explore Foods</h2>

    {/* Categories */}
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-md p-6 relative mb-10"
    >
      <h3 className="text-2xl font-semibold text-orange-500 mb-4">Popular Categories</h3>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(categoryRef, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow hover:bg-orange-700 z-10"
        >
          <FaChevronLeft />
        </button>

        {/* Scroll Container */}
        <div
          ref={categoryRef}
          className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none" }} // for Firefox
        >
          {categories.map((item, i) => (
            <div
              key={i}
              className="min-w-[150px] h-32 bg-orange-100 rounded-xl flex flex-col items-center justify-center gap-2 px-4 m-2 cursor-pointer shadow hover:shadow-lg transition"
            >
              <img
                src={`/icons/${item.img}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <span className="text-orange-700 font-semibold text-lg">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(categoryRef, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow hover:bg-orange-700 z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </motion.div>

    {/* Cuisines */}
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-md p-6 relative"
    >
      <h3 className="text-2xl font-semibold text-orange-500 mb-4">Cuisines</h3>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(cuisinesRef, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow hover:bg-orange-700 z-10"
        >
          <FaChevronLeft />
        </button>

        {/* Scroll Container */}
        <div
          ref={cuisinesRef}
          className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none" }} // for Firefox
        >
          {cuisines.map((item, i) => (
            <div
              key={i}
              className="min-w-[120px] h-24 bg-orange-100 rounded-xl flex flex-col items-center justify-center gap-2 p-10 m-2 cursor-pointer shadow hover:shadow-lg transition"
            >
              <img
                src={`/icons/${item.img}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <span className="text-orange-700 font-semibold text-lg">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(cuisinesRef, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow hover:bg-orange-700 z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </motion.div>
  </div>
</section>

      {/* Partner and Delivery Join Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-orange-100 rounded-2xl shadow-md p-10 text-center hover:shadow-lg transition">
            <FaUserTie className="text-5xl text-orange-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-orange-700 mb-2">Become a Partner</h3>
            <p className="text-gray-700 mb-4">
              Join Foody and grow your restaurant business with more orders and visibility.
            </p>
            <button className="px-6 py-2 bg-orange-600 text-white rounded-full cursor-pointer font-semibold hover:bg-orange-500 transition">
              Join as Partner
            </button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-orange-100 rounded-2xl shadow-md p-10 text-center hover:shadow-lg transition">
            <FaTruck className="text-5xl text-orange-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-orange-700 mb-2">Become a Delivery Hero</h3>
            <p className="text-gray-700 mb-4">
              Earn with flexibility by delivering food in your city on your own schedule.
            </p>
            <button className="px-6 py-2 bg-orange-600 text-white rounded-full cursor-pointer font-semibold hover:bg-orange-500 transition">
              Join as Delivery
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-600 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-4">Foody</h3>
            <p className="text-sm opacity-80">
              Delivering joy, one meal at a time. Your favorite food, just a tap away.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Contact Us</h4>
            <p>Email: support@foody.com</p>
            <p>Phone: +1 234 567 8901</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-10 text-sm opacity-60">
          &copy; {new Date().getFullYear()} Foody. All rights reserved.
        </p>
      </footer>
    </main>
  );
}