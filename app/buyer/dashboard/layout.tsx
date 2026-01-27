import React from "react";
import BuyerSidebar from "@/components/buyer/BuyerSidebar";

export const metadata = {
  title: "Buyer Dashboard",
};

export default function BuyerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <BuyerSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
