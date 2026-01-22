"use client";

import Image from "next/image";
import { MessageCircle, CheckCircle2, ArrowRight, Send } from "lucide-react";

interface ColorOption {
  id: number;
  name: string;
  image: string;
}

interface CustomizationPanelProps {
  selectedColor: number;
  onColorChange: (colorId: number) => void;
  colorOptions: ColorOption[];
  onSendInquiry: () => void;
  onChatNow: () => void;
  customizationOptions?: string[];
  isVerified?: boolean;
}

export default function CustomizationPanel({
  selectedColor,
  onColorChange,
  colorOptions,
  onSendInquiry,
  onChatNow,
  customizationOptions = [
    "Customized logo (Min. order: 2000 pieces)",
    "Custom packaging available",
    "Size variations available",
  ],
  isVerified = true,
}: CustomizationPanelProps) {
  return (
    <div
      role="tabpanel"
      id="customization-panel"
      aria-labelledby="customization-tab"
    >
      {/* Variations - Color */}
      <div className="lg:mb-6 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-semibold text-gray-900">Variations</h3>
          <button className="text-sm font-medium text-[#7c3aed] hover:text-[#6d28d9] transition-colors flex items-center gap-1">
            Select now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-3">Color</p>
        <div className="flex gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.id}
              onClick={() => onColorChange(color.id)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                selectedColor === color.id
                  ? "border-[#7c3aed] ring-2 ring-purple-200 shadow-lg scale-105"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-purple-50/30" />
              <Image
                src={color.image}
                alt={color.name}
                fill
                className="object-cover p-2"
              />
              {selectedColor === color.id && (
                <div className="absolute inset-0 bg-purple-500/10" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Border before Customization Options */}
      <div className="w-full h-px bg-gray-200 my-6"></div>

      {/* Customization Options */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Customization Options
        </h3>
        <div className="space-y-3">
          {customizationOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-purple-50/30 to-transparent border border-purple-100/50"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-sm text-gray-700 flex-1">{option}</span>
            </div>
          ))}
        </div>
        {isVerified && (
          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span className="text-sm font-semibold text-green-700">
              Supplier&apos;s customization ability Verified
            </span>
          </div>
        )}
      </div>

      {/* Border before Action Buttons */}
      <div className="w-full h-px bg-gray-200 my-6"></div>

      {/* Action Buttons */}
      <div className="mb-6 space-y-3">
        <button
          onClick={onSendInquiry}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Send Inquiry
        </button>
        <button
          onClick={onChatNow}
          className="w-full py-3 px-4 rounded-xl font-semibold border-2 border-[#7c3aed] text-[#7c3aed] hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Chat Now
        </button>
      </div>
    </div>
  );
}
