import React from "react";
import {
  MoreHorizontal,
  Plus,
  Search,
  Wrench,
  CheckCircle2,
  XCircle,
  Package,
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
import CreateServiceDialog from '../services/_components/CreateServiceDialog'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMyservice } from './_actions/serviceActions';



// const servicesData = [
//   {
//     id: "d7a89684-b440-4950-b595-737583ff0b37",
//     technicianId: "dfd9456e-ff7a-4178-9a7f-17b357b51249",
//     categoryId: "979824a4-5ce0-477d-ba93-0ef45ae7fb03",
//     title: "Professional Home Electrical Repair",
//     description:
//       "Expert electrical repair services including wiring, switch replacement, circuit breaker repair, fan installation, and troubleshooting for residential properties.",
//     price: 1300,
//     priceType: "Fixed",
//     isActive: true,
//     createdAt: "2026-08-03T14:37:17.511Z",
//   },
//   {
//     id: "e8b91795-c551-5061-c606-848694gg1c48",
//     technicianId: "dfd9456e-ff7a-4178-9a7f-17b357b51249",
//     categoryId: "979824a4-5ce0-477d-ba93-0ef45ae7fb03",
//     title: "Advanced Plumbing & Pipe Leak Fix",
//     description:
//       "Comprehensive plumbing solutions covering leak detection, pipe replacement, faucet installation, drain cleaning, and emergency water fixture maintenance.",
//     price: 1500,
//     priceType: "Fixed",
//     isActive: true,
//     createdAt: "2026-08-03T15:00:00.000Z",
//   },
//   {
//     id: "f9c02806-d662-6172-d717-959705hh2d59",
//     technicianId: "dfd9456e-ff7a-4178-9a7f-17b357b51249",
//     categoryId: "979824a4-5ce0-477d-ba93-0ef45ae7fb03",
//     title: "AC Maintenance & Deep Cleaning",
//     description:
//       "Full air conditioner servicing, filter cleaning, gas refilling, cooling efficiency checks, and complete compressor checkups for summer readiness.",
//     price: 2200,
//     priceType: "Fixed",
//     isActive: false,
//     createdAt: "2026-08-03T16:15:00.000Z",
//   },
// ];

const MyServices = async () => {

  const result = await getMyservice();
  const servicesData = result?.data || [];
     console.log('sercies sawon',servicesData)
  const totalServices = servicesData.length;
  // const activeServices = servicesData.filter(
  //   (service) => service.isActive
  // ).length;
  // const inactiveServices = totalServices - activeServices;

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-10">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Wrench className="h-5 w-5 text-primary" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                My Services
              </h1>
            </div>

            <p className="text-sm text-muted-foreground">
              Manage and organize the services you provide to customers.
            </p>
          </div>

<CreateServiceDialog></CreateServiceDialog>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total */}
          <Card className="border-none shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Services
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalServices}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          {/* Active */}
          <Card className="border-none shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Services
                </p>

                <p className="mt-1 text-2xl font-bold">
                  0
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          {/* Inactive */}
          <Card className="border-none shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Inactive Services
                </p>

                <p className="mt-1 text-2xl font-bold">
                0
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">
                <XCircle className="h-5 w-5 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="overflow-hidden border-none shadow-sm">

          {/* Search Header */}
          <CardHeader className="border-b bg-background px-5 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <CardTitle className="text-lg">
                  Service List
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  View and manage all your services.
                </p>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search services..."
                  className="h-10 rounded-xl pl-9"
                />
              </div>
            </div>
          </CardHeader>

          {/* Service List */}
          <CardContent className="p-0">

            <div className="hidden border-b bg-muted/30 px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid md:grid-cols-[2fr_1fr_1fr_120px_40px] md:items-center md:gap-4">
              <span>Service</span>
              <span>Price Type</span>
              <span>Price</span>
              <span>Status</span>
              <span></span>
            </div>

            {servicesData.map((service) => (
              <div
                key={service.id}
                className="group border-b px-5 py-5 transition-colors last:border-b-0 hover:bg-muted/30 md:px-6"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr_1fr_120px_40px] md:items-center md:gap-4">

                  {/* Service */}
                  <div className="flex min-w-0 items-start gap-4">

                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:flex">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">
                        {service.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {service.description}
                      </p>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Created{" "}
                        {new Date(
                          service.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Price Type */}
                  <div>
                    <p className="text-xs text-muted-foreground md:hidden">
                      Price Type
                    </p>

                    <p className="mt-1 text-sm font-medium md:mt-0">
                      {service.priceType}
                    </p>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-xs text-muted-foreground md:hidden">
                      Price
                    </p>

                    <p className="mt-1 text-lg font-bold text-primary md:mt-0">
                      ৳{service.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <Badge
                      variant={
                        service.isActive
                          ? "default"
                          : "secondary"
                      }
                      className="rounded-full px-3 py-1"
                    >
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                          service.isActive
                            ? "bg-white"
                            : "bg-muted-foreground"
                        }`}
                      />

                      {service.isActive
                        ? "Active"
                        : "Inactive"}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-lg"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          Edit Service
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          {service.isActive
                            ? "Deactivate"
                            : "Activate"}
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Delete Service
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                </div>
              </div>
            ))}

            {/* Empty State */}
            {servicesData.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                  <Wrench className="h-6 w-6 text-muted-foreground" />
                </div>

                <h3 className="text-lg font-semibold">
                  No services found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  You haven't created any services yet.
                  Create your first service to start accepting
                  bookings.
                </p>

                <Button className="mt-5 gap-2 rounded-xl">
                  <Plus className="h-4 w-4" />
                  Create Service
                </Button>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyServices;