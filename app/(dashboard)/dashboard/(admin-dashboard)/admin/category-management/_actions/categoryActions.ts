'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { CategoryStatus } from '../../../../../../../utils/type'

export const getAllCategory=async(params:{search:string})=>{
    const search=params?.search
          const cookieStore = await cookies()
         const accessToken = cookieStore.get("accessToken")?.value
            const res= await fetch(`${process.env.API_URL}/api/admin/categories?search=${search}`, {
              headers: {
              'Content-Type': 'application/json',
                 Authorization: `Bearer ${accessToken}`,
            },
            method: 'GET',
            credentials:"include",
          
          
          })
        
          const result=await res.json()
             console.log('users',result)
          return result.data
}




export const categirePost=async(state:any,fromdata:FormData)=>{
     
    const name=fromdata.get('name')
    const description=fromdata.get('description')
    const categoryId=fromdata.get('id')
    const payload={
        name,
        description,
        
    }
    console.log(payload)
 const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
    const apiUrl=categoryId?`/api/admin/categories/${categoryId}`:`/api/admin/categories`
   const res = await fetch(`${process.env.API_URL}${apiUrl}`, {
    headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method:categoryId?"PATCH": "POST",
    credentials:"include",
    body: JSON.stringify(payload),
  })

  const result=await res.json()
 console.log(result,'result')
if(result.success)
{
     revalidatePath(`/dashboard/admin/category-management`)
}
  return result


}

export const updateCategoryStatus=async(status:CategoryStatus,id:string)=>{
         const cookieStore = await cookies()
         const accessToken = cookieStore.get("accessToken")?.value
            const res= await fetch(`${process.env.API_URL}/api/admin/categories/${id}`, {
              headers: {
              'Content-Type': 'application/json',
                 Authorization: `Bearer ${accessToken}`,
            },
            method: 'PATCH',
            credentials:"include",
            body:JSON.stringify({status})
          
          
          })
        
          const result=await res.json()
           if(result.success)
             {
             revalidatePath(`/dashboard/admin/category-management`)
          }
          return result
}

