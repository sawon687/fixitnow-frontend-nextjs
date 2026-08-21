"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const Searchfeild = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchparams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams(searchparams.toString());

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`/service?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSearchQuery("");

    const params = new URLSearchParams(searchparams.toString());
    params.delete("search");

    startTransition(() => {
      router.push(`/service?${params.toString()}`);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="mx-auto w-full max-w-3xl"
    >
      {/* Search Wrapper */}
      <div className="group relative">
        {/* Animated Glow */}
        <div
          className="
            absolute
            -inset-[1px]
            rounded-[1.35rem]
            bg-gradient-to-r
            from-emerald-500/40
            via-teal-400/20
            to-emerald-500/40
            opacity-0
            blur-sm
            transition-all
            duration-500
            group-focus-within:opacity-100
            group-hover:opacity-70
          "
        />

        {/* Search Box */}
        <div
          className="
            relative
            flex
            min-h-[62px]
            items-center
            gap-2
            rounded-[1.25rem]
            border
            border-slate-800
            bg-slate-950/90
            px-2
            shadow-2xl
            shadow-black/20
            backdrop-blur-2xl
            transition-all
            duration-300
            group-focus-within:border-emerald-500/30
            group-focus-within:shadow-emerald-500/5
          "
        >
          {/* Search Icon */}
          <div
            className="
              ml-2
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              transition-all
              duration-300
              group-focus-within:border-emerald-500/20
              group-focus-within:bg-emerald-500/10
            "
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
            ) : (
              <Search className="h-4 w-4 text-slate-500 transition-colors group-focus-within:text-emerald-400" />
            )}
          </div>

          {/* Input */}
          <div className="min-w-0 flex-1">
            <input
              type="text"
              placeholder="Search services, repairs, cleaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="
                w-full
                bg-transparent
                px-2
                py-2
                text-sm
                font-medium
                text-slate-200
                outline-none
                placeholder:text-slate-600
                md:text-[15px]
              "
            />

            {/* Small hint */}
            <div className="hidden items-center gap-1.5 px-2 pb-1 sm:flex">
              <Sparkles className="h-2.5 w-2.5 text-emerald-500/60" />

              <span className="text-[9px] text-slate-700">
                Find trusted professionals near you
              </span>
            </div>
          </div>

          {/* Clear Button */}
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              type="button"
              onClick={handleClear}
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-slate-600
                transition-all
                hover:bg-slate-800
                hover:text-slate-300
              "
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleSearch}
            disabled={isPending}
            className="
              flex
              h-10
              shrink-0
              items-center
              gap-2
              rounded-xl
              bg-emerald-500
              px-4
              text-xs
              font-bold
              text-slate-950
              shadow-lg
              shadow-emerald-500/10
              transition-all
              hover:bg-emerald-400
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:px-5
            "
          >
            {isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span className="hidden sm:inline">
                  Searching
                </span>
              </>
            ) : (
              <>
                <span>Search</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Bottom Suggestions */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="text-[10px] text-slate-700">
          Popular:
        </span>

        {["AC Repair", "Cleaning", "Electrical", "Plumbing"].map(
          (item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setSearchQuery(item);

                const params = new URLSearchParams(
                  searchparams.toString()
                );

                params.set("search", item);

                startTransition(() => {
                  router.push(`/service?${params.toString()}`);
                });
              }}
              className="
                text-[10px]
                font-medium
                text-slate-600
                transition-colors
                hover:text-emerald-400
              "
            >
              {item}
            </button>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Searchfeild;