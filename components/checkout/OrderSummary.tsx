"use client";

import Image from "next/image";
import CheckoutProtectionsSection from "./CheckoutProtectionsSection";
interface OrderSummaryProps {
  items: any[];
  totalItems?: number;
  itemSubtotal?: number;
  isLoading?: boolean;
  hasError?: boolean;
  canPay?: boolean;
  onPayNow?: () => void;
}

export default function OrderSummary({
  items,
  totalItems,
  itemSubtotal,
  isLoading,
  hasError,
  canPay,
  onPayNow,
}: OrderSummaryProps) {
  const itemCount = totalItems ?? items.length ?? 0;
  const subtotal = itemSubtotal ?? 0;
  const shippingFee = 0;
  const paymentFee = 0;
  const total = subtotal + shippingFee + paymentFee;

  const firstItem = items[0];
  const firstProduct = firstItem?.Product || {};
  const rawImage = firstProduct.image_url as any;
  const imageSrc = Array.isArray(rawImage)
    ? rawImage[0]
    : rawImage || "/detail-product.jpg";

  return (
    <div className="space-y-6">
      {/* Order Summary Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#000000] mb-4">
          Order summary ({itemCount} item{itemCount === 1 ? "" : "s"})
        </h2>

        {/* Product Image with Badge (first item) */}
        {itemCount > 0 && (
          <div className="relative w-20 h-20 mb-4">
            <Image
              src={imageSrc}
              alt={firstProduct.name || "Product"}
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">
                {itemCount}
              </span>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Item subtotal</span>
            <span className="text-[#000000] font-medium">
              {subtotal} AED
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Estimated shipping fee</span>
            <span className="text-[#000000] font-medium">
              {shippingFee} AED
            </span>
          </div>
          <div className="border-t border-[#E0E0E0] pt-3">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-[#6B6B6B]">Subtotal</span>
              <span className="text-[#000000] font-medium">
                {subtotal} AED
              </span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Payment processing fee</span>
            <span className="text-[#000000] font-medium">{paymentFee} AED</span>
          </div>
          <div className="border-t border-[#E0E0E0] pt-3">
            <div className="flex justify-between">
              <span className="text-base font-semibold text-[#000000]">
                Pay in AED
              </span>
              <span className="text-base font-semibold text-[#000000]">
                {total} AED
              </span>
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          className="w-full h-12 rounded-lg text-white font-medium text-base bg-gradient-to-r from-orange to-orange-300 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!canPay || itemCount === 0}
          onClick={onPayNow}
        >
          Pay now
        </button>
      </div>

      {/* Protections Section */}
      <CheckoutProtectionsSection />
    </div>
  );
}
