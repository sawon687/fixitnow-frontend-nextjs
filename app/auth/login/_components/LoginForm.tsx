'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useActionState, useEffect } from 'react';
import { loginAction } from '../_action/loginAction';
import { toast } from 'sonner';

const LoginDualLayout = () => {
   const[stack,action,pending]=useActionState(loginAction,'')
   console.log(stack,'stack')
   useEffect(() => {
    if (!stack) return;

    if (stack.success) {
      toast.success(stack.message);
    }
    if (!stack.success) {
      toast.error(stack.errormessage);
    }
  }, [stack]);
  return (
         <form action={action} className="grid gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold tracking-wider uppercase text-muted-foreground"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                  <Input
                    id="email"
                    type="email"
                    name='email'
                    placeholder="name@example.com"
                    required
                    className="h-12 pl-10 bg-background/50 border-border/85 focus-visible:ring-emerald-500 rounded-xl transition-all"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold tracking-wider uppercase text-muted-foreground"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs font-semibold text-emerald-500 hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                  <Input
                    id="password"
                    type="password"
                    name='password'
                    placeholder="••••••••"
                    required
                    className="h-12 pl-10 bg-background/50 border-border/85 focus-visible:ring-emerald-500 rounded-xl transition-all"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 font-medium mt-2 shadow-lg shadow-emerald-500/25 rounded-xl text-base transition-all hover:scale-[1.01] active:scale-[0.99] group bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white hover:opacity-95 border-0"
              >
                {pending?'Login...':"Sign In"} 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
  );
};

export default LoginDualLayout;