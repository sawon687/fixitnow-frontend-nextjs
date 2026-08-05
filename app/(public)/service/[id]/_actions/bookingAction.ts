'use server'
export const  bookingCreate=async()=>{

    
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