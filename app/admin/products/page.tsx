"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function AdminProductsPage() {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [priceInput, setPriceInput] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/product", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
  });

  const products =
    (data as any)?.data?.items || (data as any)?.products || (data as any)?.data || data || [];

  const updatePriceMutation = useMutation({
    mutationFn: async ({ id, display_price }: { id: number; display_price: number }) => {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/product/${id}/listing`,
        { display_price },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
      );
      return res.data;
    },
    onSuccess: () => {
      setEditingProduct(null);
      setPriceInput("");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  const toggleListingMutation = useMutation({
    mutationFn: async ({ id, is_listed }: { id: number; is_listed: boolean }) => {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/product/${id}/listing`,
        { is_listed },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  const openEdit = (product: any) => {
    const listingPrice = product.listing?.display_price ?? product.price;
    setEditingProduct(product);
    setPriceInput(listingPrice != null ? String(listingPrice) : "");
  };

  const handleSave = () => {
    if (!editingProduct) return;
    const next = Number(priceInput);
    if (!Number.isFinite(next) || next <= 0) return;
    updatePriceMutation.mutate({ id: editingProduct.id, display_price: next });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
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
                  <th className="py-2 pr-4">Price (shown to buyer)</th>
                  <th className="py-2 pr-4">Stock</th>
                  <th className="py-2 pr-0 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product: any) => {
                  const listing = product.listing;
                  const isListed = listing?.is_listed;
                  const listingPrice = listing?.display_price ?? product.price;

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
                          {listingPrice} AED
                        </span>
                        <div className="text-[11px] text-slate-400">
                          Base: {product.price} AED
                        </div>
                      </td>
                      <td className="py-2 pr-4 text-xs text-slate-700">
                        {product.quantity}
                      </td>
                      <td className="py-2 pr-0 text-right">
                        <div className="inline-flex flex-col items-end gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              toggleListingMutation.mutate({
                                id: product.id,
                                is_listed: !isListed,
                              })
                            }
                            className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium text-slate-700 border-slate-300 hover:bg-slate-50"
                          >
                            {isListed ? "Unlist" : "List product"}
                          </button>
                          <button
                            type="button"
                            onClick={() => openEdit(product)}
                            disabled={!isListed}
                            className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium border-blue-500 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Edit price
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

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Update Product Price
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Only the price can be changed here; all other details stay the
                  same.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setPriceInput("");
                }}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 text-sm">
              <p className="font-medium text-slate-900 truncate">
                {editingProduct.name}
              </p>
              <p className="text-xs text-slate-500">
                Base price: {editingProduct.price} AED
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <label className="block text-xs font-medium text-slate-700">
                Listed price (AED)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div className="mt-5 flex justify-end gap-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setPriceInput("");
                }}
                className="rounded-md border px-3 py-1.5 text-slate-600 hover:bg-slate-50"
                disabled={updatePriceMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700 disabled:opacity-60"
                disabled={updatePriceMutation.isPending}
              >
                {updatePriceMutation.isPending ? "Saving..." : "Save price"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
