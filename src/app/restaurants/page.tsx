"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const restaurants = [
  {
    id: 1,
    name: "Spice Paradise",
    cuisine: "Indian",
    rating: 4.7,
    location: "Overland Park, KS",
    image: "https://source.unsplash.com/600x400/?indian-food",
  },
  {
    id: 2,
    name: "Sushi World",
    cuisine: "Japanese",
    rating: 4.5,
    location: "Kansas City, MO",
    image: "https://source.unsplash.com/600x400/?sushi",
  },
  {
    id: 3,
    name: "Pasta Fiesta",
    cuisine: "Italian",
    rating: 4.6,
    location: "Lenexa, KS",
    image: "https://source.unsplash.com/600x400/?pasta",
  },
  {
    id: 4,
    name: "Taco Haven",
    cuisine: "Mexican",
    rating: 4.4,
    location: "Olathe, KS",
    image: "https://source.unsplash.com/600x400/?tacos",
  },
];

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Restaurants</h1>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 hover:opacity-80 transition"
        >
          Back to Home
        </Link>
      </div>

      {/* Restaurants Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant.id}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition"
            whileHover={{ y: -5 }}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{restaurant.name}</h2>
              <p className="text-gray-400">{restaurant.cuisine}</p>
              <p className="mt-2 text-sm">📍 {restaurant.location}</p>
              <p className="mt-1 text-yellow-400">⭐ {restaurant.rating}</p>
              <Link href={`/restaurants/${restaurant.id}`}>
              <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-indigo-500 py-2 rounded-xl hover:opacity-80 transition">
                View Details
              </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
