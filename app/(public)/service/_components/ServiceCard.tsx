 'use client'
 import Link from 'next/link'
import { ArrowRight, MapPin, Star, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'
import { IService} from '../../../../utils/type'




type ServiceCardProps = {
  service:IService
  index?: number
}

const ServiceCard = ({ service, index = 0 }: ServiceCardProps) => {
  return (
     <>
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      key={service.id}
      className="group relative rounded-3xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between gap-6"
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Tag className="w-3 h-3" /> {service.category.name}
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-medium px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
            <Star className="w-3 h-3 fill-amber-400" /> 
            {service.technician.avgRating}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
          {service.title}
        </h3>

        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        <div className="flex items-center gap-1 text-slate-400 text-xs pt-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {service.technician.location}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
        <div>
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">Starting at</span>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            ৳{service.price}
          </span>
        </div>

        <Link href={`/service/${service.id}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 font-semibold text-sm transition-all duration-200 shadow-sm"
          >
            Book Now <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>

      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl" />
    </motion.div>
   </>
  )
}

export default ServiceCard