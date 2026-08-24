import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UpdateStatus from "./_components/UpdateStatus";
import { getAllBooking } from "./_actions/bookingAction";
import { BookingStatus, IBooking } from "../../../../../../utils/type";
import BookingStatusColor from "../../../../../../components/shared/BookingStatusColor";




const BookingAllpage = async () => {
  const result = await getAllBooking();

  const bookingsData: IBooking[] = result?.data?.length
    ? result.data
    : [];

  console.log("bookingData", bookingsData);

  return (
    <div className="container mx-auto py-10 px-4">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Booking Management
          </h2>

          <p className="text-muted-foreground mt-1">
            Manage bookings and payment history
          </p>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="border rounded-md bg-card overflow-x-auto">
        <Table>
          {/* ================= TABLE HEADER ================= */}
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>

              <TableHead>Address</TableHead>

              <TableHead>Scheduled Date</TableHead>

              <TableHead>Total Amount</TableHead>

              <TableHead>Booking Status</TableHead>

              <TableHead>Paid Amount</TableHead>

              <TableHead>Payment Status</TableHead>

              <TableHead>Payment Method</TableHead>

              <TableHead>Transaction ID</TableHead>

              <TableHead>Paid At</TableHead>

              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* ================= TABLE BODY ================= */}
          <TableBody>
            {bookingsData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center py-6 text-muted-foreground"
                >
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookingsData.map((booking: IBooking) => {
                // Payment is a single object now
                const payment = booking?.payment;
                console.log('payment',payment)
                return (
                  <TableRow key={booking.id}>
                    {/* ================= BOOKING ID ================= */}
                    <TableCell className="font-medium text-xs text-muted-foreground">
                      {booking.id.slice(0, 8)}...
                    </TableCell>

                    {/* ================= ADDRESS ================= */}
                    <TableCell className="max-w-[200px] truncate">
                      {booking.address}
                    </TableCell>

                    {/* ================= SCHEDULED DATE ================= */}
                    <TableCell>
                      {new Date(
                        booking.scheduledDate
                      ).toLocaleDateString()}
                    </TableCell>

                    {/* ================= TOTAL BOOKING AMOUNT ================= */}
                    <TableCell className="font-bold">
                      ৳{booking.totalAmount}
                    </TableCell>

                    {/* ================= BOOKING STATUS ================= */}
                    <TableCell>
                      <BookingStatusColor
                        status={booking.status}
                      />
                    </TableCell>

                    {/* ================= PAID AMOUNT ================= */}
                    <TableCell className="font-bold text-green-600">
                      {payment ? `৳${payment.amount}` : "৳0"}
                    </TableCell>

                    {/* ================= PAYMENT STATUS ================= */}
                    <TableCell>
                     <BookingStatusColor status={payment?.status}/>
                    </TableCell>

                    {/* ================= PAYMENT METHOD ================= */}
                    <TableCell>
                      {payment?.method || "—"}
                    </TableCell>

                    {/* ================= TRANSACTION ID ================= */}
                    <TableCell className="text-xs text-muted-foreground">
                      {payment?.transactionId ? (
                        <span title={payment.transactionId}>
                          {payment.transactionId.slice(0, 12)}...
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>

                    {/* ================= PAID AT ================= */}
                    <TableCell>
                      {payment?.paidAt
                        ? new Date(
                            payment.paidAt
                          ).toLocaleDateString()
                        : "—"}
                    </TableCell>

                    {/* ================= ACTIONS ================= */}
                    <UpdateStatus booking={booking} />
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookingAllpage;