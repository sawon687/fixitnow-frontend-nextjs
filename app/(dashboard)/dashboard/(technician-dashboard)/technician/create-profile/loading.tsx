import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto h-[60vh] flex flex-col items-center justify-center space-y-3">
      <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
      <p className="text-xs text-zinc-400">Loading profile...</p>
    </div>
  )
}