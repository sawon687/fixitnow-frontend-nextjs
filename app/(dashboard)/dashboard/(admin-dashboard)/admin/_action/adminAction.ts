'use server'

import { cookies } from 'next/headers'

export const getAdminDashboard=async()=>{
     const cookieStore = await cookies()
             const accessToken = cookieStore.get("accessToken")?.value
                const res= await fetch(`${process.env.API_URL}/api/admin/dashboard`, {
                  headers: {
                  'Content-Type': 'application/json',
                     Authorization: `Bearer ${accessToken}`,
                },
                method: 'GET',
                credentials:"include",
              
              
              })
            
              const result=await res.json()
             console.log('dashbaord',result)
              return result.data
}