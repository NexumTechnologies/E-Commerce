"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SellerRegisterStep2() {
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessProductCategories, setBusinessProductCategories] =
    useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Load step 1 data from sessionStorage
    const stored = sessionStorage.getItem("sellerRegistration");
    if (!stored) {
      // If no step 1 data, redirect back to step 1
      router.push("/auth/seller/register");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !companyName ||
      !country ||
      !city ||
      !businessType ||
      !businessProductCategories
    ) {
      setError("All required fields must be filled");
      return;
    }

    // Load existing data and add step 2
    const stored = sessionStorage.getItem("sellerRegistration");
    const data = stored ? JSON.parse(stored) : {};

    sessionStorage.setItem(
      "sellerRegistration",
      JSON.stringify({
        ...data,
        step2: {
          companyName,
          country,
          city,
          businessType,
          businessProductCategories,
        },
      })
    );

    // Navigate to step 3
    router.push("/auth/seller/register/step3");
  };

  return (
    <div className="w-full">
      {/* Desktop Title - Hidden on mobile */}
      <div className="hidden md:block text-center">
        <h1 className="text-[#7c3aed] text-[25px] font-bold leading-[35px]">
          Tell Us About Your Company
        </h1>
        <p className="text-[#6B6B6B] text-[16px] leading-[18.2px] font-medium mt-1">
          Buyers will use this information on your seller profile
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 md:mt-6">
        {/* Company Name Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="h-12 border-0 border-b-2 border-[#6B6B6B] rounded-none text-[16px] leading-[22px] font-normal placeholder:text-[#6B6B6B] focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#7c3aed]"
          />
        </div>

        {/* Country Select */}
        <div className="mb-6">
          <div className="relative">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="h-12 w-full border-0 border-b-2 border-[#6B6B6B] rounded-none text-[16px] leading-[22px] font-normal bg-transparent focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#7c3aed] focus:outline-none pr-10 appearance-none cursor-pointer"
              style={{
                color: country ? "#000000" : "#6B6B6B",
              }}
            >
              <option value="" disabled>
                Country
              </option>
              <option value="AF">Afghanistan</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AR">Argentina</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="BD">Bangladesh</option>
              <option value="BE">Belgium</option>
              <option value="BR">Brazil</option>
              <option value="CA">Canada</option>
              <option value="CN">China</option>
              <option value="CO">Colombia</option>
              <option value="EG">Egypt</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IT">Italy</option>
              <option value="JP">Japan</option>
              <option value="KE">Kenya</option>
              <option value="MY">Malaysia</option>
              <option value="MX">Mexico</option>
              <option value="NL">Netherlands</option>
              <option value="NG">Nigeria</option>
              <option value="PK">Pakistan</option>
              <option value="PH">Philippines</option>
              <option value="PL">Poland</option>
              <option value="RU">Russia</option>
              <option value="SA">Saudi Arabia</option>
              <option value="SG">Singapore</option>
              <option value="ZA">South Africa</option>
              <option value="KR">South Korea</option>
              <option value="ES">Spain</option>
              <option value="TH">Thailand</option>
              <option value="TR">Turkey</option>
              <option value="AE">United Arab Emirates</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="VN">Vietnam</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* City Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="h-12 border-0 border-b-2 border-[#6B6B6B] rounded-none text-[16px] leading-[22px] font-normal placeholder:text-[#6B6B6B] focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#7c3aed]"
          />
        </div>

        {/* Business Type Select */}
        <div className="mb-6">
          <div className="relative">
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              required
              className="h-12 w-full border-0 border-b-2 border-[#6B6B6B] rounded-none text-[16px] leading-[22px] font-normal bg-transparent focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#7c3aed] focus:outline-none pr-10 appearance-none cursor-pointer"
              style={{
                color: businessType ? "#000000" : "#6B6B6B",
              }}
            >
              <option value="" disabled>
                Business Type
              </option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Trading Company">Trading Company</option>
              <option value="Distributor / Wholesaler">
                Distributor / Wholesaler
              </option>
              <option value="Service Provider">Service Provider</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Business Product Categories Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Business Product Categories"
            value={businessProductCategories}
            onChange={(e) => setBusinessProductCategories(e.target.value)}
            required
            className="h-12 border-0 border-b-2 border-[#6B6B6B] rounded-none text-[16px] leading-[22px] font-normal placeholder:text-[#6B6B6B] focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#7c3aed]"
          />
        </div>

        {/* Error Message */}
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        {/* Next Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-[#7c3aed] hover:bg-[#5b21b6] text-white text-[16px] font-medium rounded-lg"
        >
          Next
        </Button>
      </form>
    </div>
  );
}
