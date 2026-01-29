"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await api.post("/auth/logout");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-[#7c3aed]">Admin Panel</h2>
        </div>

        <nav className="px-2 pb-8">
          <Section title="Dashboard">
            <NavItem href="/admin/dashboard">Overview</NavItem>
          </Section>

          <Section title="User Management">
            <NavItem href="/admin/users/buyers">Buyers</NavItem>
            <NavItem href="/admin/users/sellers">Sellers</NavItem>
            <NavItem href="/admin/users/customers">Customers</NavItem>
            <NavItem href="/admin/users/admins">Admin Users</NavItem>
          </Section>

          <Section title="Category Management">
            <NavItem href="/admin/categories">Categories</NavItem>
            <NavItem href="/admin/attributes">Attributes</NavItem>
            <NavItem href="/admin/brands">Brands</NavItem>
          </Section>

          <Section title="Approvals">
            <NavItem href="/admin/approvals/buyers">Buyer Approvals</NavItem>
            <NavItem href="/admin/approvals/sellers">Seller Approvals</NavItem>
            <NavItem href="/admin/approvals/products">
              Product Approvals
            </NavItem>
          </Section>

          <Section title="Product Management">
            <NavItem href="/admin/products">All Products</NavItem>
          </Section>

          <Section title="Order Management">
            <NavItem href="/admin/orders">All Orders</NavItem>
            <NavItem href="/admin/orders/pending">Pending Orders</NavItem>
            <NavItem href="/admin/orders/completed">Completed Orders</NavItem>
            <NavItem href="/admin/orders/cancelled">
              Cancelled / Refunded
            </NavItem>
          </Section>

          <Section title="Reports & Analytics">
            <NavItem href="/admin/reports/sales">Sales Reports</NavItem>
            <NavItem href="/admin/reports/users">User Reports</NavItem>
            <NavItem href="/admin/reports/revenue">Revenue Reports</NavItem>
          </Section>
        </nav>

        {/* Logout button at the bottom */}
        <div className="px-4 py-6 border-t mt-auto">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // determine if any child NavItem matches current pathname; if so, open the section by default
  const childrenArray = React.Children.toArray(children);
  const hasActive = childrenArray.some((child) => {
    if (!React.isValidElement(child)) return false;
    const href = (child.props as any).href;
    if (!href || !pathname) return false;
    return pathname === href || pathname.startsWith(href);
  });

  const [open, setOpen] = useState(hasActive);

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-600 uppercase tracking-wide font-semibold mb-2 hover:bg-gray-50 rounded"
        aria-expanded={open}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 4L14 10L6 16V4Z" fill="currentColor" />
        </svg>
      </button>

      <div
        className={`space-y-1 overflow-hidden transition-[max-height] duration-200 ${open ? "max-h-96" : "max-h-0"}`}
      >
        {children}
      </div>
    </div>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-sm ${isActive ? "bg-[#7c3aed]/10 text-[#7c3aed]" : "text-gray-700 hover:bg-gray-100"}`}
    >
      {children}
    </Link>
  );
}
