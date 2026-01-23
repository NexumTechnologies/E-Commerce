"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SellerRegisterStep3() {
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [taxCertificate, setTaxCertificate] = useState<File | null>(null);
  const [factoryPhoto, setFactoryPhoto] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load step 1 and 2 data from sessionStorage
    const stored = sessionStorage.getItem("sellerRegistration");
    if (!stored) {
      // If no previous data, redirect back to step 1
      router.push("/auth/seller/register");
    }
  }, [router]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0] || null;
    setter(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Load all registration data
      const stored = sessionStorage.getItem("sellerRegistration");
      if (!stored) {
        setError("Please complete all previous steps");
        setLoading(false);
        return;
      }

      const data = JSON.parse(stored);
      const { step1, step2 } = data;

      if (!step1 || !step2) {
        setError("Please complete all previous steps");
        setLoading(false);
        return;
      }

      // Prepare form data for registration
      // Note: For now, we'll register without file uploads
      // File uploads would need a separate API endpoint
      const registrationData = {
        name: step1.fullName,
        email: step1.workEmail,
        password: step1.mobileNumber, // Temporary - in real app, password should be collected separately
        role: "seller",
        companyName: step2.companyName,
        country: step2.country,
        // Additional fields can be added to User model if needed
      };

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Clear sessionStorage
      sessionStorage.removeItem("sellerRegistration");

      // Redirect to seller dashboard
      router.push("/seller/dashboard");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Title - Hidden on mobile */}
      <div className="hidden md:block text-center">
        <h1 className="text-blue text-[25px] font-bold leading-[35px]">
          Verify Your Business
        </h1>
        <p className="text-[#6B6B6B] text-[16px] leading-[18.2px] font-medium mt-1">
          We verify suppliers to a guarantee and safety on the platform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 md:mt-6">
        {/* Upload Business License */}
        <div className="mb-6">
          <input
            type="file"
            id="businessLicense"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, setBusinessLicense)}
            className="hidden"
          />
          <div className="w-full border border-[#A6A6A6] bg-transparent rounded-lg py-[25px] px-[35px]">
            <label
              htmlFor="businessLicense"
              className="block w-full bg-blue rounded-lg py-3 px-4 cursor-pointer hover:bg-blue transition-colors"
              onClick={() =>
                document.getElementById("businessLicense")?.click()
              }
            >
              <div className="flex items-center justify-center gap-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17V11L7 13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11L11 13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white text-[16px] font-medium">
                  {businessLicense
                    ? businessLicense.name
                    : "Upload business license"}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Upload Tax Certificate */}
        <div className="mb-6">
          <input
            type="file"
            id="taxCertificate"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, setTaxCertificate)}
            className="hidden"
          />
          <div className="w-full border border-[#A6A6A6] bg-transparent rounded-lg py-[25px] px-[35px]">
            <label
              htmlFor="taxCertificate"
              className="block w-full bg-blue rounded-lg py-3 px-4 cursor-pointer hover:bg-blue transition-colors"
              onClick={() => document.getElementById("taxCertificate")?.click()}
            >
              <div className="flex items-center justify-center gap-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17V11L7 13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11L11 13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white text-[16px] font-medium">
                  {taxCertificate
                    ? taxCertificate.name
                    : "Upload Tax Certificate"}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Upload Factory/Warehouse Photo */}
        <div className="mb-6">
          <input
            type="file"
            id="factoryPhoto"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setFactoryPhoto)}
            className="hidden"
          />
          <div className="w-full border border-[#A6A6A6] bg-transparent rounded-lg py-[25px] px-[35px]">
            <label
              htmlFor="factoryPhoto"
              className="block w-full bg-blue rounded-lg py-3 px-4 cursor-pointer hover:bg-blue transition-colors"
              onClick={() => document.getElementById("factoryPhoto")?.click()}
            >
              <div className="flex items-center justify-center gap-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17V11L7 13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11L11 13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white text-[16px] font-medium">
                  {factoryPhoto
                    ? factoryPhoto.name
                    : "Factory / Warehouse photo"}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        {/* Submit Application Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-br from-blue to-blue-300 text-white text-[16px] font-medium rounded-lg"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}
