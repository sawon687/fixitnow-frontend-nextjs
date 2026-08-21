"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CalendarDays,
  CheckCircle,
  Clock3,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import MotionAniBox from "../../../../../components/shared/MotionAniBox";
import { getMe } from "../../../../../service/Profileme";
import { bookingCreate, getavaliableSlot } from "../_actions/bookingAction";

const initialState = {
  success: false,
  message: "",
  status: 0,
  error: "",
  errors: [],
};

type Slot = {
  id: string;
  startTime: string;
  endTime: string;
};

const BookingFrom = ({ serviceDetail }: any) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [slotLoading, setSlotLoading] = useState(false);

  const [state, action, isPending] = useActionState(
    bookingCreate,
    initialState,
  );

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await getMe();
        setUser(result);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setUserLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!state?.success && state?.errors?.length) {
      toast.error(state.errors[0]?.message);
    }
  }, [state]);

  const handleSelectDate = async (date: string) => {
    if (!date) return;

    setSelectedDate(date);
    setSelectedSlot("");
    setAvailableSlots([]);
    setSlotLoading(true);

    try {
      const result = await getavaliableSlot(date);

      if (result?.success) {
        setAvailableSlots(result.data || []);
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error("Failed to load slots:", error);
      setAvailableSlots([]);
      toast.error("Unable to load available time slots");
    } finally {
      setSlotLoading(false);
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");

    const date = new Date();
    date.setHours(Number(hour), Number(minute), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const today = new Date().toISOString().split("T")[0];

  const price = serviceDetail?.totalAmount || serviceDetail?.price || 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        type="button"
        disabled={userLoading}
        onClick={() => {
          if (!user?.success) {
            toast.error("Please log in to book a service");
            router.push("/auth/login");
            return;
          }

          setIsOpen(true);
        }}
        className="h-12 w-full rounded-xl bg-emerald-500 font-bold text-slate-950 shadow-lg shadow-emerald-500/10 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/20 active:scale-[0.98]"
      >
        {userLoading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
            Checking...
          </>
        ) : (
          <>
            Book Service
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <DialogContent className="max-h-[92vh] w-[94vw] max-w-3xl overflow-y-auto rounded-3xl border border-slate-800 bg-[#090e13] p-0 text-slate-100 shadow-2xl">
        <DialogHeader className="border-b border-slate-800/80 px-6 py-5 md:px-7">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-400">
              Secure Booking
            </span>
          </div>

          <DialogTitle className="mt-2 text-xl font-black text-white md:text-2xl">
            {serviceDetail?.title}
          </DialogTitle>

          <p className="text-xs text-slate-600">
            Select a date and available time slot.
          </p>
        </DialogHeader>

        {state?.success ? (
          <MotionAniBox
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-14 text-center md:px-10"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>

            <h3 className="mt-5 text-2xl font-black text-white">
              Booking Confirmed
            </h3>

            <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-slate-500">
              Your booking request has been sent to the technician. You can
              follow the booking status from your dashboard.
            </p>

            <Link
              href="/dashboard/customer"
              className="mt-7 inline-flex h-11 items-center rounded-xl bg-emerald-500 px-5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              View Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </MotionAniBox>
        ) : (
          <form action={action} className="p-6 md:p-7">
            <input
              type="hidden"
              name="serviceId"
              value={serviceDetail?.id || ""}
            />

            <input
              type="hidden"
              name="technicianId"
              value={serviceDetail?.technicianId || ""}
            />

            <input type="hidden" name="scheduledDate" value={selectedDate} />

            <input type="hidden" name="startTime" value={selectedSlot} />

            <input type="hidden" name="totalAmount" value={price} />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-5">
                {/* price */}
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">
                        Service Price
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Transparent pricing
                      </p>
                    </div>

                    <span className="text-2xl font-black text-emerald-400">
                      ৳{price}
                    </span>
                  </div>
                </div>

                {/* address */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    Service Location
                  </label>

                  <Input
                    type="text"
                    name="address"
                    required
                    placeholder="Enter your service address"
                    className="h-11 rounded-xl border-slate-800 bg-slate-950 text-xs text-slate-200 placeholder:text-slate-700 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>

                {/* date */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5 text-emerald-400" />
                    Select Date
                  </label>

                  <Input
                    type="date"
                    name="dateDisplay"
                    value={selectedDate}
                    min={today}
                    onChange={(event) => handleSelectDate(event.target.value)}
                    required
                    className="h-11 rounded-xl border-slate-800 bg-slate-950 text-xs text-slate-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <Clock3 className="h-3.5 w-3.5 text-emerald-400" />
                    Available Time
                  </label>

                  {availableSlots.length > 0 && (
                    <span className="text-[9px] font-semibold text-emerald-400">
                      {availableSlots.length} slots
                    </span>
                  )}
                </div>

                {!selectedDate ? (
                  <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 px-5 text-center">
                    <CalendarDays className="h-6 w-6 text-slate-700" />

                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      Choose a date first
                    </p>

                    <p className="mt-1 text-[10px] text-slate-700">
                      Available time slots will appear here.
                    </p>
                  </div>
                ) : slotLoading ? (
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-11 animate-pulse rounded-xl bg-slate-900"
                      />
                    ))}
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => {
                      const selected = selectedSlot === slot.startTime;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedSlot(slot.startTime)}
                          className={`rounded-xl border px-3 py-3 text-left transition-all ${
                            selected
                              ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-300 shadow-lg shadow-emerald-500/5"
                              : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold">
                              {formatTime(slot.startTime)}
                            </span>

                            {selected && (
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                            )}
                          </div>

                          <span className="mt-1 block text-[9px] text-slate-600">
                            to {formatTime(slot.endTime)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-red-500/10 bg-red-500/[0.02] px-5 text-center">
                    <Clock3 className="h-6 w-6 text-red-400/60" />

                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      No slots available
                    </p>

                    <p className="mt-1 text-[10px] text-slate-700">
                      Try selecting another date.
                    </p>
                  </div>
                )}

                {selectedSlot && (
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] px-3 py-2.5">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
                        Selected Slot
                      </p>

                      <p className="mt-0.5 text-xs font-bold text-emerald-400">
                        {formatTime(selectedSlot)}
                      </p>
                    </div>

                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                )}

                <div className="mt-auto pt-6">
                  <Button
                    type="submit"
                    disabled={!selectedDate || !selectedSlot || isPending}
                    className={`h-12 w-full rounded-xl text-xs font-black transition-all ${
                      selectedDate && selectedSlot && !isPending
                        ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10 hover:bg-emerald-400"
                        : "cursor-not-allowed border border-slate-800 bg-slate-950 text-slate-700"
                    }`}
                  >
                    {isPending ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-slate-700">
                    <ShieldCheck className="h-3 w-3" />
                    Your booking information is secure.
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingFrom;
