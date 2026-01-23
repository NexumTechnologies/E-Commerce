"use client";

import Link from "next/link";

export default function SignInPromo() {
  return (
    <div className="h-full bg-gradient-to-bl from-blue-light to-blue flex flex-col items-center justify-center px-8 py-16">
      <h2 className="text-white text-[25px] font-bold leading-[35px] text-center">
        New Here?
      </h2>
      <p className="text-white text-[20px] font-medium leading-[28px] text-center mt-4">
        Create an account to explore products and connect with suppliers.
      </p>
      <Link
        href="/auth/signin"
        className="mt-4 w-[376px] h-12 border-2 border-white rounded-lg flex items-center justify-center text-white text-[16px] font-medium hover:bg-white/10 transition-colors"
      >
        SIGN IN
      </Link>
    </div>
  );
}
