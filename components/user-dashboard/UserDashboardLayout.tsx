"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import UserDashboardSidebar from "./UserDashboardSidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/20 to-white">
      <div className="flex min-h-screen">
        <aside className="hidden md:block">
          <UserDashboardSidebar />
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/50 md:hidden">
            <div className="flex h-14 items-center gap-3 px-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Open user navigation">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                    >
                      <path
                        d="M4 6H20M4 12H20M4 18H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-white border-r">
                  <SheetHeader className="border-b">
                    <SheetTitle>
                      <Link href="/user/dashboard" className="font-semibold">
                        User Dashboard
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <UserDashboardSidebar />
                </SheetContent>
              </Sheet>

              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900">Dashboard</div>
                <div className="text-[11px] text-gray-500">User</div>
              </div>
            </div>
          </header>

          <main
            className={`min-w-0 ${
              isMessagesPage ? "p-0" : isOrdersPage ? "p-4 sm:p-6 lg:p-8" : "p-4 sm:p-6 lg:p-8"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
