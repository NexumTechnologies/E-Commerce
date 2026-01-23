"use client";

import { 
  Shirt, 
  Monitor, 
  Shield, 
  Sparkles, 
  Gem, 
  Home, 
  Footprints,
  Filter,
  ChevronRight,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: "1", name: "Apparel & Accessories", icon: <Shirt className="h-5 w-5" /> },
  { id: "2", name: "Consumer Electronics", icon: <Monitor className="h-5 w-5" /> },
  { id: "3", name: "Sports & Entertainment", icon: <Shield className="h-5 w-5" /> },
  { id: "4", name: "Beauty & Personal Care", icon: <Sparkles className="h-5 w-5" /> },
  { id: "5", name: "Jewelry & Watches", icon: <Gem className="h-5 w-5" /> },
  { id: "6", name: "Home & Garden", icon: <Home className="h-5 w-5" /> },
  { id: "7", name: "Footwear & Accessories", icon: <Footprints className="h-5 w-5" /> },
];

export default function BrowseSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryClick = (id: string) => {
    const newId = selectedCategory === id ? null : id;
    setSelectedCategory(newId);
    
    // Update URL query params
    const params = new URLSearchParams(searchParams.toString());
    if (newId) {
      params.set("category", newId);
    } else {
      params.delete("category");
    }
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-72 space-y-8">
      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-orange" />
          <h2 className="font-bold text-gray-900">Categories</h2>
        </div>
        
        <nav className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                selectedCategory === category.id 
                  ? "bg-blue text-white shadow-lg shadow-blue/20" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={selectedCategory === category.id ? "text-white" : "text-gray-400 group-hover:text-blue"}>
                  {category.icon}
                </span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${selectedCategory === category.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
            </button>
          ))}
        </nav>
      </div>


      {/* Price Range */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-6">Price Range</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
            />
          </div>
          <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-orange transition-colors">
            Apply Filter
          </button>
        </div>
      </div>

      {/* Ratings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-6">Ratings</h2>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue focus:ring-blue" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                {rating === 5 ? "" : "& Up"}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
