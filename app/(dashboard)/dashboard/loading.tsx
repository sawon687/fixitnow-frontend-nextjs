import React from "react";

const CustomerDashboardSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse bg-[#080b12] text-white">
      <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">

        {/* Header Skeleton */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="h-3 w-32 rounded-full bg-slate-800" />
            <div className="h-8 w-64 rounded-lg bg-slate-800" />
            <div className="h-4 w-96 max-w-full rounded bg-slate-800/70" />
          </div>

          <div className="h-11 w-40 rounded-xl bg-slate-800" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-slate-800 bg-[#0d111a] p-5"
            >
              <div className="h-11 w-11 rounded-xl bg-slate-800" />

              <div className="mt-5 space-y-3">
                <div className="h-3 w-24 rounded bg-slate-800" />
                <div className="h-8 w-20 rounded-lg bg-slate-800" />
                <div className="h-3 w-32 rounded bg-slate-800/70" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

          {/* Upcoming Booking */}
          <div className="rounded-3xl border border-slate-800 bg-[#0d111a]">
            <div className="flex items-center justify-between border-b border-slate-800 p-5 sm:p-6">
              <div className="space-y-2">
                <div className="h-5 w-40 rounded bg-slate-800" />
                <div className="h-3 w-52 rounded bg-slate-800/70" />
              </div>

              <div className="h-4 w-16 rounded bg-slate-800" />
            </div>

            <div className="p-5 sm:p-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">

                {/* Booking Header */}
                <div className="flex justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="h-11 w-11 rounded-xl bg-slate-800" />

                    <div className="space-y-2">
                      <div className="h-4 w-48 rounded bg-slate-800" />
                      <div className="h-3 w-28 rounded bg-slate-800/70" />
                    </div>
                  </div>

                  <div className="h-6 w-20 rounded-full bg-slate-800" />
                </div>

                {/* Booking Info */}
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-slate-800 bg-slate-900/50 p-3"
                    >
                      <div className="h-3 w-16 rounded bg-slate-800" />
                      <div className="mt-3 h-4 w-24 rounded bg-slate-800" />
                    </div>
                  ))}
                </div>

                {/* Technician */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-800" />

                    <div className="space-y-2">
                      <div className="h-3 w-28 rounded bg-slate-800" />
                      <div className="h-2.5 w-20 rounded bg-slate-800/70" />
                    </div>
                  </div>

                  <div className="h-10 w-32 rounded-xl bg-slate-800" />
                </div>

              </div>
            </div>
          </div>

          {/* Spending */}
          <div className="rounded-3xl border border-slate-800 bg-[#0d111a] p-5 sm:p-6">

            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-5 w-36 rounded bg-slate-800" />
                <div className="h-3 w-40 rounded bg-slate-800/70" />
              </div>

              <div className="h-10 w-10 rounded-xl bg-slate-800" />
            </div>

            <div className="mt-7 space-y-3">
              <div className="h-3 w-20 rounded bg-slate-800" />
              <div className="h-9 w-32 rounded-lg bg-slate-800" />
            </div>

            {/* Chart */}
            <div className="mt-8 flex h-32 items-end gap-2">
              {[45, 60, 40, 75, 55, 85, 65, 90, 70, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    style={{ height: `${height}%` }}
                    className="flex-1 rounded-t-md bg-slate-800"
                  />
                )
              )}
            </div>

          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-[#0d111a]">

          <div className="flex items-center justify-between border-b border-slate-800 p-5 sm:p-6">
            <div className="space-y-2">
              <div className="h-5 w-36 rounded bg-slate-800" />
              <div className="h-3 w-52 rounded bg-slate-800/70" />
            </div>

            <div className="h-4 w-16 rounded bg-slate-800" />
          </div>

          <div className="divide-y divide-slate-800">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6"
              >
                <div className="flex flex-1 items-center gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-800" />

                  <div className="space-y-2">
                    <div className="h-4 w-44 rounded bg-slate-800" />
                    <div className="h-3 w-32 rounded bg-slate-800/70" />
                  </div>
                </div>

                <div className="h-3 w-24 rounded bg-slate-800" />

                <div className="h-4 w-16 rounded bg-slate-800" />

                <div className="h-6 w-20 rounded-full bg-slate-800" />

                <div className="h-9 w-9 rounded-lg bg-slate-800" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Quick Actions */}
          <div className="rounded-3xl border border-slate-800 bg-[#0d111a] p-5 sm:p-6">

            <div className="space-y-2">
              <div className="h-5 w-32 rounded bg-slate-800" />
              <div className="h-3 w-40 rounded bg-slate-800/70" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-800" />

                  <div className="mt-4 h-4 w-24 rounded bg-slate-800" />

                  <div className="mt-2 h-3 w-28 rounded bg-slate-800/70" />
                </div>
              ))}
            </div>
          </div>

          {/* Review */}
          <div className="rounded-3xl border border-slate-800 bg-[#0d111a] p-5 sm:p-6">

            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-slate-800" />
                <div className="h-3 w-40 rounded bg-slate-800/70" />
              </div>

              <div className="h-5 w-5 rounded bg-slate-800" />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-5">

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-800" />

                <div className="space-y-2">
                  <div className="h-3 w-28 rounded bg-slate-800" />
                  <div className="h-2.5 w-36 rounded bg-slate-800/70" />
                </div>

                <div className="ml-auto h-4 w-20 rounded bg-slate-800" />
              </div>

              <div className="mt-5 space-y-2">
                <div className="h-3 w-full rounded bg-slate-800" />
                <div className="h-3 w-5/6 rounded bg-slate-800" />
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CustomerDashboardSkeleton;