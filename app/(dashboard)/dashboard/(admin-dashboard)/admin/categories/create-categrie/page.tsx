import React from "react";

import { Card, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import CategrieFrom from './_components/CategrieFrom';

export default function AddCategoryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-2xl bg-card/60 backdrop-blur-xl border-border/80 shadow-2xl relative z-10">
        <CardHeader className="space-y-1 pb-6 border-b border-border/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Aura Engineering Hub</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-500 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Category Form
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">Add New Category</CardTitle>
          <CardDescription>
            Create a new service category with custom details and icon mapping.
          </CardDescription>
        </CardHeader>
      {/* categire from */}
      <CategrieFrom></CategrieFrom>
      </Card>
    </div>
  );
}