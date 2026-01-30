"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function AdminPercentageManagementPage() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    tone?: "success" | "error";
  } | null>(null);

  const { data: currentData } = useQuery({
    queryKey: ["listing-percentage"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/product/listing/percentage", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
  });

  console.log("here is the percentage", currentData);

  const currentPercentage: number | null =
    (currentData as any)?.data?.percentage ?? null;

  useEffect(() => {
    if (currentPercentage != null && value === "") {
      setValue(String(currentPercentage));
    }
  }, [currentPercentage, value]);

  const mutation = useMutation({
    mutationFn: async (percentage: number) => {
      const token = localStorage.getItem("token");
      const res = await api.put(
        "/product/listing/percentage",
        { percentage },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
      );
      return res.data;
    },
    onSuccess: (_data, variables) => {
      // refresh current percentage from server
      queryClient.invalidateQueries({ queryKey: ["listing-percentage"] });
      // keep input in sync with the applied value
      setValue(String(variables));

      setToast({
        show: true,
        tone: "success",
        message: currentPercentage == null
          ? `Applied ${variables}% margin to listed products`
          : `Updated margin to ${variables}% and reapplied to listed products`,
      });
      setTimeout(() => setToast(null), 2500);
    },
    onError: () => {
      setToast({
        show: true,
        tone: "error",
        message: "Failed to apply percentage. Please try again.",
      });
      setTimeout(() => setToast(null), 2500);
    },
  });

  const handleApply = () => {
    const num = Number(value);
    if (!Number.isFinite(num)) return;
    mutation.mutate(num);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {toast?.show && (
        <div className="fixed top-6 right-6 z-50">
          <div
            className={`flex items-center gap-2 rounded-lg px-4 py-2 shadow-lg text-sm font-medium ${
              toast.tone === "error"
                ? "bg-red-600 text-white"
                : "bg-emerald-600 text-white"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <header>
        <h1 className="text-2xl font-bold text-slate-900">Percentage Management</h1>
        <p className="mt-1 text-sm text-slate-600">
          Set a percentage margin that will be applied on top of seller base
          prices for all currently listed products. For example, 20 will make a
          100 AED product show as 120 AED to customers.
        </p>
      </header>

      <section className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
        <div className="space-y-2 text-sm">
          <label className="block text-xs font-medium text-slate-700">
            Margin percentage (%)
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter percentage e.g. 20"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <p className="text-[11px] text-slate-500">
            This percentage is applied to all products that are currently
            listed. Underlying seller prices remain unchanged.
          </p>
          {currentPercentage != null && (
            <p className="text-[11px] text-emerald-700 font-medium">
              Currently applied margin: {currentPercentage}%
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 text-sm">
          <button
            type="button"
            onClick={handleApply}
            disabled={mutation.isPending}
            className="inline-flex items-center rounded-md bg-[#7c3aed] px-4 py-2 text-white hover:bg-[#6d28d9] disabled:opacity-60"
          >
            {mutation.isPending
              ? "Applying..."
              : currentPercentage == null
              ? "Apply to listed products"
              : "Update percentage"}
          </button>
        </div>
      </section>
    </div>
  );
}
