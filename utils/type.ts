import { Dispatch, SetStateAction } from 'react'

export type TState={
    success:boolean,
    message:string,
    status:number,
    data?:{
        acccessToken:string,
        refreshToken:string,
    }
}

export type DashboardNavbarProps = {
  setIsCollapsed?: Dispatch<SetStateAction<boolean>>
  isCollapsed: boolean
  setIsMobileOpen: Dispatch<SetStateAction<boolean>>
  isMobileOpen?:boolean

}

export enum BookingStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  PAID = "PAID",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

// export interface ServiceItem {
//   id: string;
//   technicianId: string;
//   categoryId: string;
//   title: string;
//   description: string;
//   price: number;
//   priceType: 'Fixed' | 'Hourly';
//   isActive: boolean;
//   createdAt: string;

// }

export interface ISeachParmas{
  category:string,
  rating:string,
  location:string,
  price:string
  search:string
}
export interface ICategory {
  id: string;
  name: string;
  description?: string;
}
export enum IRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  TECHNICIAN = "TECHNICIAN",
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role:IRole
  status: "UNBAN" | "BAN";
  createdAt: string;
  updatedAt: string;
}

export interface ITechnicianProfile {
  id: string;
  userId: string;
  bio: string;
  yearsOfExperience: number;
  skills: string[];
  location: string;
  avgRating: number;
  createdAt: string;
  updatedAt: string; 
  
}
export interface IService {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  priceType: string;
  isActive: boolean;
  createdAt: string;

  category: ICategory;
  technician: ITechnicianProfile;
}


export interface IStateRes{
    success:boolean,
    message:string,
    status:number,
    erros?:{
        acccessToken:string,
        refreshToken:string,
    }
}

export enum AvailabilityStatus {
  Available,
   Booked,
   Blocked
}
