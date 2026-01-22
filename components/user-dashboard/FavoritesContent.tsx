"use client";

import { useState } from "react";

export default function FavoritesContent() {
  const [activeTab, setActiveTab] = useState<"products" | "suppliers">(
    "products"
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-purple-100/50">
      <div className="p-6 lg:p-8">
        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("products")}
              className={`pb-4 px-2 border-b-2 transition-all ${
                activeTab === "products"
                  ? "border-[#7c3aed] text-[#7c3aed] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("suppliers")}
              className={`pb-4 px-2 border-b-2 transition-all ${
                activeTab === "suppliers"
                  ? "border-[#7c3aed] text-[#7c3aed] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Suppliers
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 rounded-xl bg-gradient-to-br from-purple-50/30 to-pink-50/30 border border-purple-100/50">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <p className="text-base font-medium text-gray-700">
            No favorites yet
          </p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Start saving your favorite products and suppliers to see them here
          </p>
        </div>
      </div>
    </div>
  );
}
