"use client";

import { useState } from "react";
import AllOrdersTab from "./AllOrdersTab";

type OrderSubTab = "all" | "refunds" | "reviews" | "coupons" | "tax";

export default function OrdersContent() {
  const [activeSubTab, setActiveSubTab] = useState<OrderSubTab>("all");

  const subTabs = [
    { id: "all" as OrderSubTab, label: "All orders" },
    { id: "refunds" as OrderSubTab, label: "Refunds & after-sales" },
    { id: "reviews" as OrderSubTab, label: "Reviews" },
    { id: "coupons" as OrderSubTab, label: "Coupons & credit" },
    { id: "tax" as OrderSubTab, label: "Tax information" },
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-purple-100/50">
      {/* Sub-tabs Navigation */}
      <div className="border-b border-gray-200 px-6 bg-gradient-to-r from-white to-purple-50/30">
        <nav className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`py-4 px-2 border-b-2 transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? "border-[#7c3aed] text-[#7c3aed] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6 lg:p-8">
        {activeSubTab === "all" && <AllOrdersTab />}
        {activeSubTab === "refunds" && (
          <div className="text-center py-12 text-gray-500">
            Refunds & after-sales content coming soon
          </div>
        )}
        {activeSubTab === "reviews" && (
          <div className="text-center py-12 text-gray-500">
            Reviews content coming soon
          </div>
        )}
        {activeSubTab === "coupons" && (
          <div className="text-center py-12 text-gray-500">
            Coupons & credit content coming soon
          </div>
        )}
        {activeSubTab === "tax" && (
          <div className="text-center py-12 text-gray-500">
            Tax information content coming soon
          </div>
        )}
      </div>
    </div>
  );
}
