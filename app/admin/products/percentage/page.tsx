"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPercentageRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/orders/percentage");
    router.refresh();
  }, [router]);

  return (
    <div className="max-w-3xl mx-auto py-10 text-sm text-muted-foreground">
      Redirecting…
    </div>
  );
}
