"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function ProfilePage() {
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
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["seller-profile"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/seller/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const seller =
    profileData?.data || profileData?.seller || profileData || null;

    console.log("seller profile data", profileData);

  const passwordMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.put("/auth/update-password", passwordForm, {
        headers: { Authorization: `Bearer ${token}` },
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

  const status = seller?.verification_status || "pending";
  const statusColor =
    status === "approved"
      ? "bg-emerald-50 text-emerald-700"
      : status === "rejected"
      ? "bg-red-50 text-red-700"
      : "bg-amber-50 text-amber-700";

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {toast.show && (
        <div className="fixed top-6 right-6 z-50">
          <div className="flex items-center gap-3 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
            <span>Password updated successfully</span>
          </div>
        </div>
      )}
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Seller Profile</h1>
          <p className="mt-1 text-sm text-slate-600">
            View your business details and manage your account security.
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
              "Unable to load seller profile."}
          </div>
        ) : !seller ? (
          <div className="text-sm text-slate-500">
            No seller profile found for this account.
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {seller.shop_name}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {seller.business_type}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>

            {seller.description && (
              <p className="mt-3 text-sm text-slate-600">
                {seller.description}
              </p>
            )}

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Business email
                </p>
                <p className="font-medium text-slate-900">
                  {seller.business_email}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Phone
                </p>
                <p className="font-medium text-slate-900">
                  {seller.business_phone}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Address
                </p>
                <p className="font-medium text-slate-900">
                  {seller.business_address}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  City / Country
                </p>
                <p className="font-medium text-slate-900">
                  {seller.city}, {seller.country}
                </p>
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
          {passwordSuccess && (
            <p className="text-xs text-emerald-600">{passwordSuccess}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              disabled={passwordMutation.isPending}
            >
              {passwordMutation.isPending ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
