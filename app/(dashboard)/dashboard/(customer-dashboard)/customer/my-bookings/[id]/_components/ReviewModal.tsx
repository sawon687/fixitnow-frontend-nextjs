"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogTrigger, 
  DialogFooter,
  DialogClose 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { submitReviewAction } from '../_actions/singleBookingAction';

interface ReviewModalProps {
  bookingId: string;
  technicianId: string;
}

const initialState = {
  success: false,
  message: "",
};

const  ReviewModal=({ bookingId, technicianId }: ReviewModalProps)=> {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const router = useRouter();

  console.log('techishain id',technicianId)
  const [state, formAction, isPending] = useActionState(submitReviewAction, initialState);

 
  useEffect(() => {
    if (state.success) {
      setOpen(false);
      toast.success(state.message)
      router.refresh();
    }else if(!state.success && state.errormessage)
    {
         toast.error(state.errormessage)
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/30 text-teal-300 hover:bg-teal-500/30 text-xs font-bold cursor-pointer px-6 py-2.5 transition-all shadow-md shadow-teal-950/30 gap-2">
          <Star className="w-4 h-4 text-teal-400 fill-teal-400" /> Leave a Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-900/90 border-slate-800/80 backdrop-blur-2xl text-slate-100 rounded-3xl shadow-2xl shadow-teal-950/60 p-6 md:p-8">
        
        {/* Header Title & Description */}
        <DialogHeader className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold uppercase tracking-wider w-fit">
            <Sparkles className="w-3 h-3" />
            Feedback & Rating
          </div>
          <DialogTitle className="text-2xl font-black text-white tracking-tight">
            Rate Your Experience
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400 leading-relaxed">
            How was the service provided by the technician? Your feedback helps maintain high ecosystem standards.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-6 pt-2">
          
          {/* Hidden Inputs for Server Action */}
          <input type="hidden" name="bookingId" value={bookingId} />
          <input type="hidden" name="technicianId" value={technicianId} />
          <input type="hidden" name="rating" value={rating} />

          {/* Interactive Star Rating Selection */}
          <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/60 text-center">
            <label className="text-[11px] uppercase tracking-wider text-slate-400 font-extrabold block">
              Select Your Rating
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="cursor-pointer p-1.5 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                        : "text-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-teal-400">
              {rating === 5 && "⭐ Excellent Service!"}
              {rating === 4 && "👍 Very Good!"}
              {rating === 3 && "👌 Average"}
              {rating === 2 && "⚠️ Needs Improvement"}
              {rating === 1 && "❌ Poor Experience"}
            </p>
          </div>

          {/* Comment Textarea */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Your Feedback</span>
              <span className="text-[10px] text-slate-500 font-normal">Optional</span>
            </label>
            <Textarea
              name="comment"
              rows={4}
              placeholder="Describe your experience in detail..."
              className="w-full bg-slate-950/70 border-slate-800 rounded-2xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all resize-none shadow-inner"
            />
          </div>

          {/* Error Message Display */}
          {state.message && !state.success && state.errors?.length && (
            <p className="text-xs text-red-400 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20 text-center font-medium">
              {state.errors?.[0].message}
            </p>
          )}

          {/* Action Footer Buttons */}
          <DialogFooter className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto border-slate-800 bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:text-white text-xs cursor-pointer rounded-xl"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs px-6 py-2.5 cursor-pointer hover:opacity-90 shadow-lg shadow-teal-500/20 transition-all rounded-xl"
            >
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewModal