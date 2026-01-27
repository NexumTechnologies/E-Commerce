"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  createSellerProfile,
  createBuyerProfile,
} from "@/lib/api";

export default function SellerRegisterStep3({
  role = "seller",
}: {
  role?: "seller" | "buyer";
}) {
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [taxCertificate, setTaxCertificate] = useState<File | null>(null);
  const [factoryPhoto, setFactoryPhoto] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load step 1 and 2 data from sessionStorage
    const stored = sessionStorage.getItem("registration");
    if (!stored) {
      // If no previous data, redirect back to step 1
      router.push(`/auth/${role}/register`);
    }
  }, [router]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void,
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
      const stored = sessionStorage.getItem("registration");
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

      // Prepare payloads
      // Ensure password fields exist
      if (!step1.password || !step1.confirmPassword) {
        setError("Password not provided. Please go back and set a password.");
        setLoading(false);
        return;
      }

      const userPayload = {
        name: step1.fullName,
        email: step1.workEmail,
        password: step1.password,
        confirm_password: step1.confirmPassword,
        role: role, // send chosen role ('seller' or 'buyer') to backend
      };

      // 1) Register user
      const registerResult = await registerUser(userPayload);

      // 2) Create profile depending on role
      if (role === "seller") {
        const sellerPayload = {
          shop_name: step2.companyName,
          business_type: step2.businessType,
          description: "",
          business_email: step1.workEmail,
          business_phone: step1.mobileNumber,
          business_address: step2.city,
          city: step2.city,
          country: step2.country,
          id_card_number: step1.mobileNumber, // placeholder; ideally collect proper id
        };

        await createSellerProfile(sellerPayload);
      } else {
        const buyerPayload = {
          dob: step2.dob || null,
          gender: step2.gender || "other",
        };
        await createBuyerProfile(buyerPayload);
      }

      // Clear sessionStorage
      sessionStorage.removeItem("registration");

      // Redirect to appropriate dashboard after successful registration
      if (role === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/buyer/dashboard");
      }
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An error occurred. Please try again.");
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
