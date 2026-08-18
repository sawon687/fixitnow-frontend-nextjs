'use server'
import { cookies } from 'next/headers';
import { AvailabilityStatus, TState } from '../../../../../../../utils/type';
import { revalidatePath } from 'next/cache';

interface AvailabilityPayload {
  date: FormDataEntryValue | null;
  startTime: FormDataEntryValue | null;
  endTime: FormDataEntryValue | null;
  status: FormDataEntryValue | null;
 
}


export const createSlot = async (prevState: TState, formData: FormData) => {
       
 const date = formData.get('date')
 const startTime = formData.get('startTime')
 const endTime = formData.get('endTime')
 const  status= formData.get('status') 
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;
    const payload: AvailabilityPayload = {
        date,
        startTime,
        endTime,
         status
    }

    console.log('payload', payload)
    
      const res = await fetch(
        `${process.env.API_URL}/api/technician/availability`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(payload)
        }
      );
    
    
      const result = await res.json();
    
    
      return result;
}


export const getMySlot = async () => {
       
 const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;
  

  
    
      const res = await fetch(
        `${process.env.API_URL}/api/technician/availability`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "GET",
          cache:"no-cache"
          
        }
      );
    
    
      const result = await res.json();
    
  
      return result;
}

export interface IStatusPayload
{id:String,
status:AvailabilityStatus
}

export const UpdateStatus=async(payload:IStatusPayload)=>{
    const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;
  

  
    
      const res = await fetch(
        `${process.env.API_URL}/api/technician/availability`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "PUT",
          body:JSON.stringify(payload)
        }
      );

      const result=await res.json()
    
        revalidatePath("/dashboard/technician/availability");
      

     
      return result
}