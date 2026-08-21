"use client";

import { useState } from "react";
import {
  UserPlus,
  ShieldCheck,
  Mail,
  MapPin,
  Edit3,
  CheckCircle2,
  Plus,
  BriefcaseBusiness,
  Sparkles,
  Award,
  Clock3,
} from "lucide-react";

import EditForm from "./EditFrom";

type ProfileUiProps = {
  profileData: any;
};

export default function ProfileUi({
  profileData,
}: ProfileUiProps) {
  const [isEditing, setIsEditing] = useState(false);

  const profile = profileData?.data;
  const technicianProfile = profile?.technicianProfile;
console.log(technicianProfile)
  const hasProfile = Boolean(technicianProfile);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-12">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 border-b border-zinc-800/80 pb-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-2.5">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
              <BriefcaseBusiness className="h-4 w-4 text-emerald-400" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                Professional Profile
              </h1>

              <p className="mt-0.5 text-xs text-zinc-500">
                Manage your professional information and expertise.
              </p>
            </div>

          </div>
        </div>

        {/* Edit button only when profile exists */}
        {hasProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="
              inline-flex
              h-9
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900
              px-4
              text-xs
              font-semibold
              text-zinc-200
              transition-all
              hover:border-zinc-600
              hover:bg-zinc-800
            "
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit Profile
          </button>
        )}

      </div>


      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}
      {profileData?.message && !isEditing && (
        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-emerald-500/20
            bg-emerald-500/[0.06]
            px-4
            py-3
          "
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>

          <div>
            <p className="text-xs font-semibold text-emerald-400">
              {profileData.message}
            </p>

            <p className="mt-0.5 text-[11px] text-zinc-500">
              Your profile information has been updated successfully.
            </p>
          </div>
        </div>
      )}


      {/* =====================================================
          CREATE / UPDATE FORM
      ====================================================== */}
      {isEditing ? (
        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950/50
            p-5
            sm:p-6
          "
        >
          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              {hasProfile ? (
                <Edit3 className="h-4 w-4 text-emerald-400" />
              ) : (
                <Plus className="h-4 w-4 text-emerald-400" />
              )}
            </div>

            <div>
              <h2 className="text-sm font-bold text-white">
                {hasProfile
                  ? "Update Professional Profile"
                  : "Create Professional Profile"}
              </h2>

              <p className="mt-0.5 text-[11px] text-zinc-500">
                {hasProfile
                  ? "Update your professional information."
                  : "Add your professional information to get started."}
              </p>
            </div>

          </div>

          <EditForm
            profile={technicianProfile}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : !hasProfile ? (

        /* =====================================================
            EMPTY / CREATE STATE
        ====================================================== */
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900/70
          "
        >

          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative px-6 py-16 text-center sm:py-20">

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-zinc-700
                bg-zinc-800
                shadow-xl
              "
            >
              <UserPlus className="h-7 w-7 text-emerald-400" />
            </div>

            <h2 className="mt-5 text-base font-bold text-white">
              Create Your Professional Profile
            </h2>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-zinc-500">
              Add your skills, experience, location and professional
              information so customers can learn more about your services.
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="
                mt-6
                inline-flex
                h-10
                items-center
                gap-2
                rounded-xl
                bg-emerald-600
                px-5
                text-xs
                font-semibold
                text-white
                shadow-lg
                shadow-emerald-600/10
                transition-all
                hover:bg-emerald-500
              "
            >
              <Plus className="h-4 w-4" />
              Create Profile
            </button>

          </div>
        </div>

      ) : (

        /* =====================================================
            PROFILE VIEW
        ====================================================== */
        <div className="space-y-5">

          {/* =================================================
              PROFILE HERO
          ================================================== */}
          <section
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
            "
          >

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative p-6 sm:p-7">

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                {/* Avatar */}
                <div className="relative shrink-0">

                  <div
                    className="
                      h-24
                      w-24
                      overflow-hidden
                      rounded-2xl
                      border
                      border-zinc-700
                      bg-zinc-800
                      shadow-xl
                    "
                  >
                    <img
                      src={
                        profile?.photo ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                      }
                      alt={profile?.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Status */}
                  <div
                    className="
                      absolute
                      -bottom-1
                      -right-1
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      border-4
                      border-zinc-900
                      bg-emerald-500
                    "
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-zinc-950" />
                  </div>

                </div>


                {/* User info */}
                <div className="min-w-0 flex-1">

                  <div className="mb-2 flex flex-wrap items-center gap-2">

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-emerald-500/20
                        bg-emerald-500/10
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-emerald-400
                      "
                    >
                      <ShieldCheck className="h-3 w-3" />
                      {profile?.role || "TECHNICIAN"}
                    </span>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        border
                        border-zinc-700
                        bg-zinc-800/70
                        px-2.5
                        py-1
                        text-[10px]
                        font-medium
                        text-zinc-400
                      "
                    >
                      <Sparkles className="h-3 w-3" />
                      Professional
                    </span>

                  </div>

                  <h2 className="truncate text-xl font-bold tracking-tight text-white">
                    {profile?.name || "Technician"}
                  </h2>

                  <div className="mt-3 flex flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:flex-wrap sm:gap-x-5">

                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-zinc-600" />
                      {profile?.email || "Email not available"}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-600" />
                      {technicianProfile?.location || "Location not added"}
                    </span>

                  </div>

                </div>

              </div>


              {/* Stats */}
              <div
                className="
                  mt-7
                  grid
                  grid-cols-2
                  gap-3
                  border-t
                  border-zinc-800
                  pt-5
                  sm:grid-cols-3
                "
              >

                <ProfileStat
                  icon={<Award className="h-4 w-4" />}
                  label="Experience"
                  value={`${technicianProfile?.yearsOfExperience || 0} Years`}
                />

                <ProfileStat
                  icon={<Sparkles className="h-4 w-4" />}
                  label="Skills"
                  value={`${technicianProfile?.skills?.length || 0}`}
                />

                <ProfileStat
                  icon={<Clock3 className="h-4 w-4" />}
                  label="Status"
                  value="Available"
                />

              </div>

            </div>
          </section>


          {/* =================================================
              BIO
          ================================================== */}
          <section
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
            "
          >

            <div className="mb-4">

              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">
                About
              </p>

              <h3 className="mt-1 text-sm font-bold text-white">
                Professional Bio
              </h3>

            </div>

            <p className="max-w-3xl text-sm leading-6 text-zinc-400">
              {technicianProfile?.bio ||
                "No professional bio has been added yet."}
            </p>

          </section>


          {/* =================================================
              SKILLS
          ================================================== */}
          <section
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
            "
          >

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">
                  Expertise
                </p>

                <h3 className="mt-1 text-sm font-bold text-white">
                  Skills & Expertise
                </h3>

              </div>

              <span
                className="
                  rounded-full
                  border
                  border-zinc-800
                  bg-zinc-800
                  px-2.5
                  py-1
                  text-[10px]
                  font-medium
                  text-zinc-500
                "
              >
                {technicianProfile?.skills?.length || 0} Skills
              </span>

            </div>


            {technicianProfile?.skills?.length > 0 ? (

              <div className="flex flex-wrap gap-2">

                {technicianProfile.skills.map(
                  (skill: string, index: number) => (
                    <span
                      key={`${skill}-${index}`}
                      className="
                        rounded-lg
                        border
                        border-zinc-700
                        bg-zinc-800/70
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-zinc-300
                        transition-all
                        hover:border-emerald-500/30
                        hover:bg-emerald-500/5
                        hover:text-emerald-400
                      "
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            ) : (

              <div className="rounded-xl border border-dashed border-zinc-800 py-8 text-center">
                <Sparkles className="mx-auto h-5 w-5 text-zinc-700" />

                <p className="mt-2 text-xs text-zinc-600">
                  No skills have been added yet.
                </p>
              </div>

            )}

          </section>

        </div>
      )}
    </div>
  );
}


/* =========================================================
   STAT COMPONENT
========================================================= */

function ProfileStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3">

      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-zinc-800
          bg-zinc-800
          text-emerald-400
        "
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-600">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-semibold text-zinc-300">
          {value}
        </p>

      </div>

    </div>
  );
}