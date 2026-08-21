"use server"

import { cookies } from "next/headers"

export async function updateProfile(state:any, formData: FormData) {

  const location = formData.get("location") as string
  const yearsOfExperience = Number(formData.get("yearsOfExperience")) || 0
  const bio = formData.get("bio") as string

  const skillsString = formData.get("skills") as string
  const mode=formData.get('mode') as string

  const skills = skillsString
    ? skillsString.split(",").map(skill => skill.trim())
    : []

    const payload={
    location,
    yearsOfExperience,
    bio,
    skills
  }
 
 const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
 const newURL=mode==='create'?'/api/technician/profile':'/api/technician/profile-update'
   const res = await fetch(`${process.env.API_URL}${newURL}`, {
    headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method:mode==='create'? "POST":'PATCH',
    credentials:"include",
    body: JSON.stringify(payload),
  })
 
const result=await res.json()
  console.log({
    location,
    yearsOfExperience,
    bio,
    skills
  })
console.log('result',result)
  return result
}


export const getmeProfile=async()=>{

 const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")?.value
    const res= await fetch(`${process.env.API_URL}/api/auth/me`, {
      headers: {
      'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  
  })

       const result=  await res.json()
       
  return result
 
}