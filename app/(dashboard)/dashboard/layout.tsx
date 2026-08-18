"use client"

import { useEffect, useState } from "react"

import DashboardNavbar from './_components/DashboardNavbar'
import NavSidbar from './_components/NavSidbar'
import { getMe } from '../../../service/Profileme'



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchAwait = async () => {
      const user = await getMe()
      setUser(user)
    }

    fetchAwait()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex overflow-hidden">
      
           {/* sidbar */}
           <NavSidbar
            isCollapsed={isCollapsed} 
            setIsMobileOpen={setIsMobileOpen} 
            isMobileOpen={isMobileOpen}
            user={user}
            />
      {/* Main Area Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navabar */}
        <DashboardNavbar user={user} setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} setIsMobileOpen={setIsMobileOpen}/>

        {/* Dynamic Children Page Content Container */}
        <main className="flex-1 mt-5  overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

