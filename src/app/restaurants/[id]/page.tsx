"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const restaurants = [
  {
    id: 1,
    name: "Spice Paradise",
    cuisine: "Indian",
    rating: 4.7,
    location: "Overland Park, KS",
    image: "https://source.unsplash.com/800x500/?indian-food",
    description: "Authentic Indian dishes with rich spices and flavors.",
    menu: ["Butter Chicken", "Paneer Tikka", "Naan Bread", "Biryani"],
  },
  {
    id: 2,
    name: "Sushi World",
    cuisine: "Japanese",
    rating: 4.5,
    location: "Kansas City, MO",
    image: "https://source.unsplash.com/800x500/?sushi",
    description: "Fresh sushi, sashimi, and ramen prepared daily.",
    menu: ["California Roll", "Salmon Sashimi", "Ramen Bowl", "Miso Soup"],
  },
  {
    id: 3,
    name: "Pasta Fiesta",
    cuisine: "Italian",
    rating: 4.6,
    location: "Lenexa, KS",
    image: "https://source.unsplash.com/800x500/?pasta",
    description: "Homemade pasta and wood-fired pizzas with Italian charm.",
    menu: ["Margherita Pizza", "Pasta Alfredo", "Lasagna", "Tiramisu"],
  },
  {
    id: 4,
    name: "Taco Haven",
    cuisine: "Mexican",
    rating: 4.4,
    location: "Olathe, KS",
    image: "https://source.unsplash.com/800x500/?tacos",
    description: "Delicious tacos, burritos, and nachos with authentic taste.",
    menu: ["Beef Tacos", "Veggie Burrito", "Nachos", "Quesadilla"],
  },
];

export default function RestaurantDetails() {
  const params = useParams();
  const id = Number(params.id);
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Restaurant Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-12">
      <Link
        href="/restaurants"
        className="px-4 py-2 mb-6 inline-block rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 hover:opacity-80 transition"
      >
        ← Back to Restaurants
      </Link>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-400">{restaurant.cuisine}</p>
          <p className="mt-2">📍 {restaurant.location}</p>
          <p className="mt-1 text-yellow-400">⭐ {restaurant.rating}</p>
          <p className="mt-4">{restaurant.description}</p>

          {/* Menu */}
          <h2 className="mt-6 text-xl font-semibold">Menu</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {restaurant.menu.map((item, index) => (
              <li
                key={index}
                className="bg-gray-700 rounded-lg px-3 py-2 hover:bg-gray-600 transition"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="mt-6 w-full bg-gradient-to-r from-green-500 to-teal-500 py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
