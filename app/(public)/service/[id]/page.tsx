import {
  Star,
  ShieldCheck,
  ArrowLeft,
  UserCheck,
  MapPin,
  Sparkles,
  Clock3,
  CheckCircle2,
  BadgeCheck,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";
import BookingFrom from "./_components/BookingFrom";
import { singleService } from "./_actions/bookingAction";
import { getMe } from "../../../../service/Profileme";
import { IService } from '../../../../utils/type';

export default async function TechnicianProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const serviceDetail:IService = await singleService(id);
  const user = await getMe();

  const technician = serviceDetail?.technician;

  const rating = technician?.avgRating
    ? Number(technician.avgRating).toFixed(1)
    : "New";

  const reviews = technician?.reviewsCount || 0;

  return (
    <main className="min-h-screen bg-[#070b10] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-500/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/[0.05] blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-7 flex items-center justify-between">
            <Link
              href="/service"
              className="
                group inline-flex items-center gap-2 rounded-xl
                border border-slate-800 bg-slate-900/70
                px-3.5 py-2.5 text-xs font-semibold text-slate-400
                backdrop-blur-xl transition-all
                hover:border-emerald-500/30
                hover:bg-slate-900
                hover:text-emerald-400
              "
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Services
            </Link>

            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-3 py-1.5 text-[10px] font-bold text-emerald-400 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              AVAILABLE FOR BOOKING
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <section
                className="
                  relative overflow-hidden rounded-[28px]
                  border border-slate-800/80
                  bg-slate-900/60
                  shadow-[0_25px_80px_rgba(0,0,0,0.25)]
                  backdrop-blur-2xl
                "
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

                <div className="relative p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      <Sparkles className="h-3 w-3" />
                      {serviceDetail?.category?.name || "Home Service"}
                    </span>

                    {serviceDetail?.priceType && (
                      <span className="rounded-lg border border-slate-800 bg-slate-950/70 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                        {serviceDetail.priceType}
                      </span>
                    )}
                  </div>

                  <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
                    {serviceDetail?.title}
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                    {serviceDetail?.description ||
                      "Professional home service delivered by a trusted and experienced technician."}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-xl border border-amber-500/10 bg-amber-500/[0.05] px-3 py-2">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-amber-300">
                        {rating}
                      </span>
                      <span className="text-xs text-slate-600">
                        ({reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
                      <MapPin className="h-4 w-4 text-emerald-400" />
                      <span className="max-w-[180px] truncate text-xs font-medium text-slate-400">
                        {technician?.location || "Location unavailable"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border-t border-slate-800/80 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                        Starting price
                      </p>

                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-4xl font-black tracking-tight text-white">
                          ৳{serviceDetail?.price || 0}
                        </span>

                        {serviceDetail?.priceType === "Hourly" && (
                          <span className="text-xs font-medium text-slate-600">
                            / hour
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      Secure & trusted service
                    </div>
                  </div>
                </div>
              </section>

              <section
                className="
                  overflow-hidden rounded-[28px]
                  border border-slate-800/80
                  bg-slate-900/60
                  shadow-[0_20px_70px_rgba(0,0,0,0.2)]
                  backdrop-blur-2xl
                "
              >
                <div className="border-b border-slate-800/80 px-6 py-5 sm:px-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                        Your Technician
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-white">
                        Meet the professional
                      </h2>
                    </div>

                    <div className="hidden items-center gap-1.5 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.05] px-2.5 py-1.5 text-[10px] font-bold text-emerald-400 sm:flex">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      VERIFIED
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="relative shrink-0">
                      <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-emerald-400/30 to-cyan-400/10 blur-sm" />

                      <img
                        src={
                          technician?.users?.profilePhoto ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
                        }
                        alt={
                          technician?.users?.name ||
                          "Professional Technician"
                        }
                        className="
                          relative h-24 w-24 rounded-[20px]
                          border border-slate-700
                          object-cover
                          shadow-xl
                        "
                      />

                      <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-slate-900 bg-emerald-400">
                        <CheckCircle2 className="h-3 w-3 text-slate-950" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-black text-white">
                          {technician?.users?.name ||
                            "Professional Technician"}
                        </h3>

                        <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[9px] font-bold text-emerald-400">
                          VERIFIED
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                          {technician?.location || "Location unavailable"}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <BriefcaseBusiness className="h-3.5 w-3.5 text-cyan-400" />
                          {technician?.yearsOfExperience || "Experienced"}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      <p className="mt-3 text-xs font-bold text-slate-200">
                        Verified
                      </p>
                      <p className="mt-1 text-[10px] text-slate-600">
                        Professional
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                      <Clock3 className="h-5 w-5 text-cyan-400" />
                      <p className="mt-3 text-xs font-bold text-slate-200">
                        Fast Response
                      </p>
                      <p className="mt-1 text-[10px] text-slate-600">
                        Usually under 15m
                      </p>
                    </div>

                    <div className="col-span-2 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 sm:col-span-1">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <p className="mt-3 text-xs font-bold text-slate-200">
                        Top Rated
                      </p>
                      <p className="mt-1 text-[10px] text-slate-600">
                        Customer loved
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-950/50 p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-300">
                        About the technician
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-slate-500">
                      {technician?.bio ||
                        "Dedicated professional focused on providing reliable, safe and high-quality home services."}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-6">
              <div
                className="
                  overflow-hidden rounded-[28px]
                  border border-slate-800/80
                  bg-slate-900/90
                  shadow-[0_25px_80px_rgba(0,0,0,0.3)]
                  backdrop-blur-2xl
                "
              >
                <div className="relative border-b border-slate-800/80 p-6">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-500/[0.06] blur-3xl" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                        Ready when you are
                      </p>

                      <h2 className="mt-2 text-xl font-black text-white">
                        Book this service
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Choose a convenient date and available time slot.
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] text-emerald-400">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Service price
                      </span>

                      <span className="text-lg font-black text-white">
                        ৳{serviceDetail?.price || 0}
                      </span>
                    </div>

                    <div className="mt-3 h-px bg-slate-800" />

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Pricing type
                      </span>

                      <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-slate-300">
                        {serviceDetail?.priceType || "Fixed"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-950/40 p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-300">
                          Verified professional
                        </p>
                        <p className="text-[10px] text-slate-600">
                          Quality checked technician
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-950/40 p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
                        <Clock3 className="h-4 w-4 text-cyan-400" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-300">
                          Flexible scheduling
                        </p>
                        <p className="text-[10px] text-slate-600">
                          Pick your preferred time
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <BookingFrom
                      user={user}
                      serviceDetail={serviceDetail}
                    />
                  </div>

                  <p className="text-center text-[10px] leading-4 text-slate-600">
                    By booking, you agree to our service terms and booking
                    policy.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}