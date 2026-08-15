import { Badge } from "../ui/badge";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
  CreditCard,
  Loader2,
  CheckCheck,
} from "lucide-react";

interface IBookingProps {
  status: string;
}

const BookingStatusColor = ({ status }: IBookingProps) => {
  switch (status) {
    case "REQUESTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          Requested
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Accepted
        </span>
      );
    case "DECLINED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
          <XCircle className="w-3.5 h-3.5" />
          Declined
        </span>
      );
    case "PAID":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <CreditCard className="w-3.5 h-3.5" />
          Paid
        </span>
      );
    case "IN_PROGRESS":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          In-Progress
        </span>
      );
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <CheckCheck className="w-3.5 h-3.5" />
          Completed
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Ban className="w-3.5 h-3.5" />
          Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-xs font-bold uppercase tracking-wider">
          {status}
        </span>
      );
  }
};

export default BookingStatusColor;