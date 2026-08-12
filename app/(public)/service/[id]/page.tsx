import {
  Star,
  Calendar as CalendarIcon,
  ShieldCheck,
  ArrowLeft,
  UserCheck,
  MapPin,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import BookingFrom from "./_components/BookingFrom";
import { singleService } from "./_actions/bookingAction";
import { IService } from "../../../../utils/type";
import { getMe } from '../../../../service/Profileme';

export default async function TechnicianProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const serviceDetail = (await singleService(id as string)) || [];
    const user=await getMe()
    console.log('user',user)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 md:px-8 lg:px-16 selection:bg-teal-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/service"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800/80"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Expert Available
          </span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Service Overview & Technician Profile */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Service Header Card */}
            <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-2xl shadow-2xl">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
                  Professional Maintenance
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black text-white mt-4 tracking-tight">
                {serviceDetail.title}
              </h1>
              
              <p className="text-slate-400 mt-4 leading-relaxed text-sm md:text-base font-normal">
                {serviceDetail.description}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">
                    Total Service Cost
                  </span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    ৳{serviceDetail.price}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">
                    Billing Structure
                  </span>
                  <span className="text-sm font-bold text-slate-200 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 inline-block mt-1">
                    {serviceDetail.priceType} Price Plan
                  </span>
                </div>
              </div>
            </div>

            {/* Technician Profile Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-2xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-teal-400" /> Assigned Expert Technician
                </h3>
                <span className="flex items-center gap-1 text-xs bg-teal-500/10 text-teal-300 px-2.5 py-1 rounded-lg border border-teal-500/20 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Professional
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={serviceDetail?.technician?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"}
                  alt={serviceDetail?.technician?.technician?.name || "Technician"}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500/30 shadow-lg"
                />
                <div className="space-y-1.5">
                  <h4 className="text-xl font-extrabold text-white">
                    {serviceDetail?.technician?.technician?.name}
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />{" "}
                    {serviceDetail?.technician?.location} • Experience:{" "}
                    <span className="text-slate-200 font-medium">{serviceDetail?.technician?.experience}</span>
                  </p>
                  <div className="flex items-center gap-1.5 text-amber-400 text-sm font-bold pt-0.5">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{serviceDetail?.technician?.avgRating || "4.9"}</span>
                    <span className="text-slate-500 text-xs font-normal">
                      ({serviceDetail?.technician?.reviewsCount || 42} verified reviews)
                    </span>
                  </div>
                </div>
              </div>

              <blockquote className="text-slate-300 text-sm italic bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60 relative">
                <span className="absolute top-2 left-2 text-teal-500/20 text-3xl font-serif">“</span>
                {serviceDetail?.technician?.bio || "Dedicated expert ready to solve your household requirements with safety and standard tools."}
              </blockquote>
            </div>

          </div>

          {/* Right Column: Quick Summary & Action Trigger Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Instant Booking</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Select slots & dispatch request</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400 py-2 border-b border-slate-800/60">
                  <span>Response Time</span>
                  <span className="text-slate-200 font-semibold">Under 15 Minutes</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 py-2 border-b border-slate-800/60">
                  <span>Service Guarantee</span>
                  <span className="text-emerald-400 font-semibold">100% Satisfaction</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 py-2">
                  <span>Cancellation</span>
                  <span className="text-slate-200 font-semibold">Free up to 1 hr prior</span>
                </div>
              </div>

              {/* Booking Modal Form Component Triggered inside */}
              <div className="pt-2">
                <BookingFrom user={user} serviceDetail={serviceDetail} />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}