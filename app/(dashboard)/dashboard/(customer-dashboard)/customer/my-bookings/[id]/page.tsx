import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Sparkles, CreditCard, Star, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "../../../../../../../components/ui/button";
import BookingStatusColor from '../../../../../../../components/shared/BookingStatusColor';
import { getBookingDetails } from './_actions/singleBookingAction';
import ReviewModal from './_components/ReviewModal';

export interface IBooking {
  id: string;
  serviceTitle: string;
  technicianId: string; 
  status: 
    | "REQUESTED"
    | "ACCEPTED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED"
    | "DECLINED";
  scheduledDate: string;
  startTime: string;
  address: string;
  totalAmount: number;
  notes?: string;
  payment: Array<{
    id?: string;
    transactionId: string | null;
    amount: number;
    status: "PENDING" | "PAID" | "FAILED" | string;
    method?: string;
    paidAt?: string | null;
  }>;
  review?:[{
    rating: number;
    comment: string | null;
    createdAt: string;
  } | null]
}

const BookingDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const booking: IBooking = (await getBookingDetails(resolvedParams.id)) || {};

  console.log('bookingdetiapage',booking)
  const latestPayment = booking.payment && booking.payment.length > 0 
    ? booking.payment[booking.payment.length - 1] 
    : null;

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute), 0, 0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider shadow-sm shadow-teal-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              FixIt - Booking Details
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Booking #{booking.id}
            </h1>
            <p className="text-sm text-slate-400">
              View the comprehensive breakdown, status, and summary for your service booking.
            </p>
          </div>

          <Link href="/dashboard/customer/my-bookings">
            <Button
              variant="outline"
              className="rounded-xl border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-teal-500/10 hover:text-teal-300 hover:border-teal-500/30 gap-2 cursor-pointer transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Bookings
            </Button>
          </Link>
        </div>

        {/* Main Details Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-teal-950/40 space-y-8">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          {/* Service Title & Status Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-white tracking-wide">{booking.serviceTitle}</h2>
              <p className="text-xs text-slate-400">
                Booking ID: <span className="text-teal-400 font-mono font-bold">#{booking.id}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BookingStatusColor status={booking.status} />
            </div>
          </div>

          {/* Schedule & Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex items-start gap-3.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60 hover:border-teal-500/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase text-slate-500 font-extrabold tracking-wider">Scheduled Date</p>
                <p className="font-bold text-sm text-slate-200">{booking.scheduledDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60 hover:border-teal-500/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase text-slate-500 font-extrabold tracking-wider">Time Slot</p>
                <p className="font-bold text-sm text-slate-200">{formatTime(booking.startTime)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60 hover:border-teal-500/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="overflow-hidden space-y-0.5">
                <p className="text-[10px] uppercase text-slate-500 font-extrabold tracking-wider">Location</p>
                <p className="font-bold text-sm text-slate-200 truncate" title={booking.address}>{booking.address}</p>
              </div>
            </div>
          </div>

          {/* Payment Summary Section */}
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80 space-y-4 hover:border-teal-500/20 transition-all">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <CreditCard className="w-4 h-4" />
              Payment Summary
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block">Payment Status:</span>
                <span className="text-slate-200 font-bold uppercase text-sm">{latestPayment?.status || "PENDING"}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block">Transaction ID:</span>
                <span className="text-slate-200 font-mono font-semibold">{latestPayment?.transactionId || "N/A"}</span>
              </div>
              <div className="space-y-1 md:text-right">
                <span className="text-slate-400 block">Total Amount:</span>
                <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                  ৳{booking.totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Notes */}
          {booking.notes && (
            <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                Special Instructions / Notes
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
                {booking.notes}
              </p>
            </div>
          )}
{/* Review Section */}
          {booking.status === "COMPLETED" && booking.review && booking.review.length > 0 && (
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-teal-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                  <Star className="w-4 h-4 fill-teal-400" />
                  Your Review
                </div>
                <span className="text-[10px] text-slate-500">
                  {booking.review[0]?.createdAt && new Date(booking.review[0].createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < (booking.review?.[0]?.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-slate-700"}`} 
                  />
                ))}
                <span className="ml-2 text-xs font-bold text-slate-200">{booking.review[0]?.rating} / 5</span>
              </div>
              {booking.review[0]?.comment && (
                <p className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
                  {booking.review[0].comment}
                </p>
              )}
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Secured by FixIt Ecosystem Safeguard</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {booking.status === "ACCEPTED" && (
                <Link href={`/dashboard/customer/payment/${booking.id}`} className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs cursor-pointer px-6 py-2.5 shadow-lg shadow-teal-500/20 hover:opacity-90 transition-all">
                    Pay Now (৳{booking.totalAmount})
                  </Button>
                </Link>
              )}

              {/* Shadcn UI Modal Trigger Component */}
              {booking.status === "COMPLETED" && !booking.review && (
                <ReviewModal 
                  bookingId={booking.id} 
                  technicianId={booking.technicianId} 
                
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;