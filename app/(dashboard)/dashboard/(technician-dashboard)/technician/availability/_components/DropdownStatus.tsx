import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { IStatusPayload, UpdateStatus } from "../_actions/action";
import { toast } from "sonner";
import { AvailabilityStatus } from "@/utils/type";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const DropdownStatus = ({ 
  slotId, 
  router, 
  onRefresh 
}: { 
  slotId: string; 
  router: AppRouterInstance;
  onRefresh?: () => void;
}) => {
  const onUpdateStatus = async (id: string, status: AvailabilityStatus) => {
    const payload: IStatusPayload = { id, status };
    const res = await UpdateStatus(payload);
    
    if (res.success) {
      toast.success(res.message || "Status updated successfully!");
      router.refresh();
       

      if (onRefresh) {
        onRefresh();
      }
    } else {
      toast.error(res.message || "Failed to update status");
    }
  };

  const statuses: Array<{ label: string; value: AvailabilityStatus }> = [
    { label: "Available", value: "Available" as unknown as AvailabilityStatus },
    { label: "Blocked", value: "Blocked" as unknown as AvailabilityStatus },
    { label: "Booked", value: "Booked" as unknown as AvailabilityStatus },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500 hover:bg-white/[0.05] hover:text-white"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 border-white/[0.08] bg-[#111927] text-slate-200 shadow-xl"
      >
        <DropdownMenuLabel className="text-xs text-slate-400">
          Change Status
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/[0.06]" />

        {statuses.map(({ label, value }) => (
          <DropdownMenuItem
            key={label}
            onClick={() => onUpdateStatus(slotId, value)}
            className="cursor-pointer text-xs text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-300"
          >
            Mark as {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownStatus;