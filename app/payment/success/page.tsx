"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Home,
  CalendarDays,
  ArrowRight,
  ReceiptText,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { paymentConrim } from "../_actions/action";
import PaymentLoading from '../_components/PaymentLoading';
import PaymentError from '../_components/PaymentError';

type PaymentData = {
  bookingId: string;
  service: string;
  technician: string;
  amount: number;
  currency?: string;
  date: string;
  time: string;
  transactionId: string;
};

export default function PaymentSuccess() {
  const params = useSearchParams();

  const sessionId = params.get("sessionId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<PaymentData | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("Payment session ID is missing.");
      return;
    }

    let mounted = true;

    const fetchPayment = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await paymentConrim(sessionId);

        if (!mounted) return;

        if (result?.success && result?.data) {
          setPayment(result.data);
        } else {
          setError(
            result?.message ||
              "Unable to confirm your payment. Please try again."
          );
        }
      } catch (err) {
        console.error("Payment confirmation error:", err);

        if (mounted) {
          setError(
            "Something went wrong while confirming your payment. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPayment();

    return () => {
      mounted = false;
    };
  }, [sessionId]);

  // =========================
  // MODERN LOADING UI
  // =========================

  if (loading) {
  return (
    <PaymentLoading
      title="Confirming your payment"
      description="Please wait while we verify your payment and retrieve your booking details."
    />
  );
}

  // =========================
  // ERROR UI
  // =========================

  if (error || !payment) {
  return (
    <PaymentError
      title="We couldn't confirm your payment"
      description={
        error ||
        "Payment information could not be retrieved. Please try again."
      }
      sessionId={sessionId}
      showSessionId={true}
      backHref="/dashboard/customer"
      backText="Dashboard"
    />
  );
}

  // =========================
  // SUCCESS UI
  // =========================

  return (
    <main className="min-h-screen bg-[#070A0F] px-4 py-5 text-white md:px-6 md:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-3xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[28px] border border-slate-800 bg-[#0D1118] shadow-2xl shadow-black/40">
          {/* ================= TOP SUCCESS ================= */}

          <div className="relative overflow-hidden border-b border-slate-800 px-5 py-7 text-center md:px-8 md:py-8">
            {/* Glow */}

            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />

            {/* Success Icon */}

            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 shadow-lg shadow-green-500/5">
              <CheckCircle2
                size={36}
                className="text-green-400"
                strokeWidth={1.8}
              />
            </div>

            <p className="relative mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-green-400">
              Payment Successful
            </p>

            <h1 className="relative mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Your payment is complete
            </h1>

            <p className="relative mx-auto mt-2 max-w-lg text-xs leading-5 text-slate-400 md:text-sm">
              Your payment has been successfully processed. Your booking is
              now ready to continue.
            </p>

            {/* Amount */}

            <div className="relative mx-auto mt-5 w-fit rounded-2xl border border-slate-800 bg-[#11161F] px-7 py-3">
              <p className="text-[11px] text-slate-500">
                Amount Paid
              </p>

              <p className="mt-0.5 text-2xl font-bold text-white">
                ৳{Number(payment.amount).toFixed(2)}
              </p>
            </div>
          </div>

          {/* ================= PAYMENT DETAILS ================= */}

          <div className="p-5 md:p-7">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                <ReceiptText
                  size={16}
                  className="text-blue-400"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Payment Details
                </h2>

                <p className="text-[11px] text-slate-500">
                  Transaction information
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#11161F]">
              <div className="grid gap-x-6 gap-y-4 p-4 sm:grid-cols-2 md:p-5">
                {/* Booking ID */}

                <div className="min-w-0">
                  <p className="text-[11px] text-slate-500">
                    Booking ID
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-200">
                    {payment.bookingId}
                  </p>
                </div>

                {/* Service */}

                <div className="min-w-0">
                  <p className="text-[11px] text-slate-500">
                    Service
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-200">
                    {payment.service}
                  </p>
                </div>

                {/* Technician */}

                <div className="min-w-0">
                  <p className="text-[11px] text-slate-500">
                    Technician
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-200">
                    {payment.technician}
                  </p>
                </div>

                {/* Status */}

                <div>
                  <p className="text-[11px] text-slate-500">
                    Payment Status
                  </p>

                  <span className="mt-1 inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-[11px] font-bold text-green-400">
                    PAID
                  </span>
                </div>

                {/* Date */}

                <div>
                  <p className="text-[11px] text-slate-500">
                    Date & Time
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <CalendarDays
                      size={14}
                      className="shrink-0 text-slate-500"
                    />

                    <span className="truncate">
                      {payment.date}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-500">
                    {payment.time}
                  </p>
                </div>

                {/* Transaction */}

                <div className="min-w-0">
                  <p className="text-[11px] text-slate-500">
                    Transaction ID
                  </p>

                  <p
                    title={payment.transactionId}
                    className="mt-1 truncate text-sm font-semibold text-slate-200"
                  >
                    {payment.transactionId}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= BUTTONS ================= */}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/dashboard/customer/my-bookings"
                className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
              >
                My Bookings

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/dashboard/customer"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#11161F] px-5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
              >
                <Home size={16} />

                Dashboard
              </Link>
            </div>

            <p className="mt-4 text-center text-[11px] text-slate-600">
              A payment confirmation has been recorded for this booking.
            </p>
          </div>
        </div>
      </div>

      {/* Loading animation */}

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }

          50% {
            transform: translateX(100%);
          }

          100% {
            transform: translateX(250%);
          }
        }
      `}</style>
    </main>
  );
}