"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hideFooter = pathname?.startsWith("/seller") || pathname?.startsWith("/buyer");

  if (hideFooter) {
    return null;
  }

  return <Footer />;
}
