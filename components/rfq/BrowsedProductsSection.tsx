"use client";

import ProductCard from "@/components/ui/ProductCard";

interface BrowsedProduct {
  id: number;
  name: string;
  image: string;
  suppliersCount: string;
  price?: string;
  discount?: number;
}

const products: BrowsedProduct[] = [
  {
    id: 1,
    name: "Apple Watch Series 9",
    image: "/top-deals-1.png",
    suppliersCount: "1,630",
    price: "30,000 EGP",
    discount: 15,
  },
  {
    id: 2,
    name: "Drone with Remote Control",
    image: "/top-deals-2.png",
    suppliersCount: "1,630",
    price: "25,000 EGP",
    discount: 20,
  },
  {
    id: 3,
    name: "Dirt Bike Motorcycle",
    image: "/top-deals-3.png",
    suppliersCount: "1,630",
    price: "45,000 EGP",
    discount: 12,
  },
  {
    id: 4,
    name: "Smartphone iPhone",
    image: "/top-deals-4.png",
    suppliersCount: "1,630",
    price: "35,000 EGP",
    discount: 18,
  },
  {
    id: 5,
    name: "Decorative Throw Pillow",
    image: "/top-deals-5.png",
    suppliersCount: "1,630",
    price: "5,000 EGP",
    discount: 10,
  },
  {
    id: 6,
    name: "Samsung Smart TV",
    image: "/top-ranking-1.png",
    suppliersCount: "1,630",
    price: "40,000 EGP",
    discount: 25,
  },
  {
    id: 7,
    name: "Food Storage Containers",
    image: "/top-ranking-2.png",
    suppliersCount: "1,630",
    price: "8,000 EGP",
    discount: 8,
  },
  {
    id: 8,
    name: "Apple Watch Pro",
    image: "/top-ranking-3.png",
    suppliersCount: "1,630",
    price: "32,000 EGP",
    discount: 22,
  },
];

export default function BrowsedProductsSection() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-purple-50/20 to-white py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#7c3aed] mb-8">
          Get Multiple Quotes for Products You Have Browsed
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <ProductCard
                id={product.id.toString()}
                name={product.name}
                image={product.image}
                discountPrice={product.price || "30,000 EGP"}
                discount={product.discount}
                moq={`${product.suppliersCount} suppliers`}
                showFavorite={false}
                showAddToCart={false}
              />
              <button className="absolute bottom-4 left-4 right-4 px-4 py-2 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 z-30">
                Get Quotes Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
