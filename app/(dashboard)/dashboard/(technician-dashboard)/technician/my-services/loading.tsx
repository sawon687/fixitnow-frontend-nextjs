import React from "react";

const LoadingPage = () => {
  return (
    <main className="min-h-screen bg-[#070b10] text-slate-100">
      <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <div className="h-3 w-24 animate-pulse rounded bg-emerald-500/10" />
            <div className="h-8 w-64 animate-pulse rounded-xl bg-slate-800" />
            <div className="h-3 w-80 max-w-full animate-pulse rounded bg-slate-800/70" />
          </div>

          <div className="flex gap-3">
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-900 border border-slate-800" />
            <div className="h-10 w-32 animate-pulse rounded-xl bg-emerald-500/15" />
          </div>
        </div>

        {/* Profile / Status Banner */}
        <section className="mb-6 overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60">
          <div className="relative p-5 sm:p-6">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/[0.05] blur-3xl" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 animate-pulse rounded-2xl bg-slate-800" />

                <div className="space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-800" />
                  <div className="h-3 w-56 animate-pulse rounded bg-slate-800/70" />
                </div>
              </div>

              <div className="h-9 w-28 animate-pulse rounded-xl bg-emerald-500/10" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="
                relative overflow-hidden rounded-2xl
                border border-slate-800/80
                bg-slate-900/60
                p-5
              "
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/[0.03] blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div className="space-y-3">
                  <div className="h-2.5 w-24 animate-pulse rounded bg-slate-800" />
                  <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-800" />
                  <div className="h-2.5 w-28 animate-pulse rounded bg-slate-800/60" />
                </div>

                <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-800" />
              </div>
            </div>
          ))}
        </section>

        {/* Main Grid */}
        <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
          
          {/* Left */}
          <div className="space-y-6">
            
            {/* Booking Overview */}
            <section className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60">
              <div className="flex items-center justify-between border-b border-slate-800/80 p-5 sm:p-6">
                <div className="space-y-2">
                  <div className="h-4 w-36 animate-pulse rounded bg-slate-800" />
                  <div className="h-2.5 w-52 animate-pulse rounded bg-slate-800/60" />
                </div>

                <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-800" />
              </div>

              {/* Table Header */}
              <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 border-b border-slate-800/70 px-6 py-3 md:grid">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-2.5 animate-pulse rounded bg-slate-800"
                  />
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-800/70">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}>
                    
                    {/* Desktop */}
                    <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_auto] items-center gap-4 px-6 py-5 md:grid">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-800" />

                        <div className="space-y-2">
                          <div className="h-3 w-32 animate-pulse rounded bg-slate-800" />
                          <div className="h-2.5 w-24 animate-pulse rounded bg-slate-800/60" />
                        </div>
                      </div>

                      <div className="h-3 w-24 animate-pulse rounded bg-slate-800" />

                      <div className="h-6 w-20 animate-pulse rounded-lg bg-slate-800" />

                      <div className="space-y-2">
                        <div className="h-3 w-20 animate-pulse rounded bg-slate-800" />
                        <div className="h-2.5 w-16 animate-pulse rounded bg-slate-800/60" />
                      </div>

                      <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-800" />
                    </div>

                    {/* Mobile */}
                    <div className="space-y-4 p-4 md:hidden">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-800" />

                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-32 animate-pulse rounded bg-slate-800" />
                          <div className="h-2.5 w-24 animate-pulse rounded bg-slate-800/60" />
                        </div>

                        <div className="h-6 w-16 animate-pulse rounded-lg bg-slate-800" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-10 animate-pulse rounded-xl bg-slate-800/60" />
                        <div className="h-10 animate-pulse rounded-xl bg-slate-800/60" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6">
              <div className="mb-5 space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
                <div className="h-2.5 w-48 animate-pulse rounded bg-slate-800/60" />
              </div>

              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/40 p-3"
                  >
                    <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-800" />

                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-40 animate-pulse rounded bg-slate-800" />
                      <div className="h-2.5 w-28 animate-pulse rounded bg-slate-800/60" />
                    </div>

                    <div className="h-5 w-16 animate-pulse rounded-md bg-slate-800" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            
            {/* Availability */}
            <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-800" />
                  <div className="h-2.5 w-40 animate-pulse rounded bg-slate-800/60" />
                </div>

                <div className="h-8 w-12 animate-pulse rounded-full bg-slate-800" />
              </div>

              <div className="mt-6 space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/40 p-3"
                  >
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-800" />
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-800/60" />
                  </div>
                ))}
              </div>
            </section>

            {/* Performance */}
            <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6">
              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
                <div className="h-2.5 w-44 animate-pulse rounded bg-slate-800/60" />
              </div>

              <div className="mt-6 space-y-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index}>
                    <div className="mb-2 flex justify-between">
                      <div className="h-2.5 w-24 animate-pulse rounded bg-slate-800" />
                      <div className="h-2.5 w-10 animate-pulse rounded bg-slate-800" />
                    </div>

                    <div className="h-2 w-full animate-pulse rounded-full bg-slate-800" />
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Action */}
            <section className="rounded-3xl border border-emerald-500/10 bg-gradient-to-br from-emerald-500/[0.05] to-cyan-500/[0.03] p-5 sm:p-6">
              <div className="h-5 w-32 animate-pulse rounded bg-slate-800" />

              <div className="mt-3 space-y-2">
                <div className="h-2.5 w-full animate-pulse rounded bg-slate-800/60" />
                <div className="h-2.5 w-4/5 animate-pulse rounded bg-slate-800/60" />
              </div>

              <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-emerald-500/10" />
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default LoadingPage;