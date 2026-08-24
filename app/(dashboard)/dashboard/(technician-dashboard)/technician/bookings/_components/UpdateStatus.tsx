"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TableCell } from "../../../../../../../components/ui/table";
import { Button } from "../../../../../../../components/ui/button";
import { updateStatusAction } from "../_actions/bookingAction";
import { toast } from "sonner";
import {
  BookingStatus,
  IBooking,
  PaymentStatus,
} from "../../../../../../../utils/type";

interface UpdateStatusProps {
  booking: IBooking;
}

const UpdateStatus = ({ booking }: UpdateStatusProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log("booking:", booking);
  console.log("payment:", booking?.payment);

  const handleUpdate = async (
    newStatus: BookingStatus,
    id: string
  ) => {
    try {
      const payment = booking?.payment;

      // ==========================================
      // CHECK PAYMENT BEFORE IN_PROGRESS
      // ==========================================
      if (
        newStatus === BookingStatus.IN_PROGRESS &&
        (!payment || payment.status !== PaymentStatus.PAID)
      ) {
        toast.error(
          "Not Paid! Customer must pay before the job starts."
        );
        return;
      }

      // ==========================================
      // CHECK PAYMENT BEFORE COMPLETED
      // ==========================================
      if (
        newStatus === BookingStatus.COMPLETED &&
        (!payment || payment.status !== PaymentStatus.PAID)
      ) {
        toast.error(
          "Not Paid! Customer must pay before the job is completed."
        );
        return;
      }

      setLoading(true);

      const result = await updateStatusAction(newStatus, id);

      console.log("result action:", result);

      if (result.success) {
        toast.success(
          `Booking status updated to ${newStatus
            .replace("_", " ")
            .toLowerCase()} successfully!`
        );

        router.refresh();
      } else {
        toast.error(
          result.message ||
            result.errors?.[0]?.message ||
            "Failed to update booking status."
        );
      }
    } catch (error) {
      console.error("Update status error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const renderTechnicianActions = (
    status: BookingStatus,
    id: string
  ) => {
    switch (status) {
      // ==========================================
      // REQUESTED
      // ==========================================
      case BookingStatus.REQUESTED:
        return (
          <div className="flex justify-end gap-2">
            <Button
              disabled={loading}
              onClick={() =>
                handleUpdate(
                  BookingStatus.ACCEPTED,
                  id
                )
              }
              size="sm"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Accept
            </Button>

            <Button
              disabled={loading}
              onClick={() =>
                handleUpdate(
                  BookingStatus.DECLINED,
                  id
                )
              }
              size="sm"
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              Decline
            </Button>
          </div>
        );

      // ==========================================
      // ACCEPTED
      // ==========================================
      case BookingStatus.ACCEPTED:
        return (
          <Button
            disabled={loading}
            onClick={() =>
              handleUpdate(
                BookingStatus.IN_PROGRESS,
                id
              )
            }
            size="sm"
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Mark In-Progress
          </Button>
        );

      // ==========================================
      // IN_PROGRESS
      // ==========================================
      case BookingStatus.IN_PROGRESS:
        return (
          <Button
            disabled={loading}
            onClick={() =>
              handleUpdate(
                BookingStatus.COMPLETED,
                id
              )
            }
            size="sm"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Mark Completed
          </Button>
        );

      // ==========================================
      // DEFAULT
      // ==========================================
      default:
        return (
          <span className="text-xs text-muted-foreground">
            No actions
          </span>
        );
    }
  };

  return (
    <TableCell className="text-right">
      {renderTechnicianActions(
        booking.status,
        booking.id
      )}
    </TableCell>
  );
};

export default UpdateStatus;