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
];

export default function FrequentlyBoughtTogetherSection() {
  return (
    <div className="w-full mt-8">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-orange">
        Frequently Bought Together
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
