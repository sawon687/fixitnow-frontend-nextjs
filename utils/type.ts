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