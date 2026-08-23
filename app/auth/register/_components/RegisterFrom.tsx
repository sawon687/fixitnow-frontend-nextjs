"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle2,
  Upload,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "../_actions/regsiterAction";
import { toast } from "sonner";

const RegisterFrom = () => {
  const [openRole, setRole] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [stack, action, pending] = useActionState(registerAction, "");

  console.log(stack, "stack");

  useEffect(() => {
    if (!stack) return;

    if (stack.success) {
      toast.success(stack.message);
    }

    if (!stack.success || stack.errors?.length) {
      toast.error(stack.errors?.[0]?.message);
    }
  }, [stack]);

  const roles = [
    {
      id: "technician",
      label: "Technician / Maker",
      desc: "Build, test & deploy systems",
    },
    {
      id: "customer",
      label: "Customer / Client",
      desc: "Commission custom projects",
    },
  ];

  // Image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      e.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  const removeImage = () => {
    setPreview(null);

    const input = document.getElementById("photo") as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  return (
    <form action={action} className="space-y-4">
      {/* Dual Column Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="name"
            className="text-[11px] uppercase tracking-wider font-semibold text-slate-400"
          >
            Full Name
          </Label>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <User className="w-3.5 h-3.5" />
            </span>

            <Input
              id="name"
              name="name"
              required
              placeholder="Alex Mercer"
              className="pl-9 bg-slate-950/60 border-slate-800 focus-visible:ring-emerald-500 h-10 text-xs rounded-xl text-slate-100 placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-[11px] uppercase tracking-wider font-semibold text-slate-400"
          >
            Email Address
          </Label>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-3.5 h-3.5" />
            </span>

            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="alex@aura-hub.io"
              className="pl-9 bg-slate-950/60 border-slate-800 focus-visible:ring-emerald-500 h-10 text-xs rounded-xl text-slate-100 placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label
            htmlFor="password"
            className="text-[11px] uppercase tracking-wider font-semibold text-slate-400"
          >
            Password
          </Label>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Password
            </label>

            <div className="relative">
              {/* Lock Icon */}
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-3.5 h-3.5" />
              </span>

              {/* Password Input */}
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                className="pl-9 pr-10 bg-slate-950/60 border-slate-800 focus-visible:ring-emerald-500 h-10 text-xs rounded-xl text-slate-100 placeholder:text-slate-600"
              />

              {/* Show / Hide Button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="space-y-1.5">
          <Label
            htmlFor="photo"
            className="text-[11px] uppercase tracking-wider font-semibold text-slate-400"
          >
            Profile Photo
          </Label>

          <div className="relative">
            {/* Hidden File Input */}
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            {!preview ? (
              <label
                htmlFor="photo"
                className="h-10 w-full px-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center gap-2 text-xs text-slate-500"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                </div>

                <span>Choose profile image</span>
              </label>
            ) : (
              <div className="h-14 w-full rounded-xl border border-emerald-500/30 bg-slate-950/60 px-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                  />

                  <div>
                    <p className="text-xs text-slate-200 font-medium">
                      Image selected
                    </p>

                    <p className="text-[10px] text-slate-500">
                      Ready to upload
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Change image */}
                  <label
                    htmlFor="photo"
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-emerald-500/10 text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </label>

                  {/* Remove image */}
                  <button
                    type="button"
                    onClick={removeImage}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-[10px] text-slate-600">
            JPG, PNG or WEBP · Max 5MB
          </p>
        </div>
      </div>

      {/* Hidden Role Value */}
      <input type="hidden" name="role" value={openRole} />

      {/* Role Selection */}
      <div className="space-y-2">
        <Label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
          Select Account Type
        </Label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role) => {
            const isSelected = openRole === role.id;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setRole(role.id)}
                className={`
                  group relative p-4 rounded-2xl border text-left
                  transition-all duration-300 cursor-pointer

                  ${
                    isSelected
                      ? `
                        border-emerald-400/80
                        bg-emerald-500/10
                        shadow-lg shadow-emerald-500/10
                      `
                      : `
                        border-slate-800
                        bg-slate-950/50
                        hover:border-slate-600
                        hover:bg-slate-900
                      `
                  }
                `}
              >
                {/* Radio Circle */}
                <div
                  className={`
                    absolute top-4 right-4
                    w-5 h-5 rounded-full
                    border flex items-center justify-center
                    transition-all

                    ${
                      isSelected
                        ? "border-emerald-400 bg-emerald-400"
                        : "border-slate-600"
                    }
                  `}
                >
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  )}
                </div>

                {/* Content */}
                <div className="pr-8">
                  <h3
                    className={`
                      text-sm font-bold transition-colors

                      ${isSelected ? "text-emerald-400" : "text-slate-200"}
                    `}
                  >
                    {role.label}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {role.desc}
                  </p>
                </div>

                {/* Active Indicator */}
                <div
                  className={`
                    mt-4 h-1 rounded-full transition-all duration-300

                    ${
                      isSelected
                        ? "w-full bg-emerald-400"
                        : "w-8 bg-slate-700 group-hover:w-16"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Action */}
      <Button
        type="submit"
        disabled={pending || !openRole}
        className="w-full h-12 text-sm rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-90 text-slate-950 font-bold shadow-xl shadow-emerald-500/25 border border-emerald-400/40 transition-all cursor-pointer mt-2 disabled:opacity-50"
      >
        <span>{pending ? "Creating..." : "Sign Up"}</span>

        <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
      </Button>
    </form>
  );
};

export default RegisterFrom;
