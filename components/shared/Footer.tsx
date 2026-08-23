"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Mail,
  Phone,
  MapPin,
  Send,
  Star,
  Users,
  Heart,
  AlertCircle,
  Award,
  Shield,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { getMe } from "../../service/Profileme";
import Logo from './Logo';

interface User {
  id: string;
  role: "customer" | "technician" | "admin";
}

export default function Footer() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  /* =========================
     GET CURRENT USER
  ========================= */

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getMe();

        if (currentUser?.role) {
          setUser({
            id: currentUser.id ?? "user",
            role: currentUser.role.toLowerCase() as User["role"],
          });
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    }

    fetchUser();
  }, []);

  /* =========================
     HIDE FOOTER
  ========================= */

  const hiddenPaths = [
    "/auth/login",
    "/auth/register",
    "/dashboard",
  ];

  const shouldHideFooter = hiddenPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (shouldHideFooter) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  /* =========================
     FOOTER LINKS
  ========================= */

  const getFooterLinks = () => {
    const baseLinks = [
      {
        category: "Platform",
        links: [
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Services",
            href: "/services",
          },
          {
            label: "Technicians",
            href: "/technicians",
          },
          {
            label: "About Us",
            href: "/about",
          },
        ],
      },

      {
        category: "Support",
        links: [
          {
            label: "Help Center",
            href: "/faq",
          },
          {
            label: "Contact Us",
            href: "/contact",
          },
          {
            label: "Privacy Policy",
            href: "/privacy",
          },
          {
            label: "Terms & Conditions",
            href: "/terms",
          },
        ],
      },
    ];

    /* =========================
       ADMIN
    ========================= */

    if (user?.role === "admin") {
      return [
        ...baseLinks,
        {
          category: "Admin",
          links: [
            {
              label: "Dashboard",
              href: "/dashboard/admin",
            },
            {
              label: "Manage Users",
              href: "/dashboard/admin/users",
            },
            {
              label: "Category Management",
              href: "/dashboard/admin/category-management",
            },
            {
              label: "My Profile",
              href: "/dashboard/admin/my-profile",
            },
          ],
        },
      ];
    }

    /* =========================
       TECHNICIAN
    ========================= */

    if (user?.role === "technician") {
      return [
        ...baseLinks,
        {
          category: "Technician",
          links: [
            {
              label: "Dashboard",
              href: "/dashboard/technician",
            },
            {
              label: "My Services",
              href: "/dashboard/technician/my-services",
            },
            {
              label: "Bookings",
              href: "/dashboard/technician/bookings",
            },
            {
              label: "Availability",
              href: "/dashboard/technician/availability",
            },
            {
              label: "My Profile",
              href: "/dashboard/technician/my-profile",
            },
          ],
        },
      ];
    }

    /* =========================
       CUSTOMER
    ========================= */

    if (user?.role === "customer") {
      return [
        ...baseLinks,
        {
          category: "Customer",
          links: [
            {
              label: "Dashboard",
              href: "/dashboard/customer",
            },
            {
              label: "My Bookings",
              href: "/dashboard/customer/my-bookings",
            },
            {
              label: "Payments History",
              href: "/dashboard/customer/payments-history",
            },
            {
              label: "My Reviews",
              href: "/dashboard/customer/my-reviews",
            },
            {
              label: "My Profile",
              href: "/dashboard/customer/my-profile",
            },
          ],
        },
      ];
    }

    return baseLinks;
  };

  const footerLinks = getFooterLinks();

  /* =========================
     TRUST ITEMS
  ========================= */

  const trustItems = [
    {
      icon: AlertCircle,
      title: "Emergency Available",
      description: "24/7 emergency services",
      iconStyle: "bg-emerald-500/10 text-emerald-400",
      hoverStyle: "hover:border-emerald-500/30",
    },

    {
      icon: Award,
      title: "Verified Professionals",
      description: "Trusted & skilled technicians",
      iconStyle: "bg-blue-500/10 text-blue-400",
      hoverStyle: "hover:border-blue-500/30",
    },

    {
      icon: Shield,
      title: "100% Guaranteed",
      description: "Quality service assured",
      iconStyle: "bg-cyan-500/10 text-cyan-400",
      hoverStyle: "hover:border-cyan-500/30",
    },

    {
      icon: Heart,
      title: "Customer Loved",
      description: "Thousands of happy customers",
      iconStyle: "bg-pink-500/10 text-pink-400",
      hoverStyle: "hover:border-pink-500/30",
    },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/[0.08] bg-[#070b14] text-white">
      {/* =========================
          BACKGROUND GLOW
      ========================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* =========================
            MAIN FOOTER
        ========================= */}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6">
          {/* =========================
              BRAND
          ========================= */}

          <div className="lg:col-span-2">
               <Logo></Logo>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              Connect with trusted professionals and get reliable
              services whenever you need them. Fast, simple and
              dependable.
            </p>

            {/* =========================
                CONTACT INFORMATION
            ========================= */}

            <div className="mt-6 space-y-4">
              {/* Email */}
              <a
                href="mailto:support@fixitnow.com"
                className="group flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                  <Mail className="h-4 w-4 text-blue-400" />
                </span>

                support@fixitnow.com
              </a>

              {/* Phone */}
              <a
                href="tel:+1-800-FIX-NOW"
                className="group flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10">
                  <Phone className="h-4 w-4 text-cyan-400" />
                </span>

                +1-800-FIX-NOW
              </a>

              {/* Address */}
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </span>

                <span className="pt-2">
                  123 Main St, Service City
                  <br />
                  SC 12345, USA
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              DYNAMIC FOOTER LINKS
          ========================= */}

          {footerLinks.map((section) => (
            <div key={section.category}>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {section.category}
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-all duration-200 hover:translate-x-1 hover:text-cyan-400"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* =========================
            DIVIDER
        ========================= */}

        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* =========================
            TRUST SECTION
        ========================= */}

        <div className="mb-12">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Why FixItNow
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight">
                Service you can trust
              </h3>
            </div>

            <p className="max-w-md text-sm text-gray-500">
              Everything you need to find the right professional
              for the job.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] ${item.hoverStyle}`}
                >
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${item.iconStyle}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h4 className="text-sm font-semibold text-white">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================
            CTA SECTION
        ========================= */}

        <div className="relative mb-10 overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-500/[0.08] via-cyan-500/[0.06] to-purple-500/[0.08] p-6 sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                <span className="text-xs font-medium text-emerald-400">
                  Trusted by customers
                </span>
              </div>

              <h3 className="text-xl font-bold sm:text-2xl">
                Need a professional for your next job?
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Find skilled technicians and book your service today.
              </p>
            </div>

            <Link
              href="/services"
              className="group inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              Explore Services

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* =========================
            BOTTOM FOOTER
        ========================= */}

        <div className="border-t border-white/[0.08] pt-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <span className="text-xs text-gray-500">
                © {currentYear} FixItNow. All rights reserved.
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-gray-700 sm:block" />

              {/* System Status */}
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/[0.05] px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="text-[11px] font-medium text-emerald-400">
                  All systems operational
                </span>
              </div>
            </div>

            {/* =========================
                SOCIAL LINKS
            ========================= */}

            <div className="flex items-center justify-center gap-2">
              {/* Newsletter */}
              <a
                href="#"
                aria-label="Newsletter"
                title="Subscribe to newsletter"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* Reviews */}
              <a
                href="#"
                aria-label="Reviews"
                title="Read reviews"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/30 hover:bg-yellow-500/10 hover:text-yellow-400"
              >
                <Star className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* Community */}
              <a
                href="#"
                aria-label="Community"
                title="Join community"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Users className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* Support */}
              <a
                href="#"
                aria-label="Support"
                title="Support FixItNow"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400"
              >
                <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}