"use client";

import Link from "next/link";
import SellerLoginForm from "@/components/auth/SellerLoginForm";
import SellerSignUpPromo from "@/components/auth/SellerSignUpPromo";

export default function SellerSignInPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout - Two Columns */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Column - Sign Up Promo (40%) */}
        <div className="w-[40%]">
          <SellerSignUpPromo />
        </div>

        {/* Right Column - Sign In Form (60%) */}
        <div className="w-[60%] flex items-center justify-center bg-white px-8">
          <div className="w-full max-w-md">
            <SellerLoginForm />
          </div>
        </div>
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="md:hidden">
        <div className="bg-gradient-to-br from-[#6b21a8] to-[#0af93a] px-4 py-8">
          <h1 className="text-white text-[25px] font-bold leading-[35px] text-center">
            Welcome to your TradeHub seller
          </h1>
          <p className="text-white/90 text-[20px] font-medium leading-[28px] text-center mt-4">
            Grow your business, showcase your products, and connect with
            verified buyers from across the market
          </p>
        </div>
        <div className="px-4 py-8 bg-white">
          <SellerLoginForm />
          <div className="mt-8 text-center">
            <p className="text-[#6B6B6B] text-[16px]">
              Don&apos;t have account?{" "}
              <Link
                href="/auth/seller/register"
                className="text-[#7c3aed] font-medium"
              >
                SIGN UP
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
