'use server'

import { cookies } from 'next/headers'

export const categirePost=async(state:any,fromdata:FormData)=>{
     
    const name=fromdata.get('name')
    const description=fromdata.get('description')
    const payload={
        name,
        description
    }
    console.log(payload)
 const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
   const res = await fetch(`${process.env.API_URL}/api/admin/categories`, {
    headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    credentials:"include",
    body: JSON.stringify(payload),
  })

  const result=await res.json()
 console.log(result,'result')

  return result


}