"use client";

import { Sparkles, ArrowRight } from "lucide-react";

interface BrowseBannerProps {
  categoryName?: string;
  totalProducts?: number;
}

export default function BrowseBanner({ categoryName = "All Products", totalProducts = 12500 }: BrowseBannerProps) {
  return (
    <section className="w-full bg-gradient-to-r from-blue-light to-blue py-12 lg:py-16 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-orange/20 rounded-full blur-3xl" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-orange" />
              <span className="text-xs font-bold tracking-wider uppercase">Discovery Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Browse <span className="text-orange">{categoryName}</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-xl">
              Discover {totalProducts.toLocaleString()}+ premium products from verified global suppliers. 
              Quality products, unbeatable prices, and secure trade.
            </p>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold text-orange">24/7</div>
                  <div className="text-xs text-blue-100 uppercase font-medium">Support</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold text-orange">100%</div>
                  <div className="text-xs text-blue-100 uppercase font-medium">Secure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
