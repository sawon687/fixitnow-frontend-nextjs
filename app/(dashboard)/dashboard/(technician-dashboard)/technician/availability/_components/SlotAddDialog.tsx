"use client";

import React, { useActionState, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { CalendarIcon, CheckCircle2, Clock3, XCircle, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createSlot } from "../_actions/action";
import { toast } from 'sonner';

interface SlotAddDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSlotCreated?: () => void;
}

const SlotAddDialog = ({ isModalOpen, setIsModalOpen, onSlotCreated }: SlotAddDialogProps) => {
  const [slotForm, setSlotForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    isAvailable: true,
  });

  const [state, formAction, isPending] = useActionState(async (previousState: any, formData: FormData) => {
    const res = await createSlot(previousState, formData);
    if (res?.success) {
      setIsModalOpen(false);
      toast.success(res.message||'Slot Creted SuccessFully')
      setSlotForm({
        date: "",
        startTime: "",
        endTime: "",
        isAvailable: true,
      });
      if (onSlotCreated) onSlotCreated();
    }
    else if(!res?.success || res?.erros?.length){
        toast.error(res?.errors?.[0].message|| res?.message)
    }
    return res;
  }, null);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="border-white/[0.08] bg-[#0d1420] text-white shadow-2xl sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Clock3 className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <DialogTitle className="text-lg text-slate-100">Add Time Slot</DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Configure a new operational window
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form action={formAction}>
          <div className="space-y-4 py-3">
          
            <input type="hidden" name="isAvailable" value={String(slotForm.isAvailable)} />

            {/* date Input */}
            <div className="space-y-2">
              <Label className="text-xs text-slate-300">Date</Label>
              <div className="relative">
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  name="date"
                  type="date"
                  value={slotForm.date}
                  onChange={(e) => setSlotForm({ ...slotForm, date: e.target.value })}
                  className="h-11 border-white/[0.08] bg-[#111927] pl-10 text-white [color-scheme:dark] focus-visible:ring-emerald-500/30"
                  required
                />
              </div>
            </div>

            {/* time pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-slate-300">Start Time</Label>
                <div className="relative">
                  <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    name="startTime"
                    type="time"
                    value={slotForm.startTime}
                    onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })}
                    className="h-11 border-white/[0.08] bg-[#111927] pl-10 text-white [color-scheme:dark] focus-visible:ring-emerald-500/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-slate-300">End Time</Label>
                <div className="relative">
                  <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    name="endTime"
                    type="time"
                    value={slotForm.endTime}
                    onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
                    className="h-11 border-white/[0.08] bg-[#111927] pl-10 text-white [color-scheme:dark] focus-visible:ring-emerald-500/30"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Status Selectors */}
            <div className="space-y-2">
              <Label className="text-xs text-slate-300">Slot Status</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSlotForm({ ...slotForm, isAvailable: true })}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    slotForm.isAvailable
                      ? "border-emerald-500/40 bg-emerald-500/10 shadow-md"
                      : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <CheckCircle2 className={`mb-2 h-5 w-5 ${slotForm.isAvailable ? "text-emerald-400" : "text-slate-500"}`} />
                  <p className={`text-xs font-semibold ${slotForm.isAvailable ? "text-emerald-300" : "text-slate-400"}`}>
                    Available
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">Open for clients</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSlotForm({ ...slotForm, isAvailable: false })}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    !slotForm.isAvailable
                      ? "border-slate-500/40 bg-slate-500/10 shadow-md"
                      : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <XCircle className={`mb-2 h-5 w-5 ${!slotForm.isAvailable ? "text-slate-300" : "text-slate-500"}`} />
                  <p className={`text-xs font-semibold ${!slotForm.isAvailable ? "text-slate-200" : "text-slate-400"}`}>
                    Blocked
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">Mark as unavailable</p>
                </button>
              </div>
            </div>

            {/* Error Message Feedback Display */}
            {!state?.success(
              <p className="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                {state.message}
              </p>
            )}
          </div>

          <DialogFooter className="border-t border-white/[0.06] pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="border-white/[0.08] bg-transparent text-slate-300 hover:bg-white/[0.04] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isPending ||
                !slotForm.date ||
                !slotForm.startTime ||
                !slotForm.endTime ||
                slotForm.startTime >= slotForm.endTime
              }
              className="bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 disabled:opacity-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              {isPending ? "Saving..." : "Save Time Slot"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SlotAddDialog;