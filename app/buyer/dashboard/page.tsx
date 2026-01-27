"use client";

import React from "react";

export default function BuyerDashboardHome() {
  const buyerName = "XYZ Traders";
  // example status — use a plain string so equality checks are allowed by the TS compiler
  const accountStatus: string = "Pending"; // sample
  const statusClass =
    accountStatus === "Approved"
      ? "inline-block px-2 py-0.5 text-green-700 bg-green-50 rounded font-medium"
      : accountStatus === "Pending"
        ? "inline-block px-2 py-0.5 text-red-700 bg-red-50 rounded font-medium"
        : "inline-block px-2 py-0.5 text-yellow-700 bg-yellow-50 rounded font-medium";

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
          <div className="mt-2 text-2xl font-semibold">24</div>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Pending Orders</p>
          <div className="mt-2 text-2xl font-semibold">3</div>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Completed Orders</p>
          <div className="mt-2 text-2xl font-semibold">18</div>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Wishlist Items</p>
          <div className="mt-2 text-2xl font-semibold">6</div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">How buying works</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
          <li>Go to the Browse Products page to see listings from sellers.</li>
          <li>Filter by category, price, MOQ, or seller to narrow results.</li>
          <li>
            Open a product to view price, MOQ, lead time and limited seller
            info.
          </li>
          <li>
            Add the desired quantity to your cart and proceed to checkout.
          </li>
          <li>Complete the order; track status from the My Orders page.</li>
        </ol>
      </section>
    </div>
  );
}
