"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ItemsAndDeliverySectionProps {
  isActive: boolean;
  onActivate: () => void;
}

export default function ItemsAndDeliverySection({
  isActive,
  onActivate,
}: ItemsAndDeliverySectionProps) {
  const [quantities, setQuantities] = useState({
    item1: 2,
    item2: 2,
  });

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, prev[itemId as keyof typeof prev] + delta),
    }));
  };

  const items = [
    {
      id: "item1",
      name: "Refurbished Apple Watch Series 9 GPS, 41mm Midnight Aluminum Case with S/M Midnight Sport Band",
      image: "/detail-product.jpg",
      minOrder: "1 piece",
      price: "39.24 EGP",
      variant: null,
    },
    {
      id: "item2",
      name: "Refurbished Apple Watch Series 9 GPS, 41mm Midnight Aluminum Case with S/M Midnight Sport Band",
      image: "/detail-product.jpg",
      minOrder: "1 piece",
      price: "39.24 EGP",
      variant: "Black",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isActive ? "bg-[#7c3aed] text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          <Package className="w-4 h-4" />
        </div>
        <h2 className="text-xl font-semibold text-[#000000]">
          Items and delivery options
        </h2>
      </div>

      <div className="space-y-6">
        {/* Seller Info */}
        <div>
          <p className="text-sm text-[#6B6B6B]">
            Sold by:{" "}
            <span className="text-[#000000] font-medium">
              Bobby Bear (Shenzhen) Software Co., Ltd.
            </span>
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-[#6B6B6B]">
              Delivery by{" "}
              <span className="text-[#000000] font-medium">Jan 21</span>
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-[#6B6B6B]">
                Shipping fee:{" "}
                <span className="text-[#000000] font-medium">28.15 EGP</span>
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={onActivate}
                className="text-[#7c3aed]"
              >
                Change
              </Button>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 pb-4 border-b border-[#E0E0E0] last:border-0"
            >
              <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.id === "item1" && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#7c3aed] rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {quantities[item.id as keyof typeof quantities]}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#000000] mb-1 line-clamp-2">
                  {item.name}
                </p>
                {item.variant && (
                  <p className="text-xs text-[#6B6B6B] mb-2">
                    Variant: {item.variant}
                  </p>
                )}
                <p className="text-xs text-[#6B6B6B] mb-3">
                  Min. order: {item.minOrder}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 border-2 border-[#E0E0E0] rounded-lg flex items-center justify-center hover:border-[#7c3aed]"
                    >
                      <span className="text-[#6B6B6B]">-</span>
                    </button>
                    <span className="w-12 text-center text-sm font-medium text-[#000000]">
                      {quantities[item.id as keyof typeof quantities]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 border-2 border-[#E0E0E0] rounded-lg flex items-center justify-center hover:border-[#7c3aed]"
                    >
                      <span className="text-[#6B6B6B]">+</span>
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-[#000000]">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add note to supplier */}
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">
            Add note to supplier
          </label>
          <textarea
            className="w-full h-24 px-4 py-3 border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#7c3aed] resize-none"
            placeholder="Enter your message..."
          />
        </div>
      </div>
    </div>
  );
}
