import React from "react";
import SellerSidebar from "@/components/seller/SellerSidebar";

export const metadata = {
  title: "Seller Dashboard",
};

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full flex flex-col lg:flex-row">
        <SellerSidebar />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
