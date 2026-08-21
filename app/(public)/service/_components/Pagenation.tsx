"use client";

import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Pagenation = ({ filterService }: { filterService: any[] }) => {
  if (!filterService?.length) return null;
  const [action, setAction] = useState<number | undefined>(undefined);
  const page = [1, 2, 3, 4, 5];

  useEffect(()=>{
     
},)

  return (
    <div>
   
      <section className="mt-10 flex justify-center">
        <Pagination>
          <PaginationContent
            className="
              gap-1.5
              rounded-2xl
              border border-slate-800/80
              bg-slate-900/70
              p-1.5
              shadow-[0_10px_40px_rgba(0,0,0,0.18)]
              backdrop-blur-xl
            "
          >
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="
                  h-9
                  rounded-xl
                  border
                  border-transparent
                  px-3
                  text-xs
                  text-slate-500
                  hover:border-slate-700
                  hover:bg-slate-800
                  hover:text-slate-200
                "
              />
            </PaginationItem>

            {/* Page number */}
           {page.map((item) => (
      <PaginationItem key={item}>
    <PaginationLink
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setAction(item);
      }}
      className={`
        h-9
        w-9
        rounded-xl
        border
        text-xs
        font-medium
        transition-all

        ${
          action === item
            ? "border-indigo-500/20 bg-emerald-600 font-bold text-white shadow-lg shadow-indigo-600/20"
            : "border-transparent bg-transparent text-slate-500 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-200"
        }
      `}
    >
      {item}
    </PaginationLink>
  </PaginationItem>
))}

            {/* Dots */}
            <PaginationItem>
              <PaginationEllipsis className="h-9 w-8 text-slate-600" />
            </PaginationItem>

            {/* Page last */}
            <PaginationItem>
              <PaginationLink
                href="#"
                className="
                  h-9
                  w-9
                  rounded-xl
                  border
                  border-transparent
                  text-xs
                  font-medium
                  text-slate-500
                  hover:border-slate-700
                  hover:bg-slate-800
                  hover:text-slate-200
                "
              >
                10
              </PaginationLink>
            </PaginationItem>

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                className="
                  h-9
                  rounded-xl
                  border
                  border-transparent
                  px-3
                  text-xs
                  text-slate-500
                  hover:border-slate-700
                  hover:bg-slate-800
                  hover:text-slate-200
                "
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>

      {/* ================= TRUST AREA ================= */}
      <section className="mt-10 border-t border-slate-800/70 pt-6">
        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p className="text-xs font-semibold text-slate-400">
              Trusted professionals, quality service
            </p>

            <p className="mt-1 text-[10px] text-slate-600">
              Choose a service and book a qualified technician.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_8px_rgba(52,211,153,0.7)]
              "
            />

            <span className="text-[10px] font-medium text-slate-600">
              Verified Service Providers
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pagenation;
