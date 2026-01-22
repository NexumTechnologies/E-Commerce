"use client";

import Link from "next/link";

export default function RFQBanner() {
  return (
    <section
      className="w-full h-[133px] lg:h-[316px] flex flex-col items-center justify-center relative"
      style={{
        background: "linear-gradient(180deg, #6b21a8 0%, #8b5cf6 69%)",
      }}
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 flex flex-col lg:flex-row items-start lg:items-start justify-between relative h-full pt-[62px] lg:pt-[34px]">
        {/* Mobile: Arrow and Title on same line */}
        <div className="flex items-center gap-2 lg:hidden w-full">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          <h1 className="text-[20px] font-bold leading-[28px] text-white">
            Custom Orders
          </h1>
        </div>

        {/* Mobile: Subtitle */}
        <p className="text-[16px] font-medium leading-[22.4px] text-white mt-2 lg:hidden">
          Submit bulk requests and get quotes from vendors
        </p>

        {/* Desktop: Left Chevron Icon */}
        <Link
          href="/"
          className="hidden lg:flex items-center mt-[10px] hover:opacity-80 transition-opacity cursor-pointer relative z-20"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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

        {/* Desktop: Center Title and Subtitle */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 flex-col items-center w-full px-0 pointer-events-none z-10">
          <h1 className="text-[36px] font-medium leading-[40px] text-white text-center">
            Custom Orders
          </h1>
          <p className="text-[16px] font-medium leading-[22.4px] text-white text-center mt-4">
            Submit bulk requests and get quotes from vendors
          </p>
        </div>

        {/* Desktop: Right spacer for centering */}
        <div className="hidden lg:block w-[30px]"></div>
      </div>
    </section>
  );
}
