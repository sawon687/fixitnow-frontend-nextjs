"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { IService } from "../../../../utils/type";

const Pagenation = ({
  filterService,
  totalPage,
}: {
  filterService: IService[];
  totalPage: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.max(
    1,
    Number(totalPage) || 1
  );

  // URL থেকে page
  const urlPage = Number(
    searchParams.get("page") || 1
  );

  // Invalid page হলে 1
  const initialPage = Math.min(
    Math.max(urlPage, 1),
    totalPages
  );

  const [action, setAction] =
    useState<number>(initialPage);

  // ==========================================
  // URL CHANGE হলে STATE UPDATE
  // ==========================================

  useEffect(() => {
    const currentPage = Number(
      searchParams.get("page") || 1
    );

    const safePage = Math.min(
      Math.max(currentPage, 1),
      totalPages
    );

    if (safePage !== action) {
      setAction(safePage);
    }
  }, [searchParams, totalPages]);

  // ==========================================
  // PAGE CHANGE হলে URL UPDATE
  // ==========================================

  useEffect(() => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    const currentUrlPage = Number(
      params.get("page") || 1
    );

    if (currentUrlPage === action) {
      return;
    }

    // কখনো 0 হতে দিবো না
    const safePage = Math.min(
      Math.max(action, 1),
      totalPages
    );

    if (safePage === 1) {
      params.delete("page");
    } else {
      params.set(
        "page",
        String(safePage)
      );
    }

    router.push(
      `/service?${params.toString()}`,
      {
        scroll: false,
      }
    );
  }, [
    action,
    router,
    searchParams,
    totalPages,
  ]);

  // ==========================================
  // PAGE ARRAY
  // ==========================================

  const pages = useMemo(() => {
    return Array.from(
      {
        length: totalPages,
      },
      (_, index) => index + 1
    );
  }, [totalPages]);

  

  const visiblePage = useMemo(() => {
    if (totalPages <= 5) {
      return pages;
    }

    if (action <= 3) {
      return pages.slice(0, 5);
    }

    if (action >= totalPages - 2) {
      return pages.slice(
        totalPages - 5,
        totalPages
      );
    }

    return pages.slice(
      action - 2,
      action + 1
    );
  }, [
    pages,
    action,
    totalPages,
  ]);

  // ==========================================
  // PREVIOUS
  // ==========================================

  const handlePrevious = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    if (action <= 1) return;

    setAction((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  // ==========================================
  // NEXT
  // ==========================================

  const handleNext = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    if (action >= totalPages) return;

    setAction((prev) =>
      Math.min(prev + 1, totalPages)
    );
  };

  // ==========================================
  // PAGE CLICK
  // ==========================================

  const handlePageClick = (
    e: React.MouseEvent,
    page: number
  ) => {
    e.preventDefault();

    if (page < 1 || page > totalPages) {
      return;
    }

    setAction(page);
  };

  return (
    <div>
      {/* ========================================
          PAGINATION
      ======================================== */}

      <section className="mt-10 flex justify-center">
        <Pagination>
          <PaginationContent
            className="
              gap-1.5
              rounded-2xl
              border
              border-slate-800/80
              bg-slate-900/70
              p-1.5
              shadow-[0_10px_40px_rgba(0,0,0,0.18)]
              backdrop-blur-xl
            "
          >
            {/* ==================================
                PREVIOUS
            ================================== */}

            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevious}
                aria-disabled={
                  action === 1
                }
                className={`
                  h-9
                  rounded-xl
                  border
                  border-transparent
                  px-3
                  text-xs
                  transition-all

                  ${
                    action === 1
                      ? `
                        pointer-events-none
                        cursor-not-allowed
                        opacity-30
                      `
                      : `
                        text-slate-500
                        hover:border-slate-700
                        hover:bg-slate-800
                        hover:text-slate-200
                      `
                  }
                `}
              />
            </PaginationItem>

            {/* ==================================
                PAGE NUMBERS
            ================================== */}

            {visiblePage.map((item) => (
              <PaginationItem
                key={item}
              >
                <PaginationLink
                  href={`?page=${item}`}
              
                  onClick={(e) =>
                    handlePageClick(
                      e,
                      item
                    )
                  }
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
                        ? `
                          border-emerald-500/30
                          bg-emerald-600
                          font-bold
                          text-white
                          shadow-lg
                          shadow-emerald-600/20
                        `
                        : `
                          border-transparent
                          bg-transparent
                          text-slate-500
                          hover:border-slate-700
                          hover:bg-slate-800
                          hover:text-slate-200
                        `
                    }
                  `}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* ==================================
                ELLIPSIS
            ================================== */}

            {totalPages > 5 &&
              action < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis
                      className="
                        h-9
                        w-8
                        text-slate-600
                      "
                    />
                  </PaginationItem>

                  {/* LAST PAGE */}

                  <PaginationItem>
                    <PaginationLink
                      href={`?page=${totalPages}`}
                      isActive={
                        action === totalPages
                      }
                      onClick={(e) =>
                        handlePageClick(
                          e,
                          totalPages
                        )
                      }
                      className={`
                        h-9
                        w-9
                        rounded-xl
                        border
                        text-xs
                        font-medium

                        ${
                          action ===
                          totalPages
                            ? `
                              border-emerald-500/30
                              bg-emerald-600
                              text-white
                            `
                            : `
                              border-transparent
                              text-slate-500
                              hover:border-slate-700
                              hover:bg-slate-800
                              hover:text-slate-200
                            `
                        }
                      `}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

            {/* ==================================
                NEXT
            ================================== */}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNext}
                aria-disabled={
                  action === totalPages
                }
                className={`
                  h-9
                  rounded-xl
                  border
                  border-transparent
                  px-3
                  text-xs
                  transition-all

                  ${
                    action === totalPages
                      ? `
                        pointer-events-none
                        cursor-not-allowed
                        opacity-30
                      `
                      : `
                        text-slate-500
                        hover:border-slate-700
                        hover:bg-slate-800
                        hover:text-slate-200
                      `
                  }
                `}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>

      {/* ========================================
          TRUST AREA
      ======================================== */}

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
              Choose a service and book a qualified
              technician.
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