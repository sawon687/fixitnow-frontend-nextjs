import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, Wrench, X } from "lucide-react";

import { getCategre } from "../../../commonService/getCategrie";

import { LeftSideFilter } from "./_components/LeftSideFilter";
import ServiceCard from "./_components/ServiceCard";
import { getAllService } from "./_actions/serviceActions";
import { SearchParams } from "next/dist/server/request/search-params";
import { ICategory, IService } from '../../../utils/type';
import Searchfeild from './_components/Searchfeild';

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

// Mock Services Data
const MOCK_SERVICES = [
  {
    id: "806cd8ce-ee3e-4f75-b689-4e84d60b2e97",
    title: "Professional Home Electrical Repair",
    description:
      "Expert electrical repair services including wiring, switch replacement, circuit breaker repair, fan installation, and troubleshooting.",
    price: 1300,
    priceType: "Fixed",
    location: "Dhaka",
    rating: 4.9,
    reviewsCount: 124,
    category: { name: "Electrical" },
  },
  {
    id: "917de9df-ff4f-5g86-c790-5f95e71c3f88",
    title: "Deep House & Office Cleaning",
    description:
      "Complete deep cleaning for floors, windows, upholstery, and sanitized washrooms using eco-friendly solutions.",
    price: 950,
    priceType: "Fixed",
    location: "Chittagong",
    rating: 4.7,
    reviewsCount: 98,
    category: { name: "Cleaning" },
  },
  {
    id: "705bc7bc-dd2d-3e64-a578-3d73c59a1d76",
    title: "AC Maintenance & Gas Refill",
    description:
      "Comprehensive air conditioner servicing, filter cleaning, cooling checkup, and standard refrigerant gas refill.",
    price: 1800,
    priceType: "Fixed",
    location: "Sylhet",
    rating: 4.8,
    reviewsCount: 156,
    category: { name: "AC & Refrigeration" },
  },
  {
    id: "604ab6ac-cc1b-2d53-9467-2c62b48a0d65",
    title: "Emergency Pipe & Faucet Plumbing",
    description:
      "Fix leaking pipes, clogged drains, broken faucets, and handle general bathroom plumbing swiftly.",
    price: 1100,
    priceType: "Fixed",
    location: "Dhaka",
    rating: 4.9,
    reviewsCount: 82,
    category: { name: "Plumbing" },
  },
];

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = searchParams;


  const reuslt =await getCategre();
  
  const resultservice =await getAllService();
  const service=resultservice.data || []
  const category = reuslt.data || [];

  const locationtechnician = service.map((s:IService)=> s.technician.location)

  const locations = [
    "All",
    ...Array.from(new Set( locationtechnician )),
  ] as string[];

 const categoryNames=category.map((c:ICategory)=> c.name )
  console.log('loatons page',locations)
    console.log('loatons service',service)
    console.log('loatons service',categoryNames)




  return (
   
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-12 md:px-8 lg:px-16 selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-hidden">
   
        {/* Soft Natural Background Glow */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-teal-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          {/* Header Section*/}
        {/* <div className="text-center max-w-2xl mx-auto space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" /> FixItNow Marketplace
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tight text-white"
          >
            Explore Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Home Services</span>
          </motion.h1>
          <p className="text-slate-400 text-sm md:text-base">
            Book verified technicians instantly with transparent pricing and guaranteed professional service quality.
          </p>
        </div> */}

    
          <div className="w-full overflow-hidden py-2 relative">
        
          <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
         <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

         {/* <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...CATEGORIES_DATA, ...categoryNames.name].map((cat, idx) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <motion.div
                  key={`${cat.id}-${idx}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(isSelected ? 'All' : cat.name)}
                  className={`relative w-64 h-36 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shadow-xl group ${
                    isSelected ? 'border-emerald-400 shadow-emerald-500/20' : 'border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
              
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                
                 <div className="absolute inset-0 p-4 flex flex-col justify-end">
                     <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Category</span>
                     <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors drop-shadow-md">
                     {cat.name}
                   </h3>
                  </div>

      
                  {isSelected && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-bold shadow-md">
                      Active
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div> */}
        </div>

        {/* Natural Search Bar */}
          <Searchfeild/>

        {/* Main Grid Layout: Sidebar & Filtered Services Grid (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
          {/* left sidebar and filter */}

               <LeftSideFilter locations={locations}
  categoryNames={categoryNames}/>

             {/* <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
             <AnimatePresence>
              {filteredServices.map((service, index) => (
                  <ServiceCard service={service} index={index}/>
              ))}
            </AnimatePresence>

              {filteredServices.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 bg-slate-950/40 border border-slate-800/80 rounded-3xl backdrop-blur-md space-y-3"
              >
                <Wrench className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
                <h3 className="text-lg font-semibold text-slate-300">No services found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Try adjusting your search query, filter options, or price range to find available services.
                </p>
              </motion.div>
          )} 
          </div> */}
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
