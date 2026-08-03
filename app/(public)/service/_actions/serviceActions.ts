'use server'
import { cookies } from 'next/headers'

export const getAllService=async()=>{

       const cookieStore = await cookies()
       const accessToken = cookieStore.get("accessToken")?.value
          const res= await fetch(`${process.env.API_URL}/api/services`, {
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