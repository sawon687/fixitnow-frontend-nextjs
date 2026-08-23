"use server";

import { cookies } from "next/headers";
import { imageBBLinkConvert } from "../../../../../../../utils/imageLinkConvert";
import { revalidatePath } from 'next/cache';

export async function updateProfile(
  state: any,
  formData: FormData
) {
  try {
    const location =
      formData.get("location") as string;

    const yearsOfExperience =
      Number(formData.get("yearsOfExperience")) || 0;

    const bio =
      formData.get("bio") as string;

    const skills = formData
      .getAll("skills")
      .map((skill) => String(skill).trim())
      .filter(Boolean);

    const mode =
      formData.get("mode") as string;

    

    const profilePhotoFile =
      formData.get("photo");

    console.log(
      "PROFILE PHOTO FILE:",
      profilePhotoFile
    );

    // =========================
    // Base Payload
    // =========================

    const payload: {
    
      location: string;
      yearsOfExperience: number;
      bio: string;
      skills: string[];
      profilePhoto?: string;
    } = {
  
      location,
      yearsOfExperience,
      bio,
      skills,
    };

  

    if (
      profilePhotoFile instanceof File &&
      profilePhotoFile.size > 0
    ) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (
        !allowedTypes.includes(
          profilePhotoFile.type
        )
      ) {
        return {
          success: false,
          message:
            "Only JPG, PNG and WEBP images are allowed",
        };
      }

      if (
        profilePhotoFile.size >
        5 * 1024 * 1024
      ) {
        return {
          success: false,
          message:
            "Image size must be less than 5MB",
        };
      }


      const uploadedImage =
        await imageBBLinkConvert(
          profilePhotoFile
        );

   

      if (!uploadedImage) {
        return {
          success: false,
          message:
            "Profile image upload failed",
        };
      }

  
      payload.profilePhoto =
        uploadedImage;

    
    }
   console.log('profile',payload)

 
    // =========================
    // Access Token
    // =========================

    const cookieStore =
      await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    // =========================
    // API URL
    // =========================

    const newURL =
      mode === "create"
        ? "/api/technician/profile"
        : "/api/technician/profile-update";

    // =========================
    // API Request
    // =========================

    const res = await fetch(
      `${process.env.API_URL}${newURL}`,
      {
        method:
          mode === "create"
            ? "POST"
            : "PATCH",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${accessToken}`,
        },

        body: JSON.stringify(payload),
      }
    );

    const result =
      await res.json();

  
     if(result.success){
          revalidatePath(`/dashboard/technician/my-profile`)
       }
    return result;

  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return {
      success: false,
      message:
        "Profile update failed",
    };
  }
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