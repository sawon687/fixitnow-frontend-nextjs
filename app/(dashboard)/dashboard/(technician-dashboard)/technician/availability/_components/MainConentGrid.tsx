import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CalendarIcon, ChevronLeft, ChevronRight, Clock3, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvailabilitySlot } from '../page';
import DropdownStatus from './DropdownStatus';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface MainContentGridProps {
  availabilityData: AvailabilitySlot[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  openModal: () => void;
  router: AppRouterInstance;
  onRefresh?: () => void; // প্রপস যুক্ত করা হয়েছে
}

const MainContentGrid = ({
  availabilityData,
  selectedDate,
  setSelectedDate,
  openModal,
  router,
  onRefresh,
}: MainContentGridProps) => {
  const [currentYears, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const monthDaysList = useMemo(() => {
    const dayMonthList = new Date(currentYears, currentMonth + 1, 0).getDate();
    const list: string[] = [];
    
    for (let i = 1; i <= dayMonthList; i++) {
      const dayStr = String(i).padStart(2, "0");
      const monthStr = String(currentMonth + 1).padStart(2, "0");
      list.push(`${currentYears}-${monthStr}-${dayStr}`);
    }
    return list;
  }, [currentYears, currentMonth]);

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYears + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYears - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const monthName = new Date(currentYears, currentMonth).toLocaleDateString("en-us", {
    month: "long",
    year: "numeric",
  });

  const formatDateInfo = (dateString: string) => {
    const d = new Date(`${dateString}T00:00:00`);
    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  const selectedSlots = useMemo(() => {
    return availabilityData.filter((slot) => slot.date === selectedDate);
  }, [availabilityData, selectedDate]);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_1fr]">
      {/* LEFT: MONTH & DATE PICKER */}
      <Card className="border-white/[0.07] bg-[#0b111c] shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-200">Select Date</h2>
              <p className="mt-1 text-xs text-slate-500">Pick a day to inspect schedule</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <CalendarIcon className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#111927] px-3 py-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevMonth}
              className="text-slate-400 hover:bg-white/[0.05] hover:text-white h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs font-bold tracking-wide uppercase text-slate-200">
              {monthName}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              className="text-slate-400 hover:bg-white/[0.05] hover:text-white h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-[380px] space-y-2 overflow-y-auto pr-1">
            {monthDaysList.map((dateStr) => {
              const info = formatDateInfo(dateStr);
              const active = selectedDate === dateStr;

              const daySlots = availabilityData.filter((slot) => slot.date === dateStr);
              const hasAvailable = daySlots.some((slot) => slot.status === "Available");

              return (
                <div
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3 text-left transition-all h-auto ${
                    active
                      ? "border-emerald-500/40 bg-emerald-600/15 shadow-md shadow-emerald-950/40"
                      : "border-white/[0.05] bg-[#0e1623] hover:border-white/[0.12] hover:bg-[#121c2c]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 flex-col items-center justify-center rounded-xl ${
                        active
                          ? "bg-emerald-500 text-slate-950 font-bold"
                          : "bg-white/[0.04] text-slate-300"
                      }`}
                    >
                      <span className="text-[9px] font-medium uppercase tracking-tight">
                        {info.month}
                      </span>
                      <span className="text-base font-extrabold">{info.date}</span>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-200">{info.day}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">{dateStr}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {daySlots.length > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400">
                        {daySlots.length}
                      </span>
                    )}
                    <span
                      className={`h-2 w-2 rounded-full ${
                        hasAvailable ? "bg-emerald-400" : "bg-slate-600"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-4">
            <div className="flex gap-3">
              <Zap className="mt-0.5 h-4 w-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-emerald-300">Pro Scheduling Tip</p>
                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  Keep your working windows synchronized to receive instant project match bookings.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RIGHT: TIME SLOTS MANAGER */}
      <Card className="border-white/[0.07] bg-[#0b111c] shadow-xl">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Clock3 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-200">Time Slots Matrix</h2>
                <p className="text-xs text-slate-500 font-mono">{selectedDate}</p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={openModal}
              className="rounded-xl border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Slot
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-5 flex flex-wrap gap-5 border-b border-white/[0.06] pb-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Available
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              Booked
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              Blocked
            </div>
          </div>

          <div className="space-y-3">
            {selectedSlots.length > 0 ? (
              selectedSlots.map((slot) => {
                const statusLower = slot.status.toLowerCase();

                return (
                  <div
                    key={slot.id}
                    className={`group relative rounded-xl border p-4 transition-all ${
                      statusLower === "available"
                        ? "border-emerald-500/15 bg-emerald-500/[0.03] hover:border-emerald-500/30"
                        : statusLower === "booked"
                        ? "border-orange-500/15 bg-orange-500/[0.03] hover:border-orange-500/30"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 h-full w-[3px] rounded-l-xl ${
                        statusLower === "available"
                          ? "bg-emerald-400"
                          : statusLower === "booked"
                          ? "bg-orange-400"
                          : "bg-slate-600"
                      }`}
                    />

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                            statusLower === "available"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : statusLower === "booked"
                              ? "bg-orange-500/10 text-orange-400"
                              : "bg-white/[0.05] text-slate-500"
                          }`}
                        >
                          <Clock3 className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-base font-bold text-slate-200">
                            {slot.startTime}
                            <span className="mx-2 text-slate-600">→</span>
                            {slot.endTime}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-500">
                            Standard active appointment duration
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={`border ${
                            statusLower === "available"
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : statusLower === "booked"
                              ? "border-orange-500/20 bg-orange-500/10 text-orange-400"
                              : "border-white/[0.08] bg-white/[0.04] text-slate-400"
                          }`}
                        >
                          {slot.status}
                        </Badge>

                        <DropdownStatus 
                          router={router} 
                          slotId={slot.id} 
                          onRefresh={onRefresh} // এখানে কলব্যাক পাস করা হলো
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-white/[0.1] py-16 text-center">
                <CalendarDays className="mx-auto h-8 w-8 text-slate-600" />
                <h3 className="mt-4 font-semibold text-slate-300">No Time Slots Configured</h3>
                <p className="mt-1 text-xs text-slate-500">No availability windows set for {selectedDate}.</p>
                <Button
                  onClick={openModal}
                  className="mt-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Slot Now
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
            <p className="text-xs text-slate-500">{selectedSlots.length} total blocks for this date</p>
            <p className="text-xs text-emerald-400/80 font-medium">System Synchronized</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainContentGrid;