"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

function initials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function AdminSellersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const size = 10;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users", "seller", page, size, debouncedSearch],
    queryFn: async () => {
      const resp = await api.get(`/users`, {
        params: { role: "seller", page, size, search: debouncedSearch },
      });
      return resp.data;
    },
  });

  const users = data?.data?.items || [];
  const pagination = data?.data?.pagination || {};
  const total = pagination.totalItems || 0;
  const start = total === 0 ? 0 : (page - 1) * size + 1;
  const end = Math.min(page * size, total || 0);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Sellers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage seller accounts, profiles and approvals.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Link
              href="/admin/approvals/sellers"
              className="text-sm text-[#7c3aed]"
            >
              View Approvals
            </Link>
          </div>
          <div>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or email"
              className="px-3 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">
            Failed to load sellers
          </div>
        ) : (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {start}-{end} of {total}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Per page: {size}</span>
              </div>
            </div>

            <div className="p-4">
              <ul className="divide-y">
                {users.map((b: any) => (
                  <li
                    key={b.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700">
                        {b.Seller?.profile_image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={b.Seller.profile_image}
                            alt={b.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          initials(b.name)
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{b.name}</div>
                        <div className="text-sm text-gray-500">{b.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div>
                        {b.is_varified ? (
                          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm">
                            <svg
                              className="w-4 h-4 text-emerald-600"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20 6L9 17l-5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                            Not verified
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/admin/users/sellers/${b.id}`}
                        className="inline-flex items-center gap-2 text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
                      >
                        View
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">Total: {total}</div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-3 py-1 border rounded bg-gray-50">
                  Page {page}
                </span>
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
