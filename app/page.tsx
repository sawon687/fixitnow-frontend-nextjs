import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Clock3,
  Star,
  Wrench,
  Home,
  Zap,
  Droplets,
  Snowflake,
  Hammer,
  CheckCircle2,
  Users,
  BriefcaseBusiness,
  Sparkles,
  ChevronRight,
  BadgeCheck,
  MapPin,
  CalendarCheck2,
  CreditCard,
  Headphones,
  Shield,
  CircleCheck,
} from "lucide-react";

import Header from "./(public)/service/_components/Header";
import { getCategre } from "../commonService/getCategrie";
import { ICategory, IService } from "../utils/type";
import { CATEGORIES_DATA } from "../commonService/service";
import { getAllService } from './(public)/service/_actions/serviceActions';
import ServiceCard from './(public)/service/_components/ServiceCard';

const categories = [
  {
    name: "Electrical",
    icon: Zap,
    description: "Electrical repair & installation",
  },
  {
    name: "Plumbing",
    icon: Droplets,
    description: "Professional plumbing services",
  },
  {
    name: "AC Repair",
    icon: Snowflake,
    description: "AC servicing & repair",
  },
  {
    name: "Home Repair",
    icon: Hammer,
    description: "General home maintenance",
  },
];



const areas = [
  "Dhaka",
  "Rajshahi",
  "Chattogram",
  "Sylhet",
  "Khulna",
  "Rangpur",
];

