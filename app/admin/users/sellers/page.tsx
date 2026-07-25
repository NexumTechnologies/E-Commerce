"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import CompactPagination from "@/components/browse/CompactPagination";
import { useI18n } from "@/components/LanguageProvider";
import { translateDashboard } from "@/lib/dashboard-i18n";

type SellerProfile = {
  profile_image?: string | null;
  verification_status?: string | null;
  approved_at?: string | null;
  created_at?: string | null;
};

type SellerRow = {
  id: number;
  name: string;
  email: string;
  created_at?: string | null;
  is_varified?: boolean;
  productsCount?: number;
  ordersReceived?: number;
  Seller?: SellerProfile;
};

type UsersResponse = {
  data?: {
    items?: SellerRow[];
    pagination?: {
      totalItems?: number;
      totalPages?: number;
      currentPage?: number;
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
      pageSize?: number;
    };
  };
};

function initials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return value;
  }
}

export default function AdminSellersPage() {
  const { dir, locale } = useI18n();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending" | "rejected">("all");
  const size = 10;
  const td = (key: string, vars?: Record<string, string | number>) =>
    translateDashboard(locale, key, vars);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users", "seller", page, size, debouncedSearch],
    queryFn: async () => {
      const resp = await api.get("/users", {
        params: { role: "seller", page, size, search: debouncedSearch },
      });
      return resp.data;
    },
  });

  const payload = data as UsersResponse | undefined;
  const rawUsers = payload?.data?.items ?? [];
  const pagination = payload?.data?.pagination;
  const users = rawUsers.filter((b) => {
    const verificationStatus = b.Seller?.verification_status;
    if (statusFilter === "approved") return verificationStatus === "approved" || b.is_varified === true;
    if (statusFilter === "rejected") return verificationStatus === "rejected";
    if (statusFilter === "pending") {
      return verificationStatus === "pending" || (b.is_varified !== true && verificationStatus !== "rejected");
    }
    return true;
  });

  const totalItems = pagination?.totalItems ?? rawUsers.length;
  const totalPages = Math.max(pagination?.totalPages ?? Math.ceil(totalItems / size) ?? 1, 1);
  const currentPage = pagination?.currentPage ?? page;
  const start = totalItems === 0 ? 0 : (currentPage - 1) * size + 1;
  const end = totalItems === 0 ? 0 : start + users.length - 1;
  const total = totalItems;

  return (
    <div className="space-y-6" dir={dir}>
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{td("adminSellers.title")}</h1>
          <p className="mt-1 text-sm text-gray-500">{td("adminSellers.subtitle")}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="hidden text-xs text-gray-500 sm:block">
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {td("adminSellers.totalSellers", { total })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Link
                href="/admin/approvals/sellers"
                className="text-sm font-medium text-[#7c3aed] hover:text-[#5b21b6]"
              >
                {td("adminSellers.viewApprovals")}
              </Link>
            </div>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={td("common.searchByNameOrEmail")}
              className="w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>
      </header>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        {isLoading ? (
          <div className="p-6 text-center">{td("common.loading")}</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{td("adminSellers.failed")}</div>
        ) : (
          <>
            <div className="flex flex-col gap-3 border-b bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">{td("common.showingRange", { start, end, total })}</div>
              <div className="flex flex-wrap items-center gap-2">
                {(["all", "approved", "pending", "rejected"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setPage(1);
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusFilter === status ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {status === "all"
                      ? td("common.all")
                      : status === "approved"
                        ? td("common.verified")
                        : status === "pending"
                          ? td("common.pending")
                          : td("common.rejected")}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50/60 p-4">
              {users.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">{td("adminSellers.empty")}</div>
              ) : (
                <ul className="space-y-3">
                  {users.map((b) => (
                    <li
                      key={b.id}
                      className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-px hover:shadow-md lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-lg font-semibold text-indigo-700">
                          {b.Seller?.profile_image ? (
                            <img
                              src={b.Seller.profile_image}
                              alt={b.name}
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            initials(b.name)
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{b.name}</div>
                          <div className="text-sm text-gray-500">{b.email}</div>
                          <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
                            <span>
                              {td("adminSellers.products")}
                              <span className="ml-1 font-medium text-gray-900">{b.productsCount ?? 0}</span>
                            </span>
                            <span>
                              {td("adminSellers.ordersReceived")}
                              <span className="ml-1 font-medium text-gray-900">{b.ordersReceived ?? 0}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:flex-1 lg:px-6">
                        <div className="text-xs text-gray-500">Approval request Date</div>
                        <div className="mt-1 text-sm font-medium text-gray-900">
                          {formatDate(b.Seller?.created_at ?? b.created_at)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 lg:shrink-0">
                        <div>
                          {b.Seller?.verification_status === "approved" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              {td("common.verified")}
                            </span>
                          ) : b.Seller?.verification_status === "rejected" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-red-100">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                              {td("common.rejected")}
                            </span>
                          ) : b.is_varified ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              {td("common.verified")}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-100">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                              {td("common.notVerified")}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/admin/users/sellers/${b.id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          {td("common.view")}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">{td("common.total", { total })}</div>
              <CompactPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
