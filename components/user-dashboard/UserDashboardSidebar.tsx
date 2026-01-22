"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  CreditCard,
  Bookmark,
  Settings,
  ChevronRight,
} from "lucide-react";

export default function UserDashboardSidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  // Check if we're on dashboard - dashboard should never collapse
  const isDashboard = pathname === "/user/dashboard";
  // Sidebar is collapsed when NOT on dashboard, expanded when on dashboard or hovered
  const isCollapsed = !isDashboard && !isHovered;
  const isExpanded = isDashboard || isHovered;

  const menuItems = [
    {
      title: "Online trading",
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          href: "/user/dashboard",
        },
        {
          name: "Message",
          icon: MessageSquare,
          href: "/user/dashboard/messages",
        },
        {
          name: "Order",
          icon: ShoppingBag,
          href: "/user/dashboard/orders",
        },
        {
          name: "Payment",
          icon: CreditCard,
          href: "/user/dashboard/payments",
        },
        {
          name: "Saved & History",
          icon: Bookmark,
          href: "/user/dashboard/saved-history",
        },
      ],
    },
    {
      title: "Setting",
      items: [
        {
          name: "Account setting",
          icon: Settings,
          href: "/user/dashboard/settings",
        },
      ],
    },
  ];

  return (
    <aside
      className={`bg-white min-h-screen transition-all duration-300 ${
        isExpanded ? "w-64 p-6" : "w-20 p-3"
      } shadow-xl border-r border-purple-100/50`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {menuItems.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className={
            sectionIndex > 0 ? "mt-8 pt-8 border-t border-gray-200" : ""
          }
        >
          {isExpanded && (
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
              {section.title}
            </h3>
          )}
          <nav className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center ${
                    isExpanded ? "justify-between px-4" : "justify-center px-2"
                  } py-3 rounded-xl transition-all duration-200 ${
                    isActive && isExpanded
                      ? "bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white shadow-lg shadow-purple-200/50"
                      : isActive && isCollapsed
                      ? "bg-purple-50"
                      : isExpanded
                      ? "text-gray-700 hover:bg-purple-50/50 hover:text-[#7c3aed]"
                      : "hover:bg-purple-50"
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        isCollapsed
                          ? isActive
                            ? "text-[#7c3aed]"
                            : "text-gray-600"
                          : isActive
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                      fill="none"
                    />
                    {isExpanded && (
                      <span className="text-sm font-semibold whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {isExpanded && (
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
