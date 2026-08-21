import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  UserRound,
  Wrench,
  BadgeCheck,
  CreditCard,
  ChevronRight,
  Pencil,
  Power,
  BriefcaseBusiness,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { singleService } from '../../../../../../(public)/service/[id]/_actions/bookingAction';
import { IService } from '../../../../../../../utils/type';



type ServiceDetailsPageProps = {
  params: Promise<{
    id?: string;
  }>;
};

const ServiceDetailspage = async ({ params }: ServiceDetailsPageProps) => {
  const { id } = await params;

  if (!id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070a10] px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0c111a] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <Wrench size={25} />
          </div>

          <h2 className="mt-5 text-xl font-semibold">Service Not Found</h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            No service ID was provided.
          </p>

          <Link
            href="/dashboard/technician/my-services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-indigo-500"
          >
            <ArrowLeft size={16} />
            Back to My Services
          </Link>
        </div>
      </div>
    );
  }

  const service:IService & {id:string}={}= await singleService(id);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070a10] px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0c111a] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <Wrench size={25} />
          </div>

          <h2 className="mt-5 text-xl font-semibold">Service Not Found</h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            This service may have been deleted or is no longer available.
          </p>

          <Link
            href="/dashboard/technician/my-services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-indigo-500"
          >
            <ArrowLeft size={16} />
            Back to My Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a10] text-white">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* =====================================================
            TOP BAR
        ====================================================== */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard/technician/my-services"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-[#0c111a] text-slate-400 transition hover:border-slate-700 hover:text-white"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>My Services</span>
                <ChevronRight size={13} />
                <span>Service Details</span>
              </div>

              <h1 className="mt-1 truncate text-lg font-semibold sm:text-xl">
                {service.title}
              </h1>
            </div>
          </div>

          {/* Status */}
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium ${
              service.isActive
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/20 bg-red-500/10 text-red-400"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                service.isActive
                  ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                  : "bg-red-400"
              }`}
            />

            {service.isActive ? "Service Active" : "Service Inactive"}
          </div>
        </div>

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden rounded-[30px] border border-slate-800 bg-[#0c111a]">
          {/* Background glow */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1fr_380px]">
            {/* Hero Content */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Category */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-400">
                  {service.category?.name || "Home Service"}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-400">
                  <ShieldCheck size={13} />
                  Verified Service
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[46px]">
                {service.title}
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                {service.description}
              </p>

              {/* Stats */}
              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
                <MiniStat
                  icon={<CircleDollarSign size={18} />}
                  label="Price"
                  value={`৳${service.price?.toLocaleString()}`}
                />

                <MiniStat
                  icon={<Clock3 size={18} />}
                  label="Pricing"
                  value={service.priceType || "Service"}
                />

                <MiniStat
                  icon={<CheckCircle2 size={18} />}
                  label="Status"
                  value={service.isActive ? "Active" : "Inactive"}
                />
              </div>
            </div>

            {/* Management Card */}
            <div className="border-t border-slate-800 bg-slate-950/30 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex h-full flex-col justify-center">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Service Management
                    </p>

                    <h3 className="mt-1 text-xl font-semibold">
                      Manage Service
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Wrench size={20} />
                  </div>
                </div>

                {/* Price */}
                <div className="mt-7 rounded-2xl border border-slate-800 bg-[#0c111a] p-5">
                  <p className="text-xs text-slate-500">
                    Current Service Price
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-bold">
                      ৳{service.price?.toLocaleString()}
                    </span>

                    <span className="mb-1 text-xs text-slate-500">
                      / {service.priceType || "service"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    href={`/dashboard/technician/my-services/edit/${service.id}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <Link
                    href={`/dashboard/technician/bookings?serviceId=${service.id}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium transition hover:bg-slate-700"
                  >
                    <CalendarDays size={16} />
                    Bookings
                  </Link>
                </div>

                {/* Active status */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-[#0c111a] p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        service.isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      <Power size={16} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Visibility</p>

                      <p className="mt-0.5 text-sm font-medium">
                        {service.isActive
                          ? "Visible to customers"
                          : "Hidden from customers"}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_370px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* About */}
            <section className="rounded-3xl border border-slate-800 bg-[#0c111a] p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                    Overview
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    About This Service
                  </h3>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 sm:flex">
                  <BriefcaseBusiness size={19} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <p className="text-sm leading-7 text-slate-400">
                  {service.description}
                </p>
              </div>
            </section>

            {/* Service Information */}
            <section className="rounded-3xl border border-slate-800 bg-[#0c111a] p-6 sm:p-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                  Information
                </p>

                <h3 className="mt-1 text-xl font-semibold">Service Details</h3>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailCard
                  icon={<Wrench size={18} />}
                  label="Service Type"
                  value={service.priceType || "Standard Service"}
                />

                <DetailCard
                  icon={<CreditCard size={18} />}
                  label="Service Price"
                  value={`৳${service.price?.toLocaleString()}`}
                />

                <DetailCard
                  icon={<CheckCircle2 size={18} />}
                  label="Current Status"
                  value={service.isActive ? "Active" : "Inactive"}
                />

                <DetailCard
                  icon={<CalendarDays size={18} />}
                  label="Booking"
                  value="Available for booking"
                />
              </div>
            </section>

            {/* Service Process */}
            <section className="rounded-3xl border border-slate-800 bg-[#0c111a] p-6 sm:p-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                  Workflow
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  How Your Service Works
                </h3>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <ProcessCard
                  number="01"
                  title="Customer Books"
                  description="Customers select your service and submit a booking request."
                />

                <ProcessCard
                  number="02"
                  title="You Accept"
                  description="Review the booking details and accept the service request."
                />

                <ProcessCard
                  number="03"
                  title="Complete Job"
                  description="Provide the service and mark the booking as completed."
                />
              </div>
            </section>
          </div>

          {/* =====================================================
              SIDEBAR
          ====================================================== */}
          <aside>
            <section className="sticky top-6 rounded-3xl border border-slate-800 bg-[#0c111a] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                    Technician
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">Service Owner</h3>
                </div>

                <BadgeCheck size={22} className="text-indigo-400" />
              </div>

              {/* Profile */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold shadow-lg shadow-indigo-500/10">
                  {service.technician?.users?.name?.charAt(0)?.toUpperCase() ||
                    "T"}
                </div>

                <div className="min-w-0">
                  <h4 className="truncate font-semibold">
                    {service.technician?.users?.name ||
                      "Professional Technician"}
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    Verified Technician
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="font-semibold">
                      {service.technician?.avgRating?.toFixed?.(1) || "4.9"}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Average Rating
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Wrench size={15} className="text-indigo-400" />

                    <span className="font-semibold">
                      {service.technician?.yearsOfExperience || 0}+
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Years Experience
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <MapPin size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Service Location</p>

                    <p className="mt-1 truncate text-sm font-medium">
                      {service.technician?.location || "Location not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {service.technician?.skills?.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500">
                      Professional Skills
                    </p>

                    <span className="text-[11px] text-slate-600">
                      {service.technician.skills.length} skills
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.technician.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Button */}
              <Link
                href={`/dashboard/technician/profile`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium transition hover:bg-slate-700"
              >
                <UserRound size={17} />
                View My Profile
                <ChevronRight size={16} />
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

/* =====================================================
   COMPONENTS
===================================================== */

const MiniStat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="flex items-center gap-2 text-indigo-400">
        {icon}

        <span className="text-[11px] text-slate-500">{label}</span>
      </div>

      <p className="mt-2 truncate text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
};

const DetailCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 transition hover:border-slate-700">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition group-hover:bg-indigo-500/15">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>

        <p className="mt-1 truncate text-sm font-medium text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
};

const ProcessCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-indigo-500/20">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-indigo-400">{number}</span>

        <div className="h-px flex-1 bg-slate-800 ml-4" />
      </div>

      <h4 className="mt-5 font-semibold">{title}</h4>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
};

export default ServiceDetailspage;


