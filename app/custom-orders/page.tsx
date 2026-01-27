import RFQBanner from "@/components/rfq/RFQBanner";
import RFQFormCard from "@/components/rfq/RFQFormCard";
import BrowsedProductsSection from "@/components/rfq/BrowsedProductsSection";

export const metadata = {
  title: "Custom Orders - MaheDeluxe | Bulk Requests & Quotes",
  description: "Submit custom order requests and get quotes from multiple vendors for bulk purchases",
};

export default function CustomOrdersPage() {
  return (
    <div className="min-h-screen bg-white">
      <RFQBanner />
      <RFQFormCard />
      <BrowsedProductsSection />
    </div>
  );
}
