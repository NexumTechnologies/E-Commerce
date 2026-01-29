"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function BuyerProfilePage() {
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string }>(
    {
      show: false,
      message: "",
    },
  );

  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["buyer-profile"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/auth/profile", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
  });

  const user = profileData?.data || profileData?.user || profileData || null;
  const buyerName = user?.name || "Buyer";
  const buyerEmail = user?.email || "-";
  const isApproved = user?.is_varified;
  const accountStatus: string = isApproved ? "Approved" : "Pending";
  const statusClass =
    accountStatus === "Approved"
      ? "inline-block px-2 py-0.5 text-emerald-700 bg-emerald-50 rounded-full text-xs font-medium"
      : "inline-block px-2 py-0.5 text-amber-700 bg-amber-50 rounded-full text-xs font-medium";

  const passwordMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.put("/auth/update-password", passwordForm, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
    onSuccess: (res: any) => {
      setPasswordSuccess(res?.message || "Password updated successfully.");
      setPasswordError(null);
      setToast({
        show: true,
        message: res?.message || "Password updated successfully.",
      });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message || "Failed to update password.";
      setPasswordError(message);
      setPasswordSuccess(null);
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {toast.show && (
        <div className="fixed top-6 right-6 z-50">
          <div className="flex items-center gap-3 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Buyer Profile</h1>
          <p className="mt-1 text-sm text-slate-600">
            View your account details and manage your password.
          </p>
        </div>
      </header>

      <section className="bg-white border rounded-xl p-5 shadow-sm">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-slate-100 rounded w-1/3" />
            <div className="h-4 bg-slate-100 rounded w-1/2" />
            <div className="h-4 bg-slate-100 rounded w-1/4" />
          </div>
        ) : error ? (
          <div className="text-sm text-red-600">
            {(error as any)?.response?.data?.message ||
              "Unable to load buyer profile."}
          </div>
        ) : !user ? (
          <div className="text-sm text-slate-500">
            No profile information found.
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {buyerName}
                </h2>
                <p className="mt-1 text-sm text-slate-600">Registered buyer</p>
              </div>
              <span className={statusClass}>{accountStatus}</span>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Email
                </p>
                <p className="font-medium text-slate-900">{buyerEmail}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Account type
                </p>
                <p className="font-medium text-slate-900">Buyer</p>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="bg-white border rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Change Password
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Update your account password. Make sure to choose a strong, unique
          password.
        </p>

        <form
          className="space-y-3 max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            passwordMutation.mutate();
          }}
        >
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Current password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                className="w-full border rounded px-3 py-2 text-sm pr-10"
                value={passwordForm.current_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    current_password: e.target.value,
                  })
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-xs text-slate-500"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
              >
                {showPasswords.current ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              New password
            </label>
            <div className="relative">
              <input
                type={showPasswords.next ? "text" : "password"}
                className="w-full border rounded px-3 py-2 text-sm pr-10"
                value={passwordForm.new_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    new_password: e.target.value,
                  })
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-xs text-slate-500"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    next: !prev.next,
                  }))
                }
              >
                {showPasswords.next ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                className="w-full border rounded px-3 py-2 text-sm pr-10"
                value={passwordForm.confirm_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirm_password: e.target.value,
                  })
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-xs text-slate-500"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
              >
                {showPasswords.confirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {passwordError && (
            <p className="text-xs text-red-600">{passwordError}</p>
          )}
          {passwordSuccess && !passwordError && (
            <p className="text-xs text-emerald-600">{passwordSuccess}</p>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              disabled={passwordMutation.isPending}
            >
              {passwordMutation.isPending ? "Updating..." : "Update password"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
