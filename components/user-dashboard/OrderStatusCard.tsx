"use client";

import { useState } from "react";
import { ChevronRight, ShoppingBag, Receipt } from "lucide-react";
import Link from "next/link";

export default function OrderStatusCard() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "confirming", label: "Confirming" },
    { id: "unpaid", label: "Unpaid" },
    { id: "preparing", label: "Preparing to ship" },
    { id: "delivering", label: "Delivering" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-purple-100/50">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">My Orders</h3>
        </div>
        <Link
          href="/user/dashboard/orders"
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-[#7c3aed] hover:bg-purple-50 transition-colors"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white shadow-lg shadow-purple-200/50"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-12 px-6 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50/20 border border-gray-100">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4">
          <Receipt className="w-10 h-10 text-purple-400" />
        </div>
        <p className="text-base font-medium text-gray-700">No orders yet</p>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Your order history will appear here
        </p>
      </div>
    </div>
  );
}
