"use client";

import Image from "next/image";
import CheckoutProtectionsSection from "./CheckoutProtectionsSection";

export default function OrderSummary() {
  const itemSubtotal = 39.24;
  const shippingFee = 39.24;
  const paymentFee = 39.24;
  const total = 39.24;

  return (
    <div className="space-y-6">
      {/* Order Summary Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#000000] mb-4">
          Order summary (2 items)
        </h2>

        {/* Product Image with Badge */}
        <div className="relative w-20 h-20 mb-4">
          <Image
            src="/detail-product.jpg"
            alt="Product"
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">2</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Item subtotal</span>
            <span className="text-[#000000] font-medium">
              {itemSubtotal} EGP
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Estimated shipping fee</span>
            <span className="text-[#000000] font-medium">
              {shippingFee} EGP
            </span>
          </div>
          <div className="border-t border-[#E0E0E0] pt-3">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-[#6B6B6B]">Subtotal</span>
              <span className="text-[#000000] font-medium">
                {itemSubtotal} EGP
              </span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Payment processing fee</span>
            <span className="text-[#000000] font-medium">{paymentFee} EGP</span>
          </div>
          <div className="border-t border-[#E0E0E0] pt-3">
            <div className="flex justify-between">
              <span className="text-base font-semibold text-[#000000]">
                Pay in EGP
              </span>
              <span className="text-base font-semibold text-[#000000]">
                {total} EGP
              </span>
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          className="w-full h-12 rounded-lg text-white font-medium text-base bg-gradient-to-r from-orange to-orange-300" >
          Pay now
        </button>
      </div>

      {/* Protections Section */}
      <CheckoutProtectionsSection />
    </div>
  );
}
