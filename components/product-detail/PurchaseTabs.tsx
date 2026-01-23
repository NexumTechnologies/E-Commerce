"use client";

import { useRef, KeyboardEvent } from "react";

type TabType = "wholesale" | "customization";

interface PurchaseTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  customizationEnabled?: boolean;
}

export default function PurchaseTabs({
  activeTab,
  onTabChange,
  customizationEnabled = true,
}: PurchaseTabsProps) {
  const wholesaleTabRef = useRef<HTMLButtonElement>(null);
  const customizationTabRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, tab: TabType) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        if (tab === "customization" && customizationEnabled) {
          wholesaleTabRef.current?.focus();
          onTabChange("wholesale");
        }
      } else {
        if (tab === "wholesale" && customizationEnabled) {
          customizationTabRef.current?.focus();
          onTabChange("customization");
        }
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onTabChange(tab);
    }
  };

  return (
    <div
      role="tablist"
      className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1"
      aria-label="Purchase options"
    >
      <button
        ref={wholesaleTabRef}
        role="tab"
        aria-selected={activeTab === "wholesale"}
        aria-controls="wholesale-panel"
        id="wholesale-tab"
        onClick={() => onTabChange("wholesale")}
        onKeyDown={(e) => handleKeyDown(e, "wholesale")}
        className={`flex-1 py-3 px-4 rounded-lg text-base font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 ${
          activeTab === "wholesale"
            ? "text-white bg-gradient-to-r from-orange to-orange-300 shadow-lg"
            : "text-gray-600 hover:text-orange"
        }`}
      >
        Wholesale
      </button>
      <button
        ref={customizationTabRef}
        role="tab"
        aria-selected={activeTab === "customization"}
        aria-controls="customization-panel"
        id="customization-tab"
        onClick={() => customizationEnabled && onTabChange("customization")}
        onKeyDown={(e) => handleKeyDown(e, "customization")}
        disabled={!customizationEnabled}
        className={`flex-1 py-3 px-4 rounded-lg text-base font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 ${
          !customizationEnabled
            ? "text-gray-400 cursor-not-allowed"
            : activeTab === "customization"
            ? "text-white bg-gradient-to-r from-orange to-orange-300 shadow-lg"
            : "text-gray-600 hover:text-orange"
        }`}
        title={
          !customizationEnabled ? "Customization not available" : undefined
        }
      >
        Customization
      </button>
    </div>
  );
}
