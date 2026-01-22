"use client";

import Image from "next/image";
import {
  User,
  Settings,
  Sliders,
  ChevronRight,
  Copy,
  LogOut,
} from "lucide-react";

export default function AccountSettingsContent() {
  const handleCopyMemberId = () => {
    navigator.clipboard.writeText("eg39126748602orzd");
    // You can add a toast notification here
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Profile Banner */}
      <div className="rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] shadow-xl">
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-white/20">
            <Image
              src="/dummy-product.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          {/* User Info */}
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">Mohamed Hassan</h2>
            <p className="text-sm opacity-90 mb-1">Email hs****@gmail.com</p>
            <div className="flex items-center gap-2">
              <p className="text-sm opacity-90">Member ID eg39126748602orzd</p>
              <button
                onClick={handleCopyMemberId}
                className="hover:opacity-80 transition-opacity p-1 rounded-lg hover:bg-white/20"
                title="Copy Member ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30">
            Edit my profile
          </button>
          <button className="px-6 py-2.5 bg-white text-[#7c3aed] rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-lg">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Account Information */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-purple-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Account information
            </h3>
          </div>
          <div className="w-full h-px bg-gray-200 mb-4"></div>
          <nav className="space-y-1">
            {[
              "My profile",
              "Member profile",
              "Connected accounts",
              "Tax information",
            ].map((item) => (
              <button
                key={item}
                className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-purple-50/50 transition-colors text-left group"
              >
                <span className="text-base font-medium text-gray-900 group-hover:text-[#7c3aed] transition-colors">
                  {item}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#7c3aed] transition-colors" />
              </button>
            ))}
          </nav>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-purple-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Account security</h3>
          </div>
          <div className="w-full h-px bg-gray-200 mb-4"></div>
          <nav className="space-y-1">
            <button className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-purple-50/50 transition-colors text-left group">
              <span className="text-base font-medium text-gray-900 group-hover:text-[#7c3aed] transition-colors">
                Change password
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#7c3aed] transition-colors" />
            </button>
            <button className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-purple-50/50 transition-colors text-left group">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium text-gray-900 group-hover:text-[#7c3aed] transition-colors">
                  Change email
                </span>
                <span className="text-sm text-gray-500">hs****@gmail.com</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#7c3aed] transition-colors" />
            </button>
            <button className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-purple-50/50 transition-colors text-left group">
              <span className="text-base font-medium text-gray-900 group-hover:text-[#7c3aed] transition-colors">
                Change phone number
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#7c3aed] transition-colors" />
            </button>
            <button className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-red-50/50 transition-colors text-left group">
              <span className="text-base font-medium text-red-600 group-hover:text-red-700 transition-colors">
                Delete account
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
            </button>
          </nav>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-purple-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg">
              <Sliders className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Preferences</h3>
          </div>
          <div className="w-full h-px bg-gray-200 mb-4"></div>
          <nav className="space-y-1">
            {["Privacy settings", "Email preferences", "Ads preferences"].map(
              (item) => (
                <button
                  key={item}
                  className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-purple-50/50 transition-colors text-left group"
                >
                  <span className="text-base font-medium text-gray-900 group-hover:text-[#7c3aed] transition-colors">
                    {item}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#7c3aed] transition-colors" />
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
