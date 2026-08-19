'use client'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../../../../../components/ui/dropdown-menu'
import { Button } from '../../../../../../../components/ui/button'
import { CircleCheck, CircleOff, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import ModalFrom from './ModalFrom'
import { Category, CategoryStatus } from '../../../../../../../utils/type'
import { updateCategoryStatus } from '../_actions/categoryActions'
import { toast } from 'sonner'

interface ActionButtonProps {
  category: any;
  onEdit: (category: any) => void;

}

const Actionbutton = ({ category, onEdit }: ActionButtonProps) => {
  const onUpdateStatus=async(category:Category)=>{
       const  status=category.status===CategoryStatus.ACTIVE?
       CategoryStatus.INACTIVE:CategoryStatus.ACTIVE
    const result=await updateCategoryStatus(status,category.id)

    if(result.success)
    {
       toast.success(result.message)
    }else{
       toast.error('Somthing worng')
    }
       
  }
  return (
    <div>         
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44 border-white/10 bg-[#11161F] text-white"
        >
          <DropdownMenuItem
            onClick={() => onEdit(category)}
            className="cursor-pointer focus:bg-white/10 focus:text-white"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Category
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>onUpdateStatus(category)}
            className="cursor-pointer focus:bg-white/10 focus:text-white"
          >{category.status === CategoryStatus.ACTIVE ? (<>
           <CircleOff className="h-4 w-4" />
             <span>Disable Category</span></>
                  ) : (<>
  <CircleCheck className="h-4 w-4" /><span>Enable Category</span></>
)}
        
          </DropdownMenuItem>

        
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Actionbutton