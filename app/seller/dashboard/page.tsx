"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

function Tile({
  href,
  title,
  desc,
}: {
  href?: string;
  title: string;
  desc: string;
}) {
  const content = (
    <div className="p-6 border rounded-lg hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export default function SellerDashboardPage() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["seller-dashboard"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/seller/dashboard", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
  });

  const dashboard = (data as any)?.data || data || null;
  const totalProducts = dashboard?.totalProducts ?? 0;
  const pendingOrders = dashboard?.pendingOrders ?? 0;
  const totalSales = dashboard?.totalSales ?? 0;
  const messagesCount = dashboard?.messagesCount ?? 0;
  const recentOrders = dashboard?.recentOrders ?? [];

  const handleLogout = () => {
    try {
      // clear client session data and navigate to signin
      sessionStorage.clear();
      localStorage.removeItem("registration");
    } catch (e) {
      // ignore
    }
    router.push("/auth/seller/signin");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Seller Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Overview of store performance and quick actions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/seller/dashboard/profile"
            className="px-4 py-2 border rounded-md text-slate-700 hover:bg-slate-50"
          >
            Edit Profile
          </Link>
          <Link
            href="/seller/dashboard/orders"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:opacity-95"
          >
            View Orders
          </Link>
        </div>
      </header>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Total Products</p>
          <div className="mt-2 text-2xl font-semibold">
            {isLoading ? "-" : totalProducts}
          </div>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Pending Orders</p>
          <div className="mt-2 text-2xl font-semibold">
            {isLoading ? "-" : pendingOrders}
          </div>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Total Sales</p>
          <div className="mt-2 text-2xl font-semibold">
            {isLoading ? "-" : `${totalSales} AED`}
          </div>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Messages</p>
          <div className="mt-2 text-2xl font-semibold">
            {isLoading ? "-" : messagesCount}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/seller/dashboard/products"
            className="px-4 py-2 border rounded-md hover:bg-slate-50"
          >
            Browse Products
          </Link>
          <Link
            href="/seller/dashboard/orders"
            className="px-4 py-2 border rounded-md hover:bg-slate-50"
          >
            Manage Orders
          </Link>
          <Link
            href="/seller/dashboard/invoices"
            className="px-4 py-2 border rounded-md hover:bg-slate-50"
          >
            Invoices
          </Link>
          <Link
            href="/seller/dashboard/profile"
            className="px-4 py-2 border rounded-md hover:bg-slate-50"
          >
            Profile & Documents
          </Link>
        </div>
      </section>

      {/* Recent activity */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold">Recent Orders</h3>
          <p className="text-sm text-slate-500 mt-2">
            Latest orders for your products.
          </p>
          <div className="mt-4">
            {isLoading ? (
              <div className="py-6 text-sm text-slate-500">Loading...</div>
            ) : error ? (
              <div className="py-6 text-sm text-red-500">
                Failed to load recent orders.
              </div>
            ) : !recentOrders.length ? (
              <div className="py-6 text-sm text-slate-500">
                No recent orders yet.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-left text-slate-500">
                  <tr>
                    <th className="py-2">Order</th>
                    <th className="py-2">Customer</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentOrders.map((order: any) => (
                    <tr key={order.id}>
                      <td className="py-2">#{order.id}</td>
                      <td className="py-2">
                        {order.User?.name || "Buyer"}
                      </td>
                      <td className="py-2">
                        {order.total_amount} AED
                      </td>
                      <td className="py-2">
                        <span
                          className={`text-sm font-medium ${
                            order.status === "delivered"
                              ? "text-emerald-600"
                              : order.status === "cancelled"
                              ? "text-red-600"
                              : "text-amber-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold">Recent Messages</h3>
          <p className="text-sm text-slate-500 mt-2">
            New messages from buyers or support.
          </p>
          <div className="mt-4 text-sm text-slate-500">
            {isLoading
              ? "Loading..."
              : messagesCount > 0
              ? `You have ${messagesCount} new message(s).`
              : "No new messages."}
          </div>
        </div>
      </section>

    </div>
  );
}
