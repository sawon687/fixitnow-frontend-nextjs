"use client";

import { Camera, Loader2, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useActionState } from "react";
import { updateProfile } from "../_actions/profileAction";

const initialState = {
  success: false,
  message: "",
};

const EditForm = ({
  profile,
  onCancel,
}: {
  profile?: any;
  onCancel?: () => void;
}) => {
  const [newSkill, setNewSkill] = useState("");

  const [skills, setSkills] = useState<string[]>(
    profile?.skills || []
  );

  const [photo, setPhoto] = useState(profile?.photo || "");

  const [experience, setExperience] = useState<number>(
    profile?.yearsOfExperience || 0
  );

  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState
  );

  const isEditMode = Boolean(profile?.id);

  // =========================
  // Add Skill
  // =========================
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();

    const skill = newSkill.trim();

    if (!skill) return;

    if (!skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
    }

    setNewSkill("");
  };

  // =========================
  // Remove Skill
  // =========================
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((prev) =>
      prev.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <form action={formAction} className="space-y-6">

      {/* =========================
          SUCCESS / ERROR
      ========================== */}
      {state?.message && (
        <div
          className={`
            rounded-xl
            border
            px-4
            py-3
            text-xs
            font-medium
            ${
              state.success
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/20 bg-red-500/10 text-red-400"
            }
          `}
        >
          {state.message}
        </div>
      )}

      {/* =========================
          PROFILE ID
          Only for UPDATE
      ========================== */}
      {isEditMode && (
        <input
          type="hidden"
          name="technicianId"
          value={profile.id}
        />
      )}

      {/* =========================
          MODE
      ========================== */}
      <input
        type="hidden"
        name="mode"
        value={isEditMode ? "update" : "create"}
      />

      {/* =========================
          PROFILE PICTURE
      ========================== */}
      <div
        className="
          flex
          items-center
          gap-5
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-5
        "
      >
        <div className="relative shrink-0">

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-zinc-700
              bg-zinc-800
              text-zinc-500
            "
          >
            {photo ? (
              <img
                src={photo}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera className="h-6 w-6" />
            )}
          </div>

          <label
            className="
              absolute
              -bottom-1
              -right-1
              flex
              h-8
              w-8
              cursor-pointer
              items-center
              justify-center
              rounded-lg
              border-2
              border-zinc-900
              bg-emerald-600
              text-white
              transition
              hover:bg-emerald-500
            "
          >
            <Camera className="h-3.5 w-3.5" />

            <input
              type="file"
              name="photo"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setPhoto(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">
            Profile Picture
          </h2>

          <p className="mt-1 text-xs leading-5 text-zinc-500">
            Upload a professional photo of yourself.
          </p>
        </div>
      </div>

      {/* =========================
          FORM FIELDS
      ========================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Location */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300">
            Location
          </label>

          <input
            type="text"
            name="location"
            defaultValue={profile?.location || ""}
            placeholder="e.g. Kushtia"
            className="
              h-10
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-3
              text-xs
              text-zinc-100
              placeholder:text-zinc-600
              outline-none
              transition
              focus:border-emerald-500/40
            "
          />
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-300">
              Years of Experience
            </label>

            <span
              className="
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-2
                py-0.5
                text-[10px]
                font-semibold
                text-emerald-400
              "
            >
              {experience} Years
            </span>
          </div>

          <input
            type="range"
            name="yearsOfExperience"
            min="0"
            max="30"
            value={experience}
            onChange={(e) =>
              setExperience(Number(e.target.value))
            }
            className="
              h-2
              w-full
              cursor-pointer
              accent-emerald-500
            "
          />
        </div>

        {/* Bio */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-semibold text-zinc-300">
            Professional Bio
          </label>

          <textarea
            name="bio"
            rows={4}
            defaultValue={profile?.bio || ""}
            placeholder="Tell something about your experience..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              p-3
              text-xs
              leading-5
              text-zinc-100
              placeholder:text-zinc-600
              outline-none
              transition
              focus:border-emerald-500/40
            "
          />
        </div>

        {/* =========================
            SKILLS
        ========================== */}
        <div className="space-y-3 sm:col-span-2">

          <div>
            <label className="text-xs font-semibold text-zinc-300">
              Skills
            </label>

            <p className="mt-1 text-[11px] text-zinc-600">
              Add the skills you provide to customers.
            </p>
          </div>

          {/* Existing Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={`${skill}-${index}`}>

                  {/* IMPORTANT:
                      Send each skill separately
                  */}
                  <input
                    type="hidden"
                    name="skills"
                    value={skill}
                  />

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-lg
                      border
                      border-zinc-700
                      bg-zinc-800
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-zinc-300
                    "
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveSkill(skill)
                      }
                      className="
                        text-zinc-500
                        transition
                        hover:text-red-400
                      "
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Add Skill */}
          <div className="flex gap-2">

            <input
              type="text"
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) =>
                setNewSkill(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddSkill(e);
                }
              }}
              className="
                h-10
                flex-1
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900
                px-3
                text-xs
                text-zinc-100
                placeholder:text-zinc-600
                outline-none
                transition
                focus:border-emerald-500/40
              "
            />

            <button
              type="button"
              onClick={handleAddSkill}
              className="
                flex
                h-10
                items-center
                gap-1.5
                rounded-xl
                border
                border-zinc-700
                bg-zinc-800
                px-4
                text-xs
                font-semibold
                text-zinc-200
                transition
                hover:bg-zinc-700
              "
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          ACTIONS
      ========================== */}
      <div
        className="
          flex
          justify-end
          gap-2.5
          border-t
          border-zinc-800
          pt-5
        "
      >
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="
              h-10
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-4
              text-xs
              font-medium
              text-zinc-400
              transition
              hover:bg-zinc-800
              hover:text-zinc-200
            "
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="
            flex
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
            transition
            hover:bg-emerald-500
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isPending && (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          )}

          {isPending
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Profile"
              : "Create Profile"}
        </button>
      </div>
    </form>
  );
};

export default EditForm;