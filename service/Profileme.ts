'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getMe=async()=>{
     const cookieStore= await cookies()
     const accessToken=cookieStore.get('accessToken')?.value
         const res = await fetch(
    `${process.env.API_URL}/api/auth/me`,
    {
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
      
    });

    const  result=await res.json()

    return result.data
}


export const signOUt=async()=>{
  console.log('signOUt sawon')
  const cookieStore=await cookies()

  console.log("Before:", cookieStore.getAll());
       cookieStore.delete('accessToken')
       cookieStore.delete('refreshToken')

  console.log("AFTER:", cookieStore.getAll());
       redirect('/auth/login')
}