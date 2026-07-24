"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useI18n } from "@/components/LanguageProvider";
import { translateDashboard } from "@/lib/dashboard-i18n";

type SellerCategory = {
  id?: number | string;
  _id?: number | string;
  name?: string;
  description?: string | null;
  image_url?: string | string[] | null;
};

function getCategoryImageUrl(value: unknown) {
  if (Array.isArray(value)) {
    const first = value.find((entry) => typeof entry === "string" && entry.trim().length > 0);
    return first ? String(first) : "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return "";
}

function getCategoryInitials(name?: string) {
  if (!name) return "CT";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function SellerCategoriesPage() {
  const { dir, locale } = useI18n();
  const td = (key: string, vars?: Record<string, string | number>) =>
    translateDashboard(locale, key, vars);

  //========================= API CALLS ==========================//
  //==============================================================//
  const { data, isLoading, error } = useQuery({
    queryKey: ["seller-categories-all"],
    queryFn: async () => {
      const res = await api.get("/category", {
        params: { page: 1, size: 1000 },
      });
      return res.data;
    },
  });

  const categories: SellerCategory[] = data?.data?.items || data?.categories || data || [];
  const categoriesWithImages = categories.filter((item) => getCategoryImageUrl(item?.image_url)).length;

  if (isLoading) {
    return (
      <div className="p-6" dir={dir}>
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_45%,#f8fafc_100%)] px-6 py-8 sm:px-8">
            <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-3 h-10 w-56 animate-pulse rounded-2xl bg-slate-200" />
            <div className="mt-4 h-4 w-72 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:p-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[24px] border border-slate-200 bg-white"
              >
                <div className="aspect-[4/2.4] animate-pulse bg-slate-100" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{td("sellerCategories.failed")}</div>;
  }

  return (
    <div className="p-6" dir={dir}>
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <div className="border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(135deg,#f8fbff_0%,#ffffff_50%,#f8fafc_100%)] px-6 py-8 sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {td("sellerSidebar.categories")}
          </div>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-[2.1rem]">
                Organize your catalog with confidence
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]">
                Browse all marketplace categories in one clean view, with images where available, so it is easier to place products in the right section.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:w-auto">
              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                  Total Categories
                </div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">
                  {categories.length}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                  With Images
                </div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">
                  {categoriesWithImages}
                </div>
              </div>
            </div>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="px-6 py-16 sm:px-8">
            <div className="mx-auto max-w-md rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 w-7 text-slate-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 4.5h16.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75ZM3 15l4.72-4.72a.75.75 0 0 1 1.06 0L13.5 15l2.22-2.22a.75.75 0 0 1 1.06 0L21 17.25"
                  />
                </svg>
              </div>
              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                {td("sellerCategories.empty")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Categories will appear here once they are available in the marketplace.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {categories.map((item, index) => {
                const imageUrl = getCategoryImageUrl(item?.image_url);
                const hasImage = imageUrl.length > 0;
                const categoryName = item?.name || "Unnamed category";
                const categoryDescription =
                  typeof item?.description === "string" && item.description.trim().length > 0
                    ? item.description.trim()
                    : "No description added yet.";

                return (
                  <article
                    key={item.id ?? item._id ?? item.name ?? index}
                    className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_-28px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_28px_60px_-30px_rgba(37,99,235,0.35)]"
                  >
                    <div className="relative aspect-[4/2.5] overflow-hidden border-b border-slate-100 bg-[linear-gradient(135deg,#e0ecff_0%,#f8fbff_55%,#eef4ff_100%)]">
                      {hasImage ? (
                        <>
                          <img
                            src={imageUrl}
                            alt={categoryName}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/15 to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_35%),linear-gradient(145deg,#eff6ff_0%,#f8fafc_100%)]" />
                      )}

                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Live
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-semibold shadow-sm backdrop-blur ${
                          hasImage
                            ? "border-white/35 bg-white/15 text-white"
                            : "border-blue-100 bg-white text-blue-700"
                        }`}>
                          {hasImage ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 4.5h16.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75Z"
                              />
                              <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 15 4.72-4.72a.75.75 0 0 1 1.06 0L13.5 15l2.22-2.22a.75.75 0 0 1 1.06 0l3.72 3.72" />
                            </svg>
                          ) : (
                            getCategoryInitials(categoryName)
                          )}
                        </div>

                        <div className={`rounded-full px-3 py-1 text-[11px] font-medium shadow-sm ${
                          hasImage
                            ? "bg-white/90 text-slate-700"
                            : "border border-blue-100 bg-white text-blue-700"
                        }`}>
                          {hasImage ? "Image available" : "Visual pending"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-semibold leading-tight text-slate-900">
                            {categoryName}
                          </h2>
                          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                            Category #{index + 1}
                          </p>
                        </div>
                      </div>

                      <p className="line-clamp-2 min-h-[2.75rem] text-sm leading-6 text-slate-600">
                        {categoryDescription}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
