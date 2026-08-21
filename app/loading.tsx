import React from "react";

const shimmer =
  "animate-pulse bg-zinc-800/80 rounded-lg";

const softShimmer =
  "animate-pulse bg-zinc-800/50 rounded-lg";

export default function loadingpage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* =====================================================
          HERO SKELETON
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-zinc-800">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-[120px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          {/* Hero Left */}

          <div>
            {/* Badge */}
            <div className={`mb-5 h-7 w-52 ${softShimmer}`} />

            {/* Heading */}
            <div className="space-y-3">
              <div className={`h-12 w-[85%] sm:h-14 lg:h-16 ${shimmer}`} />
              <div className={`h-12 w-[65%] sm:h-14 lg:h-16 ${shimmer}`} />
            </div>

            {/* Description */}
            <div className="mt-6 max-w-xl space-y-2">
              <div className={`h-4 w-full ${softShimmer}`} />
              <div className={`h-4 w-[92%] ${softShimmer}`} />
              <div className={`h-4 w-[70%] ${softShimmer}`} />
            </div>

            {/* Search */}
            <div
              className="
                mt-8 flex max-w-2xl
                flex-col gap-2
                rounded-2xl
                border border-zinc-800
                bg-zinc-900/70
                p-2
                sm:flex-row
              "
            >
              <div className="h-12 flex-1 rounded-xl bg-zinc-800/70" />

              <div className="h-12 w-full rounded-xl bg-zinc-800 sm:w-40" />
            </div>

            {/* Trust Items */}
            <div className="mt-7 flex flex-wrap gap-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <div className="h-4 w-4 rounded-full bg-zinc-800" />
                  <div className="h-3 w-28 rounded bg-zinc-800/60" />
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}

          <div className="relative">
            <div
              className="
                relative overflow-hidden
                rounded-[2rem]
                border border-zinc-800
                bg-zinc-900
                p-3
                shadow-2xl
              "
            >
              <div
                className="
                  relative h-[420px]
                  overflow-hidden
                  rounded-[1.5rem]
                  bg-zinc-800
                "
              >
                {/* Image Skeleton */}
                <div className="absolute inset-0 animate-pulse bg-zinc-800" />

                {/* Bottom Floating Card */}
                <div
                  className="
                    absolute bottom-5 left-5 right-5
                    rounded-2xl
                    border border-zinc-700
                    bg-zinc-950/80
                    p-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-zinc-800" />

                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 w-36 rounded bg-zinc-800" />
                      <div className="h-2.5 w-52 max-w-full rounded bg-zinc-800/60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS SKELETON
      ====================================================== */}

      <section className="border-b border-zinc-800 bg-zinc-900/40">
        <div
          className="
            mx-auto grid max-w-7xl
            grid-cols-2
            divide-x divide-zinc-800
            px-6 py-8
            md:grid-cols-4
          "
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="px-5 text-center"
            >
              <div className="mx-auto h-7 w-20 rounded bg-zinc-800" />

              <div className="mx-auto mt-2 h-3 w-24 rounded bg-zinc-800/50" />
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CATEGORIES SKELETON
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Section Heading */}
        <div className="space-y-3">
          <div className="h-3 w-20 rounded bg-zinc-800" />

          <div className="h-8 w-80 max-w-full rounded bg-zinc-800" />

          <div className="h-4 w-96 max-w-full rounded bg-zinc-800/50" />
        </div>

        {/* Categories */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                border border-zinc-800
                bg-zinc-900
                p-5
              "
            >
              <div className="h-11 w-11 rounded-xl bg-zinc-800" />

              <div className="mt-5 h-4 w-28 rounded bg-zinc-800" />

              <div className="mt-2 h-3 w-full rounded bg-zinc-800/50" />

              <div className="mt-1 h-3 w-3/4 rounded bg-zinc-800/40" />
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          POPULAR SERVICES SKELETON
      ====================================================== */}

      <section className="border-y border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          {/* Heading */}
          <div className="space-y-3">
            <div className="h-3 w-32 rounded bg-zinc-800" />

            <div className="h-8 w-80 max-w-full rounded bg-zinc-800" />

            <div className="h-4 w-96 max-w-full rounded bg-zinc-800/50" />
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-zinc-800
                  bg-zinc-900
                "
              >
                {/* Visual */}
                <div className="relative h-44 bg-zinc-800">
                  <div className="absolute bottom-5 left-5 h-12 w-12 rounded-xl bg-zinc-700" />

                  <div className="absolute right-5 top-5 h-6 w-16 rounded-lg bg-zinc-700" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-20 rounded bg-zinc-800" />

                    <div className="h-3 w-10 rounded bg-zinc-800" />
                  </div>

                  <div className="mt-3 h-5 w-48 rounded bg-zinc-800" />

                  <div className="mt-2 h-3 w-full rounded bg-zinc-800/50" />

                  <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
                    <div>
                      <div className="h-2.5 w-20 rounded bg-zinc-800/50" />

                      <div className="mt-2 h-5 w-16 rounded bg-zinc-800" />
                    </div>

                    <div className="h-9 w-20 rounded-lg bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS SKELETON
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Heading */}
        <div className="space-y-3">
          <div className="h-3 w-28 rounded bg-zinc-800" />

          <div className="h-8 w-96 max-w-full rounded bg-zinc-800" />

          <div className="h-4 w-96 max-w-full rounded bg-zinc-800/50" />
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="
                relative
                rounded-2xl
                border border-zinc-800
                bg-zinc-900
                p-6
              "
            >
              {/* Number */}
              <div className="absolute right-5 top-5 h-10 w-12 rounded bg-zinc-800/50" />

              {/* Icon */}
              <div className="h-11 w-11 rounded-xl bg-zinc-800" />

              {/* Title */}
              <div className="mt-6 h-4 w-32 rounded bg-zinc-800" />

              {/* Description */}
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded bg-zinc-800/50" />
                <div className="h-3 w-[85%] rounded bg-zinc-800/40" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          WHY FIXITNOW SKELETON
      ====================================================== */}

      <section className="border-y border-zinc-800 bg-zinc-900/30">
        <div
          className="
            mx-auto grid max-w-7xl
            gap-12 px-6 py-20
            lg:grid-cols-2
            lg:px-8
          "
        >
          {/* Left */}

          <div>
            <div className="h-3 w-28 rounded bg-zinc-800" />

            <div className="mt-4 h-9 w-80 max-w-full rounded bg-zinc-800" />

            <div className="mt-4 max-w-lg space-y-2">
              <div className="h-3 w-full rounded bg-zinc-800/50" />
              <div className="h-3 w-[90%] rounded bg-zinc-800/50" />
              <div className="h-3 w-[65%] rounded bg-zinc-800/40" />
            </div>

            {/* Features */}
            <div className="mt-8 space-y-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-4"
                >
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-800" />

                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-40 rounded bg-zinc-800" />

                    <div className="h-3 w-64 max-w-full rounded bg-zinc-800/50" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stats */}

          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="
                  rounded-3xl
                  border border-zinc-800
                  bg-zinc-900
                  p-6
                "
              >
                <div className="h-6 w-6 rounded bg-zinc-800" />

                <div className="mt-8 h-9 w-20 rounded bg-zinc-800" />

                <div className="mt-2 h-3 w-24 rounded bg-zinc-800/50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA SKELETON
      ====================================================== */}

      <section className="px-6 py-20">
        <div
          className="
            relative mx-auto max-w-5xl
            overflow-hidden
            rounded-3xl
            border border-zinc-800
            bg-zinc-900
            p-10
            text-center
            sm:p-14
          "
        >
          <div className="mx-auto max-w-xl">
            {/* Heading */}
            <div className="mx-auto h-9 w-80 max-w-full rounded bg-zinc-800" />

            {/* Description */}
            <div className="mx-auto mt-5 space-y-2">
              <div className="mx-auto h-3 w-full rounded bg-zinc-800/50" />
              <div className="mx-auto h-3 w-[75%] rounded bg-zinc-800/40" />
            </div>

            {/* Button */}
            <div className="mx-auto mt-7 h-11 w-40 rounded-xl bg-zinc-800" />
          </div>
        </div>
      </section>
    </main>
  );
}