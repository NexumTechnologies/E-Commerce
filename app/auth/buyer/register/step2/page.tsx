"use client";

import { useRouter } from "next/navigation";
import SellerRegisterStep2 from "@/components/auth/SellerRegisterStep2";
import SignInPromo from "@/components/auth/SignInPromo";

export default function BuyerRegisterStep2Page() {
  const router = useRouter();
  const role = "buyer" as const;

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout - Two Columns */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Column - Form (60%) */}
        <div className="w-[60%] flex items-center justify-center bg-white px-8">
          <div className="w-full max-w-md">
            <SellerRegisterStep2 role={role} />
          </div>
        </div>

        {/* Right Column - Sign In Promo (40%) */}
        <div className="w-[40%]">
          <SignInPromo />
        </div>
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="md:hidden">
        <div className="bg-gradient-to-br from-[#6b21a8] to-[#8b5cf6] px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-white text-[18px] font-bold">Tell Us About Your Company</h1>
        </div>
        <div className="px-4 py-8 bg-white">
          <SellerRegisterStep2 role={role} />
        </div>
      </div>
    </div>
  );
}
