'use client'
import { Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Marquee from 'react-fast-marquee';

interface ICategory {
    id: string | number;
    name: string;
    image: string;
}

interface IHeadersProps {
    categoryNames?: string[];
    CATEGORIES_DATA: ICategory[];
}

const Header = ({ categoryNames = [], CATEGORIES_DATA }: IHeadersProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Combine or use CATEGORIES_DATA safely
    const allCategories = [...CATEGORIES_DATA];

  return (
    <>
      <div className="text-center max-w-2xl mx-auto space-y-3">
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
      </div>

      <div className="w-full overflow-hidden py-6 relative">
        {/* Gradient Fades for Marquee Edges */}
        <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <Marquee pauseOnHover={true} speed={40} gradient={false}>
          <div className="flex gap-4 px-2">
            {allCategories.map((cat, idx) => {
              const isSelected = selectedCategory === cat.name;
              
              return (
                <motion.div
                  key={`${cat.id}-${idx}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                  className={`relative w-75 h-50 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shadow-xl group shrink-0 ${
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
          </div>
        </Marquee>
      </div>
    </>
  );
};

export default Header;