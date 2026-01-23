"use client";

import { useState } from "react";

type FilterType = "hot-selling" | "most-popular" | "best-reviewed";

export default function FilterButtonsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("hot-selling");

  const filters = [
    { id: "hot-selling" as FilterType, label: "Hot selling" },
    { id: "most-popular" as FilterType, label: "Most popular" },
    { id: "best-reviewed" as FilterType, label: "Best reviewed" },
  ];

  return (
    <section className="w-full h-auto min-h-[60px] sm:h-[70px] lg:h-[86px] bg-[#D9EFFF] flex items-center py-2 sm:py-3 lg:py-0">
      <div className="w-full max-w-[1240px] mx-auto px-4 flex justify-center">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-[16px] flex-wrap justify-center">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 sm:px-4 lg:px-[16px] py-2 sm:py-2.5 lg:py-[16px] rounded-[8px] sm:rounded-[10px] border border-orange text-[12px] sm:text-[14px] lg:text-[16px] font-medium leading-[16px] sm:leading-[20px] lg:leading-[22.4px] cursor-pointer transition-colors ${
                activeFilter === filter.id
                  ? "bg-orange text-white"
                  : "bg-transparent text-orange hover:bg-orange/10"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
