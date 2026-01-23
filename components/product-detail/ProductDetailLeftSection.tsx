"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

export default function ProductDetailLeftSection() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const productImages = [
    "/detail-product.jpg",
    "/detail-product-1.jpg",
    "/detail-product-2.jpg",
    "/detail-product-3.jpg",
    "/detail-product-4.jpg",
    "/detail-product-5.jpg",
  ];

  const productTitle =
    "Refurbished Apple Watch Series 9 GPS, 41mm Midnight Aluminum Case with S/M Midnight Sport Band";

  const THUMB_H = 97;
  const GAP = 16;
  const SCROLL_STEP = THUMB_H + GAP;

  const scrollUp = () => {
    galleryRef.current?.scrollBy({ top: -SCROLL_STEP, behavior: "smooth" });
  };

  const scrollDown = () => {
    galleryRef.current?.scrollBy({ top: SCROLL_STEP, behavior: "smooth" });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  return (
    <div className="w-full max-w-[717px]">
      {/* Desktop: Header with Back Icon and Product Title */}
      <div className="hidden lg:block bg-white rounded-2xl py-6 px-6 mb-6 shadow-xl border border-blue-100/50">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-purple-50 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-blue group-hover:text-blue transition-colors" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {productTitle}
          </h1>
        </div>
      </div>

      {/* Mobile: Single Carousel */}
      <div className="lg:hidden relative w-full h-[510px] bg-white rounded-2xl overflow-hidden mb-4 shadow-xl border border-blue-100/50">
        <Image
          src={productImages[selectedImage]}
          alt="Product image"
          fill
          className="object-contain object-center p-4"
        />
        {/* Back Arrow */}
        <Link
          href="/"
          className="absolute top-4 left-4 z-20 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-blue" />
        </Link>
        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center z-20 shadow-lg transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center z-20 shadow-lg transition-all"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
        {/* Wishlist Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center z-20 shadow-lg transition-all"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-2 rounded-full transition-all ${
                selectedImage === index
                  ? "w-8 bg-gradient-to-r from-blue to-blue-300"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Product Title */}
      <h1 className="lg:hidden text-xl font-bold text-gray-900 mb-6 leading-tight">
        {productTitle}
      </h1>

      {/* Desktop: Product Image Section */}
      <div className="hidden lg:flex gap-6">
        {/* Gallery Thumbnails */}
        <div
          className="relative w-[89px] shrink-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* TOP ARROW */}
          {isHovered && (
            <button
              onClick={scrollUp}
              className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white hover:bg-purple-50 rounded-full flex items-center justify-center z-30 shadow-lg border border-purple-100 transition-all"
              aria-label="Scroll thumbnails up"
            >
              <ChevronUp className="w-4 h-4 text-blue" />
            </button>
          )}

          <div
            ref={galleryRef}
            className="flex flex-col gap-4 overflow-y-auto scrollbar-hide"
            style={{
              maxHeight: "566px",
              paddingTop: "0px",
              paddingBottom: "34px",
            }}
          >
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative rounded-xl shrink-0 bg-white transition-all ${
                  selectedImage === index
                    ? "ring-2 ring-blue shadow-lg scale-105"
                    : "shadow-md hover:shadow-lg"
                }`}
                style={{
                  width: 89,
                  height: 97,
                }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50/30 overflow-hidden">
                  <div className="absolute inset-0 p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`Product thumbnail ${index + 1}`}
                        fill
                        className="object-contain object-center"
                      />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* BOTTOM ARROW */}
          {isHovered && (
            <button
              onClick={scrollDown}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white hover:bg-purple-50 rounded-full flex items-center justify-center z-30 shadow-lg border border-purple-100 transition-all"
              aria-label="Scroll thumbnails down"
            >
              <ChevronDown className="w-4 h-4 text-blue" />
            </button>
          )}
        </div>

        {/* Main Product Image */}
        <div className="relative w-[612px] h-[566px] bg-white rounded-2xl overflow-hidden shrink-0 shadow-xl border border-purple-100/50">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-purple-50/30" />
          <Image
            src={productImages[selectedImage]}
            alt="Main product image"
            fill
            className="object-contain object-center p-8"
          />

          {/* Wishlist Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-6 right-6 w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center z-10 shadow-xl transition-all hover:scale-110"
          >
            <Heart
              className={`w-6 h-6 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 -translate-y-1/2 left-6 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center z-10 shadow-xl transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 -translate-y-1/2 right-6 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center z-10 shadow-xl transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
