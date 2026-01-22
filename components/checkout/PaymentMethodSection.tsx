"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentMethodSectionProps {
  isComplete: boolean;
  onComplete: (complete: boolean) => void;
  isActive: boolean;
  onActivate: () => void;
  disabled?: boolean;
}

export default function PaymentMethodSection({
  isComplete,
  onComplete,
  isActive,
  onActivate,
  disabled = false,
}: PaymentMethodSectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    if (method) {
      onComplete(true);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isComplete
              ? "bg-[#7c3aed] text-white"
              : isActive && !disabled
              ? "bg-[#7c3aed] text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          <DollarSign className="w-4 h-4" />
        </div>
        <h2 className="text-xl font-semibold text-[#000000]">Payment method</h2>
        {isComplete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onActivate}
            className="ml-auto text-[#7c3aed]"
            disabled={disabled}
          >
            Change
          </Button>
        )}
      </div>

      {disabled && !isComplete ? (
        <p className="text-sm text-[#6B6B6B]">
          Please complete shipping address first
        </p>
      ) : (
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:border-[#7c3aed]">
            <input
              type="radio"
              name="paymentMethod"
              value="newCard"
              checked={selectedMethod === "newCard"}
              onChange={() => handleMethodSelect("newCard")}
              className="w-4 h-4 text-[#7c3aed]"
            />
            <span className="text-sm font-medium text-[#000000]">
              Add a new card
            </span>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:border-[#7c3aed]">
            <input
              type="radio"
              name="paymentMethod"
              value="instapay"
              checked={selectedMethod === "instapay"}
              onChange={() => handleMethodSelect("instapay")}
              className="w-4 h-4 text-[#7c3aed]"
            />
            <span className="text-sm font-medium text-[#000000]">InstaPay</span>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:border-[#7c3aed]">
            <input
              type="radio"
              name="paymentMethod"
              value="applePay"
              checked={selectedMethod === "applePay"}
              onChange={() => handleMethodSelect("applePay")}
              className="w-4 h-4 text-[#7c3aed]"
            />
            <span className="text-sm font-medium text-[#000000]">
              Apple Pay
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
