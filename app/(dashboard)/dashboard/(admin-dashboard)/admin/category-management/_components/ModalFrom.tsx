"use client";

import React, { useActionState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../../../components/ui/dialog";
import { Input } from "../../../../../../../components/ui/input";
import { Textarea } from "../../../../../../../components/ui/textarea";
import { Button } from "../../../../../../../components/ui/button";
import { Category } from "../../../../../../../utils/type";
import { Layers3, FileText, X, ArrowRight, Loader2 } from "lucide-react";

import { toast } from "sonner";
import { categirePost } from '../_actions/categoryActions';

type ModalProps = {
  dialogOpen: boolean;
  dialogClose: () => void;
  category: Category;
};

const ModalFrom = ({ dialogOpen, dialogClose, category }: ModalProps) => {
  const initialState = {
    success: false,
    message: "",
    errors: [] as { message: string }[],
  };

  const [state, formAction, isPending] = useActionState(
    categirePost,
    initialState,
  );

 

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      dialogClose()
    }

    if (!state.success && state.errors?.length > 0) {
      toast.error(state.errors[0].message);
    }
  }, [state]);

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => !open && dialogClose()}>
      <DialogContent
        className="
          overflow-hidden
          border border-white/10
          bg-[#0B0F17]
          p-0
          text-white
          shadow-2xl shadow-black/50
          sm:max-w-[520px]
        "
      >
        {/* Header */}
        <DialogHeader className="relative border-b border-white/10 px-6 py-5">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl
                border border-blue-500/20
                bg-blue-500/10
              "
            >
              <Layers3 className="h-5 w-5 text-blue-400" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                {category ? "Edit Category" : "Create Category"}
              </DialogTitle>

              <DialogDescription className="text-sm text-gray-400">
                {category
                  ? "Update the category information below."
                  : "Add a new service category to your platform."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <form action={formAction}>

 <div className="space-y-6 px-6 py-6">
          {/* Category Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
              <Layers3 className="h-4 w-4 text-gray-500" />
              Category Name
            </label>
            {
              category && <input type="hidden" name='id' value={category?.id} />
            }
            <Input
              name="name"
              defaultValue={category?.name || ""}
              placeholder="e.g. Plumbing"
              className="
                h-11
                rounded-lg
                border-white/10
                bg-[#080B10]
                text-white
                placeholder:text-gray-600
                transition-all
                focus:border-blue-500/40
                focus:ring-2
                focus:ring-blue-500/10
              "
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
              <FileText className="h-4 w-4 text-gray-500" />
              Description
            </label>

            <Textarea
              name="description"
              defaultValue={category?.description || ""}
              placeholder="Describe what services belong to this category..."
              className="
                min-h-[130px]
                resize-none
                rounded-lg
                border-white/10
                bg-[#080B10]
                p-3.5
                text-sm
                leading-relaxed
                text-white
                placeholder:text-gray-600
                transition-all
                focus:border-blue-500/40
                focus:ring-2
                focus:ring-blue-500/10
              "
            />
          </div>

          {/* Category Preview */}
          <div
            className="
              rounded-xl
              border border-white/10
              bg-white/[0.025]
              p-4
            "
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                Category Preview
              </span>

              <span
                className="
                  rounded-full
                  border border-emerald-500/20
                  bg-emerald-500/10
                  px-2.5
                  py-1
                  text-[11px]
                  font-medium
                  text-emerald-400
                "
              >
                Active
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-lg
                  bg-white/[0.05]
                  ring-1 ring-white/10
                "
              >
                <Layers3 className="h-4 w-4 text-blue-400" />
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-white">
                  {category?.name || "New Service Category"}
                </h4>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                  {category?.description ||
                    "Your category description will appear here."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter
          className="
            border-t
            border-white/10
            bg-white/[0.015]
            px-6
            py-4
          "
        >
          <Button
            variant="ghost"
            onClick={dialogClose}
            className="
              gap-2
              text-gray-400
              hover:bg-white/5
              hover:text-white
            "
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-emerald-950 font-semibold gap-2 shadow-lg shadow-emerald-500/20"
          >
            {category ? (
              isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Update Category"
              )
            ) : isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <span>Save Category</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFrom;
