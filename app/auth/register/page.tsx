
import React from 'react';

import {  ShieldCheck,  Cpu, Wrench, Sparkles } from 'lucide-react';

import { Card,} from "@/components/ui/card";
import AnimatedBox from '../../../components/shared/AnimatedBox';
import RegisterFrom from './_components/RegisterFrom';



const RegisterPage = () => {


  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 lg:p-6 overflow-hidden relative">
      {/* Background Aura Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

     <AnimatedBox>
        <Card className="border-slate-800/80 bg-slate-900/70 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            
            {/* Left Brand Showcase Panel (Desktop Split View) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-emerald-950/30 p-8  flex flex-col justify-between border-r border-slate-800/60 relative overflow-hidden">
              {/* Subtle tech grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Aura Engineering Hub</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white leading-snug">
                  Build the Future of Hardware & Software.
                </h1>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Join an elite network of makers, engineers, and visionary clients collaborating on next-gen systems.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="relative z-10 space-y-3 my-6">
                <div className="flex items-center space-x-3 text-xs text-slate-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <span>Secure Multi-Role Access Control</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <span>Real-time Engineering Ecosystem</span>
                </div>
              </div>

              <div className="relative z-10 text-[11px] text-slate-500 border-t border-slate-800/80 pt-4">
                Already part of Aura?{' '}
                <a href="/login" className="text-emerald-400 hover:underline font-medium">
                  Sign In here
                </a>
              </div>
            </div>

            {/* Right Registration Form Panel */}
            <div className="lg:col-span-8 p-6 lg:p-8 flex flex-col justify-center">
              <div className="mb-5">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Registration</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">Create Account</h2>
                <p className="text-xs text-slate-400 mt-0.5">Please fill in your profile specifications below.</p>
              </div>

             <RegisterFrom/>

              {/* Mobile Footer Link */}
              <div className="text-center mt-4 text-xs text-slate-500 lg:hidden">
                Already have an account?{' '}
                <a href="/login" className="text-emerald-400 hover:underline font-medium">
                  Sign In
                </a>
              </div>
            </div>

          </div>
        </Card>
     </AnimatedBox>
    </div>
  );
};

export default RegisterPage;