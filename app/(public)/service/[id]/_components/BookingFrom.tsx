'use client'

import React, { useActionState, useState } from 'react'
import Link from 'next/link'
import { CalendarIcon, CheckCircle, Clock } from 'lucide-react'

import { bookingCreate } from '../_actions/bookingAction'
import MotionAniBox from '../../../../../components/shared/MotionAniBox'
import { IService } from '../../../../../utils/type'



const initialState = {
  success: false,
  message: '',
  error: '',
}

const BookingFrom = ({serviceDetail}:any) => {
  const [state, action, isPending] = useActionState(bookingCreate, initialState)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
const availabilitiesSlots= serviceDetail.technician.availabilities
console.log('avb',availabilitiesSlots)

  return (
    <>
      {state.success ? (
        <MotionAniBox
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="py-10 text-center space-y-4"
        >
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
          <h4 className="text-xl font-bold text-white">Booking Requested!</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your request has been sent to the technician. You can track status in your dashboard.
          </p>
          <Link href="/dashboard/customer">
            <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20">
              Go to Dashboard
            </button>
          </Link>
        </MotionAniBox>
      ) : (
<form action={action} className="space-y-6 max-w-lg mx-auto bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
  
  {/* Hidden Inputs for Form State */}
  <input type="hidden" name="date" value={selectedDate} />
  <input type="hidden" name="slot" value={selectedSlot} />
  <input type="hidden" name="totalAmount" value={serviceDetail.totalAmount} />

  {/* Header Info Banner for Total Amount */}
  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between text-xs">
    <span className="text-slate-400 font-medium">Total Amount:</span>
    <span className="font-bold text-emerald-400 text-sm">৳1,300</span>
  </div>

  {/* Address Input Section (User Input) */}
  <div className="space-y-2">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
      📍 Enter Your Address
    </label>
    <input
      type="text"
      name="address"
      required
      placeholder="e.g., Sonadanga, Khulna"
      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
    />
  </div>

  {/* Select Date Section */}
  <div className="space-y-2">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
      <CalendarIcon className="w-3.5 h-3.5 text-teal-400" /> Select Date
    </label>
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      name='scheduledDate'
      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
    />
  </div>

  {/* Available Time Slots Section */}
  <div className="space-y-2">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
      <Clock className="w-3.5 h-3.5 text-teal-400" /> Available Time Slots
    </label>
    <div className="grid grid-cols-1 gap-2.5 max-h-52 overflow-y-auto pr-1">
      {availabilitiesSlots.map((slot, index) => (
        <button
          key={index}
          type="button"
          disabled={slot.isBooked}
          onClick={() => setSelectedSlot(slot.startTime)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
              slot.isBooked
              ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed line-through'
              : selectedSlot === slot.startTime
              ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-md shadow-teal-500/10'
              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
          }`}
        >
          <span className="font-semibold">{slot.startTime}</span>
          <span className="text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-md bg-slate-900/80">
            {!slot.isBooked ? (selectedSlot === slot.startTime? 'Selected' : 'Available') : 'Booked'}
          </span>
        </button>
      ))}
    </div>
  </div>

  {/* Submit Button Section */}
  <MotionAniBox
    whileHover={selectedSlot && selectedDate ? { scale: 1.01 } : undefined}
    whileTap={selectedSlot && selectedDate ? { scale: 0.99 } : undefined}
  >
    <button
      type="submit"
      disabled={!selectedSlot || !selectedDate || isPending}
      className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
        selectedSlot && selectedDate && !isPending
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-teal-500/20 hover:opacity-95 cursor-pointer'
          : 'bg-slate-950 border border-slate-800 text-slate-600 cursor-not-allowed'
      }`}
    >
      {isPending ? 'Confirming Booking...' : 'Confirm Booking Request (৳1300)'}
    </button>
  </MotionAniBox>
</form>
      )}
    </>
  )
}

export default BookingFrom