"use client"

import { useState } from "react"
import { 
  User, 
  Settings, 
  CreditCard, 
  LogOut, 
  LayoutDashboard, 
  Wrench, 
  Calendar, 
  Bell, 
  Menu, 
  X,
  ShieldCheck
} from "lucide-react"

const Navbar=()=> {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/25 border border-white/10">
              🔧
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                FixItNow
              </span>
              <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-widest">
                Service Hub
              </span>
            </div>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/30 p-1.5 rounded-full border border-border/50 backdrop-blur-md">
            <a 
              href="#" 
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-background text-foreground shadow-sm transition-all"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Bookings
            </a>
            <a 
              href="#" 
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Services
            </a>
            <a 
              href="#" 
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Support
            </a>
          </nav>

          {/* Right Side: Actions & Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2.5 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 text-muted-foreground hover:text-foreground transition-all">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500"></span>
            </button>

            {/* Profile Dropdown Container */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 p-1.5 pl-3 rounded-2xl bg-card border border-border/80 hover:border-emerald-500/50 shadow-sm transition-all group"
              >
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-foreground">Marcus Vance</span>
                  <span className="text-[10px] text-emerald-500 font-medium">Verified Client</span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold text-sm group-hover:scale-105 transition-transform">
                  MV
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-3xl bg-card/95 border border-border/80 shadow-2xl backdrop-blur-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b border-border/60 mb-1">
                    <p className="text-xs font-medium text-muted-foreground">Signed in as</p>
                    <p className="text-sm font-bold text-foreground truncate">marcus.vance@example.com</p>
                  </div>

                  <div className="space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                      <User className="h-4 w-4 text-emerald-500" />
                      Profile Settings
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                      <Calendar className="h-4 w-4 text-emerald-500" />
                      My Bookings
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                      <CreditCard className="h-4 w-4 text-emerald-500" />
                      Billing & Payments
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      Security & RBAC
                    </a>
                  </div>

                  <div className="border-t border-border/60 my-1 pt-1">
                    <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-all">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-muted/40 border border-border/60 text-foreground"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-card/95 backdrop-blur-2xl p-6 space-y-5 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border/40">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold">
              MV
            </div>
            <div>
              <h4 className="font-bold text-sm">Marcus Vance</h4>
              <p className="text-xs text-muted-foreground">marcus.vance@example.com</p>
            </div>
          </div>

          <nav className="grid gap-2">
            <a href="#" className="px-4 py-3 rounded-xl bg-muted/50 font-semibold text-sm">Dashboard</a>
            <a href="#" className="px-4 py-3 rounded-xl hover:bg-muted/50 font-semibold text-sm text-muted-foreground">Bookings</a>
            <a href="#" className="px-4 py-3 rounded-xl hover:bg-muted/50 font-semibold text-sm text-muted-foreground">Services</a>
            <a href="#" className="px-4 py-3 rounded-xl hover:bg-muted/50 font-semibold text-sm text-muted-foreground">Settings</a>
          </nav>

          <div className="pt-4 border-t border-border/40">
            <button className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 font-semibold text-sm text-center">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar