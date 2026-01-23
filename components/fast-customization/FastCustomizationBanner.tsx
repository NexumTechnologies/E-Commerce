"use client";

import Link from "next/link";

export default function FastCustomizationBanner() {
  return (
    <section
      className="w-full h-auto min-h-[100px] sm:h-[120px] lg:h-[142px] flex items-center justify-center relative py-3 sm:py-4 lg:py-0"
      style={{
        background: "linear-gradient(180deg, blue 0%, blue 69%)",
      }}
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 flex items-center justify-between relative">
        {/* Left Chevron Icon */}
        <Link
          href="/"
          className="cursor-pointer hover:opacity-80 transition-opacity relative z-20"
        >
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

        {/* Center: Fast Customization Title and Features */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center w-full px-12 sm:px-16 lg:px-0 pointer-events-none z-10">
          <h1 className="text-[18px] sm:text-[24px] lg:text-[40px] font-medium leading-[22px] sm:leading-[26px] lg:leading-[28px] text-white mb-2 sm:mb-3 lg:mb-[24px] text-center">
            On-Demand Manufacturing
          </h1>

          {/* Features Row */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-[24px] flex-wrap justify-center">
            <span className="text-[11px] sm:text-[13px] lg:text-[16px] font-medium leading-[14px] sm:leading-[18px] lg:leading-[22.4px] text-white whitespace-nowrap">
              Low MOQ
            </span>
            <span className="text-[11px] sm:text-[13px] lg:text-[16px] font-medium leading-[14px] sm:leading-[18px] lg:leading-[22.4px] text-white whitespace-nowrap">
              Fast Turnaround
            </span>
            <span className="text-[11px] sm:text-[13px] lg:text-[16px] font-medium leading-[14px] sm:leading-[18px] lg:leading-[22.4px] text-white whitespace-nowrap">
              Custom Production
            </span>
          </div>
        </div>

        {/* Right spacer for centering */}
        <div className="w-[20px] sm:w-[24px] lg:w-[30px]"></div>
      </div>
    </section>
  );
}
