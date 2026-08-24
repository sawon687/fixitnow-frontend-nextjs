"use client";

import React, { useEffect, useState } from "react";
import { motion, number } from "framer-motion";
import {
  DollarSign,
  Filter,
  MapPin,
  Star,
  RotateCcw,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type LeftSideFilterProps = {
  locations: string[];
  categoryNames: string[];
};

export const LeftSideFilter = ({
  locations,
  categoryNames,
}: LeftSideFilterProps) => {

const  params=useSearchParams()
const insialocation=params.get('location') || "All"
 const insialCategory=params.get('category') || "All"
 const insialPrice=params.get('price')||'0'
 const insialRating=params.get("rating") || '0'
  const [selectedCategory, setSelectedCategory] = useState(insialCategory);
  const [selectedLocation, setSelectedLocation] = useState(
    insialocation
  );
  const [selectRating, setSelectRating] = useState(insialRating);
  const [price, setPrice] = useState(insialPrice);

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();
     const location=params.get('location')
      const category=params.get('category')
       const priceulr=params.get('price')
    if (selectedLocation && selectedLocation.trim()!==location) {
      params.set("location", selectedLocation);
    }

    if (selectedCategory && selectedCategory.trim()!==category) {
      params.set("category", selectedCategory);
    }
     
    if (selectRating && selectRating !== priceulr && Number(selectRating) > 0) {
      params.set("rating", selectRating.toString());
    }

    if (price && price!==priceulr && Number(price) > 0  ) {
      params.set("price", price.toString());
    }

    router.push(`/service?${params.toString()}`,{scroll:false});
  }, [
    selectedLocation,
    selectedCategory,
    selectRating,
    price,
    router,
  ]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSelectRating('0');
    setPrice('0');
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="lg:col-span-1"
    >
      <div
        className="
          sticky top-6
          overflow-hidden
          rounded-3xl
          border border-slate-800/80
          bg-slate-950/80
          shadow-2xl shadow-black/20
          backdrop-blur-2xl
        "
      >
        {/* =========================================
            HEADER
        ========================================= */}
        <div className="relative overflow-hidden border-b border-slate-800/80 p-5">
          {/* Glow */}
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-xl
                  border border-emerald-500/20
                  bg-emerald-500/10
                "
              >
                <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  Filter Services
                </h3>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  Find the right service for you
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="
                group flex items-center gap-1.5
                rounded-lg
                border border-slate-800
                bg-slate-900/80
                px-2.5 py-1.5
                text-[10px] font-medium
                text-slate-500
                transition-all
                hover:border-emerald-500/30
                hover:bg-emerald-500/5
                hover:text-emerald-400
              "
            >
              <RotateCcw className="h-3 w-3 transition-transform group-hover:rotate-180" />
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-6 p-5">
          {/* =========================================
              CATEGORY
          ========================================= */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                Categories
              </label>

              <span className="rounded-full bg-slate-900 px-2 py-1 text-[9px] text-slate-600">
                {categoryNames.length + 1}
              </span>
            </div>

            <div className="space-y-1">
              {["All", ...categoryNames].map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <motion.button
                    key={category}
                    type="button"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      group relative flex w-full items-center justify-between
                      overflow-hidden rounded-xl
                      px-3.5 py-2.5
                      text-left text-xs
                      transition-all duration-200
                      ${
                        isActive
                          ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                          : "border border-transparent text-slate-500 hover:border-slate-800 hover:bg-slate-900 hover:text-slate-200"
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-emerald-400" />
                    )}

                    <span
                      className={`${
                        isActive ? "font-semibold" : "font-medium"
                      }`}
                    >
                      {category}
                    </span>

                    {isActive && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* =========================================
              LOCATION
          ========================================= */}
          <div className="border-t border-slate-800/80 pt-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  Location
                </label>

                <span className="text-[10px] text-slate-600">
                  Choose service area
                </span>
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="
                  w-full appearance-none
                  rounded-xl
                  border border-slate-800
                  bg-slate-900/80
                  px-3.5 py-3
                  pr-9
                  text-xs font-medium
                  text-slate-300
                  outline-none
                  transition-all
                  hover:border-slate-700
                  focus:border-emerald-500/50
                  focus:ring-2
                  focus:ring-emerald-500/10
                "
              >   
                {['All',...locations].map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />
            </div>
          </div>

          {/* =========================================
              RATING
          ========================================= */}
          <div className="border-t border-slate-800/80 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    Minimum Rating
                  </p>

                  <p className="text-[10px] text-slate-600">
                    Technician quality
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-1">
                <span className="text-[11px] font-bold text-amber-400">
                  {Number(selectRating) > 0 ? `${Number(selectRating).toFixed(1)}+` : "Any"}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={selectRating}
              onChange={(e) => setSelectRating(e.target.value)}
              className="
                h-1.5 w-full
                cursor-pointer
                appearance-none
                rounded-full
                bg-slate-800
                accent-amber-400
              "
            />

            <div className="mt-2 flex justify-between text-[9px] font-medium text-slate-700">
              <span>Any</span>
              <span>1★</span>
              <span>2★</span>
              <span>3★</span>
              <span>4★</span>
              <span>5★</span>
            </div>
          </div>

          {/* =========================================
              PRICE
          ========================================= */}
          <div className="border-t border-slate-800/80 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    Max Price
                  </p>

                  <p className="text-[10px] text-slate-600">
                    Your budget limit
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-1">
                <span className="text-[11px] font-bold text-emerald-400">
                  {Number(price) > 0 ? `৳${price}` : "Any"}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="
                h-1.5 w-full
                cursor-pointer
                appearance-none
                rounded-full
                bg-slate-800
                accent-emerald-500
              "
            />

            <div className="mt-2 flex justify-between text-[9px] font-medium text-slate-700">
              <span>৳500</span>
              <span>৳1500</span>
              <span>৳3000+</span>
            </div>
          </div>
        </div>

        {/* =========================================
            FOOTER
        ========================================= */}
        <div className="border-t border-slate-800/80 bg-slate-900/30 px-5 py-3">
          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_7px_rgba(16,185,129,0.7)]" />
            Filters update automatically
          </div>
        </div>
      </div>
    </motion.aside>
  );
};