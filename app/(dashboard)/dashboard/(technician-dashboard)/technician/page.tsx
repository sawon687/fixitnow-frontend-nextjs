import {
  CalendarCheck,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  MapPin,
  User,
  BriefcaseBusiness,
} from "lucide-react";

import Link from "next/link";
import { getTecnichianDashboard } from './_actions/technichinActions';
import { IBooking } from '../../../../../utils/type';
import BookingStatusColor from '../../../../../components/shared/BookingStatusColor';


export default async function TechnicianDashboardPage() {
  // Dashboard summary information
  const result=await getTecnichianDashboard()
  const valibileBookingCount=result?.avalibileBookingCount
  const totalRevunue=result?.totalRevunue
  const reqBookingCount=result?.reqBookingCount
  const completeBooking=result?.completeBooking
  const earningsData=result?.revenueData
  const upcomingJobs:IBooking[]=result?.booking
  console.log('upcoming',upcomingJobs)
  console.log('total erninge',totalRevunue)
  const stats = [
    {
      title: "Upcoming Jobs",
      value: valibileBookingCount,
      change: "+3",
      icon: CalendarCheck,
      description: "scheduled this week",
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Earnings",
      value: `৳${totalRevunue?._sum?.amount}`,
      change: "+18.7%",
      icon: DollarSign,
      description: "from completed jobs",
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Pending Requests",
      value: reqBookingCount,
      change: "+2",
      icon: ClipboardList,
      description: "waiting for response",
      iconBg: "bg-amber-50 dark:bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Completed Jobs",
      value: completeBooking,
      change: "+12.5%",
      icon: CheckCircle2,
      description: "all time",
      iconBg: "bg-violet-50 dark:bg-violet-500/10",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
  ];



  // Highest earning value is used to calculate chart bar height
  const maxEarning = Math.max(
    ...earningsData.map((item:{month:string, revenue:number}) => item.revenue),
    1
  );



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">

        {/* Dashboard header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
                <BriefcaseBusiness className="h-4 w-4 text-white" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Technician Panel
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep track of your jobs, earnings and requests.
            </p>
          </div>

          {/* Technician availability */}
          <div className="flex w-fit items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

              <span className="relative h-3 w-3 rounded-full bg-emerald-500" />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Current status
              </p>

              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Available for Jobs
              </p>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Decorative background */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-50 transition-transform duration-300 group-hover:scale-125 dark:bg-slate-800/40" />

                <div className="relative">
                  <div className="flex items-center justify-between">

                    {/* Card icon */}
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                    >
                      <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                    </div>

                    {/* Growth */}
                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {stat.change}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {stat.title}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {stat.value}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Earnings overview */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* Chart header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Earnings Overview
                </h2>

                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  +18.7%
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your earnings over the last 6 months
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <TrendingUp className="h-4 w-4" />
              Growing steadily
            </div>
          </div>

          {/* Earnings chart */}
          <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
            {earningsData.map((item:{month:string, revenue:number}) => {
              const height = `${Math.max(
                (item.revenue / maxEarning) * 100,
                5
              )}%`;

              return (
                <div
                  key={item.month}
                  className="group flex h-full flex-1 flex-col justify-end"
                >
                  <div className="relative flex h-full items-end">

                    {/* Revenue tooltip */}
                    <div className="absolute -top-9 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[11px] font-medium text-white shadow-lg group-hover:block dark:bg-white dark:text-slate-900">
                      ৳{item.revenue.toLocaleString("en-BD")}
                    </div>

                    {/* Gradient chart bar */}
                    <div
                      style={{ height }}
                      className="
                        w-full
                        min-w-[20px]
                        rounded-t-xl
                        bg-gradient-to-t
                        from-blue-600
                        via-indigo-500
                        to-violet-400
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover:from-blue-700
                        group-hover:via-indigo-600
                        group-hover:to-violet-500
                      "
                    />
                  </div>

                  <span className="mt-3 text-center text-xs font-medium text-slate-400">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming jobs */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* Table header */}
          <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Upcoming Jobs
                </h2>

                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  {upcomingJobs.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your next scheduled service jobs
              </p>
            </div>

            <Link
              href="/dashboard/technician/bookings"
              className="w-fit rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
            >
              View All
            </Link>
          </div>

          {/* Jobs table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">

              <thead className="border-b bg-slate-50/70 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">
                    Booking
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Customer
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Service
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Schedule
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Location
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Amount
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y dark:divide-slate-800">
                {upcomingJobs.map((job:IBooking) => (
                  <tr
                    key={job.id}
                    className="transition-colors hover:bg-blue-50/40 dark:hover:bg-blue-500/5"
                  >

                    {/* Booking ID */}
                    <td className="px-5 py-4">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {job.id.slice(0,13)}...
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
                          <User className="h-4 w-4 text-blue-500" />
                        </div>

                        <span className="text-slate-700 dark:text-slate-300">
                          {job.customer?.name}
                        </span>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {job.service?.category?.name}
                    </td>

                    {/* Schedule */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          {new Date(job?.createdAt).toLocaleDateString('en-Us',{
                            month:"short",
                            day:'2-digit',
                            year:"numeric"
                          })}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {new Date(job?.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        {job.address}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        ৳{job.totalAmount?.toLocaleString("en-BD")}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <BookingStatusColor status={job?.status}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom information */}
        <div className="flex items-center gap-3 rounded-2xl border bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-500/10">
            <CheckCircle2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Great work!
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              You have completed 128 jobs with a strong service record.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}