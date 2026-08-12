'use server'

import { promises } from 'dns';
import { cookies } from 'next/headers';



type BookingState = {
  success: boolean;
  message: string;
  status: number;
  error?: string;
};

export const bookingCreate = async(
  prevState: BookingState,
  formData: FormData
):Promise<BookingState> => {

    const serviceId = formData.get('serviceId') as string;
    const technicianId = formData.get('technicianId') as string;
    const scheduledDate = formData.get('scheduledDate') as string;
    const startTime = formData.get('startTime') as string;
    const totalAmount = Number(formData.get('totalAmount'));
    const address = formData.get('address') as string;

    console.log({
      serviceId,
      technicianId,
      scheduledDate,
      startTime,
      totalAmount,
      address,
    });
const payload={
      serviceId,
      technicianId,
      scheduledDate,
      startTime,
      totalAmount,
      address,
    }
    const cookieStore=await cookies()
    const accessToken=cookieStore.get('accessToken')?.value
     const res = await fetch(
    `${process.env.API_URL}/api/bookings`,
    {
      headers: {
        "Content-Type": "application/json",
       Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body:JSON.stringify(payload)
    }
  );
const result= await res.json()
   return result 
 
  }
export const singleService=async(id:String)=>{
 
     const res = await fetch(
    `${process.env.API_URL}/api/services/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        
      },
      method: "GET",
      cache: "no-store",
    }
  );

  const result=await res.json()

  console.log('services',result)

  return result.data
}