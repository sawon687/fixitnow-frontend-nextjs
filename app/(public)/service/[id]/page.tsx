'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Calendar as CalendarIcon, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  ArrowLeft,
  UserCheck,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function TechnicianProfilePage() {
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-05');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Mock technician & service detail data
  const serviceDetail = {
    id: "806cd8ce-ee3e-4f75-b689-4e84d60b2e97",
    title: "Professional Home Electrical Repair",
    description: "Expert electrical repair services including wiring, switch replacement, circuit breaker repair, fan installation, and troubleshooting for residential properties.",
    price: 1300,
    priceType: "Fixed",
    technician: {
      id: "0b038471-3923-4595-83c6-8b2563cbfdb8",
      name: "Rahim Ahmed",
      rating: 4.9,
      reviewsCount: 124,
      experience: "8+ Years Experience",
      location: "Dhaka, Bangladesh",
      bio: "Certified senior electrical technician specializing in home automation, complex circuit troubleshooting, and secure residential wiring installations.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
    }
  };

  const availableSlots = [
    { time: "09:00 AM - 11:00 AM", available: true },
    { time: "11:30 AM - 01:30 PM", available: false }, // Booked slot example
    { time: "03:00 PM - 05:00 PM", available: true },
    { time: "05:30 PM - 07:30 PM", available: true },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    // Here you would call POST /api/bookings
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 md:px-8 lg:px-16 selection:bg-teal-500 selection:text-slate-950">
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Technician Bio & Service Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Service Header Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                Electrical Service
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-3">
                {serviceDetail.title}
              </h1>
              <p className="text-slate-400 mt-4 leading-relaxed text-sm md:text-base">
                {serviceDetail.description}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Service Cost</span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                    ৳{serviceDetail.price}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Payment Term</span>
                  <span className="text-sm font-semibold text-slate-300">{serviceDetail.priceType} Price</span>
                </div>
              </div>
            </div>

            {/* Technician Profile Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-teal-400" /> Assigned Expert Technician
              </h3>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img 
                  src={serviceDetail.technician.avatar} 
                  alt={serviceDetail.technician.name} 
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500/30 shadow-md"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-bold text-white">{serviceDetail.technician.name}</h4>
                    <span className="flex items-center gap-1 text-xs bg-teal-500/10 text-teal-300 px-2 py-0.5 rounded-md border border-teal-500/20">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {serviceDetail.technician.location} • {serviceDetail.technician.experience}
                  </p>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold pt-1">
                    <Star className="w-4 h-4 fill-amber-400" /> 
                    <span>{serviceDetail.technician.rating}</span>
                    <span className="text-slate-500 text-xs font-normal">({serviceDetail.technician.reviewsCount} customer reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
                "{serviceDetail.technician.bio}"
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Booking & Time-Slot Picker */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Book Appointment</h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {bookingSuccess ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-10 text-center space-y-4">
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
                </motion.div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-teal-400" /> Select Date
                    </label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  {/* Time Slots Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-400" /> Available Time Slots
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                            !slot.available 
                              ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed line-through'
                              : selectedSlot === slot.time
                              ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-md shadow-teal-500/10'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{slot.time}</span>
                          <span className="text-[10px]">
                            {slot.available ? (selectedSlot === slot.time ? 'Selected' : 'Available') : 'Booked'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Booking Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedSlot}
                    type="submit"
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                      selectedSlot 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-teal-500/20 hover:opacity-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Booking Request
                  </motion.button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}