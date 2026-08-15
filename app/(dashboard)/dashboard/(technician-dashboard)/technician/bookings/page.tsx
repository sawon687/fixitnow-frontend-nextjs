import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import UpdateStatus from './_components/UpdateStatus'
import { getAllBooking } from './_actions/bookingAction'
import { BookingStatus } from '../../../../../../utils/type'
import BookingStatusColor from '../../../../../../components/shared/BookingStatusColor'

interface Booking {
  id: string
  userId: string
  technicianId: string
  serviceId: string
  scheduledDate: string
  address: string
  status: BookingStatus
  totalAmount: number
  cancelledAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
}



const BookingAll = async () => {
  const result = await getAllBooking()
  const bookingsData = result?.data?.length ? result.data : []

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Booking Management</h2>
      </div>

      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingsData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookingsData.map((booking: Booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium text-xs text-muted-foreground">
                    {booking.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{booking.address}</TableCell>
                  <TableCell>{new Date(booking.scheduledDate).toLocaleDateString()}</TableCell>
                  <TableCell className="font-bold">৳{booking.totalAmount}</TableCell>
                  <TableCell><BookingStatusColor status={booking.status}/></TableCell>
                  <UpdateStatus booking={booking} />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default BookingAll