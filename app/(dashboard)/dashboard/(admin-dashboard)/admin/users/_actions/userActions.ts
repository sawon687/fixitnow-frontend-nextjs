
"use server"

import { cookies } from 'next/headers'
import { UserStatus } from '../../../../../../../utils/type'
import { revalidatePath } from 'next/cache'


export const getUserManage=async(params:{search:string,page:string})=>{
                console.log('params action',params)
                const {search,page}=params
                const cookieStore = await cookies()
     const accessToken = cookieStore.get("accessToken")?.value
        const res= await fetch(`${process.env.API_URL}/api/admin/users?search=${search}&page=${page}`, {
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


export const userUpdateStatus=async(id:string,status:UserStatus)=>{

     console.log('status',status)
             
                const cookieStore = await cookies()
     const accessToken = cookieStore.get("accessToken")?.value
        const res= await fetch(`${process.env.API_URL}/api/admin/users/${id}`, {
          headers: {
          'Content-Type': 'application/json',
             Authorization: `Bearer ${accessToken}`,
        },
        method: 'PATCH',
        body:JSON.stringify({status}),
        credentials:"include",
      
      
      })
    
      const result=await res.json()

        if (result.success) {
        revalidatePath("/dashboard/admin/users");
       }
         console.log('users status update',result)
      return result
}