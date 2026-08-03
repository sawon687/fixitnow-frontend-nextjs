
"use server"

import { cookies } from 'next/headers'

export const getCategre=async()=>{
   const cookieStore = await cookies()
   const accessToken = cookieStore.get("accessToken")?.value
      const res= await fetch(`${process.env.API_URL}/api/categories`, {
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


export const createService=async(state:any,fromdata:FormData)=>{
        
     const categoryId=fromdata.get('categoryId')
  const title=fromdata.get('title')
  const description=fromdata.get('description')
  const price=fromdata.get('price')
  const priceType=fromdata.get('priceType')
const payload={
    categoryId,
    title,
    description,
   price: Number(price),
    priceType
}
 const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
    const res= await fetch(`${process.env.API_URL}/api/services`, {
      headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    credentials:"include",
    body: JSON.stringify(payload)
  
  })
  

  const result=await res.json()
  console.log(result)
  console.log(payload)

return result
}