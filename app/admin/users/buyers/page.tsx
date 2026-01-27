"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function AdminBuyersPage() {
  const [page, setPage] = useState(1);
  const size = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users", "buyer", page, size],
    queryFn: async () => {
      const resp = await api.get(`/users`, {
        params: { role: "buyer", page, size },
      });
      return resp.data;
    },
    // keepPreviousData is omitted to satisfy current TypeScript types for TanStack Query v5
  });

  console.log("here is the data concoled", data);

  const users = data?.data?.items || [];
  // backend returns pagination object under data.pagination
  const pagination = data?.data?.pagination || {};
  const total = pagination.totalItems || 0;

  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Buyers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage buyer accounts and approvals.
          </p>
        </div>
        <div>
          <Link
            href="/admin/approvals/buyers"
            className="text-sm text-[#7c3aed]"
          >
            View Approvals
          </Link>
        </div>
      </header>

      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">
            Failed to load buyers
          </div>
        ) : (
          <>
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-sm text-gray-600">Name</th>
                  <th className="px-4 py-3 text-sm text-gray-600">Email</th>
                  <th className="px-4 py-3 text-sm text-gray-600">Verified</th>
                  <th className="px-4 py-3 text-sm text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((b: any) => (
                  <tr key={b.id} className="border-t">
                    <td className="px-4 py-3">{b.name}</td>
                    <td className="px-4 py-3">{b.email}</td>
                    <td className="px-4 py-3">
                      {b.is_varified ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3">
                      {" "}
                      <Link
                        href={`/admin/users/buyers/${b.id}`}
                        className="text-sm text-[#7c3aed]"
                      >
                        View
                      </Link>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                Total: {total}
              </div>
              <div className="space-x-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-2">Page {page}</span>
                <button
                  disabled={page >= Math.ceil((total || 0) / size)}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
