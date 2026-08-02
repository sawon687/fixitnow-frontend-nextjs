"use client"

import { useState } from "react"

import DashboardNavbar from './_components/DashboardNavbar'
import NavSidbar from './_components/NavSidbar'



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
 

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex overflow-hidden">
      
           {/* sidbar */}
           <NavSidbar
            isCollapsed={isCollapsed} 
            setIsMobileOpen={setIsMobileOpen} 
            isMobileOpen={isMobileOpen}
            />
      {/* Main Area Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navabar */}
        <DashboardNavbar setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} setIsMobileOpen={setIsMobileOpen}/>

        {/* Dynamic Children Page Content Container */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

