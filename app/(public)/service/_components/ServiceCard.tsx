"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  MapPin,
  Star,
  Tag,
  UserRound,
  CircleCheck,
  CircleOff,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { IService } from "../../../../utils/type";

type ServiceCardProps = {
  service: IService;
  index?: number;
};

const ServiceCard = ({ service, index = 0 }: ServiceCardProps) => {
  const rating = service?.technician?.avgRating ?? 0;
  const isActive = service?.isActive;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
      }}
      className="
        group relative flex h-full flex-col
        overflow-hidden rounded-[28px]
        border border-slate-800/80
        bg-[#0b1016]
        shadow-[0_15px_50px_rgba(0,0,0,0.18)]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:border-emerald-500/20
        hover:shadow-[0_25px_65px_rgba(16,185,129,0.07)]
      "
    >
      {/* =========================
          TOP ACCENT
      ========================== */}

      <div
        className="
          absolute inset-x-8 top-0 h-px
          bg-gradient-to-r
          from-transparent
          via-emerald-400/70
          to-transparent
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute -right-20 -top-20
          h-44 w-44
          rounded-full
          bg-emerald-500/[0.035]
          blur-3xl
          transition-all duration-500
          group-hover:bg-emerald-500/[0.08]
        "
      />

      <div className="relative flex h-full flex-col p-5">

        {/* =========================
            HEADER
        ========================== */}

        <div className="flex items-center justify-between gap-3">

          {/* Category */}

          <div
            className="
              flex min-w-0 items-center gap-2
              rounded-full
              border border-slate-800
              bg-slate-900/80
              px-3 py-1.5
            "
          >
            <div
              className="
                flex h-5 w-5 items-center justify-center
                rounded-full
                bg-emerald-500/10
              "
            >
              <Tag className="h-2.5 w-2.5 text-emerald-400" />
            </div>

            <span
              className="
                max-w-[120px]
                truncate
                text-[9px]
                font-semibold
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              {service?.category?.name || "Service"}
            </span>
          </div>

          {/* Status */}

          <div
            className={`
              flex shrink-0 items-center gap-1.5
              rounded-full
              border
              px-2.5 py-1.5
              text-[9px]
              font-bold
              ${
                isActive
                  ? `
                    border-emerald-500/15
                    bg-emerald-500/[0.07]
                    text-emerald-400
                  `
                  : `
                    border-red-500/15
                    bg-red-500/[0.06]
                    text-red-400
                  `
              }
            `}
          >
            {isActive ? (
              <CircleCheck className="h-3 w-3" />
            ) : (
              <CircleOff className="h-3 w-3" />
            )}

            {isActive ? "Active" : "Inactive"}
          </div>
        </div>

        {/* =========================
            TITLE
        ========================== */}

        <div className="mt-6">

          <div className="flex items-start gap-2">

            <h3
              className="
                line-clamp-2
                text-[19px]
                font-bold
                leading-6
                tracking-tight
                text-white
                transition-colors duration-300
                group-hover:text-emerald-300
              "
            >
              {service.title}
            </h3>

            <BadgeCheck
              className="
                mt-0.5
                h-4 w-4
                shrink-0
                text-emerald-400/70
              "
            />
          </div>

          <p
            className="
              mt-2.5
              line-clamp-2
              text-[11px]
              leading-5
              text-slate-500
            "
          >
            {service.description}
          </p>
        </div>

        {/* =========================
            RATING
        ========================== */}

        <div className="mt-4 flex items-center gap-2">

          <div
            className="
              flex items-center gap-1.5
              rounded-lg
              border border-amber-500/10
              bg-amber-500/[0.05]
              px-2 py-1.5
            "
          >
            <Star
              className="
                h-3 w-3
                fill-amber-400
                text-amber-400
              "
            />

            <span className="text-[10px] font-bold text-amber-300">
              {rating > 0 ? rating.toFixed(1) : "New"}
            </span>
          </div>

          <span className="text-[9px] text-slate-600">
            Professional service
          </span>
        </div>

        {/* =========================
            TECHNICIAN
        ========================== */}

        <div
          className="
            mt-5
            rounded-2xl
            border border-slate-800/80
            bg-slate-900/40
            p-3
            transition-all duration-300
            group-hover:border-slate-700
            group-hover:bg-slate-900/70
          "
        >

          <div className="flex items-center justify-between gap-3">

            {/* User */}

            <div className="flex min-w-0 items-center gap-3">

              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-slate-700/70
                  bg-slate-800
                  text-slate-400
                  transition-all duration-300
                  group-hover:border-emerald-500/20
                  group-hover:bg-emerald-500/10
                  group-hover:text-emerald-400
                "
              >
                <UserRound className="h-4 w-4" />
              </div>

              <div className="min-w-0">

                <p
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-slate-600
                  "
                >
                  Technician
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-xs
                    font-semibold
                    text-slate-300
                  "
                >
                  {service?.technician?.users?.name ||
                    "Professional Technician"}
                </p>
              </div>
            </div>

            {/* Location */}

            <div
              className="
                flex max-w-[90px]
                items-center gap-1.5
                rounded-lg
                bg-slate-800/50
                px-2 py-1.5
              "
            >
              <MapPin className="h-3 w-3 shrink-0 text-emerald-400" />

              <span
                className="
                  truncate
                  text-[9px]
                  text-slate-500
                "
              >
                {service?.technician?.location ||
                  "Unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* =========================
            FOOTER
        ========================== */}

        <div
          className="
            mt-auto
            flex items-end justify-between
            border-t border-slate-800/70
            pt-5
          "
        >

          {/* Price */}

          <div>

            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-slate-600
              "
            >
              Starting from
            </p>

            <div className="mt-1 flex items-baseline gap-1">

              <span
                className="
                  text-2xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                ৳{service.price}
              </span>

              {service.priceType === "Hourly" && (
                <span className="text-[9px] text-slate-600">
                  /hr
                </span>
              )}
            </div>
          </div>

          {/* Details */}

          <Link href={`/service/${service.id}`}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="
                group/details
                flex items-center gap-2
                rounded-xl
                border border-emerald-500/15
                bg-emerald-500/[0.06]
                px-4 py-2.5
                text-[10px]
                font-bold
                text-emerald-400
                transition-all duration-200
                hover:border-emerald-500/30
                hover:bg-emerald-500/10
              "
            >
              View Details

              <ArrowUpRight
                className="
                  h-3.5 w-3.5
                  transition-transform duration-200
                  group-hover/details:-translate-y-0.5
                  group-hover/details:translate-x-0.5
                "
              />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;