import { Bell, Search, Menu, PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { DashboardNavbarProps } from '../../../../utils/type'



const DashboardNavbar = ({ setIsCollapsed, isCollapsed, setIsMobileOpen,user }: DashboardNavbarProps
) => {
  const toggleSidebar = () => setIsCollapsed?.(!isCollapsed)
  const openMobileMenu = () => setIsMobileOpen?.(true)

  return (
    <>
    {/* Top Navbar */}
        <header className="h-16 border-b border-zinc-800/80
         bg-zinc-950/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
           <button 
              onClick={toggleSidebar}
              className="p-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 transition-all shadow-sm"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4 text-emerald-400" />}
            </button>
          <div className="flex items-center gap-4 flex-1 max-w-md">
            
            {/* Mobile Drawer Open Button */}
            <button 
              onClick={openMobileMenu}
              className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search technicians, home service requests..." 
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Dispatch Active
            </div>

            <button className="relative p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </button>
          </div>
        </header>
  </>
  )
}

export default DashboardNavbar