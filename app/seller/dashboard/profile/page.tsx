"use client";

import React from "react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="mt-1 text-sm text-slate-600">Edit your seller profile and business details.</p>
        </div>
        <Link href="/seller/dashboard/profile/edit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Edit Profile</Link>
      </header>

      <section className="mt-6 bg-white border rounded-lg p-4">
        <div className="space-y-2">
          <div><strong>Business name:</strong> Acme Widgets</div>
          <div><strong>Business type:</strong> Manufacturer</div>
          <div><strong>Business email:</strong> seller@example.com</div>
        </div>
      </section>
    </div>
  );
}
