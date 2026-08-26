import { ArrowLeft, Link } from 'lucide-react'
import React from 'react'

const BackButton = ({ href }: { href: string }) => {
  return (
    <>
      <Link
              href={href}
              className="
                group inline-flex items-center gap-2 rounded-xl
                border border-slate-800 bg-slate-900/70
                px-3.5 py-2.5 text-xs font-semibold text-slate-400
                backdrop-blur-xl transition-all
                hover:border-emerald-500/30
                hover:bg-slate-900
                hover:text-emerald-400
              "
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back 
            </Link>
    
    </>
  )
}

export default BackButton