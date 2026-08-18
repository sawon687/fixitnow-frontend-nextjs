'use client'
import React from 'react'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchBar = () => {
 const searchParams=useSearchParams()
 const router=useRouter()
  const handleSearch = (searchText: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const value = searchText.trim();

    if (value) {
      params.set("search", value);
      params.set("page", "1");
    } else {
      params.delete("search");
      params.delete("page");
    }

    router.replace(`/dashboard/admin/users?${params.toString()}`);
  };
  return (
    <>
    
          <div className="relative w-full lg:max-w-sm">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
               
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search name, email or role..."
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 hover:border-white/[0.13] focus:border-blue-500/40 focus:bg-white/[0.05] focus:ring-4 focus:ring-blue-500/5"
              />
            </div>
          
    </>
  )
}

export default SearchBar