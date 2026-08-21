"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  MapPin,
  Star,
  Tag,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { IService } from "../../../../utils/type";

type ServiceCardProps = {
  service: IService;
  index?: number;
};

const ServiceCard = ({ service, index = 0 }: ServiceCardProps) => {
  const rating = service.technician.avgRating;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
      }}
      className="
        group relative flex h-full flex-col
        overflow-hidden rounded-[26px]
        border border-slate-800/80
        bg-slate-950/90
        shadow-[0_12px_40px_rgba(0,0,0,0.16)]
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-emerald-500/25
        hover:shadow-[0_20px_55px_rgba(16,185,129,0.08)]
      "
    >
      {/* Top glow */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r
          from-transparent via-emerald-400 to-transparent
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-16 -top-16
          h-36 w-36
          rounded-full
          bg-emerald-500/[0.04]
          blur-3xl
          transition-all duration-500
          group-hover:bg-emerald-500/[0.09]
        "
      />

      <div className="relative flex h-full flex-col p-5">

        {/* ================================
            CATEGORY + RATING
        ================================= */}

        <div className="flex items-center justify-between">

          <div
            className="
              inline-flex items-center gap-1.5
              rounded-lg
              border border-emerald-500/15
              bg-emerald-500/[0.06]
              px-2.5 py-1.5
              text-[10px]
              font-semibold
              text-emerald-400
            "
          >
            <Tag className="h-3 w-3" />

            <span className="max-w-[150px] truncate">
              {service.category.name}
            </span>
          </div>

          <div
            className="
              flex items-center gap-1
              rounded-lg
              border border-amber-500/15
              bg-amber-500/[0.06]
              px-2 py-1.5
            "
          >
            <Star
              className="h-3 w-3 fill-amber-400 text-amber-400"
            />

            <span className="text-[10px] font-bold text-amber-400">
              {rating ? rating.toFixed(1) : "New"}
            </span>
          </div>

        </div>

        {/* ================================
            CONTENT
        ================================= */}

        <div className="mt-5 flex-1">

          <div className="flex items-start gap-2.5">

            <h3
              className="
                line-clamp-2
                text-[18px]
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
                mt-1
                h-4 w-4
                shrink-0
                text-emerald-400
                opacity-70
              "
            />

          </div>

          <p
            className="
              mt-3
              line-clamp-2
              text-xs
              leading-5
              text-slate-500
            "
          >
            {service.description}
          </p>

          {/* Technician */}

          <div
            className="
              mt-5
              flex items-center justify-between
              rounded-xl
              border border-slate-800/70
              bg-slate-900/50
              px-3 py-2.5
            "
          >

            <div className="flex min-w-0 items-center gap-2.5">

              <div
                className="
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-slate-800
                  text-slate-400
                  transition-colors
                  group-hover:bg-emerald-500/10
                  group-hover:text-emerald-400
                "
              >
                <UserRound className="h-4 w-4" />
              </div>

              <div className="min-w-0">

                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  Technician
                </p>

                <p className="truncate text-xs font-semibold text-slate-300">
                  {service.technician.name ||
                    "Professional Technician"}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-1">

              <MapPin className="h-3 w-3 text-emerald-400" />

              <span
                className="
                  max-w-[75px]
                  truncate
                  text-[10px]
                  text-slate-500
                "
              >
                {service.technician.location ||
                  "Location unavailable"}
              </span>

            </div>

          </div>

        </div>

        {/* ================================
            FOOTER
        ================================= */}

        <div
          className="
            mt-5
            flex items-center justify-between
            border-t border-slate-800/70
            pt-4
          "
        >

          {/* Price */}

          <div>

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-slate-600
              "
            >
              Starting from
            </p>

            <div className="mt-0.5 flex items-baseline gap-1">

              <span className="text-xl font-black text-white">
                ৳{service.price}
              </span>

              {service.priceType === "Hourly" && (
                <span className="text-[10px] text-slate-600">
                  /hr
                </span>
              )}

            </div>

          </div>

          {/* Details Button */}

          <Link href={`/service/${service.id}`}>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                group/details
                inline-flex
                items-center
                gap-2
                rounded-xl
                border border-slate-700
                bg-slate-900
                px-3.5
                py-2.5
                text-xs
                font-semibold
                text-slate-300
                transition-all duration-200
                hover:border-emerald-500/30
                hover:bg-emerald-500/[0.07]
                hover:text-emerald-400
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