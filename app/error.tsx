"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Home,
  RefreshCcw,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Errorspage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;

}) {

 
  
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
      {/* Background Decorations */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-destructive/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Logo / Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border bg-card shadow-xl">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
            <Wrench className="h-8 w-8 text-destructive" />

            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-white shadow-md">
              <AlertTriangle className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Error Code */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-destructive">
          Error 500
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
          Oops! Something unexpected happened while loading this page.
          Please try again or return to the FixItNow homepage.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => reset()}
            size="lg"
            className="w-full gap-2 sm:w-auto"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full gap-2 sm:w-auto"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="lg"
            className="w-full gap-2 sm:w-auto"
          >
            <Link href="/contact">
              <ArrowLeft className="h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </div>

        {/* Bottom Info Card */}
        <div className="mx-auto mt-12 max-w-md rounded-2xl border bg-card/70 p-5 text-left shadow-sm backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Wrench className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">
                Need help?
              </h3>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                If the problem keeps happening, please contact our
                support team and we&apos;ll help you get things fixed.
              </p>
            </div>
          </div>
        </div>

        {/* Brand */}
        <p className="mt-8 text-sm text-muted-foreground">
          FixItNow — Your Trusted Home Service Platform
        </p>
      </div>
    </main>
  );
}