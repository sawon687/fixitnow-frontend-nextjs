import React from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  ShieldCheck,
  Clock3,
  Sparkles,
} from "lucide-react";

const Loadingpage = () => {
  return (
    <main className="min-h-screen bg-[#070b10] text-white">
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-500/[0.05] blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          
          {/* Top navigation */}
          <div className="mb-7 flex items-center justify-between">
            <div className="flex h-10 w-36 animate-pulse items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3.5">
              <ArrowLeft className="h-4 w-4 text-slate-700" />
              <div className="h-2.5 w-20 rounded bg-slate-800" />
            </div>

            <div className="hidden h-7 w-40 animate-pulse rounded-full border border-emerald-500/10 bg-emerald-500/[0.04] sm:block" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            
            {/* Left content */}
            <div className="space-y-6">

              {/* Service overview */}
              <section className="relative overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-900/60 shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

                <div className="p-6 sm:p-8">
                  
                  <div className="flex gap-2">
                    <div className="h-7 w-28 animate-pulse rounded-lg bg-emerald-500/[0.06]" />
                    <div className="h-7 w-20 animate-pulse rounded-lg bg-slate-800/70" />
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="h-9 w-4/5 animate-pulse rounded-xl bg-slate-800" />
                    <div className="h-9 w-2/5 animate-pulse rounded-xl bg-slate-800" />
                  </div>

                  <div className="mt-5 max-w-2xl space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-slate-800/70" />
                    <div className="h-3 w-11/12 animate-pulse rounded bg-slate-800/70" />
                    <div className="h-3 w-3/5 animate-pulse rounded bg-slate-800/70" />
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <div className="h-10 w-32 animate-pulse rounded-xl bg-amber-500/[0.05]" />
                    <div className="h-10 w-44 animate-pulse rounded-xl bg-slate-800/60" />
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border-t border-slate-800/80 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="h-2.5 w-24 animate-pulse rounded bg-slate-800" />
                      <div className="mt-2 h-10 w-36 animate-pulse rounded-lg bg-slate-800" />
                    </div>

                    <div className="h-6 w-44 animate-pulse rounded-lg bg-slate-800/70" />
                  </div>
                </div>
              </section>

              {/* Technician profile */}
              <section className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-900/60 shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
                
                <div className="border-b border-slate-800/80 px-6 py-5 sm:px-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-2.5 w-28 animate-pulse rounded bg-emerald-500/10" />
                      <div className="mt-2 h-5 w-48 animate-pulse rounded bg-slate-800" />
                    </div>

                    <div className="hidden h-7 w-28 animate-pulse rounded-lg bg-emerald-500/[0.05] sm:block" />
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    
                    {/* Avatar */}
                    <div className="relative">
                      <div className="h-24 w-24 animate-pulse rounded-[20px] bg-slate-800" />
                    </div>

                    <div className="flex-1">
                      <div className="h-6 w-52 animate-pulse rounded-lg bg-slate-800" />

                      <div className="mt-3 flex flex-wrap gap-3">
                        <div className="h-4 w-28 animate-pulse rounded bg-slate-800/70" />
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-800/70" />
                        <div className="h-4 w-14 animate-pulse rounded bg-slate-800/70" />
                      </div>
                    </div>
                  </div>

                  {/* Small stats */}
                  <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                      >
                        <div className="h-5 w-5 animate-pulse rounded bg-slate-800" />
                        <div className="mt-3 h-3 w-20 animate-pulse rounded bg-slate-800" />
                        <div className="mt-2 h-2.5 w-24 animate-pulse rounded bg-slate-800/60" />
                      </div>
                    ))}
                  </div>

                  {/* Bio */}
                  <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-950/50 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-4 w-4 animate-pulse rounded bg-emerald-500/10" />
                      <div className="h-3 w-32 animate-pulse rounded bg-slate-800" />
                    </div>

                    <div className="space-y-2">
                      <div className="h-3 w-full animate-pulse rounded bg-slate-800/70" />
                      <div className="h-3 w-11/12 animate-pulse rounded bg-slate-800/70" />
                      <div className="h-3 w-2/3 animate-pulse rounded bg-slate-800/70" />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Booking sidebar */}
            <aside className="lg:sticky lg:top-6">
              <div className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-900/90 shadow-[0_25px_80px_rgba(0,0,0,0.3)]">
                
                <div className="border-b border-slate-800/80 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="h-2.5 w-28 animate-pulse rounded bg-emerald-500/10" />

                      <div className="mt-3 h-6 w-40 animate-pulse rounded-lg bg-slate-800" />

                      <div className="mt-2 h-3 w-52 animate-pulse rounded bg-slate-800/70" />
                    </div>

                    <div className="h-10 w-10 animate-pulse rounded-xl bg-emerald-500/[0.05]" />
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  
                  {/* Price */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-800" />
                      <div className="h-6 w-20 animate-pulse rounded bg-slate-800" />
                    </div>

                    <div className="my-3 h-px bg-slate-800" />

                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-800" />
                      <div className="h-6 w-16 animate-pulse rounded-lg bg-slate-800" />
                    </div>
                  </div>

                  {/* Booking benefits */}
                  <div className="space-y-3">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-950/40 p-3"
                      >
                        <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-800" />

                        <div className="space-y-2">
                          <div className="h-2.5 w-32 animate-pulse rounded bg-slate-800" />
                          <div className="h-2 w-24 animate-pulse rounded bg-slate-800/60" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Booking button */}
                  <div className="h-12 w-full animate-pulse rounded-xl bg-emerald-500/20" />

                  <div className="mx-auto h-2.5 w-52 animate-pulse rounded bg-slate-800/60" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loadingpage;