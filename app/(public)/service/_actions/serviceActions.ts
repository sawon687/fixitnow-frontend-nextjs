'use server'
import { cookies } from 'next/headers'
import { ISeachParmas } from '../../../../utils/type'
export const getAllService = async (
  params: Partial<ISeachParmas> = {}
) => {

  const {
    price,
    category,
    rating,
    location,
    search,
  } = params;

  console.log("params", params);

  const param = new URLSearchParams();

  if (search) {
    param.set("search", search);
  }

  if (rating) {
    param.set("rating", rating.toString());
  }

  if (category && category !== "All") {
    param.set("category", category);
  }

  if (location && location !== "All") {
    param.set("location", location);
  }

  if (price) {
    param.set("price", price.toString());
  }


  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;


  const res = await fetch(
    `${process.env.API_URL}/api/services?${param.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
      cache: "no-store",
    }
  );


  const result = await res.json();

  console.log("results data", result);

  return result.data;
};