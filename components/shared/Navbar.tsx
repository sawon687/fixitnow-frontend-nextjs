'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Settings,
  LogOut,
  Home,
  BarChart3,
  FileText,
  HelpCircle,
  ChevronDown,
  User,
  Mail,
  Wrench,
  UserCog,
  LayoutDashboard,
  LayoutDashboardIcon,
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Services', href: '/service', icon:Wrench },
  { label: 'Technicians', href: '/technicians', icon:  UserCog },
  { label: 'Contact', href: '/contact', icon: HelpCircle },
];

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname=usePathname()
  const hiddenPaths = ["/auth/login", "/auth/register",'/dashboard'];

  if (hiddenPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-2xl bg-gradient-to-b from-white/15 to-white/10 dark:from-slate-900/20 dark:to-slate-900/10 border-b border-white/20 dark:border-white/15 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 h-16  flex items-center justify-between">
            {/* Logo */}
       <Link href="/" className="flex items-center gap-2 group">
            <div 
            className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500  
            rounded-[12px] group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 
            bg-clip-text text-transparent hidden sm:inline">
              FixItNow
            </span>
          </Link>

            {/* Centered Navigation */}
            <div className="flex-1 flex justify-center px-8">
              <div className="flex items-center gap-1 bg-white/5 dark:bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/15 dark:border-white/10 shadow-lg">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 group"
                    >
                      <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Profile Dropdown */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                  >
                    <Avatar className="h-8 w-8 border-2 border-emerald-500/30 group-hover:border-emerald-500 transition-colors">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=fixitnow"
                        alt="User avatar"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-sm font-bold">
                        FN
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-foreground/60 group-data-[state=open]:rotate-180 transition-transform" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 backdrop-blur-xl bg-white/95 dark:bg-slate-950/95 border border-white/20 dark:border-white/10 rounded-xl shadow-2xl"
                >
                  {/* User Info Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-emerald-400/5 dark:from-emerald-500/20 dark:to-emerald-400/10 rounded-t-lg border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-emerald-500">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=fixitnow"
                          alt="User"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-sm font-bold">
                          FN
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          Alex Developer
                        </p>
                        <p className="text-xs text-foreground/60 truncate">
                          alex@fixitnow.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-white/10 dark:bg-white/10" />

                  {/* Profile Section */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-foreground/50 uppercase tracking-wide px-4 py-2">
                      Account
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-emerald-500/20 dark:hover:bg-emerald-500/10 transition-colors text-foreground/80 hover:text-foreground">
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <Link href={'/dashboard'}>
                     <DropdownMenuItem className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-emerald-500/20 dark:hover:bg-emerald-500/10 transition-colors text-foreground/80 hover:text-foreground">
                      <LayoutDashboardIcon className="w-4 h-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="bg-white/10 dark:bg-white/10" />

                  {/* Settings Section */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-foreground/50 uppercase tracking-wide px-4 py-2">
                      Settings
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-500/20 dark:hover:bg-blue-500/10 transition-colors text-foreground/80 hover:text-foreground">
                      <Settings className="w-4 h-4" />
                      <span>Preferences</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-500/20 dark:hover:bg-blue-500/10 transition-colors text-foreground/80 hover:text-foreground">
                      <HelpCircle className="w-4 h-4" />
                      <span>Help & Support</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="bg-white/10 dark:bg-white/10" />

                  {/* Sign Out */}
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer px-3 py-2.5 rounded-lg hover:bg-red-500/20 dark:hover:bg-red-500/10 transition-colors text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium m-2 mt-1 mb-0">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-2xl bg-gradient-to-b from-white/15 to-white/10 dark:from-slate-900/20 dark:to-slate-900/10 border-b border-white/20 dark:border-white/15 shadow-xl">
          <div className="px-4 h-14 flex items-center justify-between">
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/30">
                F
              </div>
              <span className="text-sm font-semibold text-foreground">
                FixItNow
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Mobile Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <Avatar className="h-7 w-7 border-2 border-emerald-500/30">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=fixitnow"
                        alt="User avatar"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-xs font-bold">
                        FN
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-52 backdrop-blur-xl bg-white/95 dark:bg-slate-950/95 border border-white/20 dark:border-white/10 rounded-xl shadow-2xl"
                >
                  {/* User Info */}
                  <div className="px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-emerald-400/5 dark:from-emerald-500/20 dark:to-emerald-400/10 rounded-t-lg border-b border-white/10">
                    <p className="text-sm font-semibold text-foreground">
                      Alex Developer
                    </p>
                    <p className="text-xs text-foreground/60">alex@fixitnow.com</p>
                  </div>

                  <DropdownMenuSeparator className="bg-white/10" />

                  {/* Quick Actions */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-foreground/50 uppercase tracking-wide px-4 py-2">
                      Account
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400 font-medium">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Drawer */}
              <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <Menu className="w-5 h-5 text-foreground" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-64 backdrop-blur-xl bg-white/95 dark:bg-slate-950/95 border-l border-white/20 dark:border-white/10"
                >
                  <div className="flex flex-col gap-6 pt-8">
                    {/* Navigation */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wide px-2">
                        Navigation
                      </h3>
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsDrawerOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-emerald-500/20 dark:hover:bg-emerald-500/10 transition-all duration-200"
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Resources */}
                    <div className="space-y-2 border-t border-white/10 pt-4">
                      <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wide px-2">
                        Resources
                      </h3>
                      <Link
                        href="#"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-blue-500/20 dark:hover:bg-blue-500/10 transition-colors"
                      >
                        <HelpCircle className="w-5 h-5" />
                        <span>Documentation</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-blue-500/20 dark:hover:bg-blue-500/10 transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Padding for fixed navbar */}
      <div className="h-16 md:h-16" />
    </>
  );
}
