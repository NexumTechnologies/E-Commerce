"use client";

import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import SignInPromo from "@/components/auth/SignInPromo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout - Two Columns */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Column - Sign Up Form (60%) */}
        <div className="w-[60%] flex items-center justify-center bg-white px-8">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>

        {/* Right Column - Sign In Promo (40%) */}
        <div className="w-[40%]">
          <SignInPromo />
        </div>
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="md:hidden">
        <div className="bg-gradient-to-br from-[#6b21a8] to-[#8b5cf6] px-4 py-8">
          <h1 className="text-white text-[25px] font-bold leading-[35px] text-center">
            Create Account
          </h1>
          <p className="text-white/90 text-[16px] leading-[18.2px] font-medium text-center mt-1">
            or use you email registration:
          </p>
        </div>
        <div className="px-4 py-8 bg-white">
          <RegisterForm />
          <div className="mt-8 text-center">
            <p className="text-[#6B6B6B] text-[16px]">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-[#7c3aed] font-medium">
                SIGN IN
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
