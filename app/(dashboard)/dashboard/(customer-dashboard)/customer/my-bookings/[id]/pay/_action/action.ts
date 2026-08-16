"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export async function createPaymentAction(bookingId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.API_URL}/api/payments/create`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ bookingId }),
  });

  const result = await res.json();

 const paymentUrl=result?.data?.paymentUrl
 
  console.log("singlebookigns", result);
  
    if (!paymentUrl) {
            
        return
    
    }

 redirect(paymentUrl);

 



}
