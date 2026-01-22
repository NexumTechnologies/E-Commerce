"use client";

import { useState } from "react";
import { CreditCard, Receipt } from "lucide-react";

export default function PaymentManagementTab() {
  const [activeTransactionTab, setActiveTransactionTab] = useState<
    "payments" | "refunds"
  >("payments");

  return (
    <div>
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Payment management
        </h1>
      </div>

      {/* Cards and accounts Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Cards and accounts
        </h2>
        <div className="border-2 border-dashed border-purple-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] bg-gradient-to-br from-purple-50/30 to-blue-50/30">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
            <CreditCard className="w-5 h-5" />
            Add a new card
          </button>
        </div>
      </div>

      {/* Transactions Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Transactions
        </h2>

        {/* Transaction Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTransactionTab("payments")}
              className={`pb-4 px-2 border-b-2 transition-all ${
                activeTransactionTab === "payments"
                  ? "border-[#7c3aed] text-[#7c3aed] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTransactionTab("refunds")}
              className={`pb-4 px-2 border-b-2 transition-all ${
                activeTransactionTab === "refunds"
                  ? "border-[#7c3aed] text-[#7c3aed] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Refunds
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50/20 border border-gray-100">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4">
            <Receipt className="w-10 h-10 text-purple-400" />
          </div>
          <p className="text-gray-700 text-lg font-medium">No data</p>
        </div>
      </div>
    </div>
  );
}
