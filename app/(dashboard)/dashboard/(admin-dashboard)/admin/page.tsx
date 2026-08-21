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

import { getAdminDashboard } from "./_action/adminAction";
import { IBooking } from "../../../../../utils/type";
import BookingStatusColor from "../../../../../components/shared/BookingStatusColor";

export default async function AdminDashboardpage() {
  // get dashboard data
  const result = await getAdminDashboard();

  // dashboard stats
  const totalUser = Number(result?.totalUser ?? 0);
  const activeBookingCount = Number(result?.activeBookingCount ?? 0);
  const totalRevenue = Number(result?.revenue ?? 0);

  // dashboard overview data
  const recentBookings: IBooking[] = result?.bookingAll ?? [];
  const registerUser = Number(result?.registerUser ?? 0);
  const totaltechnician = Number(result?.totaltechnician ?? 0);
  const runingMonthBooking = Number(result?.runingMonthBooking ?? 0);
  const revenueData = result?.revenueData ?? [];

  // find max revenue for chart
  const maxRevenue = Math.max(
    ...revenueData.map((item: any) => Number(item.revenue ?? 0)),
    1
  );

  // top dashboard cards
  const stats = [
    {
      title: "Total Users",
      value: totalUser.toLocaleString("en-BD"),
      change: "+12.5%",
      icon: Users,
      description: "from last month",
    },
    {
      title: "Active Bookings",
      value: activeBookingCount.toLocaleString("en-BD"),
      change: "+8.2%",
      icon: CalendarCheck,
      description: "currently active",
    },
    {
      title: "Total Revenue",
      value: `৳${totalRevenue.toLocaleString("en-BD")}`,
      change: "+18.7%",
      icon: DollarSign,
      description: "from paid payments",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">

        {/* dashboard header */}
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

        {/* dashboard stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">

                  {/* stat icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                  </div>

                  {/* percentage change */}
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

        {/* revenue and platform overview */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* revenue chart */}
          <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Revenue Overview
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Revenue from successful paid payments
                </p>
              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                +18.7%
              </div>
            </div>

            {/* revenue bars */}
            <div className="mt-8 flex h-64 items-end gap-3">
              {revenueData.length > 0 ? (
                revenueData.map((item: any) => {
                  const revenue = Number(item.revenue ?? 0);

                  // calculate bar height from max revenue
                  const height = `${Math.max(
                    (revenue / maxRevenue) * 100,
                    3
                  )}%`;

                  return (
                    <div
                      key={item.month}
                      className="group flex h-full flex-1 flex-col justify-end"
                    >
                      <div className="relative flex h-full items-end">

                        {/* revenue bar */}
                        <div
                          style={{ height }}
                          className="w-full rounded-t-md bg-slate-900 transition-all group-hover:bg-slate-700 dark:bg-emerald-400 dark:group-hover:bg-emerald-300"
                        />

                        {/* show revenue on hover */}
                        <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-xs font-medium text-slate-600 group-hover:block dark:text-slate-300">
                          ৳{revenue.toLocaleString("en-BD")}
                        </span>
                      </div>

                      {/* month */}
                      <span className="mt-3 text-center text-xs text-slate-400">
                        {item.month}
                      </span>
                    </div>
                  );
                })
              ) : (
                // show message if there is no revenue data
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                  No revenue data available
                </div>
              )}
            </div>
          </div>

          {/* platform overview */}
          <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Platform Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Current platform statistics
            </p>

            <div className="mt-6 space-y-5">

              {/* customers */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Users className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Customers
                    </p>

                    <p className="text-xs text-slate-400">
                      Registered users
                    </p>
                  </div>
                </div>

                <span className="font-semibold text-slate-900 dark:text-white">
                  {registerUser.toLocaleString("en-BD")}
                </span>
              </div>

              {/* technicians */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <UserCheck className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Technicians
                    </p>

                    <p className="text-xs text-slate-400">
                      Active technicians
                    </p>
                  </div>
                </div>

                <span className="font-semibold text-slate-900 dark:text-white">
                  {totaltechnician.toLocaleString("en-BD")}
                </span>
              </div>

              {/* this month bookings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <CalendarCheck className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Bookings
                    </p>

                    <p className="text-xs text-slate-400">
                      This month
                    </p>
                  </div>
                </div>

                <span className="font-semibold text-slate-900 dark:text-white">
                  {runingMonthBooking.toLocaleString("en-BD")}
                </span>
              </div>
            </div>

            {/* system status */}
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

        {/* recent bookings */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* table header */}
          <div className="flex items-center justify-between border-b px-5 py-4 dark:border-slate-800">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Recent Bookings
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Latest booking activity
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-medium text-slate-700 hover:underline dark:text-slate-300"
            >
              View All
            </button>
          </div>

          {/* booking table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3">Booking</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y dark:divide-slate-800">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking: IBooking) => (
                    <tr
                      key={booking.id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      {/* booking id */}
                      <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                        #{booking.id?.slice(0, 13)}...
                      </td>

                      {/* customer name */}
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {booking.customer?.name ?? "N/A"}
                      </td>

                      {/* service category */}
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {booking.service?.category?.name ?? "N/A"}
                      </td>

                      {/* booking amount */}
                      <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                        ৳
                        {Number(
                          booking.totalAmount ?? 0
                        ).toLocaleString("en-BD")}
                      </td>

                      {/* booking status */}
                      <td className="px-5 py-4">
                        <BookingStatusColor status={booking.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  // no bookings found
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-sm text-slate-400"
                    >
                      No recent bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}