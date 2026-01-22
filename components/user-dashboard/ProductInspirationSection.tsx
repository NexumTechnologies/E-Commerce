"use client";

import ProductCard from "@/components/ui/ProductCard";

interface Product {
  id: string;
  name: string;
  rating: number;
  discountPrice: string;
  cutPrice: string;
  image?: string;
  reviews?: number;
  discount?: number;
}

export default function ProductInspirationSection() {
  const products: Product[] = [
    {
      id: "1",
      name: "Apple Watch Series 9",
      rating: 4.9,
      discountPrice: "16,000 EGP",
      cutPrice: "20,000 EGP",
      image: "/dummy-product.png",
      reviews: 1240,
      discount: 20,
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
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-purple-100/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
          Get Product Inspiration
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image || "/dummy-product.png"}
            discountPrice={product.discountPrice}
            cutPrice={product.cutPrice}
            rating={product.rating}
            reviews={product.reviews}
            discount={product.discount}
          />
        ))}
      </div>
    </div>
  );
}
