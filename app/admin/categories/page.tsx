"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import CompactPagination from "@/components/browse/CompactPagination";

type CategoryRow = {
  id?: number | string;
  _id?: number | string;
  name?: string;
  image_url?: string | string[] | null;
};

type CategoriesResponse = {
  data?: {
    items?: CategoryRow[];
    pagination?: {
      totalItems?: number;
      totalPages?: number;
      currentPage?: number;
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
      pageSize?: number;
    };
  };
  categories?: CategoryRow[];
};

//========================= API CALLS ==========================//
//==============================================================//
async function fetchCategories(page: number, size: number) {
  const res = await api.get(`/category`, {
    params: { page, size },
  });
  return res.data;
}

export default function AdminCategoriesPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: "", image_url: "" });
  const [uploadingImage, setUploadingImage] = useState(false);
  const size = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-categories", page, size],
    queryFn: () => fetchCategories(page, size),
  });

  const payload = data as CategoriesResponse | CategoryRow[] | undefined;
  const categories = Array.isArray(payload)
    ? payload
    : payload?.data?.items ?? payload?.categories ?? [];
  const pagination = Array.isArray(payload) ? undefined : payload?.data?.pagination;
  const totalItems = pagination?.totalItems ?? categories.length;
  const totalPages = Math.max(
    pagination?.totalPages ?? Math.ceil(totalItems / size) ?? 1,
    1,
  );
  const currentPage = pagination?.currentPage ?? page;
  const start = totalItems === 0 ? 0 : (currentPage - 1) * size + 1;
  const end = totalItems === 0 ? 0 : start + categories.length - 1;

  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post(`/category`, payload);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-categories"] }),
  }); 

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: any) => {
      const res = await api.put(`/category/${id}`, payload);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-categories"] }),
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const uploadCategoryImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", "categories");

    // Content-Type is handled automatically by the axios interceptor
    // (detects FormData and removes any preset JSON content-type so the
    // browser sets the correct multipart boundary).
    const res = await api.post("/upload/single", formData);

    const imageUrl =
      res.data?.url || res.data?.data?.url || res.data?.secure_url || "";
    return String(imageUrl || "").trim();
  };

  const getCategoryImageUrl = (value: unknown) => {
    if (Array.isArray(value)) {
      const first = value.find((url) => typeof url === "string" && url.trim().length > 0);
      return first ? String(first) : "";
    }
    if (typeof value === "string") return value;
    return "";
  };

  useEffect(() => {
    if (!editing) {
      setForm({ name: "", image_url: "" });
      return;
    }

    setForm({
      name: editing.name || "",
      image_url: getCategoryImageUrl(editing.image_url),
    });
  }, [editing]);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage product categories.
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg"
          >
            Add Category
          </button>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b bg-gray-50/60 p-4">
              <div className="text-sm text-gray-600">
                Showing {start}-{end} of {totalItems}
              </div>
              <div className="text-sm text-gray-500">Per page: {size}</div>
            </div>

            <div className="p-4">
              {categories.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  No categories found.
                </div>
              ) : (
                <ul className="divide-y">
                  {categories.map((c: any) => (
                    <li key={c.id ?? c._id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 overflow-hidden rounded-lg border bg-slate-50">
                          {getCategoryImageUrl(c.image_url) ? (
                            <img
                              src={getCategoryImageUrl(c.image_url)}
                              alt={c.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-sm text-gray-500">ID: {c.id ?? c._id}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditing(c);
                            setModalOpen(true);
                          }}
                          className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg"
                        >
                          Edit
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">Total: {totalItems}</div>
              <CompactPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>

      {modalOpen && (
        <div className="app-modal-overlay">
          <div className="app-modal-panel z-10 flex max-h-[calc(100dvh-2rem)] max-w-2xl flex-col">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-semibold">
                {editing ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500"
                disabled={uploadingImage || isSaving}
              >
                Close
              </button>
            </div>

            <div className="app-modal-scroll space-y-3 px-6 py-4">
              <div>
                <label className="text-sm">Name</label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Category Image</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer rounded border bg-slate-50 px-3 py-2 text-sm hover:bg-slate-100">
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingImage || isSaving}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setUploadingImage(true);
                        await new Promise((r) => setTimeout(r, 0));

                        try {
                          const imageUrl = await uploadCategoryImage(file);
                          if (!imageUrl) throw new Error("Upload did not return image URL");
                          setForm((prev) => ({ ...prev, image_url: imageUrl }));
                        } catch (err) {
                          alert((err as Error).message || "Image upload failed");
                        } finally {
                          setUploadingImage(false);
                          e.target.value = "";
                        }
                      }}
                    />
                  </label>
                  {form.image_url && (
                    <button
                      type="button"
                      className="rounded border px-3 py-2 text-sm"
                      onClick={() => setForm((prev) => ({ ...prev, image_url: "" }))}
                    >
                      Remove
                    </button>
                  )}
                </div>

                {form.image_url ? (
                  <div className="h-24 w-24 overflow-hidden rounded-lg border bg-slate-50">
                    <img src={form.image_url} alt="Category preview" className="h-full w-full object-cover" />
                  </div>
                ) : null}
              </div>

              <div className="pt-4 flex items-center gap-2">
                <button
                  onClick={async () => {
                    try {
                      const payload = {
                        name: form.name.trim(),
                        image_url: form.image_url.trim() || null,
                      };

                      if (editing) {
                        await updateMutation.mutateAsync({ id: editing.id ?? editing._id, payload });
                      } else {
                        await createMutation.mutateAsync(payload);
                      }
                      setModalOpen(false);
                    } catch (err) {
                      alert((err as Error).message || "Failed");
                    }
                  }}
                  disabled={uploadingImage || isSaving || !form.name.trim()}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-70"
                >
                  {(uploadingImage || isSaving) && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}
                  {uploadingImage ? "Uploading Image..." : isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  disabled={uploadingImage || isSaving}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




