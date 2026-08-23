import React from "react";
import Image from "next/image";
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
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { getMe } from "../../../../service/Profileme";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";

const MyProfile = async () => {
  const user = await getMe();

  const initials =
    user?.name
      ?.split(" ")
      .map((name: string) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8 lg:py-8">
        {/* ================= HEADER ================= */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-300">
              <Sparkles size={13} />
              Account Overview
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              My Profile
            </h1>

            <p className="mt-1.5 text-sm text-slate-400">
              Manage your personal information and account details
            </p>
          </div>

          <button className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-lg shadow-black/10 transition hover:border-indigo-500/40 hover:bg-slate-800">
            <Pencil size={15} />
            Edit Profile
          </button>
        </div>

        {/* ================= PROFILE HERO ================= */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0d1320] shadow-2xl shadow-black/20">
          {/* Decorative background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-purple-600/10 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-500/[0.08] to-transparent" />
          </div>

          <div className="relative p-6 md:p-8">
            {/* Top profile */}
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {/* ================= PROFILE AVATAR ================= */}
                <div className="relative shrink-0">
                  {/* Glow */}
                  <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 opacity-30 blur-md" />

                  <Avatar className="relative h-24 w-24 rounded-[20px] border border-white/10 shadow-2xl md:h-28 md:w-28">
                    <AvatarImage
                      src={user?.profilePhoto || ""}
                      alt={user?.name || "Profile photo"}
                      className="object-cover"
                    />

                    <AvatarFallback className="rounded-[20px] bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Online indicator */}
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#0d1320] bg-emerald-500">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                </div>

                {/* User info */}
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      {user?.name || "User"}
                    </h2>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                      <CircleCheck size={13} />
                      {user?.status || "ACTIVE"}
                    </span>
                  </div>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                    <Mail size={14} />
                    {user?.email || "No email available"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-lg border border-slate-700/70 bg-slate-800/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-300">
                      {user?.role || "CUSTOMER"}
                    </span>

                    <span className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-300">
                      Verified Account
                    </span>
                  </div>
                </div>
              </div>

              {/* Member info */}
              <div className="hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] px-5 py-4 md:block">
                <p className="text-[11px] uppercase tracking-wider text-slate-500">
                  Member since
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-200">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {/* Bookings */}
          <div className="group rounded-2xl border border-white/[0.06] bg-[#0d1320] p-5 transition hover:-translate-y-0.5 hover:border-indigo-500/20">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <ClipboardList size={19} />
              </div>

              <ArrowUpRight
                size={17}
                className="text-slate-600 transition group-hover:text-indigo-400"
              />
            </div>

            <p className="mt-4 text-xs text-slate-500">Total Bookings</p>

            <p className="mt-1 text-2xl font-bold text-white">
              {user?.bookings?.length || 0}
            </p>
          </div>

          {/* Reviews */}
          <div className="group rounded-2xl border border-white/[0.06] bg-[#0d1320] p-5 transition hover:-translate-y-0.5 hover:border-yellow-500/20">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                <Star size={19} />
              </div>

              <ArrowUpRight
                size={17}
                className="text-slate-600 transition group-hover:text-yellow-400"
              />
            </div>

            <p className="mt-4 text-xs text-slate-500">Total Reviews</p>

            <p className="mt-1 text-2xl font-bold text-white">
              {user?.reviews?.length || 0}
            </p>
          </div>

          {/* Payments */}
          <div className="group rounded-2xl border border-white/[0.06] bg-[#0d1320] p-5 transition hover:-translate-y-0.5 hover:border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <CreditCard size={19} />
              </div>

              <ArrowUpRight
                size={17}
                className="text-slate-600 transition group-hover:text-cyan-400"
              />
            </div>

            <p className="mt-4 text-xs text-slate-500">Total Payments</p>

            <p className="mt-1 text-2xl font-bold text-white">
              {user?.payment?.length || 0}
            </p>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* Personal Information */}
          <section className="rounded-[24px] border border-white/[0.06] bg-[#0d1320] p-6 md:p-7">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your basic account information
                </p>
              </div>

              <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 sm:flex">
                <UserRound size={17} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Name */}
              <div className="rounded-2xl border border-white/[0.05] bg-[#080d17] p-4 transition hover:border-indigo-500/20">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <UserRound size={17} />
                </div>

                <p className="text-[11px] uppercase tracking-wide text-slate-600">
                  Full Name
                </p>

                <p className="mt-1.5 truncate font-medium text-slate-200">
                  {user?.name || "Not provided"}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-white/[0.05] bg-[#080d17] p-4 transition hover:border-cyan-500/20">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail size={17} />
                </div>

                <p className="text-[11px] uppercase tracking-wide text-slate-600">
                  Email Address
                </p>

                <p className="mt-1.5 break-all font-medium text-slate-200">
                  {user?.email || "Not provided"}
                </p>
              </div>

              {/* Role */}
              <div className="rounded-2xl border border-white/[0.05] bg-[#080d17] p-4 transition hover:border-purple-500/20">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <ShieldCheck size={17} />
                </div>

                <p className="text-[11px] uppercase tracking-wide text-slate-600">
                  Account Role
                </p>

                <p className="mt-1.5 font-medium text-slate-200">
                  {user?.role || "CUSTOMER"}
                </p>
              </div>

              {/* Status */}
              <div className="rounded-2xl border border-white/[0.05] bg-[#080d17] p-4 transition hover:border-emerald-500/20">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CircleCheck size={17} />
                </div>

                <p className="text-[11px] uppercase tracking-wide text-slate-600">
                  Account Status
                </p>

                <p className="mt-1.5 font-medium text-emerald-400">
                  {user?.status || "UNBAN"}
                </p>
              </div>
            </div>
          </section>

          {/* Account Summary */}
          <section className="rounded-[24px] border border-white/[0.06] bg-[#0d1320] p-6 md:p-7">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Account Summary
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Your account activity
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/[0.04] bg-[#080d17] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <ClipboardList size={17} />
                  </div>

                  <span className="text-sm text-slate-300">Bookings</span>
                </div>

                <span className="font-bold text-white">
                  {user?.bookings?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/[0.04] bg-[#080d17] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                    <Star size={17} />
                  </div>

                  <span className="text-sm text-slate-300">Reviews</span>
                </div>

                <span className="font-bold text-white">
                  {user?.reviews?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/[0.04] bg-[#080d17] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <CreditCard size={17} />
                  </div>

                  <span className="text-sm text-slate-300">Payments</span>
                </div>

                <span className="font-bold text-white">
                  {user?.payment?.length || 0}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ================= MEMBER SINCE ================= */}
        <section className="rounded-[24px] border border-white/[0.06] bg-[#0d1320] p-5 md:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <CalendarDays size={20} />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-slate-600">
                Member Since
              </p>

              <p className="mt-1 font-medium text-slate-200">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECURITY ================= */}
        <section className="rounded-[24px] border border-white/[0.06] bg-[#0d1320] p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Settings size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-white">Account Settings</h3>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your password and account preferences
                </p>
              </div>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-purple-500/30 hover:bg-slate-700">
              <Settings size={15} />
              Manage Settings
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
