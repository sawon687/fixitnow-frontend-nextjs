"use client";

import React from "react";
import { motion } from "framer-motion";

type ServiceCardSkeletonProps = {
  index?: number;
};

const ServiceCardSkeleton = ({
  index = 0,
}: ServiceCardSkeletonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      className="
        relative flex h-full min-h-[330px] flex-col overflow-hidden
        rounded-2xl
        border border-slate-800
        bg-slate-950
        p-5
        shadow-[0_10px_40px_rgba(0,0,0,0.18)]
      "
    >
      {/* Top shimmer line */}
      <div
        className="
          absolute inset-x-0 top-0 h-px
          overflow-hidden
          bg-gradient-to-r
          from-transparent
          via-slate-700
          to-transparent
        "
      />

      {/* Soft background glow */}
      <div
        className="
          pointer-events-none
          absolute -right-16 -top-16
          h-32 w-32
          rounded-full
          bg-slate-800/30
          blur-3xl
        "
      />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          {/* Category skeleton */}
          <div className="skeleton-shimmer h-7 w-24 rounded-lg" />

          {/* Rating skeleton */}
          <div className="skeleton-shimmer h-7 w-14 rounded-lg" />
        </div>

        {/* Content */}
        <div className="mt-5 flex-1">
          {/* Title */}
          <div className="space-y-2">
            <div className="skeleton-shimmer h-5 w-[85%] rounded-md" />
            <div className="skeleton-shimmer h-5 w-[60%] rounded-md" />
          </div>

          {/* Description */}
          <div className="mt-3 space-y-2">
            <div className="skeleton-shimmer h-3.5 w-full rounded-md" />
            <div className="skeleton-shimmer h-3.5 w-[90%] rounded-md" />
          </div>

          {/* Technician */}
          <div
            className="
              mt-5 flex items-center justify-between
              rounded-xl
              border border-slate-800
              bg-slate-900/70
              px-3 py-2.5
            "
          >
            <div className="flex items-center gap-2.5">
              {/* Avatar */}
              <div className="skeleton-shimmer h-8 w-8 shrink-0 rounded-lg" />

              <div className="space-y-1.5">
                {/* Label */}
                <div className="skeleton-shimmer h-2.5 w-14 rounded" />

                {/* Name */}
                <div className="skeleton-shimmer h-3 w-28 rounded" />
              </div>
            </div>

            {/* Location */}
            <div className="skeleton-shimmer h-3 w-20 rounded" />
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            mt-5 flex items-end justify-between
            border-t border-slate-800
            pt-4
          "
        >
          <div className="space-y-2">
            {/* Starting from */}
            <div className="skeleton-shimmer h-2.5 w-20 rounded" />

            {/* Price */}
            <div className="skeleton-shimmer h-7 w-24 rounded-md" />
          </div>

          {/* Button */}
          <div className="skeleton-shimmer h-10 w-24 rounded-xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCardSkeleton;