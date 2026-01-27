"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Tile({ href, title, desc }: { href?: string; title: string; desc: string }) {
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
              <h1 className="text-3xl font-bold text-slate-900">Seller Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">Overview of store performance and quick actions.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/seller/dashboard/profile" className="px-4 py-2 border rounded-md text-slate-700 hover:bg-slate-50">Edit Profile</Link>
              <Link href="/seller/dashboard/orders" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:opacity-95">View Orders</Link>
            </div>
          </header>

          {/* Stats */}
          <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <p className="text-sm text-slate-500">Total Products</p>
              <div className="mt-2 text-2xl font-semibold">128</div>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <p className="text-sm text-slate-500">Pending Orders</p>
              <div className="mt-2 text-2xl font-semibold">6</div>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <p className="text-sm text-slate-500">Total Sales</p>
              <div className="mt-2 text-2xl font-semibold">$12,430</div>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <p className="text-sm text-slate-500">Messages</p>
              <div className="mt-2 text-2xl font-semibold">3</div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/seller/dashboard/browse-products" className="px-4 py-2 border rounded-md hover:bg-slate-50">Browse Products</Link>
              <Link href="/seller/dashboard/orders" className="px-4 py-2 border rounded-md hover:bg-slate-50">Manage Orders</Link>
              <Link href="/seller/dashboard/invoices" className="px-4 py-2 border rounded-md hover:bg-slate-50">Invoices</Link>
              <Link href="/seller/dashboard/profile" className="px-4 py-2 border rounded-md hover:bg-slate-50">Profile & Documents</Link>
            </div>
          </section>

          {/* Recent activity */}
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold">Recent Orders</h3>
              <p className="text-sm text-slate-500 mt-2">Latest orders for your products.</p>
              <div className="mt-4">
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
                    <tr>
                      <td className="py-2">#1001</td>
                      <td className="py-2">ACME Corp</td>
                      <td className="py-2">$420</td>
                      <td className="py-2"><span className="text-yellow-600">Pending</span></td>
                    </tr>
                    <tr>
                      <td className="py-2">#1000</td>
                      <td className="py-2">Beta LLC</td>
                      <td className="py-2">$1,200</td>
                      <td className="py-2"><span className="text-green-600">Shipped</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold">Recent Messages</h3>
              <p className="text-sm text-slate-500 mt-2">New messages from buyers or support.</p>
              <ul className="mt-4 space-y-3">
                <li className="p-3 border rounded">Message from <strong>Jane Doe</strong>: "Can you provide bulk pricing?"</li>
                <li className="p-3 border rounded">Message from <strong>LogiCorp</strong>: "Shipping ETA?"</li>
              </ul>
            </div>
          </section>

          <footer className="mt-8 text-sm text-slate-500">Helpful links: <Link href="/seller/dashboard/profile" className="underline">Update profile</Link> • <Link href="/seller/dashboard/browse-products" className="underline">Add product</Link></footer>
    </div>
  );
}
