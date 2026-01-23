"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import UserDashboardSidebar from "./UserDashboardSidebar";

interface UserDashboardLayoutProps {
  children: ReactNode;
}

export default function UserDashboardLayout({
  children,
}: UserDashboardLayoutProps) {
  const pathname = usePathname();
  const isMessagesPage = pathname === "/user/dashboard/messages";
  const isOrdersPage = pathname === "/user/dashboard/orders";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-white">
      <div className="flex">
        <UserDashboardSidebar />
        <main
          className={`flex-1 ${
            isMessagesPage ? "p-0" : isOrdersPage ? "p-6 lg:p-8" : "p-6 lg:p-8"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
