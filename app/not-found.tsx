
"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6 text-white">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30">
          <Wrench className="h-7 w-7 text-blue-400" />
        </div>

        {/* 404 */}
        <div className="relative">
          <h1 className="select-none text-[130px] font-black leading-none tracking-tighter text-transparent sm:text-[180px] bg-gradient-to-b from-white via-zinc-300 to-zinc-700 bg-clip-text">
            404
          </h1>

          <div className="absolute inset-0 -z-10 text-[130px] font-black leading-none tracking-tighter text-blue-500/10 blur-2xl sm:text-[180px]">
            404
          </div>
        </div>

        {/* Content */}
        <div className="mt-2">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Page not found
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
            Sorry, we couldn't find the page you're looking for.
            It may have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 text-sm font-medium text-zinc-200 transition-all hover:border-zinc-700 hover:bg-zinc-800 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

        {/* Search hint */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-zinc-600">
          <Search className="h-3.5 w-3.5" />
          <span>Check the URL and try again</span>
        </div>

        {/* Brand */}
        <div className="mt-12 border-t border-zinc-900 pt-6">
          <p className="text-xs font-medium tracking-wide text-zinc-600">
            FIXIT<span className="text-blue-500">NOW</span>
          </p>
        </div>
      </div>
    </main>
  );
}