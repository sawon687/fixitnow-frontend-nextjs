import React from "react";
import {
  CheckCircle2,
  Clock3,
  XCircle,
  CreditCard,
  CalendarDays,
  ReceiptText,
} from "lucide-react";

import { getPaymentHistory } from "./_actions/paymetActions";

const paymentHistorypage = async () => {
  const result = await getPaymentHistory();

  const { paidCount, pendingCount, payments, totalPaid } = result || {};

  return (
    <main className="min-h-screen bg-[#070A0F] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <CreditCard className="h-5 w-5 text-blue-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Payment History
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                View and manage all your service payments
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Paid */}
          <div className="rounded-2xl border border-white/10 bg-[#0D1118] p-5 shadow-xl shadow-black/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Total Paid
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  ৳{totalPaid?.toLocaleString() || 0}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              From {paidCount || 0} successful payments
            </p>
          </div>

          {/* Successful */}
          <div className="rounded-2xl border border-white/10 bg-[#0D1118] p-5 shadow-xl shadow-black/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Successful Payments
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {paidCount || 0}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <ReceiptText className="h-6 w-6 text-blue-400" />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Completed transactions
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-white/10 bg-[#0D1118] p-5 shadow-xl shadow-black/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Pending
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {pendingCount || 0}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
                <Clock3 className="h-6 w-6 text-yellow-400" />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Awaiting confirmation
            </p>
          </div>
        </div>

        {/* Payment History */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D1118] shadow-2xl shadow-black/20">

          {/* Table Header */}
          <div className="border-b border-white/10 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold">
              Transaction History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your recent payment transactions
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">

              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-left">

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Transaction
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Service
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Time
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Method
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>
                {payments?.map((payment: any) => (
                  <tr
                    key={payment.id}
                    className="border-b border-white/[0.06] transition hover:bg-white/[0.02]"
                  >

                    {/* Transaction */}
                    <td className="px-6 py-5">
                      <span className="font-mono text-sm text-gray-300">
                        {payment.id.slice(0, 17)}...
                      </span>
                    </td>

                    {/* Service */}
                    <td className="px-6 py-5">
                      <p className="font-medium text-white">
                        {payment?.booking?.service?.title || "N/A"}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CalendarDays className="h-4 w-4" />

                        {payment.paidAt
                          ? new Date(payment.paidAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </div>
                    </td>

                    {/* Time */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock3 className="h-4 w-4" />

                        {payment.paidAt
                          ? new Date(payment.paidAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "N/A"}
                      </div>
                    </td>

                    {/* Method */}
                    <td className="px-6 py-5">
                      <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300">
                        {payment.method}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5">
                      <span className="font-semibold">
                        ৳{payment?.amount?.toLocaleString() || 0}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      {payment.status === "PAID" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Paid
                        </span>
                      )}

                      {payment.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400">
                          <Clock3 className="h-3.5 w-3.5" />
                          Pending
                        </span>
                      )}

                      {payment.status === "FAILED" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                          <XCircle className="h-3.5 w-3.5" />
                          Failed
                        </span>
                      )}

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-white/[0.06] md:hidden">

            {payments?.map((payment: any) => (
              <div
                key={payment.id}
                className="p-5"
              >

                <div className="mb-4 flex items-start justify-between gap-3">

                  <div>
                    <p className="font-semibold text-white">
                      {payment?.booking?.service?.title || "N/A"}
                    </p>

                    <p className="mt-1 font-mono text-xs text-gray-500">
                      {payment.id}
                    </p>
                  </div>

                  {/* Status */}
                  {payment.status === "PAID" && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Paid
                    </span>
                  )}

                  {payment.status === "PENDING" && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-400">
                      <Clock3 className="h-3.5 w-3.5" />
                      Pending
                    </span>
                  )}

                  {payment.status === "FAILED" && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
                      <XCircle className="h-3.5 w-3.5" />
                      Failed
                    </span>
                  )}

                </div>

                <div className="grid grid-cols-2 gap-4 rounded-xl bg-white/[0.02] p-4">

                  {/* Date */}
                  <div>
                    <p className="text-xs text-gray-500">
                      Date
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </p>
                  </div>

                  {/* Time */}
                  <div>
                    <p className="text-xs text-gray-500">
                      Time
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A"}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <p className="text-xs text-gray-500">
                      Payment Method
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                      {payment.method || "N/A"}
                    </p>
                  </div>

                  {/* Amount */}
                  <div>
                    <p className="text-xs text-gray-500">
                      Amount
                    </p>

                    <p className="mt-1 text-base font-bold text-white">
                      ৳{payment?.amount?.toLocaleString() || 0}
                    </p>
                  </div>

                  {/* Transaction */}
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">
                      Transaction
                    </p>

                    <p className="mt-1 break-all font-mono text-xs text-gray-400">
                      {payment.id}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-600">
          <CreditCard className="h-3.5 w-3.5" />
          All payments are securely processed
        </div>

      </div>
    </main>
  );
};

export default paymentHistorypage;