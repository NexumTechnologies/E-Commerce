"use client";

import ProductCard from "@/components/ui/ProductCard";
import {
  LayoutGrid,
  List,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { getSafeImageFromValue } from "@/lib/utils";
import { useI18n } from "@/components/LanguageProvider";
import CompactPagination from "@/components/browse/CompactPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ITEMS_PER_PAGE = 12;

type ProductRecord = {
  id?: string | number;
  name?: string;
  price?: string | number | null;
  customer_price?: string | number | null;
  image_url?: string | string[] | null;
  listing?: {
    display_price?: string | number | null;
  } | null;
  sub_category_id?: string | number | null;
  sub_sub_category_id?: string | number | null;
  SubCategory?: {
    id?: string | number | null;
  } | null;
  SubSubCategory?: {
    id?: string | number | null;
  } | null;
};
type BrowseProductCardItem = {
  id: string;
  name: string;
  image: string;
  discountPriceAmount: number;
  cutPrice: undefined;
  _subCategoryId: string;
  _subSubCategoryId: string;
  _numericPrice: number;
};

type SortKey = "recommended" | "latest" | "priceLowToHigh" | "priceHighToLow" | "rating";

//========================= API CALLS ==========================//
//==============================================================//
async function fetchBrowseProducts(
  categoryId: string | null,
  subCategoryId: string | null,
  subSubCategoryId: string | null,
  minPriceParam: string | null,
  maxPriceParam: string | null,
  page: number,
): Promise<{
  items: BrowseProductCardItem[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const endpoint = subCategoryId
    ? `/product/subcategory/${subCategoryId}`
    : categoryId
      ? `/product/category/${categoryId}`
      : "/product";

  const res = await api.get(endpoint, {
    params: {
      page,
      size: ITEMS_PER_PAGE,
      ...(subSubCategoryId ? { sub_sub_category_id: subSubCategoryId } : {}),
      ...(minPriceParam ? { minPrice: minPriceParam } : {}),
      ...(maxPriceParam ? { maxPrice: maxPriceParam } : {}),
    },
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const data = res.data;
  const pagination = data?.data?.pagination;
  const items =
    data?.data?.items ||
    data?.products ||
    data?.data ||
    data?.items ||
    data ||
    [];

  // Normalize into shape expected by ProductCard
  const normalized = items.map((product: ProductRecord) => {
    const image = getSafeImageFromValue(product.image_url, "/dummy-product.png");

    const basePrice = Number(product.price) || 0;
    const customerPriceRaw =
      product && product.customer_price != null
        ? Number(product.customer_price)
        : null;
    const listingPrice =
      customerPriceRaw != null && !Number.isNaN(customerPriceRaw)
        ? customerPriceRaw
        : product?.listing?.display_price != null &&
            !Number.isNaN(Number(product.listing.display_price))
          ? Number(product.listing.display_price)
          : basePrice;

    return {
      id: String(product.id),
      name: product.name || "Product",
      image,
      discountPriceAmount: listingPrice > 0 ? listingPrice : basePrice,
      cutPrice: undefined,
      _subCategoryId: String(product.sub_category_id ?? product.SubCategory?.id ?? ""),
      _subSubCategoryId: String(product.sub_sub_category_id ?? product.SubSubCategory?.id ?? ""),
      // Keep numeric values for client-side filtering/sorting
      _numericPrice: listingPrice || basePrice,
      // Optional fields (rating, reviews, discount, moq) can be wired later
    };
  });

  return {
    items: normalized,
    totalItems: pagination?.totalItems ?? normalized.length,
    totalPages:
      pagination?.totalPages ??
      Math.max(1, Math.ceil((pagination?.totalItems ?? normalized.length) / ITEMS_PER_PAGE)),
    currentPage: pagination?.currentPage ?? page,
  };
}

export default function BrowseContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const subCategoryId = searchParams.get("subcategory");
  const subSubCategoryId = searchParams.get("subsubcategory");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const resetKey = [categoryId, subCategoryId, subSubCategoryId, minPriceParam, maxPriceParam].join(":");

  return (
    <BrowseContentResults
      key={resetKey}
      categoryId={categoryId}
      subCategoryId={subCategoryId}
      subSubCategoryId={subSubCategoryId}
      minPriceParam={minPriceParam}
      maxPriceParam={maxPriceParam}
    />
  );
}

type BrowseContentResultsProps = {
  categoryId: string | null;
  subCategoryId: string | null;
  subSubCategoryId: string | null;
  minPriceParam: string | null;
  maxPriceParam: string | null;
};

function BrowseContentResults({
  categoryId,
  subCategoryId,
  subSubCategoryId,
  minPriceParam,
  maxPriceParam,
}: BrowseContentResultsProps) {
  const { dir, t } = useI18n();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortKey, setSortKey] = useState<SortKey>("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "browse-products",
      {
        categoryId,
        subCategoryId,
        subSubCategoryId,
        minPriceParam,
        maxPriceParam,
        currentPage,
      },
    ],
    queryFn: () =>
      fetchBrowseProducts(
        categoryId,
        subCategoryId,
        subSubCategoryId,
        minPriceParam,
        maxPriceParam,
        currentPage,
      ),
  });

  const products = data?.items ?? [];
  const sortBy = t(`browse.${sortKey}` as const);

  const sortedProducts = [...products].sort((left, right) => {
    const leftPrice = Number(left._numericPrice) || 0;
    const rightPrice = Number(right._numericPrice) || 0;

    if (sortKey === "priceLowToHigh") {
      return leftPrice - rightPrice;
    }

    if (sortKey === "priceHighToLow") {
      return rightPrice - leftPrice;
    }

    return 0;
  });

  const totalPages = Math.max(1, data?.totalPages ?? 1);
  const activePage = data?.currentPage ?? currentPage;
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const currentProducts = sortedProducts;
  const totalItems = data?.totalItems ?? products.length;

  const sortOptions: SortKey[] = [
    "recommended",
    "latest",
    "priceLowToHigh",
    "priceHighToLow",
    "rating",
  ];

  return (
    <div className="min-w-0 flex-1" dir={dir}>
      {/* Top Bar */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">
            {isLoading ? (
              t("browse.loadingProducts")
            ) : error ? (
              t("browse.failedToLoadProducts")
            ) : sortedProducts.length ? (
              <span>
                {t("browse.showingRange", {
                  start: startIndex + 1,
                  end: Math.min(startIndex + currentProducts.length, totalItems),
                  count: totalItems,
                })}
              </span>
            ) : (
              t("browse.noProductsFound")
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{t("browse.sortBy")}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue/20">
                  {sortBy}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-50 bg-white border border-gray-100 rounded-xl shadow-xl p-1 z-50"
              >
                {sortOptions.map((optionKey) => (
                  <DropdownMenuItem
                    key={optionKey}
                    onClick={() => setSortKey(optionKey)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                      sortKey === optionKey
                        ? "bg-blue/5 text-blue font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {t(`browse.${optionKey}` as const)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center bg-gray-50 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-blue shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-blue shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {isLoading && (
          <div className="col-span-full text-center text-gray-500">
            {t("browse.loadingProducts")}
          </div>
        )}
        {error && !isLoading && (
          <div className="col-span-full text-center text-red-500">
            {t("browse.failedToLoadProducts")}
          </div>
        )}
        {!isLoading && !error && !currentProducts.length && (
          <div className="col-span-full text-center text-gray-500">
            {t("browse.noProductsFound")}
          </div>
        )}
        {!isLoading &&
          !error &&
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              className={viewMode === "list" ? "flex flex-row h-auto" : ""}
            />
          ))}
      </div>

      {/* Pagination */}
      {sortedProducts.length > 0 && totalPages > 1 && (
        <CompactPagination
          currentPage={activePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}




