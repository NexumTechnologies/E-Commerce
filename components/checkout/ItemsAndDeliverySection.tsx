"use client";

import { Package } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ItemsAndDeliverySectionProps {
  isActive: boolean;
  onActivate: () => void;
  items: any[];
  isLoading?: boolean;
}

export default function ItemsAndDeliverySection({
  isActive,
  onActivate,
  items,
  isLoading,
}: ItemsAndDeliverySectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isActive ? "bg-orange text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          <Package className="w-4 h-4" />
        </div>
        <h2 className="text-xl font-semibold text-[#000000]">
          Items and delivery options
        </h2>
      </div>

      <div className="space-y-6">
        {/* Items list / states */}
        {isLoading ? (
          <p className="text-sm text-[#6B6B6B]">Loading items...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-[#6B6B6B]">
            Your cart is empty. Add items to your cart to proceed with
            checkout.
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => {
              const product = item.Product || {};
              const rawImage = product.image_url as any;
              const imageSrc = Array.isArray(rawImage)
                ? rawImage[0]
                : rawImage || "/detail-product.jpg";

              return (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-[#E0E0E0] last:border-0"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-[#F5F5F5]">
                    <Image
                      src={imageSrc}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#000000] mb-1 line-clamp-2">
                      {product.name || "Product"}
                    </p>
                    <p className="text-xs text-[#6B6B6B] mb-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-xs text-[#6B6B6B] mb-3">
                      Unit price: {product.price} AED
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#000000]">
                        Line total: {item.total_price} AED
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onActivate}
                        className="text-orange"
                      >
                        Change items
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add note to supplier */}
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">
            Add note to supplier
          </label>
          <textarea
            className="w-full h-24 px-4 py-3 border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-orange resize-none"
            placeholder="Enter your message..."
          />
        </div>
      </div>
    </div>
  );
}
