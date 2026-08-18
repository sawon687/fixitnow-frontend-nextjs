'use client'
import { Ban, CheckCircle2, User } from 'lucide-react'
import React from 'react'
import { IUser, UserStatus } from '../../../../../../../utils/type'
import { userUpdateStatus } from '../_actions/userActions'
import { toast } from 'sonner'


interface StatausUpdateProps {
  user: IUser
}

const StatausUpdate = ({ user }: StatausUpdateProps) => {

    const handleUpdateStatus = async(id:string,Userstatus:UserStatus) => {
            const status: UserStatus = Userstatus === UserStatus.BAN ? UserStatus.UNBAN : UserStatus.BAN

            const res = await userUpdateStatus(id,status)
            
            if(res.success)
            {
                 toast.success(res.message)
            }
    }

  return (
    <>
     <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleUpdateStatus(user.id,user?.status)}
                              className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3.5 text-xs font-semibold transition-all duration-200 ${
                                user.status === UserStatus.BAN
                                  ? "border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-400 hover:border-emerald-400/30 hover:bg-emerald-400/[0.13]"
                                  : "border-red-400/15 bg-red-400/[0.07] text-red-400 hover:border-red-400/30 hover:bg-red-400/[0.13]"
                              }`}
                            >
                              {user.status === UserStatus.BAN ? (
                                <>
                                  <CheckCircle2 size={14} />
                                  Unban
                                </>
                              ) : (
                                <>
                                  <Ban size={14} />
                                  Ban
                                </>
                              )}
                            </button>
                          </td>
     
    </>
  )
}

export default StatausUpdate