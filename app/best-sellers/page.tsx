import TopRankingBanner from "@/components/top-ranking/TopRankingBanner";
import FilterButtonsSection from "@/components/top-ranking/FilterButtonsSection";
import TopRankingProductGrid from "@/components/top-ranking/TopRankingProductGrid";

export const metadata = {
  title: "Best Sellers - TradeHub | Top-Rated Products",
  description: "Browse best-selling products and top-rated items from verified vendors",
};

export default function BestSellersPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopRankingBanner />
      <FilterButtonsSection />
      <TopRankingProductGrid />
    </div>
  );
}
