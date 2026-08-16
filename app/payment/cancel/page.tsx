"use client";

import Link from "next/link";
import {
  XCircle,
  ArrowLeft,
  CreditCard,
  Home,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { paymentConrim } from '../_actions/action';
import PaymentLoading from '../_components/PaymentLoading';
import PaymentError from '../_components/PaymentError';


type PaymentData = {
  id: string;
  transactionId: string;
  bookingId: string;
  amount: number;
  status: string;
};

export default function PaymentCancel() {
  const params = useSearchParams();
  const sessionId = params.get("sessionId");

  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Payment session ID is missing.");
      setLoading(false);
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
              "Unable to retrieve cancelled payment."
          );
        }
      } catch (error) {
        console.error("Payment cancel error:", error);

        if (mounted) {
          setError(
            "Something went wrong while processing your payment."
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
  // LOADING
  // =========================

if (loading) {
  return (
    <PaymentLoading
      title="Checking payment status"
      description="Please wait while we check your payment session."
    />
  );
}

  // ERROR


 if (error || !payment) {
  return (
    <PaymentError
      title="Payment information unavailable"
      description={
        error ||
        "We could not retrieve your payment information."
      }
      backHref="/dashboard/customer/my-bookings"
      backText="Bookings"
    />
  );
}

  // CANCELLED


  return (
    <main className="min-h-screen bg-[#070A0F] px-4 py-5 text-white md:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[30px] border border-slate-800 bg-[#0D1118] shadow-2xl shadow-black/40">

          {/* ================= HEADER ================= */}

          <div className="relative overflow-hidden px-6 py-10 text-center md:px-10">
            {/* Red Glow */}

            <div className="pointer-events-none absolute left-1/2 top-[-50px] h-52 w-52 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />

            {/* Icon */}

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
              <XCircle
                size={42}
                strokeWidth={1.7}
                className="text-red-400"
              />
            </div>

            <p className="relative mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">
              Payment Cancelled
            </p>

            <h1 className="relative mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Payment was not completed
            </h1>

            <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              Your payment process was cancelled or interrupted.
              No successful payment was recorded.
            </p>
          </div>

          {/* ================= CONTENT ================= */}

          <div className="border-t border-slate-800 p-5 md:p-7">

            {/* PAYMENT SUMMARY */}

            <div className="rounded-2xl border border-slate-800 bg-[#11161F] p-5">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-[11px] text-slate-500">
                    Booking ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-200">
                    {payment.bookingId}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[11px] text-slate-500">
                    Amount
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    ৳{Number(payment.amount).toFixed(2)}
                  </p>
                </div>

              </div>

              <div className="my-4 h-px bg-slate-800" />

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[11px] text-slate-500">
                    Payment Status
                  </p>
                </div>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold text-red-400">
                  CANCELLED
                </span>

              </div>

            </div>

            {/* INFO */}

            <div className="mt-4 flex gap-3 rounded-2xl border border-yellow-500/10 bg-yellow-500/[0.04] p-4">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10">
                <AlertTriangle
                  size={16}
                  className="text-yellow-400"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-yellow-300">
                  No payment was taken
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your payment was not completed. Your booking
                  can still be paid from the booking page.
                </p>
              </div>

            </div>

            {/* ================= ACTIONS ================= */}

            <div className="mt-5">

              <Link
                href={`/dashboard/customer/my-bookings/${payment.bookingId}/pay`}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
              >
                <CreditCard size={17} />

                Try Payment Again
              </Link>

            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">

              <Link
                href="/dashboard/customer/my-bookings"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#11161F] text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
              >
                <ArrowLeft size={16} />

                My Bookings
              </Link>

              <Link
                href="/dashboard/customer"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#11161F] text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
              >
                <Home size={16} />

                Dashboard
              </Link>

            </div>

            <p className="mt-5 text-center text-[10px] text-slate-600">
              You can safely try the payment again at any time.
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}