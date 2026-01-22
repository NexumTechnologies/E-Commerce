"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Search,
  Bookmark,
  Folder,
  Camera,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  date: string;
  isUnread: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOrderCard?: boolean;
  orderData?: {
    orderId: string;
    date: string;
    productName: string;
    productImage: string;
    orderStatus: string;
    total: string;
    shippingAddress: string;
  };
}

export default function MessagesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >("1");
  const [messageInput, setMessageInput] = useState("");

  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Mohamed",
      avatar: "/dummy-product.png",
      lastMessage: "We will ship as soon as possible.",
      date: "2025-12-6",
      isUnread: false,
    },
    {
      id: "2",
      name: "Ahmed",
      avatar: "/dummy-product.png",
      lastMessage: "Thank you for your order!",
      date: "2025-12-5",
      isUnread: true,
    },
    {
      id: "3",
      name: "Sarah",
      avatar: "/dummy-product.png",
      lastMessage: "Your order has been confirmed.",
      date: "2025-12-4",
      isUnread: false,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "Mohamed",
      content: "Order Order closed\n30,000 EGP",
      timestamp: "1:01 AM",
      isOrderCard: false,
    },
    {
      id: "2",
      sender: "You",
      content: "",
      timestamp: "1:01 AM",
      isOrderCard: true,
      orderData: {
        orderId: "ORD-12345",
        date: "2025-12-6",
        productName:
          "Refurbished Apple Watch Series 9 GPS, 41mm Midnight Aluminum Case with S/M Midnight Sport Band",
        productImage: "/dummy-product.png",
        orderStatus: "Order closed",
        total: "30,000 EGP",
        shippingAddress: "Egypt, Al-Qalyubia Governorate, Obour",
      },
    },
  ];

  const filteredConversations =
    activeFilter === "unread"
      ? conversations.filter((conv) => conv.isUnread)
      : conversations;

  const selectedConv = conversations.find(
    (conv) => conv.id === selectedConversation
  );

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white rounded-2xl overflow-hidden shadow-xl border border-purple-100/50">
      {/* Left Panel - Conversation List */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-gradient-to-b from-gray-50 to-white">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white shadow-lg shadow-purple-200/50"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("unread")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeFilter === "unread"
                  ? "bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white shadow-lg shadow-purple-200/50"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread
            </button>
          </div>
          <button className="p-2 rounded-lg text-gray-600 hover:text-[#7c3aed] hover:bg-purple-50 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={conversation.avatar}
                    alt={conversation.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 text-sm">
                      {conversation.name}
                    </span>
                    <span className="text-xs text-gray-500 shrink-0 ml-2">
                      {conversation.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Message Detail */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedConv.name}
                </h2>
                <span className="text-sm text-gray-500">
                  1:01 AM Local Time
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender !== "You" && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={selectedConv.avatar}
                        alt={selectedConv.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {message.isOrderCard && message.orderData ? (
                    <div className="max-w-md bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">Order</h3>
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-500">
                          {message.orderData.date}
                        </span>
                      </div>
                      <div className="flex gap-3 mb-3">
                        <div className="relative w-16 h-16 rounded overflow-hidden shrink-0">
                          <Image
                            src={message.orderData.productImage}
                            alt={message.orderData.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-sm text-gray-700 flex-1">
                          {message.orderData.productName}
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Order status: </span>
                          <span className="font-medium text-gray-900">
                            {message.orderData.orderStatus}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Total: </span>
                          <span className="font-medium text-gray-900">
                            {message.orderData.total}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">
                            Shipping address:{" "}
                          </span>
                          <span className="font-medium text-gray-900">
                            {message.orderData.shippingAddress}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`max-w-md px-4 py-3 rounded-xl shadow-md ${
                        message.sender === "You"
                          ? "bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white"
                          : "bg-white text-gray-900 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                  )}

                  {message.sender === "You" && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-purple-200">
                      <div className="w-full h-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Y</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-white to-purple-50/30">
              <div className="flex items-center gap-2 mb-3">
                <button className="text-gray-600 hover:text-[#7c3aed] p-2 rounded-lg hover:bg-purple-50 transition-colors">
                  <Folder className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:text-[#7c3aed] p-2 rounded-lg hover:bg-purple-50 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent text-sm transition-all"
                rows={3}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-gray-50 to-purple-50/20">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4">
              <MessageSquare className="w-10 h-10 text-purple-400" />
            </div>
            <p className="text-lg font-medium text-gray-700">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
