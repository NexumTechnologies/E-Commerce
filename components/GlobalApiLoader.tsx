"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import * as React from "react";
import {
  getPendingRequests,
  subscribePendingRequests,
} from "@/lib/requestTracker";

function usePendingRequests() {
  return React.useSyncExternalStore(subscribePendingRequests, getPendingRequests, () => 0);
}

export default function GlobalApiLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const pending = usePendingRequests();

  const active = (isFetching || 0) + (isMutating || 0) + (pending || 0);
  if (active <= 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 w-full bg-slate-200">
        <div className="h-1 w-1/3 bg-slate-900 animate-pulse" />
      </div>
      <div className="sr-only" aria-live="polite">
        Loading
      </div>
    </div>
  );
}
