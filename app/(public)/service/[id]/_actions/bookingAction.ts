'use server'


interface IPrevState<T>{
  success:boolean,
  status:number,
  message:string,
  data?:T
}



export const bookingCreate = async <T>(
  prevState: IPrevState<T>,
  formData: FormData
) => {
  try {
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
    
     const res = await fetch(
    `${process.env.API_URL}/api`,
    {
      headers: {
        "Content-Type": "application/json",
        
      },
      method: "GET",
      cache: "no-store",
    }
  );

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Booking failed',
      error: 'Something went wrong',
    };
  }
};


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