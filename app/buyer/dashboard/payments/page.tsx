"use client";

import React from "react";

export default function PaymentsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
      </header>

      <section className="mt-6 bg-white border rounded-lg p-4">
        <p className="text-sm text-slate-600">Recent payments and payment methods will appear here.</p>
      </section>
    </div>
  );
}
