import React from "react";
import CategoryClientView from "./_components/CategoryClientView";
import { getAllCategory } from './_actions/categoryActions';

// আপনি চাইলে এখানে ডাটাবেজ বা API থেকে ডাটা ফেচ করতে পারেন (Server-side fetching)
async function getCategories() {
  // উদাহরণস্বরূপ ইনিশিয়াল ডাটা দেওয়া হলো
  return [
    {
      id: "1",
      name: "Plumbing",
      description: "Water pipes, leakage, drainage and plumbing repair services.",
      services: 12,
      status: "ACTIVE",
      createdAt: "Aug 12, 2026",
    },
    {
      id: "2",
      name: "Electrical",
      description: "Electrical installation, repair and maintenance services.",
      services: 8,
      status: "ACTIVE",
      createdAt: "Aug 10, 2026",
    },
    {
      id: "3",
      name: "Cleaning",
      description: "Home, office and deep cleaning services.",
      services: 15,
      status: "ACTIVE",
      createdAt: "Aug 08, 2026",
    },
    {
      id: "4",
      name: "AC & Cooling",
      description: "Air conditioner installation, servicing and repair.",
      services: 7,
      status: "ACTIVE",
      createdAt: "Aug 05, 2026",
    },
    {
      id: "5",
      name: "Painting",
      description: "Interior and exterior home painting services.",
      services: 5,
      status: "INACTIVE",
      createdAt: "Aug 02, 2026",
    },
    {
      id: "6",
      name: "Appliance Repair",
      description: "Repair and maintenance for household appliances.",
      services: 9,
      status: "ACTIVE",
      createdAt: "Jul 28, 2026",
    },
  ];
}

const CategoryManagementpage = async ({searchParams}:{searchParams: Promise<{search:string}>}) => {
  const  params=await searchParams
 
  const result = await getAllCategory(params);

 
  return <>
  
  <CategoryClientView result={result} />
  

  </>
};

export default CategoryManagementpage;