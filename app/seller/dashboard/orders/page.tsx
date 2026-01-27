"use client";

import React from "react";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
          <p className="mt-1 text-sm text-slate-600">List of orders placed for your products.</p>
        </div>
        <Link href="/seller/dashboard/orders" className="px-4 py-2 border rounded-md">Refresh</Link>
      </header>

      <section className="mt-6 bg-white border rounded-lg p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="py-2">Order</th>
              <th className="py-2">Buyer</th>
              <th className="py-2">Items</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">#1007</td>
              <td className="py-2">GreenWorks</td>
              <td className="py-2">3</td>
              <td className="py-2">$320</td>
              <td className="py-2"><span className="text-yellow-600">Processing</span></td>
              <td className="py-2"><Link href="/seller/dashboard/orders/1007" className="text-blue-600 underline">View</Link></td>
            </tr>
            <tr>
              <td className="py-2">#1006</td>
              <td className="py-2">Bright Ltd</td>
              <td className="py-2">1</td>
              <td className="py-2">$75</td>
              <td className="py-2"><span className="text-green-600">Shipped</span></td>
              <td className="py-2"><Link href="/seller/dashboard/orders/1006" className="text-blue-600 underline">View</Link></td>
            </tr>
            <tr>
              <td className="py-2">#1005</td>
              <td className="py-2">ACME Corp</td>
              <td className="py-2">5</td>
              <td className="py-2">$1,120</td>
              <td className="py-2"><span className="text-red-600">Cancelled</span></td>
              <td className="py-2"><Link href="/seller/dashboard/orders/1005" className="text-blue-600 underline">View</Link></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
