"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function SellerSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    try {
      sessionStorage.clear();
      localStorage.removeItem("registration");
    } catch (e) {}
    router.push("/auth/signin");
  };

  const items = [
    { href: "/seller/dashboard", label: "Dashboard" },
    { href: "/seller/dashboard/browse-products", label: "Browse Products" },
    { href: "/seller/dashboard/orders", label: "My Orders" },
    { href: "/seller/dashboard/invoices", label: "Invoices" },
    { href: "/seller/dashboard/profile", label: "Profile" },
    { href: "/seller/dashboard/documents", label: "Documents" },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    // Make dashboard active only on the exact dashboard path; sub-pages should highlight their own item
    if (href === "/seller/dashboard") return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="w-64 min-h-screen border-r px-4 py-6 bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-blue">Seller Menu</h2>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map((it) => {
          const active = isActive(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`block px-3 py-2 rounded hover:bg-gray-100 ${
                active ? "bg-gray-100 font-medium text-blue" : "text-gray-700"
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
