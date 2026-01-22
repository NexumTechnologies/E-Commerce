"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import OrderCard from "./OrderCard";

type OrderFilter =
  | "all"
  | "confirming"
  | "unpaid"
  | "shipping"
  | "refunds"
  | "completed"
  | "closed";

export default function AllOrdersTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<OrderFilter>("closed");

  const filters = [
    { id: "all" as OrderFilter, label: "All" },
    { id: "confirming" as OrderFilter, label: "Confirming" },
    { id: "unpaid" as OrderFilter, label: "Unpaid" },
    { id: "shipping" as OrderFilter, label: "Shipping status" },
    { id: "refunds" as OrderFilter, label: "Refunds & after-sales" },
    { id: "completed" as OrderFilter, label: "Completed & in review" },
    { id: "closed" as OrderFilter, label: "Closed (1)" },
  ];

  const orders = [
    {
      id: "285138762001021462",
      orderDate: "Dec 06, 2025, PST",
      total: "30,000 EGP",
      status: "Order closed",
      deliveryDate: "Delivery by Jan 23",
      products: [
        {
          id: "1",
          name: "Refurbished Apple Watch Series 9 GPS, 41mm Midnight Aluminum Case with S/M Midnight Sport Band",
          image: "/dummy-product.png",
          variant: "Black",
          quantity: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your orders</h1>

      {/* Filter Tabs */}
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-3 min-w-max pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white shadow-lg shadow-purple-200/50"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, order number, or other information"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent text-sm transition-all bg-white"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
