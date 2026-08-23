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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = () => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    const value = searchQuery.trim();

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    // New search হলে page 1
    params.delete("page");

    startTransition(() => {
      const queryString = params.toString();

      router.push(
        queryString
          ? `/service?${queryString}`
          : "/service",
        {
          scroll: false,
        }
      );
    });
  };

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const handleClear = () => {
    setSearchQuery("");

    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.delete("search");
    params.delete("page");

    startTransition(() => {
      const queryString = params.toString();

      router.push(
        queryString
          ? `/service?${queryString}`
          : "/service",
        {
          scroll: false,
        }
      );
    });
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setSearchQuery(value);

  
    if (!value.trim()) {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      params.delete("search");
      params.delete("page");

      startTransition(() => {
        const queryString = params.toString();

        router.push(
          queryString
            ? `/service?${queryString}`
            : "/service",
          {
            scroll: false,
          }
        );
      });
    }
  };

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!isPending) {
        handleSearch();
      }
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: 0.15,
      }}
      className="mx-auto w-full max-w-3xl"
    >
      {/* ==========================================
          SEARCH WRAPPER
      ========================================== */}

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

        {/* ==========================================
            SEARCH BOX
        ========================================== */}

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

          {/* ========================================
              SEARCH ICON
          ======================================== */}

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
              <Loader2
                className="
                  h-4
                  w-4
                  animate-spin
                  text-emerald-400
                "
              />
            ) : (
              <Search
                className="
                  h-4
                  w-4
                  text-slate-500
                  transition-colors
                  group-focus-within:text-emerald-400
                "
              />
            )}
          </div>

          {/* ========================================
              INPUT
          ======================================== */}

          <div className="min-w-0 flex-1">

            <input
              type="text"
              value={searchQuery}
              placeholder="Search services, repairs, cleaning..."
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isPending}
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
                disabled:cursor-not-allowed
                md:text-[15px]
              "
            />

            {/* Small Hint */}

            <div
              className="
                hidden
                items-center
                gap-1.5
                px-2
                pb-1
                sm:flex
              "
            >
              <Sparkles
                className="
                  h-2.5
                  w-2.5
                  text-emerald-500/60
                "
              />

              <span
                className="
                  text-[9px]
                  text-slate-700
                "
              >
                Find trusted professionals near you
              </span>
            </div>
          </div>

          {/* ========================================
              CLEAR BUTTON
          ======================================== */}

          {searchQuery && (
            <motion.button
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              type="button"
              onClick={handleClear}
              disabled={isPending}
              aria-label="Clear search"
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}

          {/* ========================================
              SEARCH BUTTON
          ======================================== */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
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
                <Loader2
                  className="
                    h-3.5
                    w-3.5
                    animate-spin
                  "
                />

                <span className="hidden sm:inline">
                  Searching
                </span>
              </>
            ) : (
              <>
                <span>Search</span>

                <ArrowRight
                  className="
                    h-3.5
                    w-3.5
                  "
                />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Searchfeild;