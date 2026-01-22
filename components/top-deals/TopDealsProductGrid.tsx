"use client";

import ProductCard from "@/components/ui/ProductCard";

interface Product {
  id: string;
  image: string;
  name?: string;
  price?: string;
  discountPrice?: string;
  cutPrice?: string;
  discount?: number;
  moq?: string;
}

interface TopDealsProductGridProps {
  products: Product[];
  marginTop?: string;
}

export default function TopDealsProductGrid({
  products,
  marginTop = "0",
}: TopDealsProductGridProps) {
  return (
    <section
      className="w-full bg-gradient-to-b from-gray-50 via-purple-50/20 to-white py-12 sm:py-16 lg:py-20"
      style={{ marginTop }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name || "Product"}
              image={product.image}
              discountPrice={product.discountPrice || product.price || "30,000 EGP"}
              cutPrice={product.cutPrice}
              discount={product.discount || 20}
              moq={product.moq || "MOQ: 1 Piece"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
