"use client";

import { ChevronRight, Truck, CreditCard, FileText, Shield } from "lucide-react";

export default function ProtectionsSection() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-xl border border-purple-100/50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Protections for this product
        </h3>
        <button className="p-2 rounded-lg hover:bg-purple-50 transition-colors">
          <ChevronRight className="w-5 h-5 text-[#7c3aed]" />
        </button>
      </div>

      {/* Protection Cards */}
      <div className="space-y-4">
        {/* Delivery */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/50 to-transparent border border-orange-100/50 hover:border-orange-200 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange to-orange-300 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Delivery via <span className="text-orange">MaheDeluxe</span> logistics
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Expect your order to be delivered before scheduled dates or
                receive a 10% delay compensation.
              </p>
            </div>
          </div>
        </div>

        {/* Secure Payments */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/50 to-transparent border border-orange-100/50 hover:border-orange-200 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange to-orange-300 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Secure payments
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every payment you make on MaheDeluxe is secured with strict
                SSL encryption and PCI DSS data protection protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Standard Refund Policy */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/50 to-transparent border border-orange-100/50 hover:border-orange-200 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange to-orange-300 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Standard refund policy
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Claim a refund if your order doesn&apos;t ship, is missing, or
                arrives with product issues.
              </p>
            </div>
          </div>
        </div>

        {/* Trade Assurance */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/50 to-transparent border border-orange-100/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange to-orange-300 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">
              Trade Assurance
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed ml-13">
            MaheDeluxe protects all your orders placed and paid on the platform
          </p>
        </div>
      </div>
    </div>
  );
}
