

import React from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Ban,
  CheckCircle2,
  Mail,
  UserRound,
} from "lucide-react";
import { getUserManage } from './_actions/userActions';
import { IRole, IUser } from '../../../../../../utils/type';
import SearchBar from './_componets/SearchBar';
import { SearchParams } from 'next/dist/server/request/search-params';
import Pagenation from './_componets/Pagenation';
import StatausUpdate from './_componets/StatausUpdate';


const ManageUsersPage = async({searchParams}:{searchParams:Promise<{search:string,page:string}>}) => {
 const params=await searchParams
 console.log('params',params)
 const result=await getUserManage(params)
 


const users=result?.users||[]
const totalUserCount=result?.totalUserCount||0
const pageNumber=result?.pageNumber||0
const limit=result?.limit||0
  const getInitials = (name:string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getRoleStyle = (role:IRole) => {
    switch (role) {
      case "ADMIN":
        return "border-violet-400/20 bg-violet-400/10 text-violet-300";

      case "TECHNICIAN":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";

      default:
        return "border-slate-400/20 bg-slate-400/10 text-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#05070b] px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                  User Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Manage Users
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Manage registered users, monitor account status and control
                access to your platform.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-xl">
              <p className="text-xs text-slate-500">Total users</p>
              <p className="mt-0.5 text-lg font-semibold text-white">
                {totalUserCount}
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0d13]/90 shadow-2xl shadow-black/30 backdrop-blur-xl">
          {/* Top */}
          <div className="flex flex-col gap-5 border-b border-white/[0.07] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-blue-400">
                  <UserRound size={19} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-white">
                    All Users
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {totalUserCount} users found
                  </p>
                </div>
              </div>
            </div>
           {/* search */}
           <SearchBar></SearchBar>
        
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.018]">
                  <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user:IUser) => (
                    <tr
                      key={user.id}
                      className="group border-b border-white/[0.055] transition-all duration-200 hover:bg-white/[0.025]"
                    >
                      {/* User */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-violet-500/20 text-xs font-bold text-blue-300 shadow-inner">
                              {getInitials(user.name)}
                            </div>

                            <span
                              className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0a0d13] ${
                                user.status === "BAN"
                                  ? "bg-red-500"
                                  : "bg-emerald-500"
                              }`}
                            />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-100">
                              {user.name}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <Mail size={12} />
                              <span>{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex  border rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${getRoleStyle(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {user.status === "BAN" ? (
                          <span className="inline-flex items-center gap-2 rounded-full border border-red-400/15 bg-red-400/[0.07] px-2.5 py-1 text-[11px] font-semibold text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_7px_rgba(248,113,113,0.7)]" />
                            Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.7)]" />
                            Active
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-400">
                          {new Date(user.createdAt).toLocaleTimeString("en-Us",{
                            month:"short",
                            day:"2-digit",
                            year:"numeric"
                          })}
                        </span>
                      </td>

                      {/* Action */}
                      <StatausUpdate user={user} />
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                        <Search size={21} className="text-slate-500" />
                      </div>

                      <p className="mt-4 text-sm font-semibold text-slate-300">
                        No users found
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        Try searching with a different name or email.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
{/* pagenation  */}
             <Pagenation users={users} limit={limit} totalUserCount={totalUserCount} totalPage={pageNumber}></Pagenation>
           
          </div>
        </div>
      </div>
   
  );
};

export default ManageUsersPage;