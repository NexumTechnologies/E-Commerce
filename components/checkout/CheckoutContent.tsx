"use client";

import { useState } from "react";
import ShippingAddressForm from "./ShippingAddressForm";
import PaymentMethodSection from "./PaymentMethodSection";
import ItemsAndDeliverySection from "./ItemsAndDeliverySection";
import OrderSummary from "./OrderSummary";

export default function CheckoutContent() {
  const [shippingComplete, setShippingComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "shipping" | "payment" | "items"
  >("shipping");

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          <ShippingAddressForm
            isComplete={shippingComplete}
            onComplete={setShippingComplete}
            isActive={activeSection === "shipping"}
            onActivate={() => setActiveSection("shipping")}
          />
          <PaymentMethodSection
            isComplete={paymentComplete}
            onComplete={setPaymentComplete}
            isActive={activeSection === "payment"}
            onActivate={() => setActiveSection("payment")}
            disabled={!shippingComplete}
          />
          <ItemsAndDeliverySection
            isActive={activeSection === "items"}
            onActivate={() => setActiveSection("items")}
          />
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-[400px] shrink-0">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
