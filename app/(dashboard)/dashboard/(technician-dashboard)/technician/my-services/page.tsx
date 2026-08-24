import React from "react";
import {
  MoreHorizontal,
 
  Search,
  Wrench,
  CheckCircle2,
  XCircle,
  Package,
  TrendingUp,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getMyservice } from "./_actions/serviceActions";
import CreateServiceDialog from './_components/CreateServiceDialog';
import Link from 'next/link';
import { IService } from '../../../../../../utils/type';

const MyServices = async () => {
  const result = await getMyservice();

  const servicesData = result?.data || [];

  // Dynamic stats
  const totalServices = servicesData.length;

  const activeServices = servicesData.filter(
    (service: IService) => service.isActive
  ).length;

  const inactiveServices = totalServices - activeServices;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 lg:py-10">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            {/* Small label */}
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Wrench className="h-4 w-4 text-primary" />
              </div>

              <span className="font-medium">
                Technician Workspace
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              My Services
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Manage the services you offer, pricing, availability and
              customer visibility from one place.
            </p>
          </div>

          <CreateServiceDialog isEdit={false} />
        </div>

        {/* =====================================================
            STATS
        ====================================================== */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total */}
          <Card className="group relative overflow-hidden border bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

            <CardContent className="relative p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Services
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight">
                    {totalServices}
                  </h2>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Package className="h-3.5 w-3.5" />
                    All services you provide
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                  <Package className="h-5 w-5 text-primary" />
                </div>

              </div>

            </CardContent>
          </Card>

          {/* Active */}
          <Card className="group relative overflow-hidden border bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl" />

            <CardContent className="relative p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Services
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight">
                    {activeServices}
                  </h2>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Available for booking
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 transition-transform group-hover:scale-110">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>

              </div>

            </CardContent>
          </Card>

          {/* Inactive */}
          <Card className="group relative overflow-hidden border bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-1">

            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-500/5 blur-2xl" />

            <CardContent className="relative p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Inactive Services
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight">
                    {inactiveServices}
                  </h2>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" />
                    Currently unavailable
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 transition-transform group-hover:scale-110">
                  <XCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>

              </div>

            </CardContent>
          </Card>

        </div>

        {/* =====================================================
            MAIN SERVICE CARD
        ====================================================== */}
        <Card className="overflow-hidden border bg-background/80 shadow-sm">

          {/* Top Header */}
          <CardHeader className="border-b bg-muted/20 px-5 py-5 md:px-6">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="flex items-center gap-2">

                  <CardTitle className="text-lg">
                    Service List
                  </CardTitle>

                  <Badge
                    variant="secondary"
                    className="rounded-full px-2.5 py-0.5 text-[11px]"
                  >
                    {totalServices}
                  </Badge>

                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Manage all services available on your technician profile.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search services..."
                  className="h-10 rounded-xl border-muted-foreground/20 bg-background pl-9 shadow-sm focus-visible:ring-1"
                />

              </div>

            </div>

          </CardHeader>

          {/* =====================================================
              TABLE HEADER
          ====================================================== */}
          <CardContent className="p-0">

            <div className="hidden border-b bg-muted/30 px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:grid md:grid-cols-[2fr_1fr_1fr_120px_44px] md:items-center md:gap-4">

              <span>Service</span>

              <span>Price Type</span>

              <span>Price</span>

              <span>Status</span>

              <span />

            </div>

            {/* =====================================================
                SERVICES
            ====================================================== */}

            {servicesData.map((service:IService & {id:string}) => (

              <div
                key={service.id}
                className="group border-b px-5 py-5 transition-all duration-200 last:border-b-0 hover:bg-muted/20 md:px-6"
              >

                <div className="grid grid-cols-1 gap-5 md:grid-cols-[2fr_1fr_1fr_120px_44px] md:items-center md:gap-4">

                  {/* SERVICE */}
                  <div className="flex min-w-0 items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-primary/5 text-primary transition-all duration-200 group-hover:scale-105 group-hover:bg-primary/10">

                      <Wrench className="h-5 w-5" />

                    </div>

                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        <h3 className="truncate font-semibold">
                          {service.title}
                        </h3>

                        {service.isActive && (
                          <span className="hidden h-1.5 w-1.5 rounded-full bg-emerald-500 sm:block" />
                        )}

                      </div>

                      <p className="mt-1 line-clamp-2 max-w-lg text-sm leading-5 text-muted-foreground">
                        {service.description}
                      </p>

                      <p className="mt-2 text-[11px] text-muted-foreground">
                        Created{" "}
                        {new Date(
                          service.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  {/* PRICE TYPE */}
                  <div>

                    <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground md:hidden">
                      Price Type
                    </p>

                    <Badge
                      variant="outline"
                      className="rounded-lg font-medium"
                    >
                      {service.priceType}
                    </Badge>

                  </div>

                  {/* PRICE */}
                  <div>

                    <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground md:hidden">
                      Price
                    </p>

                    <p className="text-lg font-bold tracking-tight">
                      ৳{service.price.toLocaleString()}
                    </p>

                  </div>

                  {/* STATUS */}
                  <div>

                    <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground md:hidden">
                      Status
                    </p>

                    <Badge
                      variant="outline"
                      className={`rounded-full px-3 py-1 ${
                        service.isActive
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      }`}
                    >

                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                          service.isActive
                            ? "bg-emerald-500"
                            : "bg-orange-500"
                        }`}
                      />

                      {service.isActive
                        ? "Active"
                        : "Inactive"}

                    </Badge>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-end">

                    <DropdownMenu>

                      <DropdownMenuTrigger asChild>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl opacity-70 transition-opacity hover:bg-muted hover:opacity-100"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>

                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-44 rounded-xl"
                      >

                        <Link href={`/dashboard/technician/my-services/${service.id}`}><DropdownMenuItem className="cursor-pointer">
                          View Details
                          <ArrowUpRight className="ml-auto h-3.5 w-3.5" />
                        </DropdownMenuItem></Link>

                       

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="cursor-pointer">
                          {service.isActive
                            ? "Deactivate"
                            : "Activate"}
                        </DropdownMenuItem>

                      

                      </DropdownMenuContent>

                    </DropdownMenu>

                  </div>

                </div>

              </div>

            ))}

            {/* =====================================================
                EMPTY STATE
            ====================================================== */}

            {servicesData.length === 0 && (

              <div className="flex min-h-[400px] flex-col items-center justify-center px-6 py-16 text-center">

                <div className="relative mb-5">

                  <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-muted/50">

                    <Wrench className="h-7 w-7 text-muted-foreground" />

                  </div>

                </div>

                <h3 className="text-lg font-semibold">
                  No services yet
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  You haven't created any services yet. Add your first
                  service so customers can discover and book you.
                </p>

                <div className="mt-6">
                  <CreateServiceDialog isEdit={false} />
                </div>

              </div>

            )}

          </CardContent>

        </Card>

      </div>
    </div>
  );
};

export default MyServices;