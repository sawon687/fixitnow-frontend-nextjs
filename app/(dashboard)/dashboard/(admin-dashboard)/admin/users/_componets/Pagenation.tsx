'use client'
import React, { useEffect, useState } from 'react'
import { IUser } from '../../../../../../../utils/type'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { number } from 'motion'


type PagenationProps = {
  users: IUser[]
  totalPage:number
  totalUserCount:number
  limit:number
}

const Pagenation = ({ users ,totalUserCount,totalPage,limit}: PagenationProps) => {
   const searchParams=useSearchParams()
   const insialPage=searchParams.get('page') || '1'
    const router=useRouter()
  const  [currentPage,setCurrentPage]=useState(parseInt(insialPage))
useEffect(() => {
  const params = new URLSearchParams(searchParams.toString());
  const paramsPage = params.get("page");
  const page=Number(currentPage)

  console.log('pageuseEffcet',page)
  if (!paramsPage) {
    params.set("page", page.toString());

    const newUrl = `/dashboard/admin/users?${params.toString()}`;

    router.push(newUrl);
  } else if (paramsPage !== page.toString()) {
    params.set("page", page.toString());

    const newUrl = `/dashboard/admin/users?${params.toString()}`;

    router.replace(newUrl);
  }
}, [currentPage, router, searchParams]);
  return (
      <>
     <div className="flex flex-col gap-4 border-t border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-xs text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-300">
                    {totalUserCount === 0
                      ? 0
                      : (currentPage-1) * limit + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-300">
                    {Math.min(
                      currentPage * limit,
                      totalUserCount
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-300">
                    {totalUserCount}
                  </span>
                </p>
    
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={()=> setCurrentPage(currentPage - 1)}
                    disabled={currentPage < 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-slate-500 transition hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft size={16} />
                  </button>
    
                 {Array.from({length:totalPage}).map((_, page) => (
                    <button
                      key={page}
                      onClick={() =>{ setCurrentPage(page+1)

                        
                      }}
                      className={`h-9 min-w-9 rounded-lg px-3 text-xs font-semibold transition-all ${
                        currentPage === Number(page+1)
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "border border-white/[0.08] bg-white/[0.02] text-slate-500 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      {page+1}
                    </button>
                  ))}
    
                  <button
                   onClick={()=> setCurrentPage(currentPage + 1)}
                   disabled={totalPage<Number(currentPage+1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-slate-500 transition hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
     
    
    
    
    </>
  )
}

export default Pagenation