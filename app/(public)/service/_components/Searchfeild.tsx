"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Searchfeild = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    startTransition(() => {
      router.push(`/service?search=${encodeURIComponent(searchQuery)}`);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-3xl mx-auto relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative flex items-center bg-slate-950/80 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
        <Search className="w-5 h-5 text-slate-400 ml-3.5 mr-2" />

        <input
          type="text"
          placeholder="Search for electrical repair, cleaning, AC maintenance..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="w-full bg-transparent border-none text-slate-200 placeholder-slate-500 text-sm md:text-base focus:outline-none focus:ring-0 px-2 py-2"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleSearch}
          disabled={isPending}
          className="hidden sm:flex items-center gap-1 bg-slate-800/60 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs text-slate-400 font-medium"
        >
          {isPending ? "Searching..." : "Press ↵"}
        </button>
      </div>
    </motion.div>
  );
};

export default Searchfeild;
