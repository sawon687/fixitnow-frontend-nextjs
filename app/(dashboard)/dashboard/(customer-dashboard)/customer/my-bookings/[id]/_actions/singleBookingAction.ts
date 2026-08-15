'use server'

import { cookies } from 'next/headers'

export const getBookingDetails=async(id:string)=>{
            const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
    const res= await fetch(`${process.env.API_URL}/api/bookings/${id}`, {
      headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
    credentials:"include",
  
  
  })

  const result=await res.json()
  console.log('singlebookigns',result)
  return result.data
}




export const submitReviewAction=async(prevState: any, formData: FormData)=> {
  
    const bookingId = formData.get("bookingId") as string;
    const technicianId = formData.get("technicianId") as string;
    const rating = formData.get("rating");
    const comment = formData.get("comment") as string;
const reviewPayload={
  bookingId,
  technicianId,
  rating:Number(rating),
  comment
}

             const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
    const res= await fetch(`${process.env.API_URL}/api/reviews`, {
      headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    credentials:"include",
    body:JSON.stringify(reviewPayload)
  
  
  })
console.log(reviewPayload,'reviewpayload')
  const result=await res.json()
  console.log('singlebookigns',result)
 return result
}