'use client'
import React, { useActionState, useEffect, useState } from 'react';
import { User, Mail, Lock, Image as ImageIcon,  ArrowRight, CheckCircle2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from '../_actions/regsiterAction';
import { toast } from 'sonner';


const RegisterFrom = () => {
    const [openRole,setRole]=useState('')
   const[stack,action,pending]=useActionState(registerAction,'')
   console.log(stack,'stack')
   useEffect(()=>{
    if(!stack) return 
      if(stack.success)
      {
         toast.success(stack.message)
      }
      if(!stack.success || stack.errors.length)
      {
         toast.error(stack.errors[0]?.message)
      }
   },[stack])

  const roles = [
    { id: 'technician', label: 'Technician / Maker', desc: 'Build, test & deploy systems' },
    { id: 'customer', label: 'Customer / Client', desc: 'Commission custom projects' }
  ];

  return (

              <form action={action} className="space-y-4">
                {/* Dual Column Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      Full Name
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <User className="w-3.5 h-3.5" />
                      </span>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Alex Mercer"
                        className="pl-9 bg-slate-950/60 border-slate-800 focus-visible:ring-emerald-500 h-10 text-xs rounded-xl text-slate-100 placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      Email Address
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Mail className="w-3.5 h-3.5" />
                      </span>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="alex@aura-hub.io"
                        className="pl-9 bg-slate-950/60 border-slate-800 focus-visible:ring-emerald-500 h-10 text-xs rounded-xl text-slate-100 placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      Password
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••••••"
                        className="pl-9 bg-slate-950/60 border-slate-800 focus-visible:ring-emerald-500 h-10 text-xs rounded-xl text-slate-100 placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div className="space-y-1.5">
                    <Label htmlFor="photo" className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      Profile Photo URL
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <ImageIcon className="w-3.5 h-3.5" />
                      </span>
                      <Input
                        id="photo"
                        name="photo"
                        type="url"
                        placeholder="https://example.com/avatar.jpg"
                        className="pl-9 bg-slate-950/60 border-slate-800 focus-visible:ring-emerald-500 h-10 text-xs rounded-xl text-slate-100 placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </div>

           {/* Hidden Role Value */}
<input
  type="hidden"
  name="role"
  value={openRole}
/>


{/* Role Selection */}
<div className="space-y-2">
  <Label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
    Select Account Type
  </Label>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {roles.map((role) => {
      const isSelected = openRole === role.id;

      return (
        <button
          key={role.id}
          type="button"
          onClick={() => setRole(role.id)}
          className={`
            group relative p-4  rounded-2xl border text-left
            transition-all duration-300 cursor-pointer
            ${
              isSelected
                ? `
                  border-emerald-400/80
                  bg-emerald-500/10
                  shadow-lg shadow-emerald-500/10
                `
                : `
                  border-slate-800
                  bg-slate-950/50
                  hover:border-slate-600
                  hover:bg-slate-900
                `
            }
          `}
        >

          {/* Radio Circle */}
          <div
            className={`
              absolute top-4 right-4
              w-5 h-5 rounded-full
              border flex items-center justify-center
              transition-all
              ${
                isSelected
                  ? "border-emerald-400 bg-emerald-400"
                  : "border-slate-600"
              }
            `}
          >
            {isSelected && (
              <CheckCircle2
                className="w-4 h-4 text-slate-950"
              />
            )}
          </div>


          {/* Content */}
          <div className="pr-8">

            <h3
              className={`
                text-sm font-bold transition-colors
                ${
                  isSelected
                    ? "text-emerald-400"
                    : "text-slate-200"
                }
              `}
            >
              {role.label}
            </h3>


            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {role.desc}
            </p>

          </div>


          {/* Active Indicator */}
          <div
            className={`
              mt-4 h-1 rounded-full transition-all duration-300
              ${
                isSelected
                  ? "w-full bg-emerald-400"
                  : "w-8 bg-slate-700 group-hover:w-16"
              }
            `}
          />

        </button>
      );
    })}

  </div>
</div>
                {/* Submit Action */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-sm rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-90 text-slate-950 font-bold shadow-xl shadow-emerald-500/25 border border-emerald-400/40 transition-all cursor-pointer mt-2"
                >
                  <span>{pending?'creating...':'sign up'}</span>
                  <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
                </Button>
              </form>

          
  );
};

export default RegisterFrom;