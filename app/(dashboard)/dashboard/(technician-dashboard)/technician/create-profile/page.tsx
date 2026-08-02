"use client"

import { useState, useEffect, useTransition } from "react"
import { Loader2, UserPlus, Shield, Mail, MapPin, Wrench, Edit3, CheckCircle2, Plus, X, Camera } from "lucide-react"
import EditFrom from './_components/EditFrom'

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null) // null mane data nai
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [successMessage, setSuccessMessage] = useState("")

   
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-lg font-semibold text-white">My Profile</h1>
          <p className="text-xs text-zinc-400">Manage your professional information.</p>
        </div>

        {successMessage && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            <CheckCircle2 className="w-4 h-4" />
            {successMessage}
          </div>
        )}

        {/* Action Button based on profile availability */}
        {profile && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        )}
      </div>

      {/* 2. EMPTY STATE (Jodi data na thake) */}
      {!profile && !isEditing ? (
        <div className="p-12 rounded-xl bg-zinc-900 border border-zinc-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-400">
            <UserPlus className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-white">No Profile Found</h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              You haven't set up your professional profile yet. Create one now to start taking orders or listing services.
            </p>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Profile
          </button>
        </div>
      ) : isEditing || !profile ? (
        
        /* 3. EDIT / CREATE FORM */
             <EditFrom profile={profile} />
      ) : (

        /* 4. VIEW PROFILE MODE (Jodi data thake) */
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 flex-shrink-0">
              <img src={profile.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"} alt="Profile" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-medium">
                <Shield className="w-3 h-3 text-emerald-400" />
                {profile.role}
              </div>
              <h2 className="text-base font-semibold text-white">{profile.name}</h2>
              <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
                <Mail className="w-3.5 h-3.5 text-zinc-500" /> {profile.email}
              </p>
              <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" /> {profile.location} • {profile.yearsOfExperience} Years Experience
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div>
              <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">Bio</h3>
              <p className="text-xs text-zinc-200 leading-relaxed">{profile.bio}</p>
            </div>

            <div>
              <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill: string, index: number) => (
                  <span key={index} className="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}