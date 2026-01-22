"use client";

import Image from "next/image";
import Link from "next/link";
import { History, ChevronRight } from "lucide-react";

export default function BrowsingHistoryCard() {
  const historyItems = [
    {
      id: 1,
      name: "Vegetable Empty Hard Capsules",
      price: "30,000 EGP",
      sold: "5000 sold",
      image: "/dummy-product.png",
    },
    {
      id: 2,
      name: "Vegetable Empty Hard Capsules",
      price: "30,000 EGP",
      sold: "5000 sold",
      image: "/dummy-product.png",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-purple-100/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg">
            <History className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Browsing History</h3>
        </div>
        <Link
          href="/user/dashboard/saved-history"
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-[#7c3aed] hover:bg-purple-50 transition-colors"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {historyItems.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className="group relative flex flex-col w-[180px] sm:w-[200px] rounded-xl bg-gradient-to-br from-white to-purple-50/30 border-2 border-gray-100 hover:border-[#7c3aed] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative w-full h-32 bg-gradient-to-br from-gray-50 to-purple-50/50 overflow-hidden">
              <div className="absolute inset-0 bg-white/60" />
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-3 flex-1 flex flex-col">
              <h4 className="text-xs font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7c3aed] transition-colors">
                {item.name}
              </h4>
              <p className="text-sm font-bold text-[#7c3aed] mb-1">
                {item.price}
              </p>
              <p className="text-xs text-gray-500">{item.sold}</p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-all duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
