'use server'
import { cookies } from 'next/headers'

export const getPaymentHistory=async()=>{

      const cookieStore = await cookies()
     const accessToken = cookieStore.get("accessToken")?.value
        const res= await fetch(`${process.env.API_URL}/api/payments`, {
          headers: {
          'Content-Type': 'application/json',
             Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
        credentials:"include",
      
      
      })
    
      const result=await res.json()
      console.log('payments',result.data.payments)
      console.log('payments',result.totalPaid)
      return result.data
}