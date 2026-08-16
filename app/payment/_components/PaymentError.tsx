import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Home,
  RefreshCw,
  XCircle,
} from "lucide-react";

type PaymentErrorProps = {
  title?: string;
  description?: string;
  sessionId?: string | null;
  showSessionId?: boolean;
  backHref?: string;
  backText?: string;
};

export default function PaymentError({
  title = "Payment information unavailable",
  description = "We could not retrieve your payment information.",
  sessionId,
  showSessionId = false,
  backHref = "/dashboard/customer",
  backText = "Dashboard",
}: PaymentErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070A0F] px-4 text-white">
      <div className="w-full max-w-md rounded-[28px] border border-red-500/10 bg-[#0D1118] p-8 text-center shadow-2xl shadow-black/40">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
          <XCircle
            size={32}
            className="text-red-400"
          />
        </div>

        {/* Title */}
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">
          Payment Error
        </p>

        <h2 className="mt-2 text-xl font-bold md:text-2xl">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          {description}
        </p>

        {/* Session ID */}
        {showSessionId && sessionId && (
          <p className="mt-4 truncate rounded-xl border border-slate-800 bg-[#11161F] px-4 py-3 text-xs text-slate-500">
            Session: {sessionId}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">

          <button
            onClick={() => window.location.reload()}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <RefreshCw size={15} />
            Try Again
          </button>

          <Link
            href={backHref}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#11161F] px-4 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            {backHref.includes("bookings") ? (
              <ArrowLeft size={15} />
            ) : (
              <Home size={15} />
            )}

            {backText}
          </Link>

        </div>
      </div>
    </main>
  );
}