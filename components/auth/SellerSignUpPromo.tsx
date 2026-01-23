"use client";

import Link from "next/link";

export default function SellerSignUpPromo() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-light to-blue flex flex-col items-center justify-center px-8 py-16">
      <h2 className="text-white text-[25px] font-bold leading-[35px] text-center">
        Welcome to your TradeHub seller
      </h2>
      <p className="text-white text-[20px] font-medium leading-[28px] text-center mt-4">
        Grow your business, showcase your products, and connect with verified
        buyers from across the market
      </p>
      <Link
        href="/auth/seller/register"
        className="mt-4 w-[376px] h-12 border-2 border-white rounded-lg flex items-center justify-center text-white text-[16px] font-medium hover:bg-white/10 transition-colors"
      >
        SIGN UP
      </Link>
    </div>
  );
}
