"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

function initials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function SellerApprovalsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const size = 10;
  const queryClient = useQueryClient();

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-approvals", "seller", page, size, debouncedSearch],
    queryFn: async () => {
      const resp = await api.get(`/users`, {
        params: {
          role: "seller",
          page,
          size,
          search: debouncedSearch,
          is_varified: false,
        },
      });
      return resp.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (userId: number) => {
      await api.patch(`/users/${userId}/toggle-status`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-approvals", "seller"] });
    },
  });

  const users = data?.data?.items || [];
  const pagination = data?.data?.pagination || {};
  const total = pagination.totalItems || 0;
  const start = total === 0 ? 0 : (page - 1) * size + 1;
  const end = Math.min(page * size, total || 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Seller Approvals
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and approve sellers that are not yet verified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="hidden sm:block text-xs text-gray-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-100">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {total} pending sellers
            </span>
          </div>
          <div>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or email"
              className="px-3 py-2 border border-gray-200 rounded-lg w-64 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
            />
          </div>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {isLoading ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading pending sellers...</div>
        ) : error ? (
          <div className="p-6 text-center text-sm text-red-600">
            Failed to load seller approvals
          </div>
        ) : (
          <>
            <div className="p-4 border-b flex items-center justify-between bg-gray-50/60">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{start}</span>-
                <span className="font-medium">{end}</span> of
                <span className="font-medium"> {total}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Per page: {size}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50/60">
              {users.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  No sellers waiting for approval.
                </div>
              ) : (
                <ul className="space-y-3">
                  {users.map((s: any) => (
                    <li
                      key={s.id}
                      className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-lg font-semibold text-indigo-700 overflow-hidden">
                          {s.Seller?.profile_image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={s.Seller.profile_image}
                              alt={s.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            initials(s.name)
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{s.name}</div>
                          <div className="text-sm text-gray-500">{s.email}</div>
                          <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                            <span>
                              Products: <span className="font-medium text-gray-700">{s.productsCount ?? 0}</span>
                            </span>
                            <span className="inline-block h-1 w-1 rounded-full bg-gray-300" />
                            <span>
                              Orders received: <span className="font-medium text-gray-700">{s.ordersReceived ?? 0}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-100">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Not verified
                        </span>
                        <button
                          onClick={() => approveMutation.mutate(s.id)}
                          disabled={approveMutation.isPending}
                          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60"
                        >
                          {approveMutation.isPending ? "Approving..." : "Approve"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-4 flex items-center justify-between bg-white border-t border-gray-100">
              <div className="text-sm text-gray-600">Total: {total}</div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
                >
                  Prev
                </button>
                <span className="px-3 py-1 border rounded bg-gray-50 text-sm">
                  Page {page}
                </span>
                <button
                  disabled={page >= Math.ceil((total || 0) / size)}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
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
