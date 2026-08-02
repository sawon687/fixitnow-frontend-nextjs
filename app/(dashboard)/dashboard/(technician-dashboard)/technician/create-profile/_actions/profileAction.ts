"use server"

export async function updateProfile(state:any, formData: FormData) {

  const location = formData.get("location") as string
  const yearsOfExperience = Number(formData.get("yearsOfExperience")) || 0
  const bio = formData.get("bio") as string

  const skillsString = formData.get("skills") as string

  const skills = skillsString
    ? skillsString.split(",").map(skill => skill.trim())
    : []

    const payload={
    location,
    yearsOfExperience,
    bio,
    skills
  }

   const res = await fetch(`${process.env.API_URL}/api/technician/profile`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "PUT",
    body: JSON.stringify(payload),
  })
 
const result=await res.json()
  console.log({
    location,
    yearsOfExperience,
    bio,
    skills
  })

  return result
}