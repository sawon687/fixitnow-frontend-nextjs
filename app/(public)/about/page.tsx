import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock3,
  Heart,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    {
      value: "10K+",
      label: "Happy Customers",
      icon: Users,
    },
    {
      value: "2.5K+",
      label: "Verified Technicians",
      icon: Wrench,
    },
    {
      value: "25K+",
      label: "Services Completed",
      icon: CheckCircle2,
    },
    {
      value: "4.9/5",
      label: "Average Rating",
      icon: Star,
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Professionals",
      description:
        "We help you connect with skilled and trusted technicians so you can book services with confidence.",
    },
    {
      icon: Zap,
      title: "Fast & Simple Booking",
      description:
        "Find a service, choose a technician, select a suitable time and get your booking confirmed in minutes.",
    },
    {
      icon: Clock3,
      title: "Flexible Scheduling",
      description:
        "Choose available time slots that work for you without unnecessary calls or complicated processes.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description:
        "Our platform is designed around reliable service, transparent communication and customer satisfaction.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Choose a Service",
      description:
        "Browse our wide range of home and professional services.",
    },
    {
      number: "02",
      title: "Find Your Technician",
      description:
        "Compare experienced technicians, ratings and service details.",
    },
    {
      number: "03",
      title: "Book a Time",
      description:
        "Pick a convenient available time slot and confirm your booking.",
    },
    {
      number: "04",
      title: "Get It Done",
      description:
        "A trusted professional arrives and takes care of the job.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#070b14] text-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative border-b border-white/[0.06]">
        {/* Background Glow */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[140px]" />

          <div className="absolute right-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px]" />

          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-emerald-400/[0.06] blur-[120px]" />
        </div>

        {/* Grid Pattern */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}

            <div
              className="
                mb-7
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-400/20
                bg-emerald-400/[0.06]
                px-4
                py-2
              "
            >
              <Sparkles className="h-4 w-4 text-emerald-400" />

              <span className="text-xs font-medium text-emerald-300 sm:text-sm">
                About FixItNow
              </span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Making everyday
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-emerald-400
                  via-cyan-400
                  to-emerald-500
                  bg-clip-text
                  text-transparent
                "
              >
                services simpler.
              </span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
              FixItNow connects customers with trusted technicians for
              reliable, professional and convenient services — all from
              one simple platform.
            </p>

            {/* Buttons */}

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/services"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-emerald-500
                  to-cyan-500
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-xl
                  shadow-emerald-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:from-emerald-400
                  hover:to-cyan-400
                "
              >
                Explore Services

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-emerald-400/20
                  bg-emerald-400/[0.04]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-emerald-400/40
                  hover:bg-emerald-400/[0.08]
                "
              >
                Contact Us

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div
            className="
              grid
              grid-cols-2
              overflow-hidden
              rounded-3xl
              border
              border-white/[0.07]
              bg-white/[0.025]
              md:grid-cols-4
            "
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`
                    group
                    relative
                    p-6
                    text-center
                    sm:p-8

                    ${
                      index !== stats.length - 1
                        ? "border-b border-white/[0.07] md:border-b-0 md:border-r"
                        : ""
                    }

                    ${
                      index === 1
                        ? "max-md:border-r max-sm:border-b"
                        : ""
                    }

                    ${
                      index === 3
                        ? "max-sm:border-b-0"
                        : ""
                    }
                  `}
                >
                  <Icon
                    className="
                      mx-auto
                      mb-3
                      h-5
                      w-5
                      text-emerald-400
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  <div className="text-2xl font-black tracking-tight sm:text-3xl">
                    {stat.value}
                  </div>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION
      ====================================================== */}

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Visual */}

            <div className="relative">
              <div
                className="
                  absolute
                  -inset-5
                  rounded-[2rem]
                  bg-gradient-to-r
                  from-emerald-500/10
                  to-cyan-500/10
                  blur-2xl
                "
              />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-emerald-500/[0.10]
                  bg-gradient-to-br
                  from-emerald-500/[0.08]
                  via-white/[0.02]
                  to-cyan-500/[0.06]
                  p-6
                  sm:p-8
                "
              >
                {/* Fake Dashboard */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-[#0b111d]
                    p-5
                    shadow-2xl
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-white/[0.06]
                      pb-4
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-emerald-500
                          to-cyan-400
                        "
                      >
                        <Wrench className="h-4 w-4" />
                      </div>

                      <div>
                        <div className="h-2 w-20 rounded-full bg-white/20" />

                        <div className="mt-2 h-1.5 w-14 rounded-full bg-white/5" />
                      </div>
                    </div>

                    <div className="h-7 w-7 rounded-full bg-white/10" />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      "Electrical",
                      "Plumbing",
                      "Cleaning",
                      "Repair",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="
                          rounded-xl
                          border
                          border-white/[0.06]
                          bg-white/[0.025]
                          p-4
                        "
                      >
                        <div
                          className={`
                            mb-3
                            h-8
                            w-8
                            rounded-lg

                            ${
                              index % 2 === 0
                                ? "bg-emerald-500/10"
                                : "bg-cyan-500/10"
                            }
                          `}
                        />

                        <p className="text-xs font-medium text-gray-300">
                          {item}
                        </p>

                        <div className="mt-2 h-1.5 w-12 rounded-full bg-white/5" />
                      </div>
                    ))}
                  </div>

                  <div
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-emerald-500/10
                      bg-emerald-500/[0.04]
                      p-4
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-emerald-500/10
                        "
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-white">
                          Booking Confirmed
                        </p>

                        <p className="mt-1 text-[10px] text-gray-500">
                          Your technician is on the way
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Rating */}

                <div
                  className="
                    absolute
                    -bottom-4
                    -right-3
                    rounded-2xl
                    border
                    border-emerald-400/10
                    bg-[#101827]/95
                    p-4
                    shadow-2xl
                    backdrop-blur-xl
                    sm:-right-5
                  "
                >
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                    <span className="text-sm font-bold">
                      4.9
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Customer rating
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content */}

            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-emerald-400
                "
              >
                Our Mission
              </p>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-black
                  tracking-tight
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                We believe getting help
                <span className="text-emerald-400">
                  {" "}
                  should be easy.
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-gray-400">
                Finding a reliable technician should not mean spending
                hours searching, making endless phone calls or worrying
                about whether the person you hired can do the job.
              </p>

              <p className="mt-4 text-base leading-7 text-gray-400">
                FixItNow was created to make that entire experience
                simpler. We bring customers and skilled professionals
                together through a convenient, transparent and easy-to-use
                platform.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Connect with trusted technicians",
                  "Compare services and ratings",
                  "Choose convenient time slots",
                  "Manage your bookings in one place",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />

                    <span className="text-sm text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section
        className="
          border-y
          border-white/[0.06]
          bg-white/[0.015]
          py-20
          sm:py-28
        "
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-emerald-400
              "
            >
              What Makes Us Different
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Built around your convenience
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
              Everything about FixItNow is designed to make finding and
              booking professional services easier.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    group
                    rounded-3xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-emerald-500/20
                    hover:bg-emerald-500/[0.025]
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-emerald-500/10
                      text-emerald-400
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:bg-emerald-500/15
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 text-base font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* Heading */}

            <div className="lg:sticky lg:top-24">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-emerald-400
                "
              >
                How It Works
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                From problem to solution in a few simple steps.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-gray-500">
                We keep the process straightforward so you can focus on
                what matters — getting the job done.
              </p>

              <Link
                href="/services"
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-emerald-400
                "
              >
                Get started

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Steps */}

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="
                    group
                    flex
                    gap-5
                    rounded-3xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-5
                    transition-all
                    duration-300
                    hover:border-emerald-500/20
                    hover:bg-emerald-500/[0.025]
                    sm:p-6
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-emerald-400/10
                      bg-emerald-400/[0.05]
                      text-sm
                      font-bold
                      text-emerald-400
                    "
                  >
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}

      <section className="border-t border-white/[0.06] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="
              rounded-[2rem]
              border
              border-emerald-500/[0.10]
              bg-gradient-to-br
              from-emerald-500/[0.06]
              via-white/[0.02]
              to-cyan-500/[0.06]
              p-7
              sm:p-10
              lg:p-14
            "
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-emerald-500/10
                    text-emerald-400
                  "
                >
                  <Heart className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                  Built with people in mind.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                  Our goal is not simply to build another marketplace.
                  We want to create a place where customers feel
                  confident booking a service and technicians have the
                  opportunity to grow their businesses.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Trust",
                    text: "Reliable professionals",
                  },
                  {
                    title: "Quality",
                    text: "Better service experience",
                  },
                  {
                    title: "Simplicity",
                    text: "Easy booking process",
                  },
                  {
                    title: "Community",
                    text: "Customers & professionals",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-black/10
                      p-5
                      transition-all
                      duration-300
                      hover:border-emerald-500/20
                      hover:bg-emerald-500/[0.04]
                    "
                  >
                    <h3 className="font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-emerald-400/20
              bg-gradient-to-br
              from-emerald-600/10
              via-cyan-500/[0.07]
              to-emerald-500/10
              p-8
              text-center
              sm:p-12
              lg:p-16
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-48
                w-96
                -translate-x-1/2
                rounded-full
                bg-emerald-400/10
                blur-[100px]
              "
            />

            <div className="relative">
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-emerald-500/10
                "
              >
                <Wrench className="h-6 w-6 text-emerald-400" />
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Ready to get things fixed?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
                Find the right professional, choose your preferred time
                and book your service with FixItNow.
              </p>

              <Link
                href="/services"
                className="
                  group
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-emerald-500
                  to-cyan-500
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-emerald-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:from-emerald-400
                  hover:to-cyan-400
                "
              >
                Find a Service

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}