export default async function HomePage() {
  const result = await getCategre();
  const {serviceInfo:service}=await getAllService()
  const category = result?.data?.allcategory || [];

  const categoryNames = category.map((c: ICategory) => c.name);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-emerald-500/[0.08] blur-[140px]" />

        <div className="absolute right-[-200px] top-[15%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

        <div className="absolute bottom-[15%] left-[35%] h-[450px] w-[450px] rounded-full bg-emerald-500/[0.035] blur-[130px]" />
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-zinc-800/80">

        {/* Grid */}
        <div
          className="
            pointer-events-none absolute inset-0 opacity-[0.025]
            [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
            [background-size:55px_55px]
          "
        />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-8 lg:py-28">

          {/* LEFT */}

          <div className="relative">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3.5 py-2 text-xs font-semibold text-emerald-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                <Sparkles className="h-3 w-3" />
              </span>

              Bangladesh's trusted home service platform
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">

              Your Home.

              <br />

              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Our Expertise.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              From quick repairs to complete home maintenance, connect
              with skilled and verified professionals who are ready to
              take care of your home.
            </p>

            {/* Search */}

            <div className="relative mt-8 max-w-2xl">

              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 blur-lg" />

              <div className="relative flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-2 shadow-2xl backdrop-blur-xl sm:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/70 px-4">

                  <Search className="h-4 w-4 text-zinc-500" />

                  <input
                    placeholder="What service do you need?"
                    className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                  />

                </div>

                <Link
                  href="/service"
                  className="
                    flex h-12 items-center justify-center gap-2
                    rounded-xl bg-emerald-500 px-6
                    text-sm font-bold text-zinc-950
                    shadow-lg shadow-emerald-500/10
                    transition-all
                    hover:bg-emerald-400
                    hover:shadow-emerald-500/20
                  "
                >
                  Find a Service
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>

            </div>

            {/* Trust */}

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-500">

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Verified technicians
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Secure payments
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Easy booking
              </span>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="absolute -inset-5 rounded-[3rem] bg-emerald-500/[0.04] blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-2 shadow-2xl">

              <div className="relative h-[400px] overflow-hidden rounded-[1.5rem] bg-zinc-800 sm:h-[470px]">

                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"
                  alt="Professional home service"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Floating Badge */}

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500">
                    <BadgeCheck className="h-4 w-4 text-black" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-white">
                      Verified
                    </p>

                    <p className="text-[9px] text-zinc-400">
                      Professional
                    </p>
                  </div>

                </div>

                {/* Bottom Card */}

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-zinc-950/85 p-4 backdrop-blur-xl">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          Trusted Professionals
                        </p>

                        <p className="mt-0.5 text-xs text-zinc-500">
                          Skilled people. Reliable service.
                        </p>
                      </div>

                    </div>

                    <div className="hidden text-right sm:block">
                      <p className="text-lg font-bold text-emerald-400">
                        4.9
                      </p>

                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="border-b border-zinc-800/80 bg-zinc-900/30">

        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-zinc-800 md:grid-cols-4">

          <HomeStat
            value="10K+"
            label="Happy Customers"
          />

          <HomeStat
            value="500+"
            label="Verified Professionals"
          />

          <HomeStat
            value="50K+"
            label="Jobs Completed"
          />

          <HomeStat
            value="4.9/5"
            label="Average Rating"
          />

        </div>

      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <SectionHeading
          eyebrow="POPULAR CATEGORIES"
          title="What do you need help with?"
          description="Find reliable professionals for your everyday home service needs."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                href={`/service?category=${category.name}`}
                key={category.name}
                className="
                  group relative overflow-hidden
                  rounded-2xl border border-zinc-800
                  bg-zinc-900/60 p-5
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-emerald-500/30
                  hover:bg-zinc-900
                "
              >

                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/10" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-emerald-400 transition group-hover:border-emerald-500/20">
                      <Icon className="h-5 w-5" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-emerald-400" />

                  </div>

                  <h3 className="mt-6 text-sm font-bold">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    {category.description}
                  </p>

                </div>

              </Link>
            );
          })}

        </div>

        {/* Backend Categories */}

        {categoryNames.length > 0 && (
          <div className="mt-8 rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-4">

            <div className="flex flex-wrap items-center gap-2">

              <span className="mr-2 text-xs font-semibold text-zinc-500">
                Explore:
              </span>

              {categoryNames.slice(0, 8).map((name) => (
                <Link
                  key={name}
                  href={`/service?category=${name}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-[11px] text-zinc-400 transition hover:border-emerald-500/30 hover:text-emerald-400"
                >
                  {name}
                </Link>
              ))}

            </div>

          </div>
        )}

      </section>

      {/* =====================================================
          FEATURED SERVICES
      ====================================================== */}

      <section className="border-y border-zinc-800/80 bg-zinc-900/30">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <SectionHeading
              eyebrow="POPULAR SERVICES"
              title="Services customers love"
              description="Professional services from highly rated technicians."
            />

            <Link
              href="/service"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              View all services
              <ChevronRight className="h-4 w-4" />
            </Link>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

       {service?.slice(0,3).map((service:IService) => (
    <ServiceCard key={service.id} service={service}></ServiceCard>
  ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="Get your home fixed in 3 simple steps"
          description="From finding a technician to completing your booking, everything is simple."
        />

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">

          <Step
            number="01"
            icon={<Search />}
            title="Find a Service"
            description="Browse our services and find the right professional for your home."
          />

          <Step
            number="02"
            icon={<CalendarCheck2 />}
            title="Choose a Time"
            description="Select your preferred technician and choose an available time slot."
          />

          <Step
            number="03"
            icon={<CheckCircle2 />}
            title="Get It Done"
            description="Relax while your verified professional takes care of the job."
          />

        </div>

      </section>

      {/* =====================================================
          WHY FIXITNOW
      ====================================================== */}

      <section className="border-y border-zinc-800/80 bg-zinc-900/30">

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">

          <div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              WHY FIXITNOW
            </span>

            <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
              Home services you can trust.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-500">
              We make it easier to find skilled professionals for
              everything your home needs — without the hassle.
            </p>

            <div className="mt-8 space-y-6">

              <Feature
                icon={<ShieldCheck />}
                title="Verified Professionals"
                description="Connect with trusted and qualified technicians."
              />

              <Feature
                icon={<Clock3 />}
                title="Flexible Scheduling"
                description="Choose an available time that works for you."
              />

              <Feature
                icon={<CreditCard />}
                title="Secure Payments"
                description="Pay securely and keep your booking experience simple."
              />

              <Feature
                icon={<Headphones />}
                title="Reliable Support"
                description="We're here whenever you need help with your booking."
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <TrustCard
              icon={<Users />}
              value="10K+"
              label="Happy Customers"
            />

            <TrustCard
              icon={<BriefcaseBusiness />}
              value="500+"
              label="Professionals"
              offset
            />

            <TrustCard
              icon={<Star />}
              value="4.9"
              label="Average Rating"
            />

            <TrustCard
              icon={<Home />}
              value="50K+"
              label="Jobs Completed"
              offset
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          SERVICE AREAS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <SectionHeading
          eyebrow="SERVICE AREAS"
          title="Professional help near you"
          description="Find trusted home service professionals across popular locations."
        />

        <div className="mt-8 flex flex-wrap gap-3">

          {areas.map((area) => (
            <Link
              key={area}
              href={`/service?location=${area}`}
              className="
                group flex items-center gap-2
                rounded-xl border border-zinc-800
                bg-zinc-900/60 px-4 py-3
                text-xs font-medium text-zinc-400
                transition-all
                hover:border-emerald-500/30
                hover:bg-emerald-500/[0.04]
                hover:text-emerald-400
              "
            >
              <MapPin className="h-3.5 w-3.5 text-emerald-500" />
              {area}
              <ChevronRight className="h-3 w-3 text-zinc-700 transition group-hover:translate-x-0.5" />
            </Link>
          ))}

        </div>

      </section>

      {/* 
          FINAL CTA
       */}

      <section className="px-6 pb-20">

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.10] via-zinc-900 to-cyan-500/[0.08] px-6 py-14 text-center sm:px-12">

          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
              <Wrench className="h-5 w-5 text-emerald-400" />
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
              Ready to get things fixed?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400">
              Find a trusted professional and book your home service
              in just a few clicks.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/service"
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl bg-emerald-500 px-6
                  text-sm font-bold text-zinc-950
                  transition hover:bg-emerald-400
                "
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/service"
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl border border-zinc-700
                  bg-zinc-950/40 px-6
                  text-sm font-semibold text-zinc-300
                  transition hover:border-zinc-600 hover:text-white
                "
              >
                Browse Categories
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

/* 
   SECTION HEADING
 */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
        {title}
      </h2>

      <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

/* 
   HOME STAT
 */

function HomeStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="px-5 py-8 text-center">

      <p className="text-xl font-black text-white sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-zinc-600">
        {label}
      </p>

    </div>
  );
}

/* 
   STEP
 */

function Step({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl border border-zinc-800
        bg-zinc-900/70 p-6
        transition-all duration-300
        hover:border-emerald-500/20
      "
    >

      <span className="absolute right-5 top-4 text-5xl font-black text-zinc-800/70">
        {number}
      </span>

      <div className="relative">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/10 text-emerald-400">
          {icon}
        </div>

        <h3 className="mt-6 font-bold">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-6 text-zinc-500">
          {description}
        </p>

      </div>

    </div>
  );
}

/* ============================================================
   FEATURE
============================================================ */

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-emerald-400">
        {icon}
      </div>

      <div>

        <h3 className="text-sm font-bold">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          {description}
        </p>

      </div>

    </div>
  );
}

/* 
   TRUST CARD
 */

function TrustCard({
  icon,
  value,
  label,
  offset = false,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  offset?: boolean;
}) {
  return (
    <div
      className={`
        rounded-3xl border border-zinc-800
        bg-zinc-900 p-6
        ${offset ? "mt-8" : ""}
      `}
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-emerald-400">
        {icon}
      </div>

      <p className="mt-8 text-3xl font-black">
        {value}
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        {label}
      </p>

    </div>
  );
}