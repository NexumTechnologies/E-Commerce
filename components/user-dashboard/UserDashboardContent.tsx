"use client";

import UserProfileCard from "./UserProfileCard";
import FavoritesCard from "./FavoritesCard";
import OrderStatusCard from "./OrderStatusCard";
import BrowsingHistoryCard from "./BrowsingHistoryCard";
import ProductInspirationSection from "./ProductInspirationSection";

export default function UserDashboardContent() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Top Row: Profile and Favorites */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <UserProfileCard />
        <FavoritesCard />
      </div>

      {/* Middle Row: Order Status and Browsing History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <OrderStatusCard />
        <BrowsingHistoryCard />
      </div>

      {/* Bottom: Product Inspiration */}
      <ProductInspirationSection />
    </div>
  );
}
