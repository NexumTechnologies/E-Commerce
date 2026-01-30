"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function AdminProductsPage() {
  const queryClient = useQueryClient();
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    tone?: "success" | "error";
  } | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/product/admin", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
  });

  const products =
    (data as any)?.data?.items || (data as any)?.products || (data as any)?.data || data || [];

  console.log("Products data:", data);

  const toggleListingMutation = useMutation({
    mutationFn: async ({
      id,
      is_listed,
      display_price,
    }: {
      id: number;
      is_listed: boolean;
      display_price?: number;
    }) => {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/product/${id}/listing`,
        display_price !== undefined ? { is_listed, display_price } : { is_listed },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
      );
      return res.data;
    },
    onSuccess: (_data, variables: any) => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      const listed = Boolean(variables?.is_listed);
      setToast({
        show: true,
        message: listed ? "Product listed for customers" : "Product unlisted",
        tone: "success",
      });
      setTimeout(() => setToast(null), 2500);
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {toast?.show && (
        <div className="fixed top-6 right-6 z-50">
          <div
            className={`flex items-center gap-2 rounded-lg px-4 py-2 shadow-lg text-sm font-medium ${
              toast.tone === "error"
                ? "bg-red-600 text-white"
                : "bg-emerald-600 text-white"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Product Management</h1>
          <p className="mt-1 text-sm text-slate-600">
            View all seller products and adjust the price shown to buyers.
          </p>
        </div>
      </header>

      <section className="bg-white border rounded-xl p-4 shadow-sm">
        {isLoading ? (
          <div className="py-8 text-center text-sm text-slate-500">
            Loading products...
          </div>
        ) : error ? (
          <div className="py-8 text-center text-sm text-red-500">
            Failed to load products.
          </div>
        ) : !products.length ? (
          <div className="py-8 text-center text-sm text-slate-500">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500 border-b">
                <tr>
                  <th className="py-2 pr-4">Product</th>
                  <th className="py-2 pr-4">Seller</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Base Price</th>
                  <th className="py-2 pr-4">Stock</th>
                  <th className="py-2 pr-0 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product: any) => {
                  const listing = product.listing;
                  const isListed = listing?.is_listed;

                  return (
                    <tr key={product.id} className="align-top">
                      <td className="py-2 pr-4 max-w-xs">
                        <div className="font-medium text-slate-900 truncate">
                          {product.name}
                        </div>
                      </td>
                      <td className="py-2 pr-4">
                        <div className="text-xs text-slate-900">
                          {product.User?.name || "Seller"}
                        </div>
                        {product.User?.email && (
                          <div className="text-[11px] text-slate-500">
                            {product.User.email}
                          </div>
                        )}
                      </td>
                      <td className="py-2 pr-4 text-xs text-slate-700">
                        {product.Category?.name || "-"}
                      </td>
                      <td className="py-2 pr-4">
                        {isListed ? (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-700">
                            Listed
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600">
                            Not listed
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-4">
                        <span className="font-semibold text-slate-900">
                          {product.price} AED
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-xs text-slate-700">
                        {product.quantity}
                      </td>
                      <td className="py-2 pr-0 text-right">
                        <div className="inline-flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (isListed) {
                                toggleListingMutation.mutate({
                                  id: product.id,
                                  is_listed: false,
                                });
                              } else {
                                // Let backend compute display price (percentage margin or base price)
                                toggleListingMutation.mutate({
                                  id: product.id,
                                  is_listed: true,
                                });
                              }
                            }}
                            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium border transition-colors ${
                              isListed
                                ? "border-red-500 text-red-600 hover:bg-red-50"
                                : "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                            }`}
                          >
                            {isListed ? "Unlist" : "List product"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  );
}
