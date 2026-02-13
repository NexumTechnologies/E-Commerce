"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ListingPercentageResponse = {
  success: boolean;
  message?: string;
  data: null | { percentage: number };
};

type ApplyPercentageResponse = {
  success: boolean;
  message?: string;
  data?: { percentage: number; updatedCount: number };
};

async function fetchListingPercentage() {
  const res = await api.get<ListingPercentageResponse>(
    "/product/listing/percentage",
  );
  return res.data;
}

export default function AdminOrderPercentagePage() {
  const queryClient = useQueryClient();
  const [percentageText, setPercentageText] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "listing-percentage"],
    queryFn: fetchListingPercentage,
  });

  const currentPercentage = data?.data?.percentage ?? null;

  useEffect(() => {
    if (currentPercentage == null) return;
    setPercentageText(String(currentPercentage));
  }, [currentPercentage]);

  const parsedPercentage = useMemo(() => {
    const value = Number(percentageText);
    return Number.isFinite(value) ? value : null;
  }, [percentageText]);

  const canSave = parsedPercentage != null;

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await api.put<ApplyPercentageResponse>(
        "/product/listing/percentage",
        { percentage: parsedPercentage },
      );
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin", "listing-percentage"],
      });
    },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Order Percentage
        </h1>
        <p className="text-sm text-muted-foreground">
          Set the platform percentage used to calculate the admin earning on each
          order.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Percentage</CardTitle>
          <CardDescription>
            Example: 10 means buyers pay +10% on listed products; the difference
            becomes admin earning.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Percentage</label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  value={percentageText}
                  onChange={(e) => setPercentageText(e.target.value)}
                  inputMode="decimal"
                  placeholder={isLoading ? "Loading…" : "e.g. 10"}
                  aria-invalid={
                    !isLoading &&
                    percentageText.length > 0 &&
                    parsedPercentage == null
                  }
                />
              </div>
              <div className="text-sm text-muted-foreground">%</div>
            </div>
            {isError && (
              <p className="text-sm text-destructive">
                Failed to load the current percentage.
              </p>
            )}
            {!isLoading && currentPercentage == null && !isError && (
              <p className="text-sm text-muted-foreground">
                No percentage is set yet.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={!canSave || saveMutation.isPending}
            >
              {saveMutation.isPending ? "Saving…" : "Save"}
            </Button>

            {saveMutation.isSuccess && (
              <p className="text-sm text-muted-foreground">
                Saved. Updated {saveMutation.data?.data?.updatedCount ?? 0} listed
                products.
              </p>
            )}
            {saveMutation.isError && (
              <p className="text-sm text-destructive">
                Failed to save percentage.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
