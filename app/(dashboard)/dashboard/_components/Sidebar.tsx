import Link from "next/link"
import { 
  LayoutDashboard, 
  Cpu, 
  Terminal, 
  Database, 
  ShieldAlert, 
  Settings, 
  HelpCircle,
  Zap 
} from "lucide-react"

const Sidebar=()=> {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6 justify-between select-none">
      
      {/* Top Brand Logo */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-white block leading-none">Aura</span>
            <span className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase">Engineering Hub</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <NavItem href="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" active />
          <NavItem href="/dashboard/deployments" icon={<Cpu className="w-4 h-4" />} label="Deployments" />
          <NavItem href="/dashboard/nodes" icon={<Terminal className="w-4 h-4" />} label="Nodes" />
          <NavItem href="/dashboard/database" icon={<Database className="w-4 h-4" />} label="Database" />
          <NavItem href="/dashboard/security" icon={<ShieldAlert className="w-4 h-4" />} label="Security" />
        </nav>
      </div>

      {/* Bottom Profile / Settings */}
      <div className="space-y-4 pt-6 border-t border-zinc-800/60">
        <nav className="space-y-1">
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


export default Sidebar