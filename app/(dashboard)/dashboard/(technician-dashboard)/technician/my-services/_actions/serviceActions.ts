"use server"

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'




export const createService=async(state:any,fromdata:FormData)=>{
        
    const categoryId=fromdata.get('categoryId')?.toString() ?? ''
    const title=fromdata.get('title')?.toString() ?? ''
    const description=fromdata.get('description')?.toString() ?? ''
  const price=fromdata.get('price')
  const priceType=fromdata.get('priceType')?.toString() ?? ''
  const mode=fromdata.get('mode')
  const serviceId=fromdata.get('serviceId')

const payload:{categoryId:string,title:string,description:string,
  price:number,priceType:string}={
    categoryId,
    title,
    description,
   price: Number(price),
    priceType
}



const apiUrl=mode==='create'?'/api/services':`/api/update-service/${serviceId}`
console.log('payload',payload)
 const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
    const res= await fetch(`${process.env.API_URL}${apiUrl}`, {
      headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method:mode=='create'? 'POST':'PATCH',
    credentials:"include",
    body: JSON.stringify(payload)
  
  })
  

  const result=await res.json()
  console.log(result)
  console.log(payload)

  if(result.success)
  {
     revalidatePath('/dashboard/technician/my-services')
  }

return result
}


export const getMyservice =async()=>{
 const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
    const res= await fetch(`${process.env.API_URL}/api/technician/my-service`, {
      headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
    credentials:"include",
  
  
  })

  const result=await res.json()
  return result
 
}