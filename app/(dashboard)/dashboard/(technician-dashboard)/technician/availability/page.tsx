"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, XCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SlotAddDialog from "./_components/SlotAddDialog";
import { getMySlot } from './_actions/action';
import MainContentGrid from './_components/MainConentGrid';
import { useRouter } from 'next/navigation';

export type AvailabilitySlot = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Available" | "Booked" | "Blocked";
};

const AvailabilitySchedulerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const monthStr = String(today.getMonth() + 1).padStart(2, "0");
    const dayStr = String(today.getDate()).padStart(2, "0");
    return `${today.getFullYear()}-${monthStr}-${dayStr}`;
  });

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const result = await getMySlot();
      setAvailabilityData(result.data || []);
    } catch (error) {
      console.error("Failed to fetch slots", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const availableCount = availabilityData.filter((s) => s.status === "Available").length;
  const bookedCount = availabilityData.filter((s) => s.status === "Booked").length;
  const blockedCount = availabilityData.filter((s) => s.status === "Blocked").length;

  return (
    <div className="min-h-screen bg-[#070b14] p-4 text-slate-100 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ================= HEADER ================= */}
        <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-[#111a2a] via-[#0c1421] to-[#080d16] shadow-2xl">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />

          <CardContent className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/20">
                  <CalendarDays className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  Aura – Next-Gen Engineering Hub
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Availability <span className="text-emerald-400">Hub</span>
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Manage your working hours, client service appointments, and blocked time blocks seamlessly.
              </p>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-11 rounded-xl bg-emerald-600 px-5 font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Availability Slot
            </Button>
          </CardContent>
        </Card>

        {/* ================= STATS GRID ================= */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-emerald-500/15 bg-[#0d1420]/80 backdrop-blur-md">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-slate-400">Available Slots</p>
                <h2 className="mt-2 text-3xl font-bold text-emerald-400">{availableCount}</h2>
                <p className="mt-1 text-xs text-emerald-500/80">Ready for client booking</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/15 bg-[#0d1420]/80 backdrop-blur-md">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-slate-400">Booked Slots</p>
                <h2 className="mt-2 text-3xl font-bold text-orange-400">{bookedCount}</h2>
                <p className="mt-1 text-xs text-orange-500/80">Confirmed appointments</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20">
                <Clock3 className="h-5 w-5 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-500/15 bg-[#0d1420]/80 backdrop-blur-md">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-slate-400">Blocked Slots</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-300">{blockedCount}</h2>
                <p className="mt-1 text-xs text-slate-500">Marked as off-duty</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-500/10 border border-slate-500/20">
                <XCircle className="h-5 w-5 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid Component with Shared State & Callback */}
        <MainContentGrid
          availabilityData={availabilityData}
          selectedDate={selectedDate}
          router={router}
          setSelectedDate={setSelectedDate}
          openModal={() => setIsModalOpen(true)}
          onRefresh={fetchSlots} 
        />
      </div>

      {/* ================= ADD SLOT DIALOG ================= */}
      <SlotAddDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSlotCreated={fetchSlots}
      />
    </div>
  );
};

export default AvailabilitySchedulerPage;