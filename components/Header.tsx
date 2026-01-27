"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  ShoppingCart,
  Briefcase,
  LogIn,
  Globe,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      {/* Main Header Bar */}
      <div className="w-full border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Logo */}
            <div className="flex items-center gap-4 lg:gap-8">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-700 hover:text-orange transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>

              <Link href="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="B2B Marketplace Logo"
                  className="h-7 w-auto sm:h-8 lg:h-16 object-contain"
                />
              </Link>
            </div>

            {/* Center: Search Bar (Desktop Only) */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products, suppliers, categories..."
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-gray-900 placeholder:text-gray-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 bg-orange hover:bg-blue text-white rounded-lg text-sm font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 lg:gap-6">
              {/* Mobile Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden text-gray-700 hover:text-orange transition-colors"
              >
                <Search className="h-6 w-6" />
              </button>

              {/* Location (Desktop) */}
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray-700 hover:text-orange transition-colors cursor-pointer group">
                <MapPin className="h-4 w-4 text-orange" />
                <span className="font-medium">United States</span>
                <ChevronDown className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Language (Desktop) */}
              <button className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-orange transition-colors">
                <Globe className="h-5 w-5 text-orange" />
              </button>


              {/* Cart */}
              <Link
                href="/checkout"
                className="relative text-gray-700 hover:text-orange transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* Business Registration */}
              <Link
                href="/auth/register"
                className="flex items-center gap-2 text-gray-700 hover:text-orange transition-colors"
              >
                <Briefcase className="h-6 w-6" />
                <span className="hidden xl:block text-sm font-medium">
                  Business Registration
                </span>
              </Link>

              


              {/* Login */}
              <Link
                href="/auth/signin"
                className="flex items-center gap-2 text-gray-700 hover:text-orange transition-colors"
              >
                <LogIn className="h-6 w-6" />
                <span className="hidden xl:block text-sm font-medium">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white px-4 py-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products, suppliers..."
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange text-gray-900"
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Bar (Desktop Only) */}
      <div className="hidden lg:block border-b border-gray-100 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-8 h-12">
            <Link
              href="/browse"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange transition-colors"
            >
              <Menu className="h-4 w-4" />
              <span>Browse All</span>
            </Link>

            <Link
              href="/flash-sales"
              className="text-sm font-medium text-gray-700 hover:text-orange transition-colors"
            >
              Flash Sales
            </Link>

            <Link
              href="/best-sellers"
              className="text-sm font-medium text-gray-700 hover:text-orange transition-colors"
            >
              Best Sellers
            </Link>

            <Link
              href="/custom-orders"
              className="text-sm font-medium text-gray-700 hover:text-orange transition-colors"
            >
              Custom Orders
            </Link>

            <Link
              href="/on-demand"
              className="text-sm font-medium text-gray-700 hover:text-orange transition-colors"
            >
              On-Demand
            </Link>

            <div className="flex-1" />

            <Link
              href="/suppliers"
              className="text-sm font-medium text-gray-700 hover:text-orange transition-colors"
            >
              Find Suppliers
            </Link>

            <Link
              href="/auth/seller/signin"
              className="text-sm font-semibold text-orange hover:text-blue transition-colors"
            >
              Become a Vendor
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 lg:hidden shadow-2xl overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-orange">
              <span className="text-white text-lg font-bold">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4">
              {/* User Section: Business Registration & Login */}
              <div className="mb-6 pb-6 border-b border-gray-200 space-y-2">
                <Link
                  href="/auth/seller/register"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Business Registration</div>
                    <div className="text-sm text-gray-600">Create a business account</div>
                  </div>
                </Link>

                <Link
                  href="/auth/signin"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                    <LogIn className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Login</div>
                    <div className="text-sm text-gray-600">Access your account</div>
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <Link
                  href="/browse"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-orange rounded-lg transition-colors font-medium"
                >
                  <Menu className="h-5 w-5" />
                  <span>Browse All</span>
                </Link>

                <Link
                  href="/flash-sales"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-orange rounded-lg transition-colors"
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    🔥
                  </span>
                  <span>Flash Sales</span>
                </Link>

                <Link
                  href="/best-sellers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-orange rounded-lg transition-colors"
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    ⭐
                  </span>
                  <span>Best Sellers</span>
                </Link>

                <Link
                  href="/custom-orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-orange rounded-lg transition-colors"
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    📋
                  </span>
                  <span>Custom Orders</span>
                </Link>

                <Link
                  href="/on-demand"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-orange rounded-lg transition-colors"
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    ⚙️
                  </span>
                  <span>On-Demand</span>
                </Link>

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Link
                    href="/suppliers"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-orange rounded-lg transition-colors"
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      🏭
                    </span>
                    <span>Find Suppliers</span>
                  </Link>

                  <Link
                    href="/support"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-orange rounded-lg transition-colors"
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      💬
                    </span>
                    <span>Support</span>
                  </Link>

                  <Link
                    href="/auth/seller/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 bg-orange text-white rounded-lg hover:opacity-90 transition-opacity font-semibold mt-2"
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      ✨
                    </span>
                    <span>Become a Vendor</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
