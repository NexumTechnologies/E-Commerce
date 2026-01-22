"use client";

import Image from "next/image";
import { MessageSquare } from "lucide-react";

interface OrderProduct {
  id: string;
  name: string;
  image: string;
  variant: string;
  quantity: number;
}

interface Order {
  id: string;
  orderDate: string;
  total: string;
  status: string;
  deliveryDate: string;
  products: OrderProduct[];
}

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-white to-purple-50/20 hover:shadow-xl hover:border-purple-200 transition-all">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-200">
        <div className="mb-2 sm:mb-0">
          <p className="text-base font-bold text-gray-900">Order #{order.id}</p>
          <p className="text-sm text-gray-600 mt-1">
            Order date: {order.orderDate}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#7c3aed]">
            Total: {order.total}
          </p>
        </div>
      </div>

      {/* Order Status */}
      <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
        <p className="text-sm font-semibold text-gray-900 mb-1">{order.status}</p>
        <p className="text-sm text-gray-600">{order.deliveryDate}</p>
      </div>

      {/* Products */}
      <div className="space-y-4 mb-6">
        {order.products.map((product) => (
          <div key={product.id} className="flex gap-4 p-3 rounded-xl bg-white border border-gray-100 hover:border-purple-200 transition-colors">
            {/* Product Image */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-gray-50 to-purple-50/30">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </p>
              <p className="text-sm text-gray-600">
                {product.variant} x{product.quantity} item
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 text-[#7c3aed] rounded-xl font-semibold hover:from-blue-100 hover:to-purple-100 transition-all flex items-center justify-center gap-2 border border-purple-200">
          <MessageSquare className="w-4 h-4" />
          Chat now
        </button>
        <button className="px-5 py-2.5 border-2 border-[#7c3aed] text-[#7c3aed] rounded-xl font-semibold hover:bg-gradient-to-r hover:from-[#7c3aed] hover:to-[#a78bfa] hover:text-white hover:border-transparent transition-all">
          View order details
        </button>
      </div>
    </div>
  );
}
