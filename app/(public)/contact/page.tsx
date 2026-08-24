import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  MessageCircle,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import React from 'react';

export default function Contactpage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#09090b] text-white">

      {/* ================= HERO ================= */}

      <section className="relative border-b border-white/[0.06]">

        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 text-center sm:pt-28">

          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5">
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              Contact Support
            </span>
          </div>

          <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Let&apos;s get your
            <span className="block text-emerald-400">
              problem solved.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
            Have a question about your booking, payment, technician, or
            anything else? Our support team is ready to help you.
          </p>

          {/* Trust */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-zinc-600">

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Secure Support
            </div>

            <div className="h-3 w-px bg-zinc-800" />

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-emerald-500" />
              Fast Response
            </div>

            <div className="h-3 w-px bg-zinc-800" />

            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              Friendly Team
            </div>

          </div>

        </div>
      </section>


      {/* ================= CONTACT AREA ================= */}

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">

          {/* ================= LEFT ================= */}

          <div className="flex flex-col">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                Get in touch
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                We&apos;re here to help.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500">
                Whether you need help with a booking, payment, account,
                or technician, reach out to our support team.
              </p>
            </div>


            {/* Contact Cards */}

            <div className="mt-8 space-y-3">

              <ContactInfo
                icon={<Mail />}
                title="Email"
                value="support@fixitnow.com"
              />

              <ContactInfo
                icon={<Phone />}
                title="Phone"
                value="+880 1234-567890"
              />

              <ContactInfo
                icon={<MapPin />}
                title="Office"
                value="Dhaka, Bangladesh"
              />

              <ContactInfo
                icon={<Clock3 />}
                title="Support Hours"
                value="Sat - Thu, 9:00 AM - 8:00 PM"
              />

            </div>


            {/* Small CTA */}

            <div className="mt-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.04] p-5">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-sm font-semibold text-zinc-200">
                    Need urgent assistance?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Call our support team directly for faster assistance.
                  </p>
                </div>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-emerald-400" />

              </div>

            </div>

          </div>


          {/* ================= FORM ================= */}

          <div className="relative">

            {/* Form Glow */}

            <div className="pointer-events-none absolute -inset-1 rounded-[28px] bg-emerald-500/[0.04] blur-xl" />

            <form className="relative rounded-[26px] border border-white/[0.07] bg-[#111113] p-6 shadow-2xl shadow-black/20 sm:p-8">

              {/* Form Header */}

              <div className="mb-7">

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="text-lg font-semibold">
                      Send us a message
                    </h3>

                    <p className="mt-1 text-xs text-zinc-600">
                      We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Send className="h-4 w-4 text-emerald-400" />
                  </div>

                </div>

              </div>


              {/* Name + Email */}

              <div className="grid gap-5 sm:grid-cols-2">

                <Field
                  label="Your Name"
                  placeholder="John Doe"
                />

                <Field
                  label="Email Address"
                  placeholder="you@example.com"
                  type="email"
                />

              </div>


              {/* Subject */}

              <div className="mt-5">

                <Field
                  label="Subject"
                  placeholder="What can we help you with?"
                />

              </div>


              {/* Message */}

              <div className="mt-5">

                <label className="text-xs font-medium text-zinc-300">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Describe your issue or question..."
                  className="
                    mt-2
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-[#09090b]
                    px-4
                    py-3
                    text-sm
                    text-zinc-200
                    outline-none
                    transition-all
                    placeholder:text-zinc-700
                    hover:border-white/[0.12]
                    focus:border-emerald-500/50
                    focus:ring-4
                    focus:ring-emerald-500/[0.06]
                  "
                />

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="
                  mt-6
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-emerald-600
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-emerald-900/20
                  transition-all
                  hover:bg-emerald-500
                  hover:shadow-emerald-500/10
                  active:scale-[0.99]
                "
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>


              <p className="mt-4 text-center text-[10px] leading-5 text-zinc-700">
                By submitting this form, you agree to our support
                communication policy.
              </p>

            </form>

          </div>

        </div>

      </section>


      {/* ================= FAQ ================= */}

      <section className="border-t border-white/[0.06] bg-[#0d0d0f]">

        <div className="mx-auto max-w-4xl px-6 py-20">

          <div className="text-center">

            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5">

              <Sparkles className="h-3 w-3 text-emerald-400" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                FAQ
              </span>

            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently asked questions
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-600">
              Quick answers to some of the most common questions
              from FixItNow customers.
            </p>

          </div>


          <div className="mt-10 space-y-3">

            <FAQ
              question="How do I book a technician?"
              answer="Choose a service, select a technician, pick an available time slot and submit your booking request."
            />

            <FAQ
              question="When do I need to make payment?"
              answer="Payment becomes available after the technician accepts your booking request."
            />

            <FAQ
              question="Can I cancel my booking?"
              answer="Eligible bookings can be cancelled before the job moves into the in-progress stage."
            />

            <FAQ
              question="How can I become a technician?"
              answer="Register as a technician and complete your professional profile and service setup."
            />

          </div>

        </div>

      </section>

    </main>
  );
}


/* ================= CONTACT INFO ================= */

function ContactInfo({
  icon,
  title,
  value,
}: {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/[0.06]
        bg-[#111113]
        p-4
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-emerald-500/20
        hover:bg-[#151517]
      "
    >

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-emerald-500/[0.08]
          text-emerald-400
          transition-all
          group-hover:bg-emerald-500/[0.14]
        "
      >
        {React.cloneElement(icon, {
          className: "h-[17px] w-[17px]",
        })}
      </div>


      <div className="min-w-0">

        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">
          {title}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-zinc-300">
          {value}
        </p>

      </div>

    </div>
  );
}


/* ================= FIELD ================= */

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>

      <label className="text-xs font-medium text-zinc-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-white/[0.07]
          bg-[#09090b]
          px-4
          text-sm
          text-zinc-200
          outline-none
          transition-all
          placeholder:text-zinc-700
          hover:border-white/[0.12]
          focus:border-emerald-500/50
          focus:ring-4
          focus:ring-emerald-500/[0.06]
        "
      />

    </div>
  );
}


/* ================= FAQ ================= */

function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.06]
        bg-[#111113]
        transition-all
        duration-300
        hover:border-white/[0.1]
      "
    >

      <summary
        className="
          flex
          cursor-pointer
          list-none
          items-center
          justify-between
          gap-5
          px-5
          py-5
          text-sm
          font-medium
          text-zinc-200
        "
      >

        <span>
          {question}
        </span>

        <span
          className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-white/[0.04]
            text-zinc-500
            transition-all
            group-open:bg-emerald-500/10
            group-open:text-emerald-400
          "
        >
          <ChevronDown
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-open:rotate-180
            "
          />
        </span>

      </summary>

      <div className="px-5 pb-5">

        <div className="h-px bg-white/[0.05]" />

        <p className="pt-4 text-xs leading-6 text-zinc-600">
          {answer}
        </p>

      </div>

    </details>
  );
}