'use server'

import { redirect } from 'next/navigation'
import { TState } from '../../../../utils/type'

export const registerAction=async(stack:TState,formData:FormData)=>{

    const name=formData.get('name')
    const email=formData.get('email')
    const role=formData.get('role')?.toString().toUpperCase()
    const password=formData.get('password')

    const payload={
        name,
        email,
        role,
        password
    }
    console.log(payload)

   const res = await fetch(`${process.env.API_URL}/api/auth/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const result= await res.json()
  console.log('result',result)
  
  if(!result.success){
    return result
  }

  redirect('/dashboard')

}