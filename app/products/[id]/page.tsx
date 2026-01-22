import ProductDetailLeftSection from "@/components/product-detail/ProductDetailLeftSection";
import ProductDetailsSection from "@/components/product-detail/ProductDetailsSection";
import ProductDetailRightSection from "@/components/product-detail/ProductDetailRightSection";
import ProtectionsSection from "@/components/product-detail/ProtectionsSection";
import FrequentlyBoughtTogetherSection from "@/components/product-detail/FrequentlyBoughtTogetherSection";
import SuppliersPopularProductsSection from "@/components/product-detail/SuppliersPopularProductsSection";

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-purple-50/20 to-white">
      {/* Main Section */}
      <section className="w-full py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Two Column Layout */}
          <div className="hidden lg:flex gap-6 lg:gap-8">
            {/* Left Column - Product Images */}
            <div className="w-[719px] shrink-0 flex flex-col">
              <ProductDetailLeftSection />
              <ProductDetailsSection />
            </div>

            {/* Right Column - Product Info & Purchase */}
            <div className="w-[507px] shrink-0">
              <ProductDetailRightSection />
            </div>
          </div>

          {/* Mobile: Single Column Layout */}
          <div className="lg:hidden space-y-6">
            <ProductDetailLeftSection />
            <ProductDetailRightSection />
            <ProductDetailsSection />
            <ProtectionsSection />
          </div>
        </div>
      </section>

      {/* Frequently Bought Together Section */}
      <section className="w-full py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <FrequentlyBoughtTogetherSection />
        </div>
      </section>

      {/* Supplier's Popular Products Section */}
      <section className="w-full py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SuppliersPopularProductsSection />
        </div>
      </section>
    </div>
  );
}
