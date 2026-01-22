"use client";

import { useState } from "react";
import PaymentManagementTab from "./PaymentManagementTab";
import AllTransactionsTab from "./AllTransactionsTab";

type PaymentSubTab = "management" | "transactions";

export default function PaymentsContent() {
  const [activeSubTab, setActiveSubTab] = useState<PaymentSubTab>("management");

  const subTabs = [
    { id: "management" as PaymentSubTab, label: "Payment management" },
    { id: "transactions" as PaymentSubTab, label: "All transactions" },
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
        {activeSubTab === "management" && <PaymentManagementTab />}
        {activeSubTab === "transactions" && <AllTransactionsTab />}
      </div>
    </div>
  );
}
