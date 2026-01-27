"use client";

import React from "react";

export default function BuyerProfilePage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
      </header>

      <section className="mt-6 bg-white border rounded-lg p-4">
        <div className="space-y-2 text-sm text-slate-700">
          <div><strong>Name:</strong> XYZ Traders</div>
          <div><strong>Email:</strong> buyer@example.com</div>
          <div><strong>Account status:</strong> Pending</div>
        </div>
      </section>
    </div>
  );
}
