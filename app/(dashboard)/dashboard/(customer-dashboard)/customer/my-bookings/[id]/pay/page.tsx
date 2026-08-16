import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";

import CheckoutForm from "./_components/CheckoutForm";
import { getBookingDetails } from "../_actions/singleBookingAction";
import { IBooking } from "../../../../../../../../utils/type";

const PaymentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;

  const id = resolvedParams.id;

  const booking = (await getBookingDetails(id)) as IBooking | null;

  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070A0F] px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0D1118] p-8 text-center">
          <h1 className="text-xl font-bold">Booking Not Found</h1>

          <p className="mt-2 text-sm text-slate-500">
            We could not find the booking you are trying to pay for.
          </p>

          <Link
            href="/dashboard/customer/my-bookings"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <ArrowLeft size={16} />
            Back to My Bookings
          </Link>
        </div>
      </main>
    );
  }

  const technician = booking.technician;

  const technicianUser = technician?.users;

  const total = booking.totalAmount ?? 0;

  console.log("booking", booking);

  return (
    <main className="min-h-screen bg-[#070A0F] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        {/*
            HEADER
         */}

        <div className="mb-8">
          <Link
            href={`/dashboard/customer/my-bookings/${booking.id}`}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />

            Back to Booking
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Secure Checkout
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Complete Your Payment
              </h1>

              <p className="mt-2 max-w-xl text-sm text-slate-400">
                Review your booking details and securely complete your payment.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-xs text-slate-400">
              <Lock size={14} className="text-green-400" />

              Secured Checkout
            </div>
          </div>
        </div>

 

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
       

          <div className="space-y-6">
        

            <section className="rounded-3xl border border-slate-800 bg-[#0D1118] p-6 shadow-2xl shadow-black/20">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Booking Details
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    Service Booking
                  </h2>
                </div>

                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
                  {booking.status}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* DATE */}

                <div className="flex gap-3 rounded-2xl border border-slate-800 bg-[#11161F] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <CalendarDays size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Scheduled Date</p>

                    <p className="mt-1 text-sm font-semibold text-slate-200">
                      {booking.scheduledDate}
                    </p>
                  </div>
                </div>

                {/* TIME */}

                <div className="flex gap-3 rounded-2xl border border-slate-800 bg-[#11161F] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Clock3 size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Start Time</p>

                    <p className="mt-1 text-sm font-semibold text-slate-200">
                      {booking.startTime}
                    </p>
                  </div>
                </div>

                {/* LOCATION */}

                <div className="flex gap-3 rounded-2xl border border-slate-800 bg-[#11161F] p-4 sm:col-span-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <MapPin size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">
                      Service Location
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-slate-200">
                      {booking.address}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 
                TECHNICIAN*/}

            <section className="rounded-3xl border border-slate-800 bg-[#0D1118] p-6 shadow-2xl shadow-black/20">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Assigned Technician
              </p>

              <div className="mt-5 flex items-start gap-4">
                {/* AVATAR */}

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <UserRound size={25} />
                </div>

                {/* INFORMATION */}

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white">
                    {technicianUser?.name || "Technician"}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-yellow-400">
                      ★ {technician?.avgRating ?? 0}
                    </span>

                    <span className="text-slate-600">•</span>

                    <span className="text-slate-500">
                      {technician?.yearsOfExperience ?? 0} years experience
                    </span>
                  </div>

                  {technicianUser?.email && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <Mail size={13} />

                      <span className="truncate">
                        {technicianUser.email}
                      </span>
                    </div>
                  )}
                </div>

                <div className="hidden rounded-xl border border-slate-800 bg-[#11161F] p-3 sm:block">
                  <Wrench size={20} className="text-slate-400" />
                </div>
              </div>

              {/* SKILLS */}

              {technician?.skills && technician.skills.length > 0 && (
                <div className="mt-6 border-t border-slate-800 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Skills
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {technician.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 
                PAYMENT
       */}

            <section className="rounded-3xl border border-slate-800 bg-[#0D1118] p-6 shadow-2xl shadow-black/20">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-white">
                    Payment Method
                  </h2>

                  <p className="text-xs text-slate-500">
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>

              <CheckoutForm
                bookingId={booking.id}
                total={total}
              />
            </section>
          </div>

          {/* 
              RIGHT SIDE
          */}

          <aside className="h-fit lg:sticky lg:top-6">
            <section className="overflow-hidden rounded-3xl border border-slate-800 bg-[#0D1118] shadow-2xl shadow-black/30">
              {/* 
                  TOTAL HEADER
             */}

              <div className="border-b border-slate-800 bg-gradient-to-br from-blue-600/20 via-[#101722] to-[#0D1118] p-6">
                <p className="text-sm text-slate-400">
                  Total Amount
                </p>

                <div className="mt-2 flex items-end justify-between">
                  <h2 className="text-4xl font-bold tracking-tight text-white">
                    ৳{total.toFixed(2)}
                  </h2>

                  <span className="mb-1 text-xs font-semibold text-slate-500">
                    BDT
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* 
                    BOOKING ID
              */}

                <div className="mb-6 rounded-2xl border border-slate-800 bg-[#11161F] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="shrink-0 text-xs text-slate-500">
                      Booking ID
                    </span>

                    <span className="truncate text-right text-xs font-bold text-slate-300">
                      {booking.id}
                    </span>
                  </div>
                </div>

                {/* 
                    PAYMENT SUMMARY
              */}

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Service Amount
                    </span>

                    <span className="font-medium text-slate-300">
                      ৳{total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Payment Fee
                    </span>

                    <span className="font-medium text-green-400">
                      Included
                    </span>
                  </div>
                </div>

                <div className="my-6 h-px bg-slate-800" />

                {/*
                    TOTAL
         */}

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-white">
                    ৳{total.toFixed(2)}
                  </span>
                </div>

                {/* 
                    SECURITY
                 */}

                <div className="mt-6 rounded-2xl border border-green-500/10 bg-green-500/5 p-4">
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={20}
                      className="shrink-0 text-green-400"
                    />

                    <div>
                      <p className="text-sm font-semibold text-green-300">
                        Secure Payment
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Your payment information is securely processed.
                        We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                {/*
                    SSL
               */}

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-600">
                  <Lock size={13} />

                  SSL encrypted checkout
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;