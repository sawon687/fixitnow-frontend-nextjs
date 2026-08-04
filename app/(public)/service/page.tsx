import React from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles, Search, Wrench, X } from "lucide-react";

import { getCategre } from "../../../commonService/getCategrie";

import { LeftSideFilter } from "./_components/LeftSideFilter";
import ServiceCard from "./_components/ServiceCard";
import { getAllService } from "./_actions/serviceActions";
import { ICategory, ISeachParmas, IService } from "../../../utils/type";
import Searchfeild from "./_components/Searchfeild";
import Header from "./_components/Header";
import MotionAniBox from "../../../components/shared/MotionAniBox";

const SafeLeftSideFilter = ({
  locations,
  categoryNames,
}: {
  locations: string[];
  categoryNames: string[];
}) => {
  return (LeftSideFilter as any)({ locations, categoryNames });
};

// Categories Data provided by you
const CATEGORIES_DATA = [
  {
    id: "502e9e64-021f-46d9-9163-bdd030366f35",
    name: "Cleaning",
    description:
      "Home and office cleaning, deep cleaning, and maintenance services",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "a0221fd5-6a71-457a-ad2c-a6052402d476",
    name: "Plumbing",
    description:
      "Pipe repair, water leakage, faucet, sink, and bathroom plumbing services",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "979824a4-5ce0-477d-ba93-0ef45ae7fb03",
    name: "Electrical",
    description:
      "Electrical wiring, fan, light, switch, socket, and other electrical repair services",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "8e728e2a-eda0-465e-adc3-0c6e95ffac22",
    name: "AC & Refrigeration",
    description:
      "Air conditioner and refrigerator installation, servicing, and repair services",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
  },
];

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<ISeachParmas>;
}) {
  const params = await searchParams;

  const reuslt = await getCategre();

  const filterService = (await getAllService(params)) || [];

  const category = reuslt.data || [];

  const locationtechnician = filterService.map(
    (s: IService) => s.technician.location,
  );

  const locations = [
    "All",
    ...Array.from(new Set(locationtechnician)),
  ] as string[];

  const categoryNames = category.map((c: ICategory) => c.name);
  console.log("loatons page", locations);
  console.log("loatons service", filterService);
  console.log("loatons service", categoryNames);

  console.log("params", params);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-12 md:px-8 lg:px-16 selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-hidden">
      {/* Soft Natural Background Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-teal-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header Section*/}
        <Header
          categoryNames={categoryNames}
          CATEGORIES_DATA={CATEGORIES_DATA}
        ></Header>
        {/* Natural Search Bar */}
        <Searchfeild />

        {/* Main Grid Layout: Sidebar & Filtered Services Grid (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
          {/* left sidebar and filter */}

          <LeftSideFilter locations={locations} categoryNames={categoryNames} />

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <AnimatePresence>
              {filterService.map((service: IService, index: number) => (
                <ServiceCard service={service} key={index} />
              ))}
            </AnimatePresence>

            {filterService.length === 0 && (
              <MotionAniBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 bg-slate-950/40 border border-slate-800/80 rounded-3xl backdrop-blur-md space-y-3"
              >
                <Wrench className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
                <h3 className="text-lg font-semibold text-slate-300">
                  No services found
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Try adjusting your search query, filter options, or price
                  range to find available services.
                </p>
              </MotionAniBox>
            )}
          </div>
        </div>
      </div>

      {/* Marquee Animation Keyframes injected */}
      {/* <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `}</style> */}
    </div>
  );
}
