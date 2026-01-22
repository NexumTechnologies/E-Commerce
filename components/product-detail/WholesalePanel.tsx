"use client";

import Image from "next/image";
import { ShoppingCart, MessageCircle, ArrowRight } from "lucide-react";

interface ColorOption {
  id: number;
  name: string;
  image: string;
}

interface WholesalePanelProps {
  selectedColor: number;
  onColorChange: (colorId: number) => void;
  colorOptions: ColorOption[];
  onStartOrder: () => void;
  onAddToCart: () => void;
  onChatNow: () => void;
}

export default function WholesalePanel({
  selectedColor,
  onColorChange,
  colorOptions,
  onStartOrder,
  onAddToCart,
  onChatNow,
}: WholesalePanelProps) {
  return (
    <div role="tabpanel" id="wholesale-panel" aria-labelledby="wholesale-tab">
      {/* Quantity-Based Pricing */}
      <div className="mb-6 lg:mt-0 mt-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Pricing by Quantity</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { range: "1 - 299", price: "30,000 EGP" },
            { range: "300 - 499", price: "28,000 EGP" },
            { range: "≥ 500", price: "25,000 EGP" },
          ].map((tier, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50/50 to-transparent border border-purple-100/50 hover:border-purple-200 transition-all"
            >
              <p className="text-xs text-gray-600 mb-2">{tier.range} pieces</p>
              <p className="text-lg font-bold text-[#7c3aed]">{tier.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Border before Variations */}
      <div className="w-full h-px bg-gray-200 my-6"></div>

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

      {/* Border before Action Buttons */}
      <div className="w-full h-px bg-gray-200 my-6"></div>

      {/* Action Buttons */}
      <div className="mb-6 space-y-3">
        <button
          onClick={onStartOrder}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Start Order
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAddToCart}
            className="py-3 px-4 rounded-xl font-semibold border-2 border-[#7c3aed] text-[#7c3aed] hover:bg-purple-50 transition-all duration-300"
          >
            Add to Cart
          </button>
          <button
            onClick={onChatNow}
            className="py-3 px-4 rounded-xl font-semibold border-2 border-[#7c3aed] text-[#7c3aed] hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Chat Now
          </button>
        </div>
      </div>
    </div>
  );
}
