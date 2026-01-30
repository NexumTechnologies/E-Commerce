"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function BuyerSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    try {
      sessionStorage.clear();
      localStorage.removeItem("registration");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-change"));
      }
    } catch (e) {}
    router.push("/auth/signin");
  };

  const items = [
    { href: "/buyer/dashboard", label: "Dashboard" },
    { href: "/buyer/dashboard/browse-products", label: "Products" },
    { href: "/buyer/dashboard/cart", label: "Cart" },
    { href: "/buyer/dashboard/orders", label: "My Orders" },
    // { href: "/buyer/dashboard/invoices", label: "Invoices" },
    // { href: "/buyer/dashboard/payments", label: "Payments" },
    // { href: "/buyer/dashboard/wishlist", label: "Wishlist" },
    // { href: "/buyer/dashboard/messages", label: "Messages" },
    { href: "/buyer/dashboard/profile", label: "Profile" },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/buyer/dashboard") return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="w-64 min-h-screen border-r px-4 py-6 bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Buyer Menu</h2>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map((it) => {
          const active = isActive(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`block px-3 py-2 rounded hover:bg-gray-100 ${
                active ? "bg-gray-100 font-medium text-blue-600" : "text-gray-700"
              }`}
            >
              {it.label}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="mt-4 text-left px-3 py-2 rounded bg-red-50 text-red-600 hover:bg-red-100"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
