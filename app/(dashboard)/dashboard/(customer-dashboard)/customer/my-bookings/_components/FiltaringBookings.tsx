
'use client'
import { useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react'

const FiltaringBookings = () => {
 
      const params=useSearchParams()
      const currentStatus=params.get('status') || 'ALL'
      const router=useRouter()
     const [activeTab, setActiveTab] = useState<string>(currentStatus);
      useEffect(()=>{
         const statusFromUrl=params.get('status') || "ALL"

         if( statusFromUrl && statusFromUrl !== activeTab)
         {
            setActiveTab(statusFromUrl)
         } 
          
      },[params])

      const handleClick=(tab:string)=>{
        if(tab==activeTab) return
        setActiveTab(tab)

    router.push(`/dashboard/customer/my-bookings?status=${tab}`, { scroll: false });
  

      }
  return (
    <div>    <div className="flex flex-wrap gap-2">
              {["ALL", "REQUESTED","ACCEPTED", "COMPLETED", "CANCELLED","PAID","IN_PROGRESS","DECLINED"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>handleClick(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-lg shadow-teal-500/20"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:border-teal-500/40 hover:text-teal-300"
                  }`}
                >
                  {tab === "ALL" ? "All Bookings" : tab}
                </button>
              ))}
            </div></div>
  )
}

export default FiltaringBookings