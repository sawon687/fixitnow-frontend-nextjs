import { Bell, Search, Menu } from "lucide-react"

const DashboardNavbar=()=> {
  return (
    <header className="h-16 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Mobile Menu Trigger & Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">
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

      {/* Right Action Icons & Status */}
      <div className="flex items-center gap-3">
        
        {/* System Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          All Systems Normal
        </div>

        {/* Notifications Button */}
        <button className="relative p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
        </button>

      </div>

    </header>
  )
}

export default DashboardNavbar