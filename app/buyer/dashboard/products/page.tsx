"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

type CategoryOption = {
  id: number;
  name: string;
};

type ProductCategory = {
  name?: string;
};

type Product = {
  id: number;
  name: string;
  description?: string | null;
  price?: number | string;
  quantity?: number | string;
  category_id?: number;
  is_active?: boolean;
  image_url?: string | string[] | null;
  Category?: ProductCategory;
};

type ProductsResponse =
  | {
      data?: { items?: Product[] };
      products?: Product[];
    }
  | Product[];

type CategoriesResponse =
  | {
      data?: { items?: CategoryOption[] };
      categories?: CategoryOption[];
    }
  | CategoryOption[];

function getProducts(payload: unknown): Product[] {
  const data = payload as ProductsResponse;
  if (Array.isArray(data)) return data;
  return data?.data?.items ?? data?.products ?? [];
}

function getCategories(payload: unknown): CategoryOption[] {
  const data = payload as CategoriesResponse;
  if (Array.isArray(data)) return data;
  return data?.data?.items ?? data?.categories ?? [];
}

export default function BuyerProductsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category_id: "",
    image_urls: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["buyer-products"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/product/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const products = getProducts(data);

  const { data: categoriesData } = useQuery({
    queryKey: ["buyer-categories-options"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const categories = getCategories(categoriesData);

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");
      const res = await api.delete(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      setSelectedProduct(null);
      setSelectedImageIndex(0);
      queryClient.invalidateQueries({ queryKey: ["buyer-products"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        quantity: Number(form.quantity),
        category_id: Number(form.category_id),
        image_url:
          uploadedUrls.length > 0
            ? uploadedUrls
            : form.image_urls
                .split(",")
                .map((u) => u.trim())
                .filter(Boolean),
      };

      const res = await api.post("/product", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      setIsModalOpen(false);
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category_id: "",
        image_urls: "",
      });
      setUploadedUrls([]);
      queryClient.invalidateQueries({ queryKey: ["buyer-products"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const payload: {
        name: string;
        description: string;
        price: number;
        quantity: number;
        category_id: number;
        image_url?: string[];
      } = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        quantity: Number(form.quantity),
        category_id: Number(form.category_id),
      };

      const urls =
        uploadedUrls.length > 0
          ? uploadedUrls
          : form.image_urls
              .split(",")
              .map((u) => u.trim())
              .filter(Boolean);

      if (urls.length > 0) payload.image_url = urls;

      const res = await api.put(`/product/${editingProductId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      setIsModalOpen(false);
      setEditingProductId(null);
      setFormMode("create");
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category_id: "",
        image_urls: "",
      });
      setUploadedUrls([]);
      queryClient.invalidateQueries({ queryKey: ["buyer-products"] });
    },
  });

  const openCreate = () => {
    setFormMode("create");
    setEditingProductId(null);
    setForm({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category_id: "",
      image_urls: "",
    });
    setUploadedUrls([]);
    setIsModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setFormMode("edit");
    setEditingProductId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: String(product.price ?? ""),
      quantity: String(product.quantity ?? ""),
      category_id: String(product.category_id ?? ""),
      image_urls: Array.isArray(product.image_url)
        ? product.image_url.join(", ")
        : product.image_url
          ? String(product.image_url)
          : "",
    });
    setUploadedUrls([]);
    setIsModalOpen(true);
  };

  const imagesForSelected = (() => {
    if (!selectedProduct) return [];
    const raw = selectedProduct.image_url;
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string" && raw.trim()) return [raw];
    return [];
  })();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Products</h1>
          <p className="mt-1 text-sm text-slate-600">
            Upload products as a buyer. New products are pending until admin
            approval.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center rounded-md bg-blue px-4 py-2 text-white text-sm font-medium"
        >
          Add product
        </button>
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
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2 pr-4">Stock</th>
                  <th className="py-2 pr-0 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => {
                  const isApproved = Boolean(product.is_active);

                  return (
                    <tr key={product.id} className="align-top">
                      <td className="py-2 pr-4 max-w-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProduct(product);
                            setSelectedImageIndex(0);
                          }}
                          className="font-medium text-slate-900 truncate hover:underline text-left"
                        >
                          {product.name}
                        </button>
                      </td>
                      <td className="py-2 pr-4 text-xs text-slate-700">
                        {product.Category?.name || "-"}
                      </td>
                      <td className="py-2 pr-4">
                        {isApproved ? (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-700">
                            Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600">
                            Pending
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
                            onClick={() => openEdit(product)}
                            className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium border-slate-300 text-slate-700 hover:bg-slate-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteMutation.mutate(product.id)}
                            className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium border-red-300 text-red-700 hover:bg-red-50"
                          >
                            Delete
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

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-3xl rounded-xl bg-white shadow-lg p-5">
            <div className="flex items-start justify-between mb-4 gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {selectedProduct.name}
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Product details
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
                {!imagesForSelected.length ? (
                  <div className="w-full aspect-square rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                    No image available
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-full aspect-square rounded-lg bg-slate-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagesForSelected[selectedImageIndex]}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {imagesForSelected.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {imagesForSelected.map((img: string, index: number) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedImageIndex(index)}
                            className={`w-full aspect-square rounded-md bg-slate-100 overflow-hidden border ${
                              index === selectedImageIndex
                                ? "border-blue"
                                : "border-transparent"
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img}
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="md:col-span-2 space-y-3 text-sm">
                {selectedProduct.description && (
                  <div>
                    <div className="text-xs font-semibold text-slate-600">
                      Description
                    </div>
                    <div className="text-slate-900 mt-1">
                      {selectedProduct.description}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <div className="text-xs text-slate-500">Price</div>
                    <div className="font-semibold text-slate-900">
                      {selectedProduct.price} AED
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-xs text-slate-500">Stock</div>
                    <div className="font-semibold text-slate-900">
                      {selectedProduct.quantity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-lg p-5">
            <div className="flex items-start justify-between mb-4 gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {formMode === "create" ? "Add product" : "Edit product"}
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {formMode === "create"
                    ? "Fill in the details to create a product."
                    : "Update your product details."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Category
                </label>
                <select
                  value={form.category_id}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category_id: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Price
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Quantity
                </label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, quantity: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-600">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2 min-h-[90px]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-600">
                  Image URLs (comma separated)
                </label>
                <input
                  value={form.image_urls}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image_urls: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                />
                {uploading && (
                  <p className="mt-1 text-[11px] text-slate-500">
                    Uploading...
                  </p>
                )}
                {uploadedUrls.length > 0 && (
                  <p className="mt-1 text-[11px] text-emerald-700">
                    Uploaded: {uploadedUrls.length} file(s)
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="inline-flex items-center rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={createMutation.isPending || updateMutation.isPending}
                onClick={() => {
                  if (formMode === "create") createMutation.mutate();
                  else updateMutation.mutate();
                }}
                className="inline-flex items-center rounded-md bg-blue px-4 py-2 text-white text-sm disabled:opacity-60"
              >
                {formMode === "create"
                  ? createMutation.isPending
                    ? "Creating..."
                    : "Create"
                  : updateMutation.isPending
                    ? "Saving..."
                    : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
