import TopDealsBanner from "@/components/top-deals/TopDealsBanner";
import FlashDealsSection from "@/components/top-deals/FlashDealsSection";
import TopDealsProductGrid from "@/components/top-deals/TopDealsProductGrid";

export const metadata = {
  title: "Flash Sales - MaheDeluxe | Limited Time Offers",
  description: "Discover exclusive flash sales and limited-time offers from verified vendors",
};

export default function FlashSalesPage() {
  // First row products
  const firstRowProducts = [
    { id: "1", image: "/top-deals-1.png" },
    { id: "2", image: "/top-deals-2.png" },
    { id: "3", image: "/top-deals-3.png" },
    { id: "4", image: "/top-deals-4.png" },
  ];

  // Second row products
  const secondRowProducts = [
    { id: "5", image: "/top-deals-1.png" },
    { id: "6", image: "/top-deals-2.png" },
    { id: "7", image: "/top-deals-3.png" },
    { id: "8", image: "/top-deals-4.png" },
    { id: "9", image: "/top-deals-5.png" },
    { id: "10", image: "/top-deals-1.png" },
    { id: "11", image: "/top-deals-2.png" },
    { id: "12", image: "/top-deals-3.png" },
    { id: "13", image: "/top-deals-4.png" },
    { id: "14", image: "/top-deals-5.png" },
    { id: "15", image: "/top-deals-1.png" },
    { id: "16", image: "/top-deals-2.png" },
    { id: "17", image: "/top-deals-3.png" },
    { id: "18", image: "/top-deals-4.png" },
    { id: "19", image: "/top-deals-5.png" },
    { id: "20", image: "/top-deals-1.png" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopDealsBanner />
      <FlashDealsSection />
      <TopDealsProductGrid products={firstRowProducts} />
      <TopDealsProductGrid products={secondRowProducts} marginTop="32px" />
    </div>
  );
}
