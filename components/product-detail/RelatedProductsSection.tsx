"use client";

import ProductCard from "@/components/ui/ProductCard";

export default function RelatedProductsSection() {
  const relatedProducts = [
    {
      id: "1",
      title: "Apple Watch Series 9",
      price: "30,000 EGP",
      cutPrice: "35,000 EGP",
      moq: "MOQ: 1 Piece",
      image: "/dummy-product.png",
      discount: 14,
      rating: 4.8,
      reviews: 892,
    },
    {
      id: "2",
      title: "Apple Watch Series 9",
      price: "30,000 EGP",
      cutPrice: "38,000 EGP",
      moq: "MOQ: 1 Piece",
      image: "/dummy-product.png",
      discount: 21,
      rating: 4.9,
      reviews: 1240,
    },
    {
      id: "3",
      title: "Apple Watch Series 9",
      price: "30,000 EGP",
      cutPrice: "40,000 EGP",
      moq: "MOQ: 1 Piece",
      image: "/dummy-product.png",
      discount: 25,
      rating: 4.7,
      reviews: 567,
    },
  ];

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.title}
            image={product.image}
            discountPrice={product.price}
            cutPrice={product.cutPrice}
            moq={product.moq}
            discount={product.discount}
            rating={product.rating}
            reviews={product.reviews}
          />
        ))}
      </div>
    </div>
  );
}
