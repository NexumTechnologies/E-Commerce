"use client";

import React from "react";
import Link from "next/link";

export default function BuyerBrowseProducts() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Browse Products</h1>
          <p className="mt-1 text-sm text-slate-600">Products uploaded by sellers. Use filters to narrow results.</p>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Widget A</h3>
          <p className="text-sm text-slate-500 mt-1">Price: $10 • MOQ: 10</p>
          <p className="text-sm text-slate-500 mt-1">Seller: Acme Widgets</p>
          <div className="mt-3 flex gap-2">
            <Link href="/buyer/dashboard/browse-products/1" className="px-3 py-1 border rounded">View</Link>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">Add to Cart</button>
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Gizmo B</h3>
          <p className="text-sm text-slate-500 mt-1">Price: $25 • MOQ: 5</p>
          <p className="text-sm text-slate-500 mt-1">Seller: Beta Trading</p>
          <div className="mt-3 flex gap-2">
            <Link href="/buyer/dashboard/browse-products/2" className="px-3 py-1 border rounded">View</Link>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">Add to Cart</button>
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Component C</h3>
          <p className="text-sm text-slate-500 mt-1">Price: $5 • MOQ: 50</p>
          <p className="text-sm text-slate-500 mt-1">Seller: Parts Co</p>
          <div className="mt-3 flex gap-2">
            <Link href="/buyer/dashboard/browse-products/3" className="px-3 py-1 border rounded">View</Link>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">Add to Cart</button>
          </div>
        </div>
      </section>
    </div>
  );
}
