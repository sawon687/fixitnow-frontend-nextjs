'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Settings,
  LogOut,
  Home,
  HelpCircle,
  ChevronDown,
  User,
  Wrench,
  UserCog,
  LayoutDashboard,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import { usePathname } from 'next/navigation';
import { IUser } from '../../utils/type';
import { Button } from '../ui/button';
import { signOUt } from '../../service/Profileme';

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    label: 'Services',
    href: '/service',
    icon: Wrench,
  },
  {
    label: 'Technicians',
    href: '/technicians',
    icon: UserCog,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: HelpCircle,
  },
];

type NavbarProps = {
  user?: IUser | null;
};

export default function Navbar({ user }: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const hiddenPaths = [
    '/auth/login',
    '/auth/register',
    '/dashboard',
  ];

  if (hiddenPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  const userName = user?.name || 'User';
  const userEmail = user?.email || '';

  const userInitials =
    userName
      ?.split(' ')
      .map((name) => name[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U';

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="fixed left-0 right-0 top-0 z-50 hidden md:block">
        <div className="border-b border-white/10 bg-white/70 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70">
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">

            {/* Logo */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40">
                <Wrench className="h-5 w-5 text-white" />
              </div>

              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-lg font-bold text-transparent">
                  FixItNow
                </span>

                <span className="text-[10px] font-medium tracking-wide text-foreground/40">
                  HOME SERVICE
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <div className="flex flex-1 justify-center px-8">
              <div className="flex items-center gap-1 rounded-full border border-black/5 bg-white/50 p-1.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                          : 'text-foreground/60 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isActive
                            ? 'text-white'
                            : 'opacity-70 group-hover:scale-110 group-hover:opacity-100'
                        }`}
                      />

                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex shrink-0 items-center gap-3">

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="group flex items-center gap-2 rounded-full border border-black/5 bg-white/60 py-1.5 pl-1.5 pr-3 shadow-sm transition-all hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                    >
                      <Avatar className="h-9 w-9 border-2 border-blue-500/20 transition-colors group-hover:border-blue-500">
                        <AvatarImage
                          src={
                            user?.profilePhoto ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                              userName
                            )}`
                          }
                          alt={userName}
                        />

                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="hidden max-w-[130px] text-left lg:block">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {userName}
                        </p>

                        <p className="truncate text-[11px] text-foreground/50">
                          {userEmail}
                        </p>
                      </div>

                      <ChevronDown className="h-4 w-4 text-foreground/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={10}
                    className="w-64 overflow-hidden rounded-2xl border border-black/10 bg-white/95 p-0 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95"
                  >
                    {/* User Header */}
                    <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11 border-2 border-blue-500/30">
                          <AvatarImage
                            src={
                              user?.profilePhoto ||
                              `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                userName
                              )}`
                            }
                            alt={userName}
                          />

                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {userName}
                          </p>

                          <p className="truncate text-xs text-foreground/50">
                            {userEmail}
                          </p>

                          {user?.role && (
                            <span className="mt-1 inline-flex rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                              {user.role}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Account */}
                    <DropdownMenuGroup className="p-2">
                      <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                        Account
                      </DropdownMenuLabel>

                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer rounded-lg"
                      >
                        <Link
                          href="/profile"
                          className="flex items-center gap-3"
                        >
                          <User className="h-4 w-4 text-blue-500" />
                          <span>My Profile</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer rounded-lg"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3"
                        >
                          <LayoutDashboard className="h-4 w-4 text-cyan-500" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    {/* Settings */}
                    <DropdownMenuGroup className="p-2">
                      <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                        Settings
                      </DropdownMenuLabel>

                      <DropdownMenuItem className="cursor-pointer rounded-lg">
                        <Settings className="mr-3 h-4 w-4 text-foreground/60" />
                        <span>Preferences</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer rounded-lg">
                        <HelpCircle className="mr-3 h-4 w-4 text-foreground/60" />
                        <span>Help & Support</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    {/* Logout */}
                    <div className="p-2">
                      <DropdownMenuItem onClick={(async()=> signOUt())} className="cursor-pointer rounded-lg text-red-500 focus:bg-red-500/10 focus:text-red-500">
                        <LogOut className="mr-3 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    className="rounded-full px-5"
                  >
                    <Link href="/auth/login">
                      Login
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-cyan-600"
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
      </nav>

      {/* ================= MOBILE NAVBAR ================= */}
      <nav className="fixed left-0 right-0 top-0 z-50 md:hidden">
        <div className="border-b border-white/10 bg-white/80 shadow-sm backdrop-blur-2xl dark:bg-slate-950/80">
          <div className="flex h-16 items-center justify-between px-4">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
                <Wrench className="h-4 w-4 text-white" />
              </div>

              <div>
                <p className="text-sm font-bold text-foreground">
                  FixItNow
                </p>

                <p className="text-[9px] font-medium tracking-wide text-foreground/40">
                  HOME SERVICE
                </p>
              </div>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2">

              {/* User */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="rounded-full p-0.5 transition hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      <Avatar className="h-9 w-9 border-2 border-blue-500/30">
                        <AvatarImage
                          src={
                            user?.profilePhoto ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                              userName
                            )}`
                          }
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
                    className="w-56 rounded-2xl border border-black/10 bg-white/95 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95"
                  >
                    <div className="px-4 py-3">
                      <p className="truncate text-sm font-semibold">
                        {userName}
                      </p>

                      <p className="truncate text-xs text-foreground/50">
                        {userEmail}
                      </p>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-3 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-3 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={async()=> signOUt()} className="text-red-500 focus:text-red-500">
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Menu */}
              <Sheet
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
              >
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/5 bg-black/5 transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-[290px] border-l border-black/10 bg-white/95 p-0 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95"
                >
                  <div className="flex h-full flex-col">

                    {/* Drawer Header */}
                    <div className="border-b border-black/5 px-6 py-6 dark:border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                          <Wrench className="h-5 w-5 text-white" />
                        </div>

                        <div>
                          <p className="font-bold">
                            FixItNow
                          </p>

                          <p className="text-xs text-foreground/40">
                            Home Service
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 px-4 py-6">
                      <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                        Navigation
                      </p>

                      <div className="space-y-1">
                        {navItems.map((item) => {
                          const Icon = item.icon;

                          const isActive =
                            item.href === '/'
                              ? pathname === '/'
                              : pathname.startsWith(item.href);

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() =>
                                setIsDrawerOpen(false)
                              }
                              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                isActive
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                                  : 'text-foreground/70 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Resources */}
                      <div className="mt-8 border-t border-black/5 pt-6 dark:border-white/10">
                        <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                          Resources
                        </p>

                        <div className="space-y-1">
                          <Link
                            href="/contact"
                            onClick={() =>
                              setIsDrawerOpen(false)
                            }
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/70 transition hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"
                          >
                            <HelpCircle className="h-5 w-5" />
                            Help & Support
                          </Link>

                          <Link
                            href="/settings"
                            onClick={() =>
                              setIsDrawerOpen(false)
                            }
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/70 transition hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"
                          >
                            <Settings className="h-5 w-5" />
                            Settings
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Drawer Bottom */}
                    {user ? (
                      <div className="border-t border-black/5 p-4 dark:border-white/10">
                        <div className="flex items-center gap-3 rounded-xl bg-black/5 p-3 dark:bg-white/5">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={
                                user?.profilePhoto ||
                                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                  userName
                                )}`
                              }
                              alt={userName}
                            />

                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
                              {userInitials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {userName}
                            </p>

                            <p className="truncate text-xs text-foreground/50">
                              {userEmail}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 border-t border-black/5 p-4 dark:border-white/10">
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
                          className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500"
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

      {/* Fixed Navbar Spacing */}
      <div className="h-16 md:h-[72px]" />
    </>
  );
}