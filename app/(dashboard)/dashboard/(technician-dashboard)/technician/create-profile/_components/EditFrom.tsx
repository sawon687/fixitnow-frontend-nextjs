"use client"

import { Camera, Loader2, Plus, X } from 'lucide-react'
import React, { useState, useActionState } from 'react'
import { updateProfile } from '../_actions/profileAction';


const EditFrom = ({ profile, onCancel }: { profile?: any; onCancel?: () => void }) => {
  const [newSkill, setNewSkill] = useState("")
  const [skills, setSkills] = useState<string[]>(profile?.skills || [])
  const [photo, setPhoto] = useState(profile?.photo || "")
const [experience, setExperience] = useState(profile?.yearsOfExperience || 0)
  const initialState = {
    success: false,
    message: ""
  }

  const [state, formAction, isPending] = useActionState(updateProfile,initialState)
   
  

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove))
  }

  return (
    <form action={formAction} className="space-y-6">
      
      {/* Success / Error Message */}
      {state?.message && (
        <div className={`p-3 rounded-lg text-xs font-medium border ${
          state.success 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {state.message}
        </div>
      )}

      {/* Avatar Section */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-5 shadow-sm">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 flex items-center justify-center text-zinc-500">
            {photo ? (
              <img src={photo} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-6 h-6" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 cursor-pointer transition-colors shadow-sm">
            <Camera className="w-3.5 h-3.5" />
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setPhoto(URL.createObjectURL(file))
                }
              }}
            />
          </label>
        </div>
        <div>
          <h2 className="text-sm font-medium text-white">Profile Picture</h2>
          <p className="text-xs text-zinc-400">Upload a professional photo of yourself.</p>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
    
        

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300">Location</label>
          <input 
            type="text" 
            name="location"
            defaultValue={profile?.location || ""}
            placeholder="e.g. Kushtia"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-600"
          />
        </div>

       {/* Years of Experience */}
<div className="space-y-1.5 sm:col-span-2">
  <div className="flex justify-between items-center">
    <label className="text-xs font-medium text-zinc-300">Years of Experience</label>
    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
      {experience} Years
    </span>
  </div>
  <input 
    type="range" 
    name="yearsOfExperience"
    min="0"
    max="30"
    value={experience}
    onChange={(e) => setExperience(Number(e.target.value))}
    className="w-full accent-emerald-500 bg-zinc-900 cursor-pointer rounded-lg h-2"
  />
</div>

        {/* Bio */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-zinc-300">Bio</label>
          <textarea 
            name="bio"
            rows={3}
            defaultValue={profile?.bio || ""}
            placeholder="Tell something about your experience..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-100 shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-600 resize-none"
          />
        </div>

        {/* Skills Section */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-medium text-zinc-300">Skills</label>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill: string, index: number) => (
              <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs shadow-sm">
                {skill}
                <input type="hidden" name="skills" value={skills} />
                <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <input 
              type="text" 
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-100 shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-600"
            />
            <button 
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-800">
        {profile && onCancel && (
          <button 
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs transition-colors shadow-sm"
          >
            Cancel
          </button>
        )}
        <button 
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-sm"
        >
          {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {isPending ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  )
}

export default EditFrom