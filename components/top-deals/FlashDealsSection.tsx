"use client";

import Link from "next/link";

export default function FlashDealsSection() {
  return (
    <section className="w-full h-auto min-h-[50px] sm:h-[60px] lg:h-[76px] bg-[#D9EFFF] flex items-center py-2 sm:py-0">
      <div className="w-full max-w-[1240px] mx-auto px-4 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Flash deals + Timer */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-[14px] sm:text-[16px] lg:text-[20px] font-semibold leading-[20px] sm:leading-[24px] lg:leading-[28px] text-black whitespace-nowrap">
            Flash deals
          </span>
          <div className="flex items-center gap-1 sm:gap-2 text-[12px] sm:text-[14px] lg:text-[16px] font-normal leading-[16px] sm:leading-[20px] lg:leading-[22.4px] text-black">
            {/* Days */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="bg-[#AADBFF] rounded-[5px] px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[20px] sm:min-w-[24px] lg:min-w-[27px] text-center text-[11px] sm:text-[13px] lg:text-[16px]">
                4
              </span>
              <span className="text-[11px] sm:text-[13px] lg:text-[16px]">
                days
              </span>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="bg-[#AADBFF] rounded-[5px] px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[20px] sm:min-w-[24px] lg:min-w-[27px] text-center text-[11px] sm:text-[13px] lg:text-[16px]">
                14
              </span>
              <span className="text-[11px] sm:text-[13px] lg:text-[16px]">
                :
              </span>
            </div>

            {/* Minutes */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="bg-[#AADBFF] rounded-[5px] px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[20px] sm:min-w-[24px] lg:min-w-[27px] text-center text-[11px] sm:text-[13px] lg:text-[16px]">
                37
              </span>
              <span className="text-[11px] sm:text-[13px] lg:text-[16px]">
                :
              </span>
            </div>

            {/* Seconds */}
            <span className="bg-[#AADBFF] rounded-[5px] px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[20px] sm:min-w-[24px] lg:min-w-[27px] text-center text-[11px] sm:text-[13px] lg:text-[16px]">
              48
            </span>
          </div>
        </div>

        {/* Right Side: View More - Hidden on mobile */}
        <Link
          href="#"
          className="hidden sm:flex items-center gap-2 cursor-pointer"
        >
          <span className="text-[14px] lg:text-[16px] font-medium leading-[20px] lg:leading-[22.4px] text-black">
            View More
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="lg:w-[24px] lg:h-[24px]"
          >
            <path
              d="M8.9502 4.07992L15.4702 10.5999C16.2402 11.3699 16.2402 12.6299 15.4702 13.3999L8.9502 19.9199"
              stroke="#7c3aed"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
