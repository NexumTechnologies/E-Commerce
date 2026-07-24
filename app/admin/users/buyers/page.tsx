"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import CompactPagination from "@/components/browse/CompactPagination";
import { useI18n } from "@/components/LanguageProvider";
import { translateDashboard } from "@/lib/dashboard-i18n";

type BuyerProfile = {
  profile_image?: string | null;
  verification_status?: string | null;
  approved_at?: string | null;
  created_at?: string | null;
};

type BuyerRow = {
  id: number;
  name: string;
  email: string;
  created_at?: string | null;
  is_varified?: boolean;
  ordersCount?: number;
  Buyer?: BuyerProfile;
};

type UsersResponse = {
  data?: {
    items?: BuyerRow[];
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

export default function AdminBuyersPage() {
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

  //========================= API CALLS ==========================//
  //==============================================================//
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users", "buyer", page, size, debouncedSearch],
    queryFn: async () => {
      const resp = await api.get(`/users`, {
        params: { role: "buyer", page, size, search: debouncedSearch },
      });
      return resp.data;
    },
  });


  const payload = data as UsersResponse | undefined;
  const rawUsers = payload?.data?.items ?? [];
  const pagination = payload?.data?.pagination;
  const users = rawUsers.filter((b) => {
    const verificationStatus = b.Buyer?.verification_status;
    if (statusFilter === "approved") return b.is_varified === true;
    if (statusFilter === "rejected") return verificationStatus === "rejected";
    if (statusFilter === "pending") {
      return b.is_varified !== true && verificationStatus !== "rejected";
    }
    return true;
  });

  const totalItems = pagination?.totalItems ?? rawUsers.length;
  const totalPages = pagination?.totalPages ?? Math.ceil(totalItems / size);
  const currentPage = pagination?.currentPage ?? page;  const start = totalItems === 0 ? 0 : (currentPage - 1) * size + 1;
  const end = totalItems === 0 ? 0 : start + users.length - 1;
  const total = totalItems;
  return (
    <div className="space-y-6" dir={dir}>
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{td("adminBuyers.title")}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {td("adminBuyers.subtitle")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="hidden sm:block text-xs text-gray-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {td("adminBuyers.totalBuyers", { total })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Link
                href="/admin/approvals/buyers"
                className="text-sm font-medium text-[#7c3aed] hover:text-[#5b21b6]"
              >
                {td("adminBuyers.viewApprovals")}
              </Link>
            </div>
            <div>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={td("common.searchByNameOrEmail")}
                className="px-3 py-2 border border-gray-200 rounded-lg w-64 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
              />
            </div>
          </div>
        </div>
      </header>

            <div className="p-4 bg-gray-50/60">
              {users.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  {td("adminBuyers.empty")}
                </div>
              ) : (
                <ul className="space-y-3">
                  {users.map((b) => (
                    <li
                      key={b.id}
                      className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-px hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-lg font-semibold text-indigo-700 overflow-hidden">
                          {b.Buyer?.profile_image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={b.Buyer.profile_image}
                              alt={b.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            initials(b.name)
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{b.name}</div>
                          <div className="text-sm text-gray-500">{b.email}</div>
                          <div className="mt-1 text-xs text-gray-500">
                            {td("adminBuyers.totalOrders")}
                            <span className="ml-1 font-medium text-gray-900">
                              {b.ordersCount ?? 0}
                            </span>
                          </div>
                            <div className="mt-1 text-xs text-gray-500">
                              Approval request Date:
                              <span className="ml-1 font-medium text-gray-900">
                              {formatDate(b.Buyer?.created_at ?? b.created_at)}
                              </span>
                            </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <div>
                          {b.Buyer?.verification_status === "rejected" ? (
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
                          href={`/admin/users/buyers/${b.id}`}
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

            <div className="p-4 flex flex-col gap-3 bg-white border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">{td("common.total", { total })}</div>
          </>
        )}
      </div>
    </div>
  );
}





