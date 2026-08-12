'use client';

import React, { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarIcon, CheckCircle, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';


import MotionAniBox from '../../../../../components/shared/MotionAniBox';

// Shadcn UI Imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getMe } from '../../../../../service/Profileme';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { bookingCreate } from '../_actions/bookingAction';


const initialState = {
  success: false,
  message: '',
  status:0,
  error: '',
};

const BookingFrom = ({ serviceDetail }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
const [userLoading, setUserLoading] = useState(true);
const router=useRouter()
useEffect(() => {
  const loadUser = async () => {
    try {
      const result = await getMe();

      console.log("USER:", result);

      setUser(result);
    } catch (error) {
      console.error("Failed to get user:", error);
    } finally {
      setUserLoading(false);
    }
  };

  loadUser();
}, []);
  const [state, action, isPending] = useActionState(
    bookingCreate,
    initialState
  );

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

 
 
  console.log('user',user)
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button to Open Shadcn Modal */}
    
        <Button
          type="button"
          onClick={()=> {
                  if(!user.success)
                  {
                     toast.error('Pleace login user')
                     router.push('/auth/login')
                     setIsOpen(false)
                     return
                  }
                  setIsOpen(true)
            }
          }
          className="w-full h-auto py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/20 hover:opacity-95 hover:bg-gradient-to-r transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <span>Book Service Now</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
 

      {/* Perfectly Centered & Gorgeous Shadcn Dialog Content */}
      <DialogContent className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl shadow-teal-950/30 custom-scrollbar text-slate-100 sm:rounded-3xl">
        <DialogHeader className="space-y-1 text-left">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Secure Appointment Form
          </div>
          <DialogTitle className="text-xl font-black text-white">
            {serviceDetail?.title}
          </DialogTitle>
        </DialogHeader>

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
         <form action={action} className="space-y-4">
  {/* Hidden IDs */}
  <input
    type="hidden"
    name="serviceId"
    value={serviceDetail?.id || ''}
  />

  <input
    type="hidden"
    name="technicianId"
    value={serviceDetail?.technicianId || ''}
  />

  {/* Hidden Booking Data */}
  <input
    type="hidden"
    name="scheduledDate"
    value={selectedDate}
  />

  <input
    type="hidden"
    name="startTime"
    value={selectedSlot}
  />

  <input
    type="hidden"
    name="totalAmount"
    value={serviceDetail?.totalAmount || serviceDetail?.price || 0}
  />
  {/* Price Header */}
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
          ৳{serviceDetail?.totalAmount || serviceDetail?.price}
        </p>
      </div>
    </div>
  </div>

  {/* Address */}
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

  {/* Date + Time */}
  <div className="grid grid-cols-2 gap-3">
    {/* Date */}
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/10">
          <CalendarIcon className="h-3.5 w-3.5 text-teal-400" />
        </span>
        Date
      </label>

      <Input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        required
        className="h-11 rounded-xl border-slate-800 bg-slate-950/80 px-3 text-sm text-slate-200 focus-visible:border-teal-500 focus-visible:ring-1 focus-visible:ring-teal-500"
      />
    </div>

    {/* Custom Time */}
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/10">
          <Clock className="h-3.5 w-3.5 text-teal-400" />
        </span>
        Start Time
      </label>

      <Input
        type="time"
        name="startTimeDisplay"
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        required
        className="h-11 rounded-xl border-slate-800 bg-slate-950/80 px-3 text-sm text-slate-200 focus-visible:border-teal-500 focus-visible:ring-1 focus-visible:ring-teal-500"
      />
    </div>
  </div>

 
 
  
  

  {/* Submit */}
  <div className="pt-1">
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
            • ৳{serviceDetail?.totalAmount || serviceDetail?.price}
          </span>
        </>
      )}
    </Button>
  </div>
</form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingFrom;