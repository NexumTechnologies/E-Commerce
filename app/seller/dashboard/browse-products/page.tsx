"use client";

import React from "react";
import Link from "next/link";

export default function BrowseProductsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Browse Products</h1>
          <p className="mt-1 text-sm text-slate-600">Search and browse product listings visible to sellers.</p>
        </div>
        <Link href="/seller/dashboard/browse-products/add" className="px-4 py-2 bg-blue-600 text-white rounded-md">Add Product</Link>
      </header>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Sample Product 1</h3>
          <p className="text-sm text-slate-500 mt-1">$19.99 • Qty: 12</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Sample Product 2</h3>
          <p className="text-sm text-slate-500 mt-1">$29.99 • Qty: 5</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Sample Product 3</h3>
          <p className="text-sm text-slate-500 mt-1">$9.99 • Qty: 42</p>
        </div>
      </section>
    </div>
  );
}
