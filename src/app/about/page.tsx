"use client";
import Link from "next/link";
import { useRef } from "react";
import { useTheme } from "../context/themeprovider";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  LockClosedIcon,
  CheckIcon,
  UserCircleIcon,
  MoonIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  const { darkMode, toggleDarkMode } = useTheme();
  const featureRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  const cardClasses = darkMode
    ? "bg-gray-800 border-gray-700 hover:border-indigo-400"
    : "bg-white border-gray-300 hover:border-indigo-500";

  const scrollToFeatures = () => {
    if (featureRef.current) {
      featureRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`${themeClasses} transition-colors duration-300`}>
     <header className="p-4 sm:p-6 border-b border-gray-700 flex flex-col sm:flex-row items-center sm:justify-between bg-white shadow-xl/30 shadow-indigo-500 rounded-b-lg">
     <div className="flex items-center justify-between  w-full">
  <h1 className="text-2xl font-bold text-indigo-500 mb-2 sm:mb-0">MySite</h1>
  <nav className="hidden lg:flex gap-4 sm:gap-6 text-sm sm:text-base font-medium font-mono text-indigo-700 flex-wrap justify-center sm:justify-center sm:flex-1">
    <Link href="/" className="hover:underline underline-offset-4">Home</Link>
    <Link href="/about" className="hover:underline underline-offset-4">About</Link> 
    <Link href="#" className="hover:underline underline-offset-4">Contact</Link>
  </nav>
    {/* Mobile Hamburger Button */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="sm:hidden focus:outline-none"
    >
      {menuOpen ? (
        <XMarkIcon className="h-6 w-6 text-indigo-600" />
      ) : (
        <Bars3Icon className="h-6 w-6 text-indigo-600" />
      )}
    </button>
  </div>

  {/* Mobile Dropdown Menu */}
  {menuOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sm:hidden flex flex-col gap-4 mt-4 px-4 text-indigo-700 dark:text-indigo-700 font-mono"
    >
      <Link href="/" className="hover:underline">Home</Link>
      <a href="#about" className="hover:underline">About</a>
      <a href="#features" className="hover:underline">Features</a>
    </motion.div>
  )}
</header>

  {/* Theme Toggle in Mobile Menu */}
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
        <section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-indigo-500">
            About MySite
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed text-gray-500 dark:text-gray-300">
            <span className="text-indigo-400 font-semibold">MySite</span> is a full-featured, secure, and user-first
            platform. We ensure seamless access with JWT-protected login/signup, password encryption, email verification,
            and a personalized profile dashboard—all built using Next.js, Tailwind CSS, and modern UI principles.
          </p>
        </motion.div>

        {/* Scroll down icon */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          animate={{ y: [0, 10, 0] }}   
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={scrollToFeatures}
          className="mt-12"
        >
          <ChevronDoubleDownIcon className="w-8 h-8 text-indigo-600 animate-bounce cursor-pointer" />
        </motion.button>
      </section>

      {/* Features Section */}
      <section
        ref={featureRef}
        id="features"
        className="px-6 py-20 bg-gradient-to-b from-indigo-50/10 via-transparent to-indigo-100/10"
      >
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold mb-12 text-indigo-600"
        >
          Platform Features
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 border-2 rounded-xl shadow-lg transform transition-all  duration-300  hover:shadow-indigo-400/40 ${cardClasses}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <feature.icon className="h-8 w-8 text-indigo-500" />
                <h4 className="text-xl font-semibold">{feature.title}</h4>
              </div>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full p-4 border-t border-gray-700 text-center text-sm">
        © {new Date().getFullYear()} MyApp. Built using Next.js & Tailwind CSS.
      </footer>
    </div>
  );
}

// Features list
const features = [
  {
    title: "Secure Authentication",
    icon: LockClosedIcon,
    description:
      "Our JWT-based login/signup system uses bcrypt hashing and HTTPS encryption to ensure every user is protected from unauthorized access and credential leaks.",
  },
  {
    title: "Email Verification",
    icon: CheckIcon,
    description:
      "Only verified users can proceed past signup, reducing spam accounts and improving community trust. Email verification links expire securely after a set time.",
  },
  {
    title: "User Profile Dashboard",
    icon: UserCircleIcon,
    description:
      "Manage your account details, upload your profile image, and view secure actions—all in one beautifully designed, easy-to-use dashboard.",
  },
  {
    title: "Dark & Light Theme",
    icon: MoonIcon,
    description:
      "Choose between a sleek dark mode or bright light mode. The theme is remembered and applied seamlessly across the app for a consistent experience.",
  },
];
