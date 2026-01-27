"use client";

import React from "react";
import Link from "next/link";

export default function DocumentsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
          <p className="mt-1 text-sm text-slate-600">Upload and manage verification documents for your seller account.</p>
        </div>
        <Link href="/seller/dashboard/documents/upload" className="px-4 py-2 bg-green-600 text-white rounded-md">Upload Document</Link>
      </header>

      <section className="mt-6 bg-white border rounded-lg p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="py-2">Document</th>
              <th className="py-2">Type</th>
              <th className="py-2">Uploaded</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">Business Registration.pdf</td>
              <td className="py-2">Registration</td>
              <td className="py-2">2026-01-15</td>
              <td className="py-2"><span className="text-green-600">Verified</span></td>
              <td className="py-2"><Link href="#" className="text-blue-600 underline">View</Link></td>
            </tr>
            <tr>
              <td className="py-2">ID-Card.jpg</td>
              <td className="py-2">Identity</td>
              <td className="py-2">2026-01-20</td>
              <td className="py-2"><span className="text-yellow-600">Pending</span></td>
              <td className="py-2"><Link href="#" className="text-blue-600 underline">View</Link></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
