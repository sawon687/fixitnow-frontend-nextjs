'use server'
export const imageBBLinkConvert=async(profilePhotoFile:File)=>{
  if (profilePhotoFile && profilePhotoFile.size > 0) {
    const imageFormData = new FormData();

    imageFormData.append("image", profilePhotoFile);

    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.YOUR_CLIENT_API_KEY_IMAGEBB}`;
    console.log("imagebburl", imgbbUrl);

    const imageResponse = await fetch(imgbbUrl, {
      method: "POST",
      body: imageFormData,
    });

    const imageResult = await imageResponse.json();

    if (!imageResult.success) {
      return {
        success: false,
        message: "Profile image upload failed",
        errors: [
          {
            message: "Unable to upload profile image",
          },
        ],
      };
    }

      const  profileImage = imageResult.data.url;

      return profileImage
  }
}