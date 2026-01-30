"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");
  const isSellerArea = pathname?.startsWith("/seller");
  const isAdminArea = pathname?.startsWith("/admin");

  if (isAuthPage || isSellerArea || isAdminArea) {
    return null;
  }

  return <Header />;
}
