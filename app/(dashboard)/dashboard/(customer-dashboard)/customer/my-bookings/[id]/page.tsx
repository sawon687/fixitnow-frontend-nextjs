import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CreditCard,
  Star,
  CheckCircle2,
  ShieldCheck,
  CircleCheck,
  WalletCards,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";

import { Button } from "../../../../../../../components/ui/button";
import BookingStatusColor from "../../../../../../../components/shared/BookingStatusColor";
import { getBookingDetails } from "./_actions/singleBookingAction";
import ReviewModal from "./_components/ReviewModal";
import {
  IBooking,
  IReview,
  PaymentStatus,
} from "../../../../../../../utils/type";

const BookingDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;

  const booking = (await getBookingDetails(
    resolvedParams.id
  )) as IBooking;

  // Payment is a single object
  const payment = booking?.payment;

  // Review is an array
  const reviews: IReview[] = Array.isArray(booking?.review)
    ? booking.review
    : booking?.review
      ? [booking.review]
      : [];

  const latestReview = reviews.length > 0 ? reviews[0] : null;

  const isPaid = payment?.status === PaymentStatus.PAID;

  const paymentStatus =
    payment?.status || PaymentStatus.PENDING;

  // =========================
  // FORMAT TIME
  // =========================
  const formatTime = (time: string) => {
    if (!time) return "N/A";

    const [hour, minute] = time.split(":");

    const date = new Date();

    date.setHours(
      Number(hour),
      Number(minute),
      0,
      0
    );

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (date: string) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // FORMAT DATETIME
  // =========================
  const formatDateTime = (date: string) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080713] p-4 text-slate-100 sm:p-6 md:p-10">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top left violet glow */}
        <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-violet-600/[0.055] blur-[140px]" />

        {/* Right teal glow */}
        <div className="absolute -right-40 top-[15%] h-[500px] w-[500px] rounded-full bg-teal-500/[0.035] blur-[140px]" />

        {/* Bottom blue glow */}
        <div className="absolute bottom-[-220px] left-[25%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.035] blur-[140px]" />

        {/* Subtle center glow */}
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-500/[0.018] blur-[120px]" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-5xl space-y-6">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 border-b border-[#1c1a2b] pb-7 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/15 bg-violet-500/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400">
              <Sparkles className="h-3.5 w-3.5" />
              FixIt Booking
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Booking Details
            </h1>

            <p className="max-w-xl text-xs leading-relaxed text-slate-500 sm:text-sm">
              View your service booking, schedule, payment
              and review information.
            </p>
          </div>

          {/* Back button */}

          <Link href="/dashboard/customer/my-bookings">
            <Button
              variant="outline"
              className="h-10 w-full cursor-pointer gap-2 rounded-xl border-[#252238] bg-[#0d0b18] px-4 text-xs font-semibold text-slate-300 shadow-none transition-all hover:border-violet-500/30 hover:bg-violet-500/[0.07] hover:text-violet-300 md:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Bookings
            </Button>
          </Link>
        </div>

        {/* =====================================================
            MAIN CARD
        ====================================================== */}

        <div className="relative overflow-hidden rounded-[30px] border border-[#201d31] bg-[#0d0b18]/95 shadow-[0_25px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          {/* Card glow */}

          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-violet-500/[0.045] blur-[110px]" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-teal-500/[0.025] blur-[110px]" />

          <div className="relative space-y-8 p-5 sm:p-7 md:p-9">
            {/* =====================================================
                SERVICE HEADER
            ====================================================== */}

            <div className="flex flex-col gap-5 border-b border-[#201d31] pb-7 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 space-y-3">
                {/* ID + payment badge */}

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-[#29263a] bg-[#080711] px-2.5 py-1 font-mono text-[10px] font-bold text-slate-500">
                    #{booking.id}
                  </span>

                  {isPaid && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/[0.07] px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                      <CircleCheck className="h-3 w-3" />
                      Payment Paid
                    </span>
                  )}
                </div>

                {/* Service title */}

                <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  {booking?.service?.title || "Service Booking"}
                </h2>

                <p className="text-xs text-slate-600">
                  Booking ID:{" "}
                  <span className="font-mono text-violet-400">
                    {booking.id}
                  </span>
                </p>
              </div>

              {/* Booking status */}

              <div className="shrink-0">
                <BookingStatusColor
                  status={booking.status}
                />
              </div>
            </div>

            {/* =====================================================
                SERVICE INFORMATION
            ====================================================== */}

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.07] text-violet-400">
                  <Calendar className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">
                    Service Information
                  </h3>

                  <p className="text-[10px] text-slate-600">
                    Your scheduled service details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {/* DATE */}

                <div className="group rounded-2xl border border-[#201d31] bg-[#090813] p-4 transition-all hover:border-violet-500/20 hover:bg-[#0c0a17]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.06] text-violet-400">
                      <Calendar className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                        Scheduled Date
                      </p>

                      <p className="mt-1 truncate text-sm font-bold text-slate-200">
                        {formatDate(
                          booking.scheduledDate
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* TIME */}

                <div className="group rounded-2xl border border-[#201d31] bg-[#090813] p-4 transition-all hover:border-violet-500/20 hover:bg-[#0c0a17]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.06] text-violet-400">
                      <Clock className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                        Time Slot
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-200">
                        {formatTime(
                          booking.startTime
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* LOCATION */}

                <div className="group rounded-2xl border border-[#201d31] bg-[#090813] p-4 transition-all hover:border-violet-500/20 hover:bg-[#0c0a17]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.06] text-violet-400">
                      <MapPin className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                        Service Location
                      </p>

                      <p
                        className="mt-1 truncate text-sm font-bold text-slate-200"
                        title={booking.address}
                      >
                        {booking.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                TECHNICIAN INFORMATION
            ====================================================== */}

            {booking.technician && (
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-500/15 bg-teal-500/[0.07] text-teal-400">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Technician
                    </h3>

                    <p className="text-[10px] text-slate-600">
                      Professional assigned to your booking
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#201d31] bg-[#090813] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-500/15 bg-teal-500/[0.07] text-teal-400">
                        <UserRound className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-white">
                          {booking.technician.users?.name ||
                            "Professional Technician"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {booking.technician.location ||
                            "Service Professional"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                      <span className="text-sm font-bold text-slate-200">
                        {booking.technician.avgRating ||
                          0}
                      </span>

                      <span className="text-xs text-slate-600">
                        Rating
                      </span>
                    </div>
                  </div>

                  {/* Skills */}

                  {booking.technician.skills?.length >
                    0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {booking.technician.skills.map(
                        (skill) => (
                          <span
                            key={skill}
                            className="rounded-lg border border-teal-500/10 bg-teal-500/[0.04] px-2.5 py-1 text-[10px] font-semibold text-teal-400"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =====================================================
                PAYMENT
            ====================================================== */}

            <div className="overflow-hidden rounded-2xl border border-[#201d31] bg-[#090813]">
              {/* Header */}

              <div className="flex flex-col gap-4 border-b border-[#201d31] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/[0.06] text-emerald-400">
                    <WalletCards className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Payment Summary
                    </h3>

                    <p className="text-[10px] text-slate-600">
                      Transaction and payment information
                    </p>
                  </div>
                </div>

                {/* Status */}

                <div
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${
                    isPaid
                      ? "border-emerald-500/15 bg-emerald-500/[0.07] text-emerald-400"
                      : paymentStatus ===
                          "CANCELLED"
                        ? "border-red-500/15 bg-red-500/[0.07] text-red-400"
                        : "border-amber-500/15 bg-amber-500/[0.07] text-amber-400"
                  }`}
                >
                  {isPaid ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <CreditCard className="h-3.5 w-3.5" />
                  )}

                  {paymentStatus}
                </div>
              </div>

              {/* Payment information */}

              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Amount */}

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                    Amount
                  </p>

                  <p className="mt-1 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-xl font-black text-transparent">
                    ৳{booking.totalAmount}
                  </p>
                </div>

                {/* Transaction */}

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                    Transaction ID
                  </p>

                  <p
                    title={
                      payment?.transactionId ||
                      "N/A"
                    }
                    className="mt-1 truncate font-mono text-xs font-semibold text-slate-300"
                  >
                    {payment?.transactionId ||
                      "N/A"}
                  </p>
                </div>

                {/* Method */}

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                    Payment Method
                  </p>

                  <p className="mt-1 text-xs font-bold uppercase text-slate-300">
                    {payment?.method ||
                      "Not Paid"}
                  </p>
                </div>

                {/* Paid At */}

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                    Paid At
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-300">
                    {payment?.paidAt
                      ? formatDateTime(
                          payment.paidAt
                        )
                      : "Not Paid"}
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================================
                REVIEW
            ====================================================== */}

            {booking.status ===
              "COMPLETED" &&
              reviews.length > 0 &&
              latestReview && (
                <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/[0.025] p-5">
                  {/* Review Header */}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/10 bg-yellow-500/[0.06] text-yellow-400">
                        <Star className="h-5 w-5 fill-yellow-400" />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-white">
                          Your Review
                        </h3>

                        <p className="text-[10px] text-slate-600">
                          Your feedback for this service
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-600">
                      {latestReview.createdAt
                        ? formatDateTime(
                            latestReview.createdAt
                          )
                        : ""}
                    </span>
                  </div>

                  {/* Rating */}

                  <div className="mt-5 flex items-center gap-1">
                    {[...Array(5)].map(
                      (_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index <
                            latestReview.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-700"
                          }`}
                        />
                      )
                    )}

                    <span className="ml-2 text-xs font-bold text-slate-300">
                      {latestReview.rating} / 5
                    </span>
                  </div>

                  {/* Comment */}

                  {latestReview.comment && (
                    <div className="mt-4 rounded-xl border border-[#201d31] bg-[#070711] p-4">
                      <p className="text-xs leading-6 text-slate-300">
                        “{latestReview.comment}”
                      </p>
                    </div>
                  )}
                </div>
              )}

            {/* =====================================================
                FOOTER ACTIONS
            ====================================================== */}

            <div className="flex flex-col gap-5 border-t border-[#201d31] pt-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Security */}

              <div className="flex items-center gap-2 text-[10px] text-slate-600">
                <ShieldCheck className="h-4 w-4 text-teal-400" />

                <span>
                  Secured by{" "}
                  <span className="font-semibold text-slate-500">
                    FixIt Ecosystem
                  </span>
                </span>
              </div>

              {/* Actions */}

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                {/* Pay Now */}

                {booking.status ===
                  "ACCEPTED" &&
                  !isPaid && (
                    <Link
                      href={`/dashboard/customer/my-bookings/${booking.id}/pay`}
                      className="w-full sm:w-auto"
                    >
                      <Button className="h-11 w-full cursor-pointer rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-7 text-xs font-black text-slate-950 shadow-lg shadow-teal-500/10 transition-all hover:scale-[1.01] hover:opacity-90 sm:w-auto">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Now · ৳
                        {booking.totalAmount}
                      </Button>
                    </Link>
                  )}

                {/* Payment completed */}

                {isPaid && (
                  <div className="flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] px-5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Payment Completed
                  </div>
                )}

                {/* Add Review */}

                {booking.status ===
                  "COMPLETED" &&
                  reviews.length=== 0 && (
                    <ReviewModal
                      bookingId={booking.id}
                      technicianId={
                        booking.technicianId
                      }
                    />
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM TRUST
        ====================================================== */}

        <div className="flex items-center justify-center gap-2 py-2 text-[10px] text-slate-700">
          <ShieldCheck className="h-3.5 w-3.5" />

          <span>
            Secure booking & payment protection
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;