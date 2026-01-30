"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function AdminListedProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const { data: percentageData } = useQuery({
    queryKey: ["listing-percentage"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/product/listing/percentage", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
  });

  const currentPercentage: number | null =
    (percentageData as any)?.data?.percentage ?? null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-listed-products"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/product", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
  });

  const allProducts =
    (data as any)?.data?.items ||
    (data as any)?.products ||
    (data as any)?.data ||
    data ||
    [];

  const products = allProducts.filter((p: any) => p.listing?.is_listed);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Listed Products</h1>
          <p className="mt-1 text-sm text-slate-600">
            These products are currently listed for customers with an
            admin-defined price.
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
            No listed products yet. Use the All Products page to list products.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500 border-b">
                <tr>
                  <th className="py-2 pr-4">Product</th>
                  <th className="py-2 pr-4">Seller</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Price (shown to customer)</th>
                  <th className="py-2 pr-4">Base Price</th>
                  <th className="py-2 pr-4">Margin (%)</th>
                  <th className="py-2 pr-4">Stock</th>
                  <th className="py-2 pr-0 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product: any) => {
                  const listing = product.listing;
                  const basePrice = Number(product.price) || 0;

                  let listingPrice: number;
                  if (currentPercentage != null && basePrice > 0) {
                    const factor = 1 + currentPercentage / 100;
                    listingPrice = Math.round(basePrice * factor * 100) / 100;
                  } else if (listing?.display_price != null) {
                    listingPrice = Number(listing.display_price) || basePrice;
                  } else {
                    listingPrice = basePrice;
                  }
                  const marginPercent =
                    basePrice > 0
                      ? ((listingPrice - basePrice) / basePrice) * 100
                      : null;

                  const images: string[] = Array.isArray(product.image_url)
                    ? product.image_url
                    : product.image_url
                      ? [product.image_url]
                      : [];
                  const primaryImage = images[0];

                  return (
                    <tr key={product.id} className="align-top">
                      <td className="py-2 pr-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-md bg-slate-100 overflow-hidden flex-shrink-0">
                            {primaryImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={primaryImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-900 truncate">
                              {product.name}
                            </div>
                            {product.description && (
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {product.description}
                              </p>
                            )}
                          </div>
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
                        <span className="font-semibold text-slate-900">
                          {listingPrice} AED
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-xs text-slate-700">
                        {product.price} AED
                      </td>
                      <td className="py-2 pr-4 text-xs text-slate-700">
                        {marginPercent != null
                          ? `${marginPercent.toFixed(2)}%`
                          : "-"}
                      </td>
                      <td className="py-2 pr-4 text-xs text-slate-700">
                        {product.quantity}
                      </td>
                      <td className="py-2 pr-0 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-3xl rounded-xl bg-white shadow-lg p-5">
            <div className="flex items-start justify-between mb-4 gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {selectedProduct.name}
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Detailed view of this listed product, including seller,
                  pricing and stock.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                {(() => {
                  const imgs: string[] = Array.isArray(
                    selectedProduct.image_url,
                  )
                    ? selectedProduct.image_url
                    : selectedProduct.image_url
                      ? [selectedProduct.image_url]
                      : [];

                  if (!imgs.length) {
                    return (
                      <div className="w-full aspect-square rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                        No image available
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-2">
                      <div className="w-full aspect-square rounded-lg bg-slate-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imgs[0]}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {imgs.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                          {imgs.map((img, index) => (
                            <div
                              key={index}
                              className="w-full aspect-square rounded-md bg-slate-100 overflow-hidden"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={img}
                                alt={`${selectedProduct.name} ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
              <div className="md:col-span-2 space-y-3 text-sm">
                {selectedProduct.description && (
                  <div>
                    <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Description
                    </h3>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedProduct.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Seller
                    </h3>
                    <p className="text-sm text-slate-900">
                      {selectedProduct.User?.name || "Seller"}
                    </p>
                    {selectedProduct.User?.email && (
                      <p className="text-[11px] text-slate-500">
                        {selectedProduct.User.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Category
                    </h3>
                    <p className="text-sm text-slate-900">
                      {selectedProduct.Category?.name || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Customer price
                    </h3>
                    <p className="text-sm font-semibold text-slate-900">
                      {(() => {
                        const base = Number(selectedProduct.price) || 0;
                        if (currentPercentage != null && base > 0) {
                          const factor = 1 + currentPercentage / 100;
                          return `${Math.round(base * factor * 100) / 100} AED`;
                        }
                        const dp = selectedProduct.listing?.display_price;
                        const effective = dp != null ? Number(dp) || base : base;
                        return `${effective} AED`;
                      })()}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Buyer (seller) price
                    </h3>
                    <p className="text-sm text-slate-900">
                      {selectedProduct.price} AED
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Stock
                    </h3>
                    <p className="text-sm text-slate-900">
                      {selectedProduct.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
