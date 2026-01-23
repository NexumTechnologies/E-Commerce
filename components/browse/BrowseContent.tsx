"use client";

import ProductCard from "@/components/ui/ProductCard";
import { LayoutGrid, List, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  {
    id: "1",
    name: "Apple Watch Series 9",
    rating: 4.9,
    discountPrice: "16,000 EGP",
    cutPrice: "20,000 EGP",
    image: "/dummy-product.png",
    reviews: 1240,
    discount: 20,
    moq: "Min. Order: 5 pieces"
  },
  {
    id: "2",
    name: "Apple Watch Series 9",
    rating: 4.9,
    discountPrice: "16,000 EGP",
    cutPrice: "18,000 EGP",
    image: "/dummy-product.png",
    reviews: 892,
    discount: 11,
    moq: "Min. Order: 10 pieces"
  },
  {
    id: "3",
    name: "Apple Watch Series 9",
    rating: 4.9,
    discountPrice: "16,000 EGP",
    cutPrice: "22,000 EGP",
    image: "/dummy-product.png",
    reviews: 2156,
    discount: 27,
    moq: "Min. Order: 2 pieces"
  },
  {
    id: "4",
    name: "Apple Watch Series 9",
    rating: 4.9,
    discountPrice: "16,000 EGP",
    cutPrice: "19,000 EGP",
    image: "/dummy-product.png",
    reviews: 567,
    discount: 16,
    moq: "Min. Order: 50 pieces"
  },
  {
    id: "5",
    name: "Apple Watch Series 9",
    rating: 4.9,
    discountPrice: "16,000 EGP",
    cutPrice: "21,000 EGP",
    image: "/dummy-product.png",
    reviews: 3421,
    discount: 24,
    moq: "Min. Order: 1 piece"
  },
  {
    id: "6",
    name: "Apple Watch Series 9",
    rating: 4.9,
    discountPrice: "16,000 EGP",
    cutPrice: "17,000 EGP",
    image: "/dummy-product.png",
    reviews: 743,
    discount: 6,
    moq: "Min. Order: 100 pieces"
  },
  {
    id: "7",
    name: "Apple Watch Series 9",
    rating: 4.9,
    discountPrice: "16,000 EGP",
    cutPrice: "23,000 EGP",
    image: "/dummy-product.png",
    reviews: 1890,
    discount: 30,
    moq: "Min. Order: 5 pieces"
  },
  {
    id: "8",
    name: "Apple Watch Series 9",
    rating: 4.9,
    discountPrice: "16,000 EGP",
    cutPrice: "18,500 EGP",
    image: "/dummy-product.png",
    reviews: 1123,
    discount: 14,
    moq: "Min. Order: 20 pieces"
  },
];

const ITEMS_PER_PAGE = 6;

export default function BrowseContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Recommended");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const sortOptions = ["Recommended", "Latest", "Price: Low to High", "Price: High to Low", "Rating"];

  return (
    <div className="flex-1">
      {/* Top Bar */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-gray-900">{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, products.length)}</span> of {products.length} products
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue/20">
                  {sortBy}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white border border-gray-100 rounded-xl shadow-xl p-1 z-50">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                      sortBy === option ? "bg-blue/5 text-blue font-semibold" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {option}
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
      <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {currentProducts.map((product) => (
          <ProductCard 
            key={product.id}
            {...product}
            className={viewMode === "list" ? "flex flex-row h-auto" : ""}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-600 hover:border-blue hover:text-blue transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all font-bold ${
                  currentPage === i + 1 
                    ? "bg-blue text-white shadow-lg shadow-blue/20" 
                    : "border border-gray-100 text-gray-600 hover:border-blue hover:text-blue"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-600 hover:border-blue hover:text-blue transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

