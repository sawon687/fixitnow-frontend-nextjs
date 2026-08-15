"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import MotionAniBox from "../../../../../components/shared/MotionAniBox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMe } from "../../../../../service/Profileme";
import { bookingCreate, getavaliableSlot } from "../_actions/bookingAction";

const initialState = {
  success: false,
  message: "",
  status: 0,
  error: "",
  errors: [],
};

// // Static working hours available for service bookings
// const availableSlots = [
//   { id: "1", startTime: "09:00", endTime: "10:00" },
//   { id: "2", startTime: "10:00", endTime: "11:00" },
//   { id: "3", startTime: "11:00", endTime: "12:00" },
//   { id: "4", startTime: "14:00", endTime: "15:00" },
//   { id: "5", startTime: "15:00", endTime: "16:00" },
//   { id: "6", startTime: "16:00", endTime: "17:00" },
// ];

const BookingFrom = ({ serviceDetail }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState<
    Array<{ id: string; startTime: string; endTime: string }>
  >([]);
  const router = useRouter();

  // Server action hook for handling booking submission
  const [state, action, isPending] = useActionState(
    bookingCreate,
    initialState,
  );

  // Fetch current authenticated user session on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await getMe();
        setUser(result);
      } catch (error) {
        console.error("Failed to get user session:", error);
      } finally {
        setUserLoading(false);
      }
    };

    loadUser();
  }, []);
  //  get avalibale time
  const handleSelectDate = async (dateString: string) => {
    if (!dateString) return;
    const res = await getavaliableSlot(dateString);

    if (res.success) {
      setAvailableSlots(res.data);
    }
  };
  // Trigger error toast if the server action validation fails
  useEffect(() => {
    if (!state?.success && state?.errors?.length) {
      toast.error(state.errors[0]?.message);
    }
  }, [state]);

  // Convert 24h time format (e.g. "14:00") to user-friendly 12h format ("2:00 PM")
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <Button
        type="button"
        disabled={userLoading}
        onClick={() => {
          if (!user?.success) {
            toast.error("Please log in to book a service");
            router.push("/auth/login");
            setIsOpen(false);
            return;
          }
          setIsOpen(true);
        }}
        className="w-full h-auto py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
      >
        <span>Book Service Now</span>
        <ArrowRight className="w-4 h-4" />
      </Button>

      {/* Main Dialog Modal */}
      <DialogContent className="w-[92vw] max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl shadow-teal-950/30 custom-scrollbar text-slate-100">
        <DialogHeader className="space-y-1.5 text-left mb-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Secure Appointment Form
          </div>
          <DialogTitle className="text-2xl font-black text-white">
            {serviceDetail?.title}
          </DialogTitle>
        </DialogHeader>

        {/* Conditional View: Success Screen vs Booking Form */}
        {state?.success ? (
          <MotionAniBox
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-12 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>

            <h4 className="text-2xl font-black text-white">
              Booking Requested Successfully!
            </h4>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              Your request has been dispatched to the expert technician. You can
              track your ongoing status inside your user dashboard.
            </p>

            <div className="pt-4">
              <Link href="/dashboard/customer">
                <Button
                  type="button"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 hover:opacity-95 cursor-pointer"
                >
                  View Dashboard Status
                </Button>
              </Link>
            </div>
          </MotionAniBox>
        ) : (
          <form action={action} className="space-y-6">
            {/* Hidden Payload Fields */}
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
            <input
              type="hidden"
              name="totalAmount"
              value={serviceDetail?.totalAmount || serviceDetail?.price || 0}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Cost summary, address input, and date picker */}
              <div className="space-y-4">
                {/* Price Display Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/40 p-4">
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-teal-500/10 blur-2xl" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Total Payable
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Secure booking • No hidden charges
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                        ৳
                        {serviceDetail?.totalAmount ||
                          serviceDetail?.price ||
                          0}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Address Input */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/10">
                      <MapPin className="h-3.5 w-3.5 text-teal-400" />
                    </span>
                    Service Location
                  </label>
                  <Input
                    type="text"
                    name="address"
                    required
                    placeholder="House 12, Road 4, Sonadanga, Khulna"
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/80 px-4 text-sm text-slate-200 placeholder:text-slate-600 focus-visible:border-teal-500 focus-visible:ring-1 focus-visible:ring-teal-500"
                  />
                </div>

                {/* Appointment Date Picker */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/10">
                      <CalendarIcon className="h-3.5 w-3.5 text-teal-400" />
                    </span>
                    Date
                  </label>
                  <Input
                    type="date"
                    name="dateDisplay"
                    value={selectedDate}
                    min={today}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      handleSelectDate(e.target.value);
                      setSelectedSlot(""); // Reset slot if date changes
                    }}
                    required
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/80 px-3 text-sm text-slate-200 focus-visible:border-teal-500 focus-visible:ring-1 focus-visible:ring-teal-500"
                  />
                </div>
              </div>

              {/* Right Column: Available slots grid and confirmation button */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                   {  
                      selectedDate && (  availableSlots.length && availableSlots.length > 0?(  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/10">
                      <Clock className="h-3.5 w-3.5 text-teal-400" />
                    </span>
                      Available Time Slots
                  </label>):(  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/10">
                      <Clock className="h-3.5 w-3.5 text-red-400" />
                    </span>
                 
                      Not Found Time Slots
                  </label>))
                   }

                  {/* Slot Selection Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedSlot === slot.startTime;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedSlot(slot.startTime)}
                          className={`h-11 rounded-xl border px-3 text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "border-teal-400 bg-teal-500/20 text-teal-300 shadow-lg shadow-teal-500/10"
                              : "border-slate-800 bg-slate-950/80 text-slate-300 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-300"
                          }`}
                        >
                          {formatTime(slot.startTime)} -{" "}
                          {formatTime(slot.endTime)}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Slot Feedback Banner */}
                  {selectedSlot && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">
                          Selected Time
                        </p>
                        <p className="text-sm font-bold text-emerald-400">
                          {formatTime(selectedSlot)}
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={!selectedSlot || !selectedDate || isPending}
                    className={`h-12 w-full rounded-xl font-extrabold text-sm transition-all ${
                      selectedSlot && selectedDate && !isPending
                        ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-lg shadow-teal-500/20 hover:from-emerald-300 hover:to-teal-300 active:scale-[0.99]"
                        : "cursor-not-allowed border border-slate-800 bg-slate-950 text-slate-600"
                    }`}
                  >
                    {isPending ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                        Confirming Booking...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirm & Dispatch Request
                        <span className="ml-2 opacity-70">
                          • ৳
                          {serviceDetail?.totalAmount ||
                            serviceDetail?.price ||
                            0}
                        </span>
                      </>
                    )}
                  </Button>
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
