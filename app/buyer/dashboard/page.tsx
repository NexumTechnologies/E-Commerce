"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function BuyerDashboardHome() {
  const { data: profileData } = useQuery({
    queryKey: ["buyer-profile"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/auth/profile", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
  });

  const user =
    profileData?.data || profileData?.user || profileData || null;

  const buyerName = user?.name || "Buyer";
  const isApproved = user?.is_varified;
  const accountStatus: string = isApproved ? "Approved" : "Pending";
  const statusClass =
    accountStatus === "Approved"
      ? "inline-block px-2 py-0.5 text-green-700 bg-green-50 rounded font-medium"
      : accountStatus === "Pending"
        ? "inline-block px-2 py-0.5 text-red-700 bg-red-50 rounded font-medium"
        : "inline-block px-2 py-0.5 text-yellow-700 bg-yellow-50 rounded font-medium";

    const { data: dashboardData, isLoading, error } = useQuery({
      queryKey: ["buyer-dashboard"],
      queryFn: async () => {
        const token = localStorage.getItem("token");
        const res = await api.get("/buyer/dashboard", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        return res.data;
      },
    });

    const dashboard = (dashboardData as any)?.data || dashboardData || null;
    const totalOrders = dashboard?.totalOrders ?? 0;
    const pendingOrders = dashboard?.pendingOrders ?? 0;
    const completedOrders = dashboard?.completedOrders ?? 0;
    const wishlistItems = dashboard?.wishlistItems ?? 0;
    const recentOrders = dashboard?.recentOrders ?? [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {buyerName}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Account status:{" "}
            <span className={statusClass} role="status" aria-live="polite">
              {accountStatus}
            </span>
          </p>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Total Orders</p>
          <div className="mt-2 text-2xl font-semibold">
            {isLoading ? "-" : totalOrders}
          </div>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Pending Orders</p>
          <div className="mt-2 text-2xl font-semibold">
            {isLoading ? "-" : pendingOrders}
          </div>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Completed Orders</p>
          <div className="mt-2 text-2xl font-semibold">
            {isLoading ? "-" : completedOrders}
          </div>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Wishlist Items</p>
          <div className="mt-2 text-2xl font-semibold">
            {isLoading ? "-" : wishlistItems}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Recent Orders</h2>
        <div className="bg-white border rounded-lg p-4">
          {isLoading ? (
            <div className="py-6 text-sm text-slate-500">Loading...</div>
          ) : error ? (
            <div className="py-6 text-sm text-red-500">
              Failed to load recent orders.
            </div>
          ) : !recentOrders.length ? (
            <div className="py-6 text-sm text-slate-500">
              You haven&apos;t placed any orders yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="py-2">Order</th>
                  <th className="py-2">Product</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map((order: any) => (
                  <tr key={order.id}>
                    <td className="py-2">#{order.id}</td>
                    <td className="py-2">
                      {order.Product?.name || "Product"}
                    </td>
                    <td className="py-2">{order.total_amount} AED</td>
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
                    <td className="py-2 text-xs text-slate-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
