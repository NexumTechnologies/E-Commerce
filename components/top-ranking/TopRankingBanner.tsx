"use client";

import Link from "next/link";

export default function TopRankingBanner() {
  return (
    <section
      className="w-full h-[60px] sm:h-[80px] lg:h-[142px] flex items-center justify-center relative"
      style={{
        background: "linear-gradient(180deg, #6b21a8 0%, #8b5cf6 69%)",
      }}
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 flex items-center justify-between relative">
        {/* Left Chevron Icon */}
        <Link href="/" className="cursor-pointer">
          <svg
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-[24px] sm:h-[24px] lg:w-[30px] lg:h-[30px]"
          >
            <path
              d="M18.7498 24.9001L10.5998 16.7501C9.6373 15.7876 9.6373 14.2126 10.5998 13.2501L18.7498 5.1001"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Center: Best Sellers Text */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-[18px] sm:text-[24px] lg:text-[40px] font-medium leading-[24px] sm:leading-[26px] lg:leading-[28px] text-white">
          Best Sellers
        </h1>

        {/* Right spacer for centering */}
        <div className="w-[20px] sm:w-[24px] lg:w-[30px]"></div>
      </div>
    </section>
  );
}
