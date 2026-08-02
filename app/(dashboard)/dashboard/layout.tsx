"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Bell, 
  Cpu, 
  Database, 
  HelpCircle, 
  LayoutDashboard, 
  Menu, 
  Search, 
  Settings, 
  ShieldAlert, 
  Terminal, 
  X, 
  Zap 
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex overflow-hidden">
      
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 border-r border-zinc-800/80 bg-zinc-950/90 md:bg-zinc-950/60 backdrop-blur-xl p-6 
        flex flex-col justify-between select-none
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top Brand Logo & Mobile Close Button */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold tracking-tight text-white block leading-none">Aura</span>
                <span className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase">Engineering Hub</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" onClick={() => setIsMobileOpen(false)}>
            <NavItem href="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" active />
            <NavItem href="/dashboard/deployments" icon={<Cpu className="w-4 h-4" />} label="Deployments" />
            <NavItem href="/dashboard/nodes" icon={<Terminal className="w-4 h-4" />} label="Nodes" />
            <NavItem href="/dashboard/database" icon={<Database className="w-4 h-4" />} label="Database" />
            <NavItem href="/dashboard/security" icon={<ShieldAlert className="w-4 h-4" />} label="Security" />
          </nav>
        </div>

        {/* Bottom Profile / Settings */}
        <div className="space-y-4 pt-6 border-t border-zinc-800/60">
          <nav className="space-y-1" onClick={() => setIsMobileOpen(false)}>
            <NavItem href="/dashboard/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
            <NavItem href="/dashboard/support" icon={<HelpCircle className="w-4 h-4" />} label="Support" />
          </nav>

          {/* User Miniprofile Card */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-zinc-950 text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">John Doe</p>
              <p className="text-[10px] text-zinc-400 truncate">admin@aura.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search commands, nodes, logs..." 
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Normal
            </div>

            <button className="relative p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
            </button>
          </div>
        </header>

        {/* Dynamic Children Page Content Container */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
        active 
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}