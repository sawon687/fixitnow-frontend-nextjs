"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Tags,
  Star,
  User,
  Settings,
  HelpCircle,
  Wrench,
  X,
  CreditCard,
  Clock,
  Sparkles,
} from "lucide-react";

import { DashboardNavbarProps } from "../../../../utils/type";

const navlink = {
  ADMIN: [
    {
      name: "Dashboard",
      path: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Users",
      path: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Category Management",
      path: "/dashboard/admin/category-management",
      icon: Tags,
    },
    {
      name: "My Profile",
      path: "/dashboard/technician/profile",
      icon: User,
    },
  ],

  TECHNICIAN: [
    {
      name: "Dashboard",
      path: "/dashboard/technician",
      icon: LayoutDashboard,
    },
    {
      name: "My Services",
      path: "/dashboard/technician/my-services",
      icon: Wrench,
    },
    {
      name: "Bookings",
      path: "/dashboard/technician/bookings",
      icon: CalendarCheck,
    },
    {
      name: "Availability",
      path: "/dashboard/technician/availability",
      icon: Clock,
    },
    {
      name: "My Profile",
      path: "/dashboard/technician/my-profile",
      icon: User,
    },
  ],

  CUSTOMER: [
    {
      name: "Dashboard",
      path: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      name: "My Bookings",
      path: "/dashboard/customer/my-bookings",
      icon: CalendarCheck,
    },
    {
      name: "Payments History",
      path: "/dashboard/customer/payments-history",
      icon: CreditCard,
    },
    {
      name: "My Reviews",
      path: "/dashboard/customer/my-reviews",
      icon: Star,
    },
    {
      name: "My Profile",
      path: "/dashboard/customer/my-profile",
      icon: User,
    },
  ],
};

const NavSidbar = ({
  isCollapsed,
  setIsMobileOpen,
  isMobileOpen,
  user,
}: DashboardNavbarProps) => {
  const pathname = usePathname();

  const role: "ADMIN" | "TECHNICIAN" | "CUSTOMER" = user?.role;

  const sidebarLink = navlink[role] || [];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="
            fixed inset-0 z-40
            bg-black/70
            backdrop-blur-sm
            md:hidden
          "
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex flex-col justify-between

          md:static

          ${isCollapsed ? "md:w-[84px]" : "md:w-[260px]"}

          w-[260px]

          border-r border-zinc-800/80
          bg-zinc-950

          px-4 py-5

          shadow-2xl shadow-black/20

          transition-all duration-300 ease-in-out

          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* =========================
            TOP
        ========================== */}
        <div>
          {/* Logo */}
          <div
            className={`
              mb-8
              flex items-center
              ${isCollapsed ? "md:justify-center" : ""}
              gap-3
              px-2
            `}
          >
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3 rounded-xl px-2"
            >
              <div
                className="
                            relative flex h-10 w-10 items-center justify-center
                            overflow-hidden rounded-xl
                            bg-gradient-to-br from-emerald-500 via-emerald-500 to-cyan-400
                            shadow-lg shadow-blue-500/25
                            transition-all duration-300
                            group-hover:scale-105
                            group-hover:shadow-blue-500/40
                          "
              >
                <div className="absolute inset-0 bg-white/10" />

                <Wrench className="relative h-5 w-5 text-white" />
              </div>

              <div className="hidden sm:block">
                <div className="flex items-center gap-1">
               { !isCollapsed &&(

                   <span
                    className="
                                bg-gradient-to-r
                               from-emerald-500 via-emerald-500 to-cyan-400
                                bg-clip-text
                                text-lg
                                font-extrabold
                                tracking-tight
                                text-transparent
                              "
                  >
                    FixItNow
                  </span>
               )}

                  <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                </div>

                {!isCollapsed && (
                  <>
                    {" "}
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35">
                      Home Service
                    </p>
                  </>
                )}
              </div>
            </Link>
            {/* Mobile Close */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="
                ml-auto
                rounded-lg
                p-2
                text-zinc-500
                transition
                hover:bg-zinc-900
                hover:text-white
                md:hidden
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Label */}
          {!isCollapsed && (
            <div className="mb-3 px-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                Workspace
              </p>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-1.5">
            {sidebarLink?.map((item) => (
              <NavItem
                key={item.path}
                href={item.path}
                icon={<item.icon className="h-[18px] w-[18px]" />}
                label={item.name}
                active={pathname === item.path}
                collapsed={isCollapsed}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}
          </nav>
        </div>

        {/* =========================
            BOTTOM
        ========================== */}
        <div className="space-y-1.5">
          {!isCollapsed && (
            <div className="mb-3 border-t border-zinc-800/80 pt-4 px-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                General
              </p>
            </div>
          )}

          <NavItem
            href="/dashboard/settings"
            icon={<Settings className="h-[18px] w-[18px]" />}
            label="Settings"
            collapsed={isCollapsed}
          />

          <NavItem
            href="/dashboard/support"
            icon={<HelpCircle className="h-[18px] w-[18px]" />}
            label="Support"
            collapsed={isCollapsed}
          />
        </div>
      </aside>
    </>
  );
};

export default NavSidbar;

/* =========================================
   NAV ITEM
========================================= */

function NavItem({
  href,
  icon,
  label,
  active = false,
  collapsed = false,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`
        group
        relative
        flex
        items-center
        gap-3

        rounded-xl

        px-3
        py-2.5

        text-[13px]
        font-medium

        transition-all
        duration-200

        ${collapsed ? "md:justify-center md:px-2" : ""}

        ${
          active
            ? `
              bg-emerald-500/[0.09]
              text-emerald-400
              shadow-sm
            `
            : `
              text-zinc-500
              hover:bg-zinc-900/80
              hover:text-zinc-200
            `
        }
      `}
    >
      {/* Active Indicator */}
      {active && (
        <span
          className="
            absolute
            left-0
            top-1/2
            h-6
            w-0.5
            -translate-y-1/2
            rounded-full
            bg-emerald-400
            shadow-sm
            shadow-emerald-400/50
          "
        />
      )}

      {/* Icon Box */}
      <span
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg

          transition-all
          duration-200

          ${
            active
              ? `
                bg-emerald-500/15
                text-emerald-400
              `
              : `
                bg-transparent
                text-zinc-500
                group-hover:bg-zinc-800
                group-hover:text-zinc-200
              `
          }
        `}
      >
        {icon}
      </span>

      {/* Label */}
      <span
        className={`
          truncate
          whitespace-nowrap
          transition-all
          duration-200
          ${collapsed ? "md:hidden" : ""}
        `}
      >
        {label}
      </span>

      {/* Active Arrow */}
      {!collapsed && active && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
      )}
    </Link>
  );
}
