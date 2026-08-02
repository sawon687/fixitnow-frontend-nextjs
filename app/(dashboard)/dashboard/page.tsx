import { 
  Activity, 
  ArrowUpRight, 
  BarChart3, 
  CreditCard, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  Users, 
  Zap 
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-8 space-y-8">
      
      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            Live Ecosystem
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
            Command Center
          </h1>
          <p className="text-sm text-zinc-400 mt-0.5">
            Real-time analytics and system metrics overview.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all">
            Export Report
          </button>
          <button className="px-4 py-2 text-xs font-medium rounded-lg bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10">
            + New Deployment
          </button>
        </div>
      </header>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <MetricCard 
          title="Total Revenue" 
          value="$48,250.80" 
          change="+12.5%" 
          isPositive={true}
          icon={<DollarSign className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard 
          title="Active Users" 
          value="2,431" 
          change="+4.1%" 
          isPositive={true}
          icon={<Users className="w-4 h-4 text-cyan-400" />}
        />
        <MetricCard 
          title="System Load" 
          value="34.8%" 
          change="-2.3%" 
          isPositive={false}
          icon={<Activity className="w-4 h-4 text-amber-400" />}
        />
        <MetricCard 
          title="Security Status" 
          value="99.9%" 
          change="Optimal" 
          isPositive={true}
          icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}
        />

      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart / Analytics Panel */}
        <div className="lg:col-span-2 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Performance Analytics</h2>
              <p className="text-xs text-zinc-400">Throughput and request volume over time</p>
            </div>
            <div className="flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 rounded-lg p-1 text-xs text-zinc-400">
              <button className="px-3 py-1 rounded bg-zinc-800 text-white font-medium shadow-sm">Day</button>
              <button className="px-3 py-1 hover:text-white transition-colors">Week</button>
              <button className="px-3 py-1 hover:text-white transition-colors">Month</button>
            </div>
          </div>

          {/* Simulated Chart Area */}
          <div className="h-64 w-full flex items-end gap-2 pt-8 pb-2">
            {[40, 65, 30, 85, 55, 90, 75, 60, 80, 95, 70, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div 
                  style={{ height: `${height}%` }}
                  className="w-full bg-gradient-to-t from-emerald-500/20 via-emerald-500/50 to-emerald-400 rounded-t-sm group-hover:bg-emerald-400 transition-all cursor-pointer relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-zinc-100 text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-zinc-800 whitespace-nowrap pointer-events-none">
                    {height * 120} req
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-zinc-500 border-t border-zinc-800/60 pt-3 mt-2">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Recent Activity / Feed */}
        <div className="rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Live Feed</h2>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Real-time
              </span>
            </div>

            <div className="space-y-4">
              <ActivityItem 
                title="New node provisioned" 
                time="2m ago" 
                type="deploy" 
              />
              <ActivityItem 
                title="Database migration complete" 
                time="14m ago" 
                type="system" 
              />
              <ActivityItem 
                title="High traffic spike detected" 
                time="42m ago" 
                type="warning" 
              />
              <ActivityItem 
                title="SSL Certificate renewed" 
                time="2h ago" 
                type="success" 
              />
            </div>
          </div>

          <button className="w-full mt-6 py-2.5 rounded-xl border border-zinc-800 text-xs font-medium text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-all flex items-center justify-center gap-2">
            View All Logs <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  )
}

// Sub-components for clean modular code

function MetricCard({ title, value, change, isPositive, icon }: { 
  title: string, 
  value: string, 
  change: string, 
  isPositive: boolean, 
  icon: React.ReactNode 
}) {
  return (
    <div className="rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-5 shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-zinc-400">{title}</span>
        <div className="p-2 rounded-xl bg-zinc-800/60 border border-zinc-700/50">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-white">{value}</h3>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
        }`}>
          {change}
        </span>
      </div>
    </div>
  )
}

function ActivityItem({ title, time, type }: { title: string, time: string, type: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-zinc-800/40 last:border-none">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          type === 'deploy' ? 'bg-cyan-400' :
          type === 'warning' ? 'bg-amber-400' :
          type === 'success' ? 'bg-emerald-400' : 'bg-zinc-400'
        }`} />
        <span className="text-sm text-zinc-200 font-medium">{title}</span>
      </div>
      <span className="text-xs text-zinc-500">{time}</span>
    </div>
  )
}