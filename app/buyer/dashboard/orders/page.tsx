"use client";

import React from "react";
import Link from "next/link";

export default function BuyerOrdersPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
        <Link href="/buyer/dashboard/orders" className="px-4 py-2 border rounded-md">Refresh</Link>
      </header>

      <section className="mt-6 bg-white border rounded-lg p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="py-2">Order</th>
              <th className="py-2">Seller</th>
              <th className="py-2">Items</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">#2001</td>
              <td className="py-2">Acme Widgets</td>
              <td className="py-2">5</td>
              <td className="py-2">$50</td>
              <td className="py-2"><span className="text-yellow-600">Processing</span></td>
              <td className="py-2"><Link href="/buyer/dashboard/orders/2001" className="text-blue-600 underline">View</Link></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
