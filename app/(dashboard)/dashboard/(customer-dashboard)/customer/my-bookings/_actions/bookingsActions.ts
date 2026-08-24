'use server'

import { cookies } from 'next/headers'
export type BookingParams={
    status:string[]
}
export const getmyBookings=async(params:BookingParams)=>{
  console.log('params status',params)
            const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
    const res= await fetch(`${process.env.API_URL}/api/bookings?status=${params?.status}`, {
      headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
    credentials:"include",
  
  
  })

  const result=await res.json()
    
  return result
}


