'use server'



export const  bookingCreate=async(formdata:FormData)=>{
 
  console.log('form',formdata)

  const date= formdata.get('date')
  const startTime=formdata.get('startTime')
  const endTime=formdata.get('endTime')
const payload={
  date,
  startTime,
  endTime,
}
  console.log('data',payload)
    
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