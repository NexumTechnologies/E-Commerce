"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CustomizationInquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  selectedVariant?: string;
  onSubmit: (data: {
    productName: string;
    variant?: string;
    quantity: number;
    message: string;
  }) => void;
}

export default function CustomizationInquiryModal({
  open,
  onOpenChange,
  productName,
  selectedVariant,
  onSubmit,
}: CustomizationInquiryModalProps) {
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(quantity, 10);
    if (qty > 0 && message.trim()) {
      onSubmit({
        productName,
        variant: selectedVariant,
        quantity: qty,
        message: message.trim(),
      });
      setQuantity("");
      setMessage("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send Customization Inquiry</DialogTitle>
          <DialogDescription>
            Request customization details for {productName}
            {selectedVariant && ` - ${selectedVariant}`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-[#000000] mb-2"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full h-12 px-4 border-2 border-[#6B6B6B] rounded-lg focus:outline-none focus:border-orange"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#000000] mb-2"
            >
              Customization Details
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 border-2 border-[#6B6B6B] rounded-lg focus:outline-none focus:border-orange resize-none"
              placeholder="Describe your customization requirements..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 py-3 px-4 rounded-lg font-medium border-2 border-[#6B6B6B] text-[#6B6B6B] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-lg text-white font-medium"
              style={{ backgroundColor: "orange" }}
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
