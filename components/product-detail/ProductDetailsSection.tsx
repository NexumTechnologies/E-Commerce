"use client";

import { Star } from "lucide-react";

export default function ProductDetailsSection() {
  const rating = 4;
  const reviews = 1240;
  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  return (
    <div className="w-full mt-8 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-100/50">
      <div className="flex flex-col">
        {/* Desktop: Title Row - Side by Side */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          {/* Product Details Title */}
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-[#7c3aed] to-[#a78bfa] rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">
              Product Details
            </h2>
          </div>

          {/* Ratings Title and Stars */}
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Ratings</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {rating}.0
              </span>
              <span className="text-sm text-gray-500">
                ({reviews.toLocaleString()} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Mobile: Product Details Title */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-[#7c3aed] to-[#a78bfa] rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">
              Product Details
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed text-gray-600 mb-6 lg:mb-0">
          {description}
        </p>

        {/* Mobile: Ratings Title and Stars - After Description */}
        <div className="lg:hidden pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Ratings</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {rating}.0
              </span>
              <span className="text-sm text-gray-500">
                ({reviews.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
