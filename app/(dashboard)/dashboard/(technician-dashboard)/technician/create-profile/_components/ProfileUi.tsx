"use client";

import { useEffect, useState } from "react";
import {
  UserPlus,
  Shield,
  Mail,
  MapPin,
  Edit3,
  CheckCircle2,
  Plus,
  Loader2,
} from "lucide-react";

import { getmeProfile } from "../_actions/profileAction";
import EditForm from "./EditFrom";

export default function ProfileUi() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const successMessage = "Profile updated successfully!";

  console.log(profile, "profile");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const result = await getmeProfile();

        // API response থেকে data নেওয়া
        setProfile(result.data);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
      </div>
    );
  }


  const technicianProfile = profile?.technicianProfile;


  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">

        <div>
          <h1 className="text-lg font-semibold text-white">
            My Profile
          </h1>

          <p className="text-xs text-zinc-400">
            Manage your professional information.
          </p>
        </div>


        {profile?.message && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            <CheckCircle2 className="w-4 h-4" />
            {successMessage}
          </div>
        )}


        {profile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        )}

      </div>



      {/* Empty State */}
      {!profile && !isEditing ? (

        <div className="p-12 rounded-xl bg-zinc-900 border border-zinc-800 text-center space-y-4">

          <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-400">
            <UserPlus className="w-5 h-5" />
          </div>


          <div>
            <h2 className="text-sm font-medium text-white">
              No Profile Found
            </h2>

            <p className="text-xs text-zinc-400">
              You haven't created your technician profile yet.
            </p>
          </div>


          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Create Profile
          </button>

        </div>


      ) : isEditing ? (

        <EditForm
          profile={profile}
          onCancel={() => setIsEditing(false)}
        />


      ) : (


        <div className="space-y-6">


          {/* Profile Header */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row gap-6">


            <div className="w-24 h-24 rounded-full overflow-hidden border border-zinc-700">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>



            <div className="space-y-2 flex-1">


              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs">
                <Shield className="w-3 h-3 text-emerald-400" />

                {profile?.role}
              </div>



              <h2 className="text-base font-semibold text-white">
                {profile?.name}
              </h2>



              <p className="text-xs text-zinc-400 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />

                {profile?.email}
              </p>



              <p className="text-xs text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />

                {technicianProfile?.location}

                {" • "}

                {technicianProfile?.yearsOfExperience} Years Experience

              </p>


            </div>

          </div>




          {/* Bio + Skills */}

          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">


            <div>

              <h3 className="text-xs font-medium text-zinc-400 uppercase mb-1">
                Bio
              </h3>

              <p className="text-xs text-zinc-200">
                {technicianProfile?.bio}
              </p>

            </div>




            <div>

              <h3 className="text-xs font-medium text-zinc-400 uppercase mb-2">
                Skills
              </h3>



              <div className="flex flex-wrap gap-1.5">

                {technicianProfile?.skills?.map(
                  (skill:string,index:number)=>(
                    <span
                      key={index}
                      className="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs"
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            </div>


          </div>


        </div>

      )}

    </div>
  );
}