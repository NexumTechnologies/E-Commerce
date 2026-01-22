"use client";

import { Headphones, MessageSquare, FileText, Ticket } from "lucide-react";

export default function UserProfileCard() {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-purple-100/50">
      <div className="flex flex-col h-full">
        {/* First Row: Profile and Online Support */}
        <div className="flex items-center justify-between mb-8">
          {/* Left Side: Avatar and Name */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-purple-100 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Mohamed</h3>
              <p className="text-sm text-gray-500 mt-1">Profile</p>
            </div>
          </div>

          {/* Right Side: Online Support */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 hover:shadow-md transition-all">
            <Headphones className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Online support
            </span>
          </button>
        </div>

        {/* Second Row: Metrics with modern cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* Unread messages */}
          <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-purple-50/50 to-transparent border border-purple-100/50 hover:border-purple-200 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center mb-3 shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 mb-1">0</span>
            <span className="text-xs text-gray-600 text-center">
              Unread messages
            </span>
          </div>

          {/* New quotes */}
          <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-transparent border border-blue-100/50 hover:border-blue-200 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 mb-1">0</span>
            <span className="text-xs text-gray-600 text-center">New quotes</span>
          </div>

          {/* Coupons */}
          <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-orange-50/50 to-transparent border border-orange-100/50 hover:border-orange-200 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-3 shadow-lg">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 mb-1">0</span>
            <span className="text-xs text-gray-600 text-center">Coupons</span>
          </div>
        </div>
      </div>
    </div>
  );
}
