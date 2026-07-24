"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationItem = number | "ellipsis";

type CompactPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
};

function buildPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 1 && page < totalPages) {
      pages.add(page);
    }
  }

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
  }

  const sortedPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);

  const items: PaginationItem[] = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];

    if (index > 0 && previousPage && page - previousPage > 1) {
      items.push("ellipsis");
    }

    items.push(page);
  });

  return items;
}

export default function CompactPagination({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel = "Prev",
  nextLabel = "Next",
}: CompactPaginationProps) {
  const paginationItems = buildPaginationItems(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-12 flex justify-center">
      <nav
        aria-label="Pagination"
        className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-[1.75rem] border border-gray-100 bg-white px-3 py-3 shadow-sm"
      >
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="flex h-11 min-w-11 items-center justify-center gap-1 rounded-2xl border border-gray-200 px-3 text-sm font-semibold text-slate-600 transition-all hover:border-blue hover:text-blue disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{previousLabel}</span>
        </button>

        {paginationItems.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="flex h-11 min-w-8 items-center justify-center text-sm font-semibold text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={currentPage === item ? "page" : undefined}
              className={`flex h-11 min-w-11 items-center justify-center rounded-2xl border px-3 text-sm font-semibold transition-all ${
                currentPage === item
                  ? "border-blue bg-blue text-white shadow-lg shadow-blue/20"
                  : "border-gray-200 text-slate-600 hover:border-blue hover:text-blue"
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="flex h-11 min-w-11 items-center justify-center gap-1 rounded-2xl border border-gray-200 px-3 text-sm font-semibold text-slate-600 transition-all hover:border-blue hover:text-blue disabled:cursor-not-allowed disabled:opacity-35"
        >
          <span className="hidden sm:inline">{nextLabel}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}




