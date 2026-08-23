

import React from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  MapPin,
  Plus,
  ReceiptText,
  Star,
  TrendingUp,
  UserRound,
  Wallet,
  Wrench,
  MessageSquareText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCustomerDashboard } from './_actions/customerAction';
import { BookingStatus, IBooking, IReview } from '../../../../../utils/type';
import BookingStatusColor from '../../../../../components/shared/BookingStatusColor';
import Link from 'next/link';


// ======================================================
// STATIC DATA
// ======================================================




const recentBookings = [
  {
    id: "BK-10245",
    service: "AC Repair & Servicing",
    technician: "Rahim Ahmed",
    role: "AC Specialist",
    date: "Aug 27, 2026",
    time: "06:30 PM",
    amount: "৳1,900",
    status: "ACCEPTED",
    statusClass:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },
  {
    id: "BK-10236",
    service: "Plumbing & Pipe Repair",
    technician: "Sakib Hossain",
    role: "Professional Plumber",
    date: "Aug 18, 2026",
    time: "11:00 AM",
    amount: "৳1,500",
    status: "COMPLETED",
    statusClass:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "BK-10230",
    service: "Washing Machine Repair",
    technician: "Nayeem Islam",
    role: "Appliance Technician",
    date: "Aug 15, 2026",
    time: "02:30 PM",
    amount: "৳1,800",
    status: "COMPLETED",
    statusClass:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
];


const reviews = [
  {
    service: "Plumbing & Pipe Repair",
    technician: "Sakib Hossain",
    rating: 5,
    comment:
      "Excellent service. Very professional and arrived on time.",
    date: "Aug 18, 2026",
  },
  {
    service: "AC Repair & Servicing",
    technician: "Rahim Ahmed",
    rating: 5,
    comment:
      "Great experience. The technician was very helpful.",
    date: "Aug 12, 2026",
  },
];


// ======================================================
// PAGE
// ======================================================
// dashbaord {
//   success: true,
//   status: 201,
//   message: 'dashboard data found',
//   data: {
//     totalBookingCount: 3,
//     activeBookingCount: 1,
//     completeBookingCoun: 2,
//     bookingInfo: { _sum: [Object], _count: 1 },
//     pendingAmount: [ [Object], [Object], [Object] ],
//     cancelledPayment: { _sum: [Object], _count: 0 },
//     review: { _sum: [Object], _count: 0 }
//   }
// }
export default async function CustomerDashboardpage() {
const  data=await getCustomerDashboard()
console.log('data',data)

const {totalBookingCount,
      activeBookingCount,
        paymentPaid,
      bookingInfo=[],
      pendingAmount={},
      cancelledPayment=0,
      totalCompletedCount,
       review
        }=data
  const stats = [
  {
    title: "Total Bookings",
    value: totalBookingCount,
    description: "All time bookings",
    icon: CalendarDays,
    trend: "+12.5%",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    title: "Active Bookings",
    value: activeBookingCount,
    description: "Currently active",
    icon: Clock3,
    trend: "+2 this week",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    title: "Completed",
    value:paymentPaid?._count||0,
    description: "Successfully completed",
    icon: CheckCircle2,
    trend: "+8.2%",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    title: "Total Spent",
    value: `৳${paymentPaid?._sum?.amount}`,
    description: "Across all services",
    icon: Wallet,
    trend: "+৳4,200",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
];
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080b12] text-white">

      {/* ==================================================
          BACKGROUND GLOW
      ================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute right-0 top-[30%] h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute bottom-0 left-[40%] h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[120px]" />

      </div>


      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">


        {/* ==================================================
            HEADER
        ================================================== */}

        <section className="mb-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">

                  <UserRound className="h-3.5 w-3.5 text-blue-400" />

                </div>

                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Customer Dashboard
                </span>

              </div>


              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">

                Welcome back,{" "}

                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Sawon
                </span>

                <span className="ml-2">👋</span>

              </h1>


              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Manage your services, track bookings and
                keep everything organized from one place.
              </p>

            </div>


            <Button
              className="h-11 rounded-xl border border-blue-400/20 bg-blue-500 px-5 font-medium text-white shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:bg-blue-600"
            >

              <Plus className="mr-2 h-4 w-4" />

              Book New Service

            </Button>

          </div>

        </section>


        {/* ==================================================
            STATS
        ================================================== */}

        <section className="mb-7">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((item) => {

              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05]"
                >

                  {/* top glow */}

                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />


                  <CardContent className="relative p-5">

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          {item.title}
                        </p>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                          {item.value}
                        </h2>

                        <p className="mt-1 text-xs text-slate-600">
                          {item.description}
                        </p>

                      </div>


                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg} ring-1 ring-inset ring-white/5`}
                      >

                        <Icon
                          className={`h-5 w-5 ${item.iconColor}`}
                        />

                      </div>

                    </div>


                    <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-3">

                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">

                        <TrendingUp className="h-3.5 w-3.5" />

                        {item.trend}

                      </span>

                      <span className="text-[11px] text-slate-600">
                        from last month
                      </span>

                    </div>

                  </CardContent>

                </Card>
              );
            })}

          </div>

        </section>


        {/* ==================================================
            MAIN GRID
        ================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_1fr]">


          {/* ==================================================
              RECENT BOOKINGS
          ================================================== */}

          <Card className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] shadow-2xl backdrop-blur-xl">

            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5 sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/10">

                  <CalendarDays className="h-4 w-4 text-blue-400" />

                </div>

                <div>

                  <h2 className="font-semibold text-white">
                    Recent Bookings
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-600">
                    Your latest service activity
                  </p>

                </div>

              </div>


             <Link href={'/dashboard/customer/my-bookings'}> <Button
                variant="ghost"
                className="group h-8 rounded-lg px-2.5 text-xs text-slate-500 hover:bg-white/5 hover:text-white"
              >

                View All

                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

              </Button>
              </Link>

            </div>


            <CardContent className="p-0">

              <div className="divide-y divide-white/[0.05]">

                {      bookingInfo.map((booking:IBooking) => (

                  <div
                    key={booking.id}
                    className="group px-5 py-5 transition hover:bg-white/[0.025] sm:px-6"
                  >

                    <div className="flex items-start gap-4">

                      {/* SERVICE ICON */}

                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]">

                        <Wrench className="h-5 w-5 text-slate-400 transition group-hover:text-blue-400" />

                      </div>


                      {/* DETAILS */}

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                          <div>

                            <h3 className="font-semibold text-slate-100">
                              {booking.service.title}
                            </h3>

                            <p className="mt-1 text-xs text-slate-600">

                              {booking.customer?.name}

                              <span className="mx-1.5 text-slate-700">
                                •
                              </span>

                              {booking.customer?.role}

                            </p>

                          </div>


                          <span
                            
                          >
                          <BookingStatusColor status={booking.status}/>
                          </span>

                        </div>


                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">

                          <span className="flex items-center gap-1.5 text-[11px] text-slate-600">

                            <CalendarDays className="h-3.5 w-3.5" />

                            {new Date(booking.createdAt).toLocaleDateString('en-US',{
                              month:"short",
                              day:'2-digit',
                              year:'numeric'
                            })}

                          </span>

                          <span className="flex items-center gap-1.5 text-[11px] text-slate-600">

                            <Clock3 className="h-3.5 w-3.5" />

                            {new Date(booking.createdAt).toLocaleTimeString()}

                          </span>

                          <span className="flex items-center gap-1.5 text-[11px] text-slate-600">

                            <MapPin className="h-3.5 w-3.5" />

                            {booking.address}

                          </span>

                        </div>

                      </div>


                      {/* PRICE */}

                      <div className="hidden text-right sm:block">

                        <p className="text-[10px] uppercase tracking-wider text-slate-600">
                          Amount
                        </p>

                        <p className="mt-1 font-semibold text-slate-200">
                          {booking.totalAmount}
                        </p>

                        <p className="mt-1 font-mono text-[9px] text-slate-700">
                          {booking.id}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>


              <div className="border-t border-white/[0.06] p-4">
                <Link href={'/dashboard/customer/my-bookings'}>
                 <Button
                  variant="outline"
                  className="h-10 w-full rounded-xl border-white/[0.07] bg-white/[0.02] text-xs text-slate-400 hover:bg-white/[0.05] hover:text-white"
                >

                  View All Bookings

                  <ChevronRight className="ml-2 h-3.5 w-3.5" />

                </Button>
                </Link>
               

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              PAYMENT SUMMARY
          ================================================== */}

          <Card className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] shadow-2xl backdrop-blur-xl">

            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">

                  <CreditCard className="h-4 w-4 text-violet-400" />

                </div>

                <div>

                  <h2 className="font-semibold text-white">
                    Payment Summary
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-600">
                    Your payment overview
                  </p>

                </div>

              </div>

               <Link href={'/dashboard/customer/payments-history'}>
                <Button
                variant="ghost"
                className="h-8 rounded-lg px-2.5 text-xs text-slate-500 hover:bg-white/5 hover:text-white"
              >
                View All
              </Button>
               </Link>
             

            </div>


            <CardContent className="p-5">


              {/* PAID */}

              <PaymentItem
                icon={CheckCircle2}
                title="Paid"
                amount={paymentPaid._sum.amount}
                count={`${paymentPaid._count} payments`}
                className="border-emerald-500/10 bg-emerald-500/[0.06]"
                iconClass="bg-emerald-500/10 text-emerald-400"
                countClass="text-emerald-400"
              />


              {/* PENDING */}

              <PaymentItem
                icon={Clock3}
                title="Pending"
                amount={pendingAmount?._sum?.amount||0}
                count={`${ pendingAmount?._count} Pending`}
                className="mt-3 border-amber-500/10 bg-amber-500/[0.06]"
                iconClass="bg-amber-500/10 text-amber-400"
                countClass="text-amber-400"
              />


              {/* FAILED */}

              <PaymentItem
                icon={ReceiptText}
                title="Failed"
                amount={cancelledPayment._sum?.amount||0}
                count={`${cancelledPayment._count||0} Failed`}
                className="mt-3 border-red-500/10 bg-red-500/[0.06]"
                iconClass="bg-red-500/10 text-red-400"
                countClass="text-red-400"
              />


                  <Link href={'/dashboard/customer/payments-history'}>
                  
                   <Button
                variant="ghost"
                className="h-8 rounded-lg px-2.5 text-xs text-slate-500 hover:bg-white/5 hover:text-white"
              >
                View All
              </Button>
                  </Link>

            </CardContent>

          </Card>

        </div>


        {/* ==================================================
            REVIEWS
        ================================================== */}

        <Card className="mt-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] shadow-2xl backdrop-blur-xl">

          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">

                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

              </div>

              <div>

                <h2 className="font-semibold text-white">
                  Recent Reviews
                </h2>

                <p className="mt-0.5 text-xs text-slate-600">
                  Your latest feedback
                </p>

              </div>

            </div>


            <Link href={'/dashboard/customer/my-reviews'}>
            <Button
              variant="ghost"
              className="group h-8 rounded-lg px-2.5 text-xs text-slate-500 hover:bg-white/5 hover:text-white"
            >

              View All

              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

            </Button>
            </Link>

          </div>


          <CardContent className="p-5 sm:p-6">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              { review.map((review:IReview) => (

                <div
                  key={review.bookingId}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition hover:border-white/[0.1] hover:bg-white/[0.035]"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="font-semibold text-slate-200">
                        {review.customer.name}
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-600">
                        Technician: {review.technician?.users?.name}
                      </p>

                    </div>


                    <div className="flex gap-0.5">

                      {Array.from({
                        length:review.rating,
                      }).map((_, index) => (

                        <Star
                          key={index}
                          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        />

                      ))}

                    </div>

                  </div>


                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    “{review.comment}”
                  </p>


                  <p className="mt-4 text-[10px] text-slate-700">
                    {new Date(review.createdAt).toLocaleDateString('en-Us',{
                      month:'short',
                      day:'2-digit',
                      year:'numeric'
                    })},
                  </p>

                </div>

              ))}

            </div>


            {/* REVIEW CTA */}

            <div className="relative mt-5 overflow-hidden rounded-2xl border border-blue-500/10 bg-gradient-to-r from-blue-500/[0.08] via-violet-500/[0.06] to-transparent p-5">

              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">

                    <MessageSquareText className="h-4 w-4 text-blue-400" />

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-slate-200">
                      Have a completed booking?
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Share your experience with the technician.
                    </p>

                  </div>

                </div>


                <Button
                  className="rounded-xl bg-white text-xs font-semibold text-slate-950 hover:bg-slate-100"
                >
                  Leave a Review
                  <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>

              </div>

            </div>

          </CardContent>

        </Card>


        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <section className="mt-7">

          <div className="mb-4">

            <h2 className="text-lg font-semibold text-white">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Quickly access the things you use most.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            <QuickAction
              icon={Wrench}
              title="Book a Service"
              description="Find a trusted technician"
              iconClass="text-blue-400 bg-blue-500/10"
            />

            <QuickAction
              icon={CalendarDays}
              title="My Bookings"
              description="Track all your bookings"
              iconClass="text-emerald-400 bg-emerald-500/10"
            />

            <QuickAction
              icon={CreditCard}
              title="Payments"
              description="View your transactions"
              iconClass="text-violet-400 bg-violet-500/10"
            />

          </div>

        </section>

      </main>

    </div>
  );
}


// ======================================================
// PAYMENT ITEM
// ======================================================

function PaymentItem({
  icon: Icon,
  title,
  amount,
  count,
  className,
  iconClass,
  countClass,
}: {
  icon: React.ElementType;
  title: string;
  amount: string;
  count: string;
  className: string;
  iconClass: string;
  countClass: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${className}`}
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <div>

            <p className="text-xs text-slate-500">
              {title}
            </p>

            <p className="mt-0.5 text-lg font-bold text-slate-200">
              ৳{amount}
            </p>

          </div>

        </div>


        <span
          className={`text-[10px] font-semibold ${countClass}`}
        >
          {count}
        </span>

      </div>

    </div>
  );
}


// ======================================================
// QUICK ACTION
// ======================================================

function QuickAction({
  icon: Icon,
  title,
  description,
  iconClass,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconClass: string;
}) {
  return (
    <Card className="group cursor-pointer rounded-2xl border border-white/[0.07] bg-white/[0.035] shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.055]">

      <CardContent className="flex items-center gap-4 p-5">

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >

          <Icon className="h-5 w-5" />

        </div>


        <div className="min-w-0 flex-1">

          <h3 className="font-semibold text-slate-200">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-600">
            {description}
          </p>

        </div>


        <ChevronRight className="h-4 w-4 text-slate-700 transition group-hover:translate-x-1 group-hover:text-slate-300" />

      </CardContent>

    </Card>
  );
}