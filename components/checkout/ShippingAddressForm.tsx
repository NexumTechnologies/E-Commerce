"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ShippingAddressFormProps {
  isComplete: boolean;
  onComplete: (complete: boolean) => void;
  isActive: boolean;
  onActivate: () => void;
}

export default function ShippingAddressForm({
  isComplete,
  onComplete,
  isActive,
  onActivate,
}: ShippingAddressFormProps) {
  const [formData, setFormData] = useState({
    country: "Egypt",
    firstName: "Name",
    lastName: "",
    phone: "02",
    apartment: "",
    state: "",
    city: "",
    postalCode: "",
    setAsDefault: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isComplete
              ? "bg-[#7c3aed] text-white"
              : isActive
              ? "bg-[#7c3aed] text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {isComplete ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 4L6 11.3333L2.66667 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <MapPin className="w-4 h-4" />
          )}
        </div>
        <h2 className="text-xl font-semibold text-[#000000]">
          Shipping address
        </h2>
        {isComplete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onActivate}
            className="ml-auto text-[#7c3aed]"
          >
            Change
          </Button>
        )}
      </div>

      {isComplete && !isActive ? (
        <div className="text-sm text-[#6B6B6B]">
          <p className="font-medium text-[#000000]">Mohamed Hassan</p>
          <p>(+20) 01151863033</p>
          <p>Al Obour City, Obour, Al-Qalyubia Governorate, 60606, Egypt</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Country/Region */}
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Country/region
            </label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full h-12 px-4 border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#7c3aed] appearance-none bg-white"
              >
                <option value="Egypt">Egypt</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
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

          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="h-12"
                required
              />
            </div>
            <div>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="h-12"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="h-12"
              required
            />
          </div>

          {/* Apartment, suite, unit, building, floor (optional) */}
          <div>
            <Input
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              placeholder="Apartment, suite, unit, building, floor (optional)"
              className="h-12"
            />
          </div>

          {/* State, City, Postal Code */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State / province"
                className="h-12"
                required
              />
            </div>
            <div>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="h-12"
                required
              />
            </div>
            <div>
              <Input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                className="h-12"
                required
              />
            </div>
          </div>

          {/* Set as default checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="setAsDefault"
              id="setAsDefault"
              checked={formData.setAsDefault}
              onChange={handleChange}
              className="w-4 h-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
            />
            <label
              htmlFor="setAsDefault"
              className="text-sm text-[#6B6B6B] cursor-pointer"
            >
              Set as default shipping address
            </label>
          </div>

          {/* Shipping Method */}
          <div className="pt-4 border-t border-[#E0E0E0]">
            <h3 className="text-base font-semibold text-[#000000] mb-4">
              Shipping Method
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:border-[#7c3aed]">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  defaultChecked
                  className="w-4 h-4 text-[#7c3aed]"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#000000]">
                    Standard Delivery - 3-7 business days
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:border-[#7c3aed]">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  className="w-4 h-4 text-[#7c3aed]"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#000000]">
                    Express Delivery - 1-3 business days
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:border-[#7c3aed]">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="economy"
                  className="w-4 h-4 text-[#7c3aed]"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#000000]">
                    Economy Delivery - Low-cost, 7-12 business days
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Continue to payment button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            style={{ backgroundColor: "#7c3aed" }}
          >
            Continue to payment
          </Button>
        </form>
      )}
    </div>
  );
}
