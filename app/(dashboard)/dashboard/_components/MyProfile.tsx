import React from "react";
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  CircleCheck,
  CreditCard,
  ClipboardList,
  Star,
  Settings,
  Pencil,
} from "lucide-react";
import { getMe } from '../../../../service/Profileme';



const MyProfile = async () => {
  const user = await getMe();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your personal information and account details
          </p>
        </div>

        {/* Profile Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          {/* Background */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-cyan-500/20" />

          <div className="relative p-6 md:p-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              {/* User */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                {/* Avatar */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl">
                  <UserRound size={42} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold">
                      {user?.name || "User"}
                    </h2>

                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      <CircleCheck size={14} />
                      {user?.status || "ACTIVE"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {user?.email}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {user?.role || "CUSTOMER"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit */}
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-700">
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Personal Information */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Your basic account information
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Name */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <UserRound size={18} />
                </div>

                <p className="text-xs text-slate-500">
                  Full Name
                </p>

                <p className="mt-1 font-medium text-slate-200">
                  {user?.name || "Not provided"}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail size={18} />
                </div>

                <p className="text-xs text-slate-500">
                  Email Address
                </p>

                <p className="mt-1 break-all font-medium text-slate-200">
                  {user?.email || "Not provided"}
                </p>
              </div>

              {/* Role */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <ShieldCheck size={18} />
                </div>

                <p className="text-xs text-slate-500">
                  Account Role
                </p>

                <p className="mt-1 font-medium text-slate-200">
                  {user?.role || "CUSTOMER"}
                </p>
              </div>

              {/* Status */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CircleCheck size={18} />
                </div>

                <p className="text-xs text-slate-500">
                  Account Status
                </p>

                <p className="mt-1 font-medium text-emerald-400">
                  {user?.status || "UNBAN"}
                </p>
              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">
              Account Summary
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Your account overview
            </p>

            <div className="mt-6 space-y-3">

              <div className="flex items-center justify-between rounded-2xl bg-slate-950/60 p-4">
                <div className="flex items-center gap-3">
                  <ClipboardList className="text-indigo-400" size={20} />
                  <span className="text-sm text-slate-300">
                    Bookings
                  </span>
                </div>

                <span className="font-semibold">
                  {user?.bookings?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-950/60 p-4">
                <div className="flex items-center gap-3">
                  <Star className="text-yellow-400" size={20} />
                  <span className="text-sm text-slate-300">
                    Reviews
                  </span>
                </div>

                <span className="font-semibold">
                  {user?.reviews?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-950/60 p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-cyan-400" size={20} />
                  <span className="text-sm text-slate-300">
                    Payments
                  </span>
                </div>

                <span className="font-semibold">
                  {user?.payment?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <CalendarDays size={21} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Member Since
              </p>

              <p className="mt-1 font-medium text-slate-200">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Settings size={21} />
              </div>

              <div>
                <h3 className="font-semibold">
                  Account Settings
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Manage your password and account preferences
                </p>
              </div>
            </div>

            <button className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-700">
              Manage Settings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;