"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  image: string;
  price: string;
  moq: string;
}

const products: Product[] = [
  {
    id: "1",
    image: "/fast-customization-1.png",
    price: "30,000 EGP",
    moq: "MOQ: 1",
  },
  {
    id: "2",
    image: "/fast-customization-2.png",
    price: "30,000 EGP",
    moq: "MOQ: 1",
  },
  {
    id: "3",
    image: "/fast-customization-3.png",
    price: "30,000 EGP",
    moq: "MOQ: 1",
  },
  {
    id: "4",
    image: "/fast-customization-4.png",
    price: "30,000 EGP",
    moq: "MOQ: 1",
  },
];

export default function FastCustomizationSection() {
  const [clipPath, setClipPath] = useState(
    "polygon(0 20px, 20px 0, 100% 0, 100% 100%, 0 100%)"
  );

  useEffect(() => {
    const updateClipPath = () => {
      if (window.innerWidth >= 1024) {
        setClipPath("polygon(0 40px, 40px 0, 100% 0, 100% 100%, 0 100%)");
      } else {
        setClipPath("polygon(0 20px, 20px 0, 100% 0, 100% 100%, 0 100%)");
      }
    };

    updateClipPath();
    window.addEventListener("resize", updateClipPath);
    return () => window.removeEventListener("resize", updateClipPath);
  }, []);

  return (
    <section className="hidden md:block relative w-full min-h-[279px] py-4 sm:py-2 mt-4 sm:my-6 lg:mt-[32px]">
      <div
        className="relative w-full max-w-[1240px] mx-auto px-4 py-4 sm:py-6 h-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/fast-customization-bg.png')",
          clipPath,
        }}
      >
        {/* Left Side - Text Content */}
        <div className="shrink-0 text-white pl-0 pr-0 lg:pr-6 py-0 lg:py-6 pt-0 w-full lg:w-auto">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 -mt-2 lg:-mt-[42px]">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_116_14484)">
                <path
                  d="M21.81 3.94012C20.27 7.78012 16.41 13.0001 13.18 15.5901L11.21 17.1701C10.96 17.3501 10.71 17.5101 10.43 17.6201C10.43 17.4401 10.42 17.2401 10.39 17.0501C10.28 16.2101 9.90002 15.4301 9.23002 14.7601C8.55002 14.0801 7.72002 13.6801 6.87002 13.5701C6.67002 13.5601 6.47002 13.5401 6.27002 13.5601C6.38002 13.2501 6.55002 12.9601 6.76002 12.7201L8.32002 10.7501C10.9 7.52012 16.14 3.64012 19.97 2.11012C20.56 1.89012 21.13 2.05012 21.49 2.42012C21.87 2.79012 22.05 3.36012 21.81 3.94012Z"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.43 17.6201C10.43 18.7201 10.01 19.77 9.22003 20.57C8.61003 21.18 7.78003 21.6001 6.79003 21.7301L4.33003 22.0001C2.99003 22.1501 1.84003 21.01 2.00003 19.65L2.27003 17.1901C2.51003 15.0001 4.34003 13.6001 6.28003 13.5601C6.48003 13.5501 6.69003 13.56 6.88003 13.57C7.73003 13.68 8.56003 14.0701 9.24003 14.7601C9.91003 15.4301 10.29 16.21 10.4 17.05C10.41 17.24 10.43 17.4301 10.43 17.6201Z"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.24 14.47C14.24 11.86 12.12 9.73999 9.51001 9.73999"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.12 12.73L20.86 13.46C22.35 14.95 22.35 16.42 20.86 17.91L17.9 20.87C16.43 22.34 14.94 22.34 13.47 20.87"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3.11007 10.5101C1.64007 9.02006 1.64007 7.55006 3.11007 6.06006L6.07007 3.10006C7.54007 1.63006 9.03007 1.63006 10.5001 3.10006L11.2401 3.84006"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.25 3.8501L7.55005 7.5501"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20.1199 12.73L17.1599 15.68"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_116_14484">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <h2 className="font-bold text-base sm:text-lg lg:text-[22px] text-black">
              On-Demand Manufacturing
            </h2>
          </div>

          <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 font-semibold text-sm sm:text-base lg:text-[22px] ml-4 sm:ml-6">
            <li>Low MOQ</li>
            <li>Fast Turnaround</li>
            <li>Custom Production</li>
          </ul>

          <Link
            href="/on-demand"
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 sm:px-6 py-1.5 sm:py-2 ml-4 sm:ml-6 rounded-lg flex items-center gap-2 transition-colors cursor-pointer text-xs sm:text-sm lg:text-[14px] w-fit"
          >
            <span>Explore</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Right Side - Product Cards Carousel */}
        <div className="flex items-center gap-2 sm:gap-4 w-full lg:w-auto overflow-x-auto lg:overflow-visible">
          {/* Left Arrow - Hidden on mobile */}
          <button
            className="hidden lg:flex bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all cursor-pointer shrink-0"
            aria-label="Previous"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Product Cards */}
          <div className="flex gap-3 sm:gap-4 lg:gap-[24px]">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden cursor-pointer transition-shadow w-[140px] sm:w-[160px] lg:w-[178px] shrink-0 rounded-lg sm:rounded-[12px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.22)]"
                style={{
                  background:
                    "linear-gradient(180deg, #D9EFFF 0%, #F7FCFF 63%)",
                }}
              >
                <div className="relative w-full h-[140px] sm:h-[160px] lg:h-[180px]">
                  {/* Product Image */}
                  <Image
                    src={product.image}
                    alt={product.price}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-1.5 sm:p-2 lg:p-[8px]">
                  <p className="font-semibold text-xs sm:text-sm lg:text-[16px] text-[#6b21a8]">
                    {product.price}
                  </p>
                  <p className="font-medium text-[10px] sm:text-xs lg:text-[14px] text-[#3B3B3B]">
                    {product.moq}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow - Hidden on mobile */}
          <button
            className="hidden lg:flex bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all cursor-pointer shrink-0"
            aria-label="Next"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
