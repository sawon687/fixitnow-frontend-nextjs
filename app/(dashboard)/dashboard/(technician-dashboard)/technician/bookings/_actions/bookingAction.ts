
'use server'
import { cookies } from 'next/headers'

export const updateStatusAction=async(status:string,id:string)=>{
    console.log(status,'status')
    console.log('id',id)
      const cookieStore = await cookies()
      const accessToken = cookieStore.get("accessToken")?.value
        const res = await fetch(`${process.env.API_URL}/api/technician/bookings/${id}`, {
         headers: {
           'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
         },
         method: "PATCH",
         credentials:"include",
         body: JSON.stringify({status}),
       })
       

       const result=await res.json()
     console.log(result,'update staus')

       return result
}





export const getAllBooking=async()=>{

       const cookieStore = await cookies()
       const accessToken = cookieStore.get("accessToken")?.value
          const res= await fetch(`${process.env.API_URL}/api/technician/bookings`, {
            headers: {
            'Content-Type': 'application/json',
               Authorization: `Bearer ${accessToken}`,
          },
          method: 'GET',
    credentials:"include",
        })
      
             const result=  await res.json()
             console.log('results data',result)
        return result
}