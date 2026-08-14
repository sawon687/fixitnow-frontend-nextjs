'use server'
import { cookies } from 'next/headers';

export const createSlot=async(prevState,formData:FormData)=>{
       
 const date=formData.get('date')
 const startTime=formData.get('startTime')
 const endTime=formData.get('endTime')
 const isAvailable=formData.get('isAvailable')
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;
    const payload={
        date,
        startTime,
        endTime,
        isAvailable:Boolean(isAvailable)
    }

    console.log('payload',payload)
    
      const res = await fetch(
        `${process.env.API_URL}/api/technician/availability`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "POST",
          body:JSON.stringify(payload)
        }
      );
    
    
      const result = await res.json();
    
      console.log("results data", result);
    
      return result;
}