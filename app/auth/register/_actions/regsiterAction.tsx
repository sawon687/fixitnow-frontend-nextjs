"use server";

import { imageBBLinkConvert } from '../../../../utils/imageLinkConvert';
import { TState } from "../../../../utils/type";

export const registerAction = async (stack: TState, formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const role = formData.get("role")?.toString().toUpperCase();
  const password = formData.get("password")?.toString();

  const profilePhotoFile = formData.get("photo") as File | null;

console.log('photo file',profilePhotoFile)
  // =========================
  // Upload Image to ImgBB
  // =========================
  const profileImage = await imageBBLinkConvert(profilePhotoFile as File);

  console.log("photo", profileImage);
  // =========================
  // Register Payload
  // =========================
  const payload = {
    name,
    email,
    role,
    password,
    profilePhoto: profileImage,
  };

  console.log("Register payload:", payload);

  // =========================
  // Register API
  // =========================
  const res = await fetch(`${process.env.API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  console.log("register result:", result);

  if (!result.success) {
    return result;
  }

  return result;
};
