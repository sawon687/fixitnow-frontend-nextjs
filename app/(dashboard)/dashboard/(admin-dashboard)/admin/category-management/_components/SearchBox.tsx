import { Search } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { Input } from '../../../../../../../components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'


const SearchBox = () => {
  const searchParams=useSearchParams()
  const insilaSearch=searchParams.get('search')
  const [search,setSearch]=useState(insilaSearch ?? '')
  const router=useRouter()
useEffect(() => {
  const timer = setTimeout(() => {
    const params = new URLSearchParams(window.location.search)

    if (search.trim()) {
      params.set('search', search.trim())
    } else {
      params.delete('search')
      setSearch('')
    }

    router.push(`?${params.toString()}`)
  }, 500)

  return () => {
    clearTimeout(timer)
  }
}, [search, router])

  return (
    <div> <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

              <Input
              
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="h-10 border-white/10 bg-[#080B10] pl-9 text-white placeholder:text-gray-500"
              />
            </div>

            <p className="text-sm text-gray-500">
              0 categories found
            </p>
          </div>
</div>
  )
}

export default SearchBox