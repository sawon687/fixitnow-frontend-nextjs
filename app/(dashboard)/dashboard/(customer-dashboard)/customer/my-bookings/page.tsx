import React from "react";
import Link from "next/link";
import { BookingParams, getmyBookings } from "./_actions/bookingsActions";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import FiltaringBookings from "./_components/FiltaringBookings";
import { SearchParams } from "next/dist/server/request/search-params";
import BookingStatusColor from "../../../../../../components/shared/BookingStatusColor";
import { formatTime } from "../../../../../../utils/timeFormate";
import {
  BookingStatus,
  IBooking,
  PaymentStatus,
} from "../../../../../../utils/type";

const MyBookingspage = async ({ searchParams }: SearchParams) => {
  const params = (await searchParams) as BookingParams | undefined;
  console.log("params", params);

  const res = await getmyBookings(params || ({} as BookingParams));
  const bookings = res.data || [];


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Aura - Next-Gen Hub
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              My Bookings
            </h1>
            <p className="text-sm text-slate-400">
              Manage and track all your active and previous service bookings in
              one place.
            </p>
          </div>

          <Link href="/">
            <Button
              variant="outline"
              className="rounded-xl border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-teal-500/10 hover:text-teal-300 hover:border-teal-500/30 gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Filter Tabs */}
        <FiltaringBookings />

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-slate-800 bg-slate-900/50 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto text-teal-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                No Bookings Found
              </h3>
              <p className="text-xs text-slate-400">
                There are no bookings available under this category currently.
              </p>
            </div>
          ) : (
            bookings.map((booking: IBooking) => {
              const payment = booking?.payment;
              
              return (
              
              <div
                key={booking.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-teal-950/20 hover:border-teal-500/40 transition-all space-y-4"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal-500/5 blur-3xl group-hover:bg-teal-500/15 transition-all" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white group-hover:text-teal-300 transition-colors">
                      {booking.service.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Technician:{" "}
                      <span className="text-slate-200 font-semibold">
                        {booking.technician?.users?.name}
                      </span>
                    </p>
                  </div>
                  <div>
                    <BookingStatusColor status={booking.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold">
                        Scheduled Date
                      </p>
                      <p className="font-semibold">{booking.scheduledDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold">
                        Time Slot
                      </p>
                      <p className="font-semibold">
                        {formatTime(booking.startTime)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-[10px] uppercase text-slate-500 font-bold">
                        Location
                      </p>
                      <p className="font-semibold truncate">
                        {booking.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Total Amount:{" "}
                    </span>
                    <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                      ৳{booking.totalAmount}
                    </span>
                  </div>

                  {/* Action Buttons: Pay Now & Details */}
                  <div className="flex items-center gap-2">
                    {booking.status === BookingStatus.ACCEPTED &&
                      payment?.status !== PaymentStatus.PAID && (
                        <Link
                          href={`/dashboard/customer/my-bookings/${booking.id}/pay`}
                        >
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold hover:opacity-90 text-xs cursor-pointer shadow-lg shadow-teal-500/20"
                          >
                            Pay Now
                          </Button>
                        </Link>
                      )}

                    <Link
                      href={`/dashboard/customer/my-bookings/${booking.id}`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 gap-1 text-xs font-bold cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )})
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingspage;
