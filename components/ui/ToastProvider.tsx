"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { setNotifier, type NotificationPayload } from "@/lib/notifications";

type ToastItem = NotificationPayload & {
  id: string;
};

type ToastContextValue = {
  push: (payload: NotificationPayload) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function toneClasses(tone: ToastItem["tone"]) {
  if (tone === "success") return "bg-emerald-600 text-white";
  if (tone === "error") return "bg-red-600 text-white";
  return "bg-slate-900 text-white";
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (payload: NotificationPayload) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const next: ToastItem = { ...payload, id };

      setItems((prev) => {
        // cap to avoid runaway spam
        const capped = prev.slice(-2);
        return [...capped, next];
      });

      window.setTimeout(() => remove(id), 3000);
    },
    [remove],
  );

  useEffect(() => {
    setNotifier(push);
    return () => setNotifier(null);
  }, [push]);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`min-w-65 max-w-sm rounded-md px-4 py-3 shadow-sm ${toneClasses(
              t.tone,
            )}`}
            role="status"
            aria-live="polite"
          >
            <div className="text-sm font-medium">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
