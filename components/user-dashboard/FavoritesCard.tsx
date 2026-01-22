"use client";

import { Heart } from "lucide-react";

export default function FavoritesCard() {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-purple-100/50">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg">
          <Heart className="w-5 h-5 text-white fill-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Favorites</h3>
      </div>

      <div className="flex flex-col items-center justify-center py-12 px-6 rounded-xl bg-gradient-to-br from-purple-50/30 to-pink-50/30 border border-purple-100/50">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-purple-400" />
        </div>
        <p className="text-base font-medium text-gray-700">
          No Favorites yet
        </p>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Start saving your favorite products to see them here
        </p>
      </div>
    </div>
  );
}
