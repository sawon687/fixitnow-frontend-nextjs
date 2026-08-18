import React from "react";
import {
  CalendarDays,
  MessageSquareText,
  Star,
  ClipboardCheck,
} from "lucide-react";

import { getmyReview } from "./_actions/reviewActions";

const Myreviewpage = async () => {
  const reviews = await getmyReview() || [];

 

  return (
    <main className="min-h-screen bg-[#070A0F] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                My Reviews
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                View all the reviews you have submitted
              </p>
            </div>
          </div>
        </div>

        {/* Review Summary */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">

          {/* Total Reviews */}
          <div className="rounded-2xl border border-white/10 bg-[#0D1118] p-5 shadow-xl shadow-black/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Total Reviews
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {reviews.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <ClipboardCheck className="h-6 w-6 text-blue-400" />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Reviews you have submitted
            </p>
          </div>

          {/* Average Rating */}
          <div className="rounded-2xl border border-white/10 bg-[#0D1118] p-5 shadow-xl shadow-black/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Average Rating
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {reviews.length > 0
                    ? (
                        reviews.reduce(
                          (sum: number, item: any) =>
                            sum + item.rating,
                          0
                        ) / reviews.length
                      ).toFixed(1)
                    : "0.0"}
                  <span className="ml-1 text-lg text-gray-500">
                    / 5
                  </span>
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Based on your submitted reviews
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="rounded-2xl border border-white/10 bg-[#0D1118] shadow-2xl shadow-black/20">

          {/* Section Header */}
          <div className="border-b border-white/10 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold">
              Review History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your feedback and ratings
            </p>
          </div>

          {/* Empty State */}
          {reviews.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <MessageSquareText className="h-7 w-7 text-gray-500" />
              </div>

              <h3 className="text-lg font-semibold text-white">
                No reviews yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-gray-500">
                You haven't submitted any reviews yet.
              </p>
            </div>
          )}

          {/* Review List */}
          <div className="divide-y divide-white/[0.06]">
            {reviews.map((item: any) => (
              <div
                key={item.id}
                className="p-5 transition hover:bg-white/[0.02] sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                  {/* Left */}
                  <div className="min-w-0 flex-1">

                    {/* Rating */}
                    <div className="mb-3 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= item.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}

                      <span className="ml-2 text-sm font-medium text-gray-300">
                        {item.rating}/5
                      </span>
                    </div>

                    {/* Comment */}
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MessageSquareText className="h-4 w-4 text-gray-500" />

                        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                          Your Comment
                        </span>
                      </div>

                      <p className="text-sm leading-6 text-gray-300">
                        {item.comment || "No comment provided."}
                      </p>
                    </div>

                    {/* Booking ID */}
                    <div className="mt-4">
                      <p className="text-xs text-gray-500">
                        Booking ID
                      </p>

                      <p className="mt-1 break-all font-mono text-xs text-gray-500">
                        {item.bookingId}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex shrink-0 items-center gap-2 text-sm text-gray-500">
                    <CalendarDays className="h-4 w-4" />

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
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-600">
          <Star className="h-3.5 w-3.5" />
          Thank you for sharing your experience
        </div>
      </div>
    </main>
  );
};

export default Myreviewpage;