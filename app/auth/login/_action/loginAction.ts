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




       const cookieStore=await cookies()
       const cookieaccess=cookieStore.set('accessToken',result.accessToken,{
            httpOnly:true,
            sameSite:"lax",
            maxAge:1000 * 60 * 60 * 24 // 24 hour or 1 day
       })
       const cookieRefress=cookieStore.set('refreshToken',result.refreshToken,{
              httpOnly:true,
            sameSite:"lax",
            maxAge:1000 * 60 * 60 * 24 * 7// 24 hour or 7 day
       })

       redirect('/dashboard')

}