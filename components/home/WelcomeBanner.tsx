"use client";

import Link from "next/link";
import { FileText, Wrench, Shield, TrendingUp } from "lucide-react";

interface WelcomeBannerProps {
  userName?: string;
}

export default function WelcomeBanner({
  userName = "Business Owner",
}: WelcomeBannerProps) {
  return (
    <section className="w-full bg-white border-b border-gray-200">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Welcome Message */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
             <span className="text-orange">Welcome back,</span>  {userName}!
            </h2>
            <p className="text-sm text-gray-600">
              Discover new suppliers and expand your business network
            </p>
          </div>

          {/* Right: Quick Actions Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
            <Link
              href="/custom-orders"
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-orange-50/50 to-orange-50 rounded-xl hover:from-orange-50/50 hover:to-orange-100 transition-all group"
            >
              <div className="p-3 bg-white rounded-lg group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-orange " />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">Custom Orders</span>
              <span className="text-xs text-gray-600 text-center">Bulk Requests</span>
            </Link>

            <Link
              href="/on-demand"
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-orange-50/50 to-orange-50 rounded-xl hover:from-orange-50/50 hover:to-orange-100 transition-all group"
            >
              <div className="p-3 bg-white rounded-lg group-hover:scale-110 transition-transform">
                <Wrench className="h-6 w-6 text-orange" />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">On-Demand</span>
              <span className="text-xs text-gray-600 text-center">Manufacturing</span>
            </Link>

            <Link
              href="/flash-sales"
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-orange-50/50 to-orange-50 rounded-xl hover:from-orange-50/50 hover:to-orange-100 transition-all group"
            >
              <div className="p-3 bg-white rounded-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-orange" />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">Flash Sales</span>
              <span className="text-xs text-gray-600 text-center">Limited Time</span>
            </Link>

            <Link
              href="/protection"
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-orange-50/50 to-orange-50 rounded-xl hover:from-orange-50/50 hover:to-orange-100 transition-all group"
            >
              <div className="p-3 bg-white rounded-lg group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-orange" />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">Trade Protection</span>
              <span className="text-xs text-gray-600 text-center">Secure Orders</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
