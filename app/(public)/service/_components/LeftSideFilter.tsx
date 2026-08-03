"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Filter, MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";

type LeftSideFilterProps = {
  locations: string[];
  categoryNames: string[];
};

export const LeftSideFilter = ({
  locations,
  categoryNames,
}: LeftSideFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(locations[0] ?? "");
  const [selectRating, setSelectRating] = useState(4.9);
  const [maxPrice, setMaxPrice] = useState(2500);

  const router = useRouter();


useEffect(() => {
  const params = new URLSearchParams();

  if (selectedLocation.trim()) {
    params.set("location", selectedLocation);
  }

  if (selectedCategory.trim()) {
    params.set("category", selectedCategory);
  }

  if (selectRating > 0) {
    params.set("rating", selectRating.toString());
  }

  if (maxPrice > 0) {
    params.set("maxPrice", maxPrice.toString());
  }

  router.push(`/service?${params.toString()}`);
}, [
  selectedLocation,
  selectedCategory,
  selectRating,
  maxPrice,
  router,
]);
  return (
    <>
      {/* Left Sidebar Filter */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-1 space-y-6"
      >
        <div className="p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6 sticky top-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-emerald-400" />
              Filters
            </h3>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Categories
            </label>

            <div className="space-y-1">
              {categoryNames.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <motion.button
                    key={category}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    <span>{category}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Location
            </label>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                Minimum Rating
              </span>

              <span className="text-yellow-400 font-bold">
                ⭐ {selectRating.toFixed(1)}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={selectRating}
              onChange={(e) => setSelectRating(Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Max Price
              </span>

              <span className="text-emerald-400 font-bold">
                ৳{maxPrice}
              </span>
            </div>

            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};