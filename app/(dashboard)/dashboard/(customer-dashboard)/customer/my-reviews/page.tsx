import React from "react";
import {
  CalendarDays,
  MessageSquareText,
  Star,
  ClipboardCheck,
  Sparkles,
  Quote,
  TrendingUp,
} from "lucide-react";

import { getmyReview } from "./_actions/reviewActions";

const Myreviewpage = async () => {
  const reviews = (await getmyReview()) || [];

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum: number, item: any) => sum + Number(item.rating || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  const ratingValue = Number(averageRating);

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4) return "Very Good";
    if (rating >= 3) return "Good";
    if (rating >= 2) return "Average";
    if (rating > 0) return "Needs Improvement";
    return "No Rating";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06090e] px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-yellow-500/[0.035] blur-[130px]" />

        <div className="absolute right-[-180px] top-[15%] h-[550px] w-[550px] rounded-full bg-amber-500/[0.025] blur-[140px]" />

        <div className="absolute bottom-[-200px] left-[35%] h-[500px] w-[500px] rounded-full bg-orange-500/[0.02] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8 flex flex-col gap-5 border-b border-white/[0.07] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Small Badge */}

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-500/15 bg-yellow-500/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-yellow-400">
              <Sparkles className="h-3.5 w-3.5" />
              Customer Feedback
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-yellow-500/15 bg-yellow-500/[0.07] shadow-lg shadow-yellow-500/[0.03]">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  My Reviews
                </h1>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  View and manage all the reviews you have submitted.
                </p>
              </div>
            </div>
          </div>

          {/* Rating Highlight */}

          {reviews.length > 0 && (
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#0b1017] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/10">
                <TrendingUp className="h-4 w-4 text-yellow-400" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                  Overall Rating
                </p>

                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-sm font-black text-white">
                    {averageRating}
                  </span>

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.round(ratingValue)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-slate-600">
                    {getRatingLabel(ratingValue)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            SUMMARY CARDS
        ====================================================== */}

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {/* Total Reviews */}

          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b1017] p-5 transition-all duration-300 hover:border-blue-500/20 hover:bg-[#0d131c]">
            {/* Glow */}

            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/[0.05] blur-3xl transition-all group-hover:bg-blue-500/[0.09]" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                  Total Reviews
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <h2 className="text-3xl font-black tracking-tight text-white">
                    {reviews.length}
                  </h2>

                  <span className="mb-1 text-xs text-slate-600">
                    reviews
                  </span>
                </div>

                <p className="mt-3 text-[11px] text-slate-500">
                  Reviews you have submitted
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/10 bg-blue-500/[0.06]">
                <ClipboardCheck className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Average Rating */}

          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b1017] p-5 transition-all duration-300 hover:border-yellow-500/20 hover:bg-[#0d131c]">
            {/* Glow */}

            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-yellow-500/[0.05] blur-3xl transition-all group-hover:bg-yellow-500/[0.09]" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                  Average Rating
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <h2 className="text-3xl font-black tracking-tight text-white">
                    {averageRating}
                  </h2>

                  <span className="mb-1 text-sm text-slate-600">
                    / 5
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          star <= Math.round(ratingValue)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-slate-500">
                    {getRatingLabel(ratingValue)}
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-500/10 bg-yellow-500/[0.06]">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            REVIEW HISTORY
        ====================================================== */}

        <section className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b1017] shadow-2xl shadow-black/20">
          {/* Section Header */}

          <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/10 bg-yellow-500/[0.06]">
                <MessageSquareText className="h-4 w-4 text-yellow-400" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-white sm:text-base">
                  Review History
                </h2>

                <p className="mt-0.5 text-[10px] text-slate-600 sm:text-xs">
                  Your feedback and ratings
                </p>
              </div>
            </div>

            {reviews.length > 0 && (
              <div className="w-fit rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1.5">
                <span className="text-[10px] font-bold text-slate-500">
                  {reviews.length}{" "}
                  {reviews.length === 1 ? "Review" : "Reviews"}
                </span>
              </div>
            )}
          </div>

          {/* =====================================================
              EMPTY STATE
          ====================================================== */}

          {reviews.length === 0 && (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-16 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-yellow-500/10 blur-2xl" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.07] bg-[#080d14]">
                  <MessageSquareText className="h-8 w-8 text-slate-600" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white">
                No reviews yet
              </h3>

              <p className="mt-2 max-w-sm text-xs leading-6 text-slate-600 sm:text-sm">
                You haven't submitted any reviews yet. Complete a service
                and share your experience with the technician.
              </p>
            </div>
          )}

          {/* =====================================================
              REVIEW LIST
          ====================================================== */}

          {reviews.length > 0 && (
            <div className="divide-y divide-white/[0.055]">
              {reviews.map((item: any, index: number) => (
                <article
                  key={item.id}
                  className="group relative p-5 transition-all duration-300 hover:bg-white/[0.015] sm:p-6"
                >
                  {/* Left Accent */}

                  <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-transparent transition-all duration-300 group-hover:bg-yellow-400/40" />

                  <div className="flex flex-col gap-5">
                    {/* Top Row */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      {/* Rating */}

                      <div>
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= Number(item.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-700"
                                }`}
                              />
                            ))}
                          </div>

                          <span className="ml-1 rounded-md bg-yellow-500/[0.07] px-2 py-1 text-[10px] font-bold text-yellow-400">
                            {item.rating}/5
                          </span>
                        </div>

                        <p className="mt-2 text-[10px] text-slate-600">
                          Review #{String(index + 1).padStart(2, "0")}
                        </p>
                      </div>

                      {/* Date */}

                      <div className="flex w-fit items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[10px] text-slate-500">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-600" />

                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </div>
                    </div>

                    {/* Comment */}

                    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#080d14] p-5">
                      <Quote className="absolute right-4 top-4 h-7 w-7 text-white/[0.025]" />

                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.035]">
                          <MessageSquareText className="h-3.5 w-3.5 text-slate-500" />
                        </div>

                        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                          Your Comment
                        </span>
                      </div>

                      <p className="relative max-w-3xl text-sm leading-7 text-slate-300">
                        {item.comment || "No comment provided."}
                      </p>
                    </div>

                    {/* Booking */}

                    <div className="flex flex-col gap-2 border-t border-white/[0.05] pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-700">
                          Booking ID
                        </p>

                        <p className="mt-1 max-w-full break-all font-mono text-[10px] text-slate-600">
                          {item.bookingId}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-700">
                        <ClipboardCheck className="h-3.5 w-3.5" />
                        Verified Service Review
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div className="flex items-center justify-center gap-2 py-5 text-[10px] text-slate-700">
          <Star className="h-3.5 w-3.5" />
          Thank you for sharing your experience with FixIt
        </div>
      </div>
    </main>
  );
};

export default Myreviewpage;