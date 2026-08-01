import React from 'react'
import LoginFrom from './_components/LoginForm'
import { Button } from '../../../components/ui/button'

const LoginPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
<div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-background">
      {/* Left Column: Modernized Form Section */}
      <div className="flex items-center justify-center py-12 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
        {/* Dynamic Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none"></div>

        <div className="mx-auto grid w-full max-w-[420px] gap-8 relative z-10">
          {/* Mobile-only brand badge */}
          <div className="flex items-center gap-3 lg:hidden pb-4 border-b border-border/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/25">
              🔧
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight">FixItNow</span>
              <span className="text-[11px] text-muted-foreground">
                Home Service Platform
              </span>
            </div>
          </div>

          <div className="grid gap-2.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold w-fit mx-auto lg:mx-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Secure Portal
            </div>
            <h1 className="text-3xl font-black tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enter your credentials to manage your home services and bookings
            </p>
          </div>

          {/* Main Card Container with Glassmorphism */}
          <div className="grid gap-6 p-8 rounded-3xl bg-card/40 border border-border/60 shadow-2xl backdrop-blur-xl relative">
            <Button
              variant="outline"
              className="w-full h-12 gap-3 font-medium shadow-sm transition-all hover:bg-muted/60 border-border/80 rounded-xl bg-background/50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative flex py-0.5 items-center">
              <div className="flex-grow border-t border-border/60"></div>
              <span className="flex-shrink mx-3 text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                Or with email
              </span>
              <div className="flex-grow border-t border-border/60"></div>
            </div>
           <LoginFrom></LoginFrom>
         
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold text-emerald-500 hover:underline underline-offset-4"
            >
              Sign up for free
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: FixItNow Platform Showcase (Kept Original) */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-950 p-12 text-zinc-50 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top Logo / Brand Area */}
        <div className="flex items-center gap-3 font-semibold text-lg relative z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white font-bold shadow-lg shadow-primary/20">
            🔧
          </div>
          <div className="flex flex-col">
            <span className="tracking-wide text-base font-bold">FixItNow</span>
            <span className="text-xs text-zinc-400 font-normal">
              Trusted Home Service Platform
            </span>
          </div>
        </div>

        {/* Centered Feature Highlight */}
        <div className="my-auto relative z-10 max-w-lg space-y-6 py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
            Verified Technicians & Live Tracking
          </div>

          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Seamless home service scheduling, right at your doorstep.
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Connect instantly with top-rated professionals, manage real-time job
            slots, and experience secure checkout through a multi-role
            ecosystem.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-primary font-bold text-lg">
                100% Verified
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Qualified Professionals
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-blue-400 font-bold text-lg">
                Instant Booking
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Real-time Slot Pickers
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer text */}
        <div className="flex items-center justify-between text-xs text-zinc-500 relative z-10 pt-4 border-t border-zinc-900">
          <span>© 2026 FixItNow Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
        

    </div>
  )
}

export default LoginPage
