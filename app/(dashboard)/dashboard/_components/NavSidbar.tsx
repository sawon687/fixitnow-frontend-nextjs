"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Tags,
  BriefcaseBusiness,
  Star,
  User,
  Settings,
  HelpCircle,
  Wrench,
  X,
  CreditCard,
  Clock,
  Layers,
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
      name: "Manage Bookings",
      path: "/dashboard/admin/bookings",
      icon: CalendarCheck,
    },
    {
      name: "Categories",
      path: "/dashboard/admin/categories",
      icon: Tags,
    },
     {
      name: "Add Categories",
      path: "/dashboard/admin/categories/create-categrie",
      icon: Layers,
    },
    {
      name: "Services",
      path: "/dashboard/admin/services",
      icon: BriefcaseBusiness,
    },
    {
      name: "Reviews",
      path: "/dashboard/admin/reviews",
      icon: Star,
    },
  ],

  TECHNICIAN: [
    {
      name: "Dashboard",
      path: "/dashboard/technician",
      icon: LayoutDashboard,
    },
    {
      name: "Create Profile",
      path: "/dashboard/technician/create-profile",
      icon: User,
    },
    {
      name: "My Services",
      path: "/dashboard/technician/services",
      icon: Wrench,
    },
    {
      name: "Add Service",
      path: "/dashboard/technician/services/create",
      icon: BriefcaseBusiness,
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
      name: "Reviews",
      path: "/dashboard/technician/reviews",
      icon: Star,
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
      path: "/dashboard/customer/bookings",
      icon: CalendarCheck,
    },
    {
      name: "Payments",
      path: "/dashboard/customer/payments",
      icon: CreditCard,
    },
    {
      name: "My Reviews",
      path: "/dashboard/customer/reviews",
      icon: Star,
    },
    {
      name: "Profile",
      path: "/dashboard/customer/profile",
      icon: User,
    },
  ],
};

const NavSidbar = ({
  isCollapsed,
  setIsMobileOpen,
  isMobileOpen,
}: DashboardNavbarProps) => {
  const pathname = usePathname();

  // পরে auth user থেকে আসবে
  const role: "ADMIN" | "TECHNICIAN" | "CUSTOMER" = "TECHNICIAN";

  const sidebarLink = navlink[role];

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="
fixed inset-0 bg-black/70
z-40 md:hidden
"
        />
      )}

      <aside
        className={`
fixed inset-y-0 left-0 z-50

md:static

${isCollapsed ? "md:w-20" : "md:w-64"}

w-64

bg-zinc-950/95
border-r border-zinc-800

p-6

flex flex-col justify-between

transition-all duration-300

${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}

`}
      >
        <div>
          {/* Logo */}

          <div className="flex items-center gap-3 mb-8">
            <div
              className="
p-2.5 rounded-xl
bg-gradient-to-r from-emerald-500 to-cyan-500
"
            >
              <Wrench className="w-5 h-5 text-black" />
            </div>

            {!isCollapsed && (
              <div>
                <h1 className="text-white font-bold">FixitNow</h1>

                <p className="text-xs text-emerald-400">Home Services</p>
              </div>
            )}

            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden ml-auto"
            >
              <X className="text-white" />
            </button>
          </div>

          <nav className="space-y-2">
            {sidebarLink.map((item) => (
              <NavItem
                key={item.path}
                href={item.path}
                icon={<item.icon className="w-4 h-4" />}
                label={item.name}
                active={pathname === item.path}
                collapsed={isCollapsed}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}
          </nav>
        </div>

        <div className="border-t border-zinc-800 pt-5 space-y-2">
          <NavItem
            href="/dashboard/settings"
            icon={<Settings className="w-4 h-4" />}
            label="Settings"
            collapsed={isCollapsed}
          />

          <NavItem
            href="/dashboard/support"
            icon={<HelpCircle className="w-4 h-4" />}
            label="Support"
            collapsed={isCollapsed}
          />
        </div>
      </aside>
    </>
  );
};

export default NavSidbar;

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
      className={`

flex items-center gap-3

px-3 py-2.5

rounded-xl

text-sm

transition-all


${
  active
    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
}



${collapsed ? "md:justify-center" : ""}

`}
    >
      <span>{icon}</span>

      <span className={collapsed ? "md:hidden" : ""}>{label}</span>
    </Link>
  );
}
