import { Sparkles, Wrench } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link
        href="/"
        className="group flex shrink-0 items-center gap-3 rounded-xl px-2"
      >
        <div
          className="
                            relative flex h-10 w-10 items-center rounded-2xl justify-center
                            overflow-hidden 
                            bg-gradient-to-br from-emerald-500 via-emerald-500 to-cyan-400
                            shadow-lg shadow-blue-500/25
                            transition-all duration-300
                            group-hover:scale-105
                            group-hover:shadow-blue-500/40
                          "
        >
          <div className="absolute inset-0 bg-white/10" />

          <Wrench className="relative h-5 w-5 text-white" />
        </div>

        <div className="hidden sm:block">
          <div className="flex items-center gap-1">
            <span
              className="
                                bg-gradient-to-r
                               from-emerald-500 via-emerald-500 to-cyan-400
                                bg-clip-text
                                text-lg
                                font-extrabold
                                tracking-tight
                                text-transparent
                              "
            >
              FixItNow
            </span>

            <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
          </div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35">
          rusted Home Service Marketplace
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
