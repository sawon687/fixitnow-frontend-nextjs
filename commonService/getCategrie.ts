
'use server'

import { cookies } from 'next/headers'

export const getCategre=async()=>{
   const cookieStore = await cookies()
   const accessToken = cookieStore.get("accessToken")?.value
      const res= await fetch(`${process.env.API_URL}/api/categories`, {
        headers: {
        'Content-Type': 'application/json',
           Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    
    })
  
         const result=  await res.json()
         console.log('results data',result)
    return result
     
}