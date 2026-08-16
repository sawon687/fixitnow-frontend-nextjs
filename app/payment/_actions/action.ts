'use server'

import { cookies } from 'next/headers';

export const paymentConrim=async(sessionId:string)=>{
    console.log('session Id',sessionId)
     const cookieStore = await cookies();
       const accessToken = cookieStore.get("accessToken")?.value;
     
       const res = await fetch(`${process.env.API_URL}/api/payments/confirm`, {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${accessToken}`,
         },
         method: "POST",
         credentials: "include",
         body: JSON.stringify({sessionId }),
       });
     
       const result = await res.json();
       console.log('result payment',result)
      return result
      
     
     
         
     
     
     
        
}