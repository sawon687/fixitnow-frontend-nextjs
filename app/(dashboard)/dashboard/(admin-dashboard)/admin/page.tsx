

import React from "react";
import {
  Users,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  UserCheck,
} from "lucide-react";
import { getAdminDashboard } from './_action/adminAction';
import { IBooking } from '../../../../../utils/type';
import BookingStatusColor from '../../../../../components/shared/BookingStatusColor';


const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 68000 },
  { month: "May", revenue: 62000 },
  { month: "Jun", revenue: 76000 },
  { month: "Jul", revenue: 82000 },
  { month: "Aug", revenue: 90000 },
];



export default async function AdminDashboardpage() {
const result=await getAdminDashboard()
const totalUser=result?.totalUser as Number
const activeBookingCount=result?.activeBookingCount
const totalRevenue=result?.revenue
const recentBookings=result?.bookingAll
const registerUser=result?.registerUser
const totaltechnician=result?.totaltechnician
const runingMonthBooking=result?.runingMonthBooking
console.log('result dashboard',result)
const stats = [
  {
    title: "Total Users",
    value: totalUser,
    change: "+12.5%",
    icon: Users,
    description: "from last month",
  },
  {
    title: "Active Bookings",
    value:activeBookingCount,
    change: "+8.2%",
    icon: CalendarCheck,
    description: "currently active",
  },
  {
    title: "Total Revenue",
    value: `৳${totalRevenue}`,
    change: "+18.7%",
    icon: DollarSign,
    description: "from paid payments",
  },
];



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Overview of your platform performance and activity.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Clock3 className="h-4 w-4" />
            Last updated: Just now
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    {stat.change}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue + Platform Health */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Revenue */}
          <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Revenue Overview
                </h2>

                <p className="text-sm text-slate-500">
                  Revenue from successful paid payments
                </p>
              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                +18.7%
              </div>
            </div>

            {/* Chart */}
            <div className="mt-8 flex h-64 items-end gap-3">
              {revenueData.map((item) => {
                const height = `${(item.revenue / 100000) * 100}%`;

                return (
                  <div
                    key={item.month}
                    className="group flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="relative flex h-full items-end">
                      <div
                        style={{ height }}
                        className="w-full rounded-t-md bg-slate-900 transition-all group-hover:bg-slate-700 dark:bg-slate-200 dark:group-hover:bg-slate-300"
                      />

                      <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 text-xs font-medium text-slate-600 group-hover:block dark:text-slate-300">
                        ৳{item.revenue / 1000}k
                      </span>
                    </div>

                    <span className="mt-3 text-center text-xs text-slate-400">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform Overview */}
          <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Platform Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current platform statistics
            </p>

            <div className="mt-6 space-y-5">

              {/* Users */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Users className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Customers</p>
                    <p className="text-xs text-slate-400">
                      Registered users
                    </p>
                  </div>
                </div>

                <span className="font-semibold">{registerUser}</span>
              </div>

              {/* Technicians */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <UserCheck className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Technicians</p>
                    <p className="text-xs text-slate-400">
                      Active technicians
                    </p>
                  </div>
                </div>

                <span className="font-semibold">{totaltechnician}</span>
              </div>

              {/* Bookings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <CalendarCheck className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Bookings</p>
                    <p className="text-xs text-slate-400">
                      This month
                    </p>
                  </div>
                </div>

                <span className="font-semibold">{runingMonthBooking}</span>
              </div>
            </div>

            {/* Health */}
            <div className="mt-7 rounded-lg bg-emerald-50 p-4 dark:bg-emerald-500/10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />

                <div>
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    All systems operational
                  </p>

                  <p className="text-xs text-emerald-600/80">
                    Platform is running normally
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b px-5 py-4 dark:border-slate-800">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Recent Bookings
              </h2>

              <p className="text-sm text-slate-500">
                Latest booking activity
              </p>
            </div>

            <button className="text-sm font-medium text-slate-700 hover:underline dark:text-slate-300">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50">
                <tr>
                  <th className="px-5 py-3">Booking</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y dark:divide-slate-800">
                {recentBookings?.map((booking:IBooking) => (
                  <tr
                    key={booking.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                      #{booking?.id.slice(0,13)}...
                    </td>

                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {booking?.customer?.name}
                    </td>

                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {booking?.service?.category?.name}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                      {booking?.totalAmount}
                    </td>

                    <td className="px-5 py-4">
                     <BookingStatusColor status={booking.status}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}