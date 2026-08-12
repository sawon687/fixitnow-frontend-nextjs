'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { TState } from '../../../../utils/type'


export const loginAction = async (prevState:TState,fromdata: FormData) => {
    console.log(prevState)
  const email = fromdata.get('email')
  const password = fromdata.get('password')
  console.log('email',password,'email',email)
  const loginPayload = {
    email,
    password,
  }
  console.log(process.env.API_URL)

  const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(loginPayload),
  })
 
       
   
  const result = await res.json()

       console.log(result,'login')
  if(!result.success)
  {

       return result
  }


 console.log(result)
 console.log(result.data.accessToken,'refrshtoken',result.data.refreshToken)

       const cookieStore=await cookies()
       cookieStore.set('accessToken',result.data.accessToken,{
            httpOnly:true,
            sameSite:"lax",
            maxAge: 60 * 60 * 24 // 24 hour or 1 day
       })
      
       cookieStore.set('refreshToken',result.data.refreshToken,{
              httpOnly:true,
            sameSite:"lax",
            maxAge:60 * 60 * 24 * 7// 24 hour or 7 day
       })
      
        console.log(cookieStore.get("accessToken"));
  console.log(cookieStore.get("refreshToken"));

       redirect('/dashboard')

}