"use client";

import React, { Suspense } from "react";
import BrowseBanner from "@/components/browse/BrowseBanner";
import BrowseSidebar from "@/components/browse/BrowseSidebar";
import BrowseContent from "@/components/browse/BrowseContent";

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowseBanner />
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <Suspense fallback={<div className="w-full lg:w-72">Loading filters...</div>}>
            <BrowseSidebar />
          </Suspense>
          <Suspense fallback={<div className="flex-1">Loading products...</div>}>
            <BrowseContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
