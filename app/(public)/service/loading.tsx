import React from "react";
import ServiceCardSkeleton from "./_loadingskeleton/ServiceCardSkeleton";

const loadingpage = () => {
  return (
    <div className="min-h-screen bg-[#070b0f] px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* Header Skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-800" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-slate-800/70" />
        </div>

        {/* Search Skeleton */}
        <div className="mx-auto mb-8 h-14 max-w-3xl animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />

        {/* Result Summary Skeleton */}
        <div className="mb-5 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 w-40 animate-pulse rounded bg-slate-800" />
            <div className="h-3 w-64 animate-pulse rounded bg-slate-800/70" />
          </div>

          <div className="hidden h-8 w-28 animate-pulse rounded-lg bg-slate-900 sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)] xl:gap-8">

          {/* Sidebar Skeleton */}
          <aside className="hidden lg:block">
            <div
              className="
                sticky top-6 overflow-hidden
                rounded-2xl
                border border-slate-800/80
                bg-slate-900/55
                p-4
                shadow-xl
              "
            >
              {/* Filter Header */}
              <div className="mb-4 border-b border-slate-800/80 pb-4">
                <div className="h-4 w-20 animate-pulse rounded bg-slate-800" />
                <div className="mt-2 h-3 w-28 animate-pulse rounded bg-slate-800/70" />
              </div>

              {/* Categories */}
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-full animate-pulse rounded-xl bg-slate-800/70"
                  />
                ))}
              </div>

              {/* Location */}
              <div className="mt-5 space-y-3 border-t border-slate-800 pt-5">
                <div className="h-3 w-20 animate-pulse rounded bg-slate-800" />
                <div className="h-10 w-full animate-pulse rounded-xl bg-slate-800/70" />
              </div>

              {/* Rating */}
              <div className="mt-5 space-y-3 border-t border-slate-800 pt-5">
                <div className="h-3 w-28 animate-pulse rounded bg-slate-800" />
                <div className="h-2 w-full animate-pulse rounded bg-slate-800" />
              </div>

              {/* Price */}
              <div className="mt-5 space-y-3 border-t border-slate-800 pt-5">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-800" />
                <div className="h-2 w-full animate-pulse rounded bg-slate-800" />
              </div>
            </div>
          </aside>

          {/* Service Cards */}
          <section className="min-w-0">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardSkeleton
                  key={index}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination Skeleton */}
            <section className="mt-10 flex justify-center">
              <div
                className="
                  inline-flex items-center gap-1.5
                  rounded-2xl
                  border border-slate-800/80
                  bg-slate-900/70
                  p-1.5
                  shadow-[0_10px_40px_rgba(0,0,0,0.18)]
                  backdrop-blur-xl
                "
              >
                {/* Previous */}
                <div className="h-9 w-16 animate-pulse rounded-xl bg-slate-800" />

                {/* Page 1 */}
                <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-800" />

                {/* Page 2 */}
                <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-800" />

                {/* Page 3 */}
                <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-800" />

                {/* Dots */}
                <div className="h-9 w-8 animate-pulse rounded-xl bg-slate-800/70" />

                {/* Next */}
                <div className="h-9 w-16 animate-pulse rounded-xl bg-slate-800" />
              </div>
            </section>
          </section>
        </div>

        {/* Bottom Trust Skeleton */}
        <section className="mt-10 border-t border-slate-800/70 pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-48 animate-pulse rounded bg-slate-800" />
              <div className="h-3 w-64 animate-pulse rounded bg-slate-800/70" />
            </div>

            <div className="hidden h-7 w-36 animate-pulse rounded-lg bg-slate-800 sm:block" />
          </div>
        </section>

      </div>
    </div>
  );
};

export default loadingpage;