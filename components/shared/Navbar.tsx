"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Settings,
  LogOut,
  Home,
  HelpCircle,
  ChevronDown,
  User,
  Wrench,
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
  BadgeInfo,
  MessageCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { usePathname } from "next/navigation";
import { IRole, IUser } from "../../utils/type";
import { Button } from "../ui/button";
import { signOUt } from "../../service/Profileme";
import Logo from './Logo';

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Services",
    href: "/service",
    icon: Wrench,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: MessageCircle,
  },
  {
    label: "About Us",
    href:"/about",
    icon:BadgeInfo
  }
];

type NavbarProps = {
  user?: IUser | null;
};


export default function Navbar({ user }: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const hiddenPaths = [
    "/auth/login",
    "/auth/register",
    "/dashboard",
  ];

  if (hiddenPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  const userName = user?.name || "User";
  const userEmail = user?.email || "";

  const userInitials =
    userName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const avatarUrl =
    user?.profilePhoto ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      userName
    )}`;

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

    const role = user?.role;

  let dashboardUrl = "/";

  if (user && role === IRole.CUSTOMER) {
    dashboardUrl = "/dashboard/customer";
  } else if (role === IRole.ADMIN) {
    dashboardUrl = "/dashboard/admin";
  } else if (role === IRole.TECHNICIAN) {
    dashboardUrl = "/dashboard/technician";
  }

  let profileurl='/'


  // =============
  // my profile link
  //=================
       if (user && role === IRole.CUSTOMER) {
  profileurl = "/dashboard/customer/my-profile";
  } else if (role === IRole.ADMIN) {
    profileurl= "/dashboard/admin/my-profile";
  } else if (role === IRole.TECHNICIAN) {
   profileurl= "/dashboard/technician/my-profile";
  }

  
  
  return (
    <>
      {/* =====================================================
          DESKTOP NAVBAR
      ===================================================== */}
      <nav className="fixed inset-x-0 top-0 z-50 hidden md:block">
        <div className="mx-auto px-4 pt-4">
          <div className="mx-auto max-w-7xl">
            <div
              className="
                flex h-[68px] items-center justify-between
                rounded-2xl
                border border-black/[0.06]
                bg-white/80
                px-3
                shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                backdrop-blur-2xl
                dark:border-white/[0.08]
                dark:bg-slate-950/80
                dark:shadow-black/20
              "
            >
              {/* ================= LOGO ================= */}
          <Logo></Logo>

              {/* ================= NAVIGATION ================= */}
              <div className="flex flex-1 justify-center px-6">
                <div
                  className="
                    flex items-center gap-1
                    rounded-xl
                    border border-black/[0.05]
                    bg-black/[0.025]
                    p-1
                    dark:border-white/[0.06]
                    dark:bg-white/[0.035]
                  "
                >
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveRoute(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                          relative flex items-center gap-2
                          rounded-lg px-4 py-2.5
                          text-sm font-medium
                          transition-all duration-200
                          ${
                            isActive
                              ? `
                                bg-white
                                text-emerald-600
                                shadow-sm
                                dark:bg-white/10
                                dark:text-cyan-400
                              `
                              : `
                                text-foreground/55
                                hover:bg-white/70
                                hover:text-foreground
                                dark:hover:bg-white/[0.06]
                              `
                          }
                        `}
                      >
                        {isActive && (
                          <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                        )}

                        <Icon
                          className={`h-4 w-4 ${
                            isActive
                              ? "text-blue-500 dark:text-cyan-400"
                              : "opacity-70"
                          }`}
                        />

                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* ================= RIGHT SIDE ================= */}
              <div className="flex shrink-0 items-center gap-2">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="
                          group flex items-center gap-2
                          rounded-xl
                          border border-black/[0.06]
                          bg-black/[0.025]
                          py-1.5 pl-1.5 pr-2.5
                          transition-all
                          hover:border-blue-500/20
                          hover:bg-white
                          hover:shadow-md
                          focus:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-blue-500/50
                          dark:border-white/[0.08]
                          dark:bg-white/[0.035]
                          dark:hover:bg-white/[0.07]
                        "
                      >
                        <Avatar className="h-9 w-9 border-2 border-blue-500/20">
                          <AvatarImage
                            src={avatarUrl}
                            alt={userName}
                          />

                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="hidden max-w-[125px] text-left lg:block">
                          <p className="truncate text-sm font-semibold">
                            {userName}
                          </p>

                          <p className="truncate text-[10px] text-foreground/45">
                            {userEmail}
                          </p>
                        </div>

                        <ChevronDown className="h-4 w-4 text-foreground/40 transition-transform group-data-[state=open]:rotate-180" />
                      </button>
                    </DropdownMenuTrigger>

                    {/* ================= PROFILE DROPDOWN ================= */}
                    <DropdownMenuContent
                      align="end"
                      sideOffset={10}
                      className="
                        w-72 overflow-hidden rounded-2xl
                        border border-black/[0.08]
                        bg-white/95
                        p-0
                        shadow-[0_20px_60px_rgb(0,0,0,0.15)]
                        backdrop-blur-2xl
                        dark:border-white/[0.08]
                        dark:bg-slate-950/95
                      "
                    >
                      {/* User Info */}
                      <div className="relative overflow-hidden px-4 py-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.10] via-cyan-500/[0.05] to-transparent" />

                        <div className="relative flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-md dark:border-slate-900">
                              <AvatarImage
                                src={avatarUrl}
                                alt={userName}
                              />

                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white">
                                {userInitials}
                              </AvatarFallback>
                            </Avatar>

                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold">
                              {userName}
                            </p>

                            <p className="truncate text-xs text-foreground/45">
                              {userEmail}
                            </p>

                            {user?.role && (
                              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                <ShieldCheck className="h-3 w-3" />
                                {user.role}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      {/* Account */}
                      <DropdownMenuGroup className="p-2">
                        <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/35">
                          Account
                        </DropdownMenuLabel>

                        <DropdownMenuItem
                          asChild
                          className="cursor-pointer rounded-xl py-2.5"
                        >
                          <Link
                            href={profileurl}
                            className="flex items-center gap-3"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                              <User className="h-4 w-4 text-blue-500" />
                            </span>

                            <div>
                              <p className="text-sm font-medium">
                                My Profile
                              </p>

                              <p className="text-[10px] text-foreground/40">
                                Manage your profile
                              </p>
                            </div>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          asChild
                          className="cursor-pointer rounded-xl py-2.5"
                        >
                          <Link
                            href={dashboardUrl}
                            className="flex items-center gap-3"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
                              <LayoutDashboard className="h-4 w-4 text-cyan-500" />
                            </span>

                            <div>
                              <p className="text-sm font-medium">
                                Dashboard
                              </p>

                              <p className="text-[10px] text-foreground/40">
                                View your dashboard
                              </p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      {/* Settings */}
                      <DropdownMenuGroup className="p-2">
                        <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/35">
                          Support
                        </DropdownMenuLabel>

                        <DropdownMenuItem className="cursor-pointer rounded-xl">
                          <Settings className="mr-3 h-4 w-4 text-foreground/55" />
                          <span>Preferences</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer rounded-xl">
                          <HelpCircle className="mr-3 h-4 w-4 text-foreground/55" />
                          <span>Help & Support</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      {/* Logout */}
                      <div className="p-2">
                        <DropdownMenuItem
                          onClick={async () => signOUt()}
                          className="
                            cursor-pointer rounded-xl
                            text-red-500
                            focus:bg-red-500/10
                            focus:text-red-500
                          "
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          <span className="font-medium">Sign Out</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      asChild
                      variant="ghost"
                      className="rounded-xl px-4"
                    >
                      <Link href="/auth/login">
                        Login
                      </Link>
                    </Button>

                    <Button
                      asChild
                      className="
                        rounded-xl
                        bg-gradient-to-r
                        from-blue-500
                        to-cyan-500
                        px-5
                        shadow-lg
                        shadow-blue-500/20
                        transition-all
                        hover:scale-[1.02]
                        hover:from-blue-600
                        hover:to-cyan-600
                      "
                    >
                      <Link href="/auth/register">
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE NAVBAR
      ===================================================== */}
      <nav className="fixed inset-x-0 top-0 z-50 md:hidden">
        <div className="px-3 pt-3">
          <div
            className="
              flex h-14 items-center justify-between
              rounded-2xl
              border border-black/[0.06]
              bg-white/85
              px-3
              shadow-lg
              shadow-black/5
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-slate-950/85
            "
          >
            {/* Mobile Logo */}
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md shadow-blue-500/20">
                <Wrench className="h-4 w-4 text-white" />
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-extrabold tracking-tight">
                    FixItNow
                  </span>

                  <Sparkles className="h-3 w-3 text-cyan-500" />
                </div>

                <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-foreground/35">
                  Home Service
                </p>
              </div>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1.5">
              {/* User Avatar */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="
                        rounded-full p-0.5
                        transition
                        hover:bg-black/5
                        dark:hover:bg-white/10
                      "
                    >
                      <Avatar className="h-9 w-9 border-2 border-blue-500/25">
                        <AvatarImage
                          src={avatarUrl}
                          alt={userName}
                        />

                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="
                      w-60 rounded-2xl
                      border border-black/[0.08]
                      bg-white/95
                      p-1
                      shadow-2xl
                      backdrop-blur-xl
                      dark:border-white/[0.08]
                      dark:bg-slate-950/95
                    "
                  >
                    <div className="px-3 py-3">
                      <p className="truncate text-sm font-bold">
                        {userName}
                      </p>

                      <p className="truncate text-xs text-foreground/45">
                        {userEmail}
                      </p>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild className="rounded-xl">
                      <Link    href={profileurl}>
                        <User className="mr-3 h-4 w-4 text-blue-500" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-xl">
                      <Link href={dashboardUrl}
                      
                      >
                        <LayoutDashboard className="mr-3 h-4 w-4 text-cyan-500" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-xl">
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={async () => signOUt()}
                      className="rounded-xl text-red-500 focus:text-red-500"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Mobile Menu */}
              <Sheet
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
              >
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-xl
                      border border-black/[0.06]
                      bg-black/[0.03]
                      transition
                      hover:bg-black/[0.07]
                      dark:border-white/[0.08]
                      dark:bg-white/[0.04]
                      dark:hover:bg-white/[0.08]
                    "
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="
                    w-[300px]
                    border-l border-black/[0.08]
                    bg-white/95
                    p-0
                    backdrop-blur-2xl
                    dark:border-white/[0.08]
                    dark:bg-slate-950/95
                  "
                >
                  <div className="flex h-full flex-col">
                    {/* Drawer Header */}
                    <div className="border-b border-black/[0.06] px-6 py-6 dark:border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
                          <Wrench className="h-5 w-5 text-white" />
                        </div>

                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-extrabold">
                              FixItNow
                            </p>

                            <Sparkles className="h-3 w-3 text-cyan-500" />
                          </div>

                          <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
                            Home Service
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                      <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/35">
                        Navigation
                      </p>

                      <div className="space-y-1">
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = isActiveRoute(item.href);

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() =>
                                setIsDrawerOpen(false)
                              }
                              className={`
                                flex items-center gap-3
                                rounded-xl px-4 py-3
                                text-sm font-medium
                                transition-all
                                ${
                                  isActive
                                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                                    : "text-foreground/65 hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.05]"
                                }
                              `}
                            >
                              <Icon className="h-5 w-5" />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Resources */}
                      <div className="mt-8 border-t border-black/[0.06] pt-6 dark:border-white/[0.08]">
                        <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/35">
                          Resources
                        </p>

                        <div className="space-y-1">
                          <Link
                            href="/contact"
                            onClick={() =>
                              setIsDrawerOpen(false)
                            }
                            className="
                              flex items-center gap-3
                              rounded-xl px-4 py-3
                              text-sm font-medium
                              text-foreground/65
                              transition
                              hover:bg-black/[0.04]
                              hover:text-foreground
                              dark:hover:bg-white/[0.05]
                            "
                          >
                            <HelpCircle className="h-5 w-5" />
                            Help & Support
                          </Link>

                          <Link
                            href="/settings"
                            onClick={() =>
                              setIsDrawerOpen(false)
                            }
                            className="
                              flex items-center gap-3
                              rounded-xl px-4 py-3
                              text-sm font-medium
                              text-foreground/65
                              transition
                              hover:bg-black/[0.04]
                              hover:text-foreground
                              dark:hover:bg-white/[0.05]
                            "
                          >
                            <Settings className="h-5 w-5" />
                            Settings
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Drawer Bottom */}
                    {user ? (
                      <div className="border-t border-black/[0.06] p-4 dark:border-white/[0.08]">
                        <div
                          className="
                            flex items-center gap-3
                            rounded-xl
                            border border-black/[0.05]
                            bg-black/[0.025]
                            p-3
                            dark:border-white/[0.06]
                            dark:bg-white/[0.04]
                          "
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={avatarUrl}
                              alt={userName}
                            />

                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
                              {userInitials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                              {userName}
                            </p>

                            <p className="truncate text-xs text-foreground/45">
                              {userEmail}
                            </p>
                          </div>

                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 border-t border-black/[0.06] p-4 dark:border-white/[0.08]">
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 rounded-xl"
                        >
                          <Link href="/auth/login">
                            Login
                          </Link>
                        </Button>

                        <Button
                          asChild
                          className="
                            flex-1 rounded-xl
                            bg-gradient-to-r
                            from-blue-500
                            to-cyan-500
                            shadow-md
                            shadow-blue-500/20
                          "
                        >
                          <Link href="/auth/register">
                            Sign Up
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar spacing */}
      <div className="h-[76px] md:h-[96px]" />
    </>
  );
}