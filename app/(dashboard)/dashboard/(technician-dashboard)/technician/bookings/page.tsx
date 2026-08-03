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
import { Button } from "@/components/ui/button"
import UpdateStatus from './_components/UpdateStatus'
import { getAllBooking } from './_actions/bookingAction'
import { BookingStatus } from '../../../../../../utils/type'


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

interface BookingApiResponse {
  data: Booking[]
}

// const bookingsData = [
//   {
//     id: "63991200-e5c5-4b61-99b1-4f66020fe580",
//     userId: "91893ab3-180f-4b70-9f44-0253c9250d04",
//     technicianId: "0b038471-3923-4595-83c6-8b2563cbfdb8",
//     serviceId: "806cd8ce-ee3e-4f75-b689-4e84d60b2e97",
//     scheduledDate: "2026-07-30T08:30:00.000Z",
//     address: "Sonadanga, Khulna",
//     status: "COMPLETED",
//     totalAmount: 1300,
//     cancelledAt: null,
//     completedAt: "2026-07-26T16:46:39.414Z",
//     createdAt: "2026-07-26T16:37:33.827Z",
//     updatedAt: "2026-07-26T16:46:39.421Z"
//   },
//   {
//     id: "74002311-f6d6-5c72-00c2-5g7713fg6f91",
//     userId: "82782za2-291g-5c81-0g55-1364d1361e15",
//     technicianId: "0b038471-3923-4595-83c6-8b2563cbfdb8",
//     serviceId: "917de9df-ff4f-5g86-c790-5f95e7dc3f08",
//     scheduledDate: "2026-08-05T10:00:00.000Z",
//     address: "Rupsha, Khulna",
//     status: "REQUESTED",
//     totalAmount: 1500,
//     cancelledAt: null,
//     completedAt: null,
//     createdAt: "2026-08-03T11:20:00.000Z",
//     updatedAt: "2026-08-03T11:20:00.000Z"
//   },
//   {
//     id: "85113422-a7e7-6d83-11d3-6h8824gh7g02",
//     userId: "71671yb1-382h-6d92-1h66-2475e2472f26",
//     technicianId: "0b038471-3923-4595-83c6-8b2563cbfdb8",
//     serviceId: "028ef0eg-gg5g-6h97-d801-6g06f8ed4g19",
//     scheduledDate: "2026-08-04T14:00:00.000Z",
//     address: "Boyra, Khulna",
//     status: "IN_PROGRESS",
//     totalAmount: 2200,
//     cancelledAt: null,
//     completedAt: null,
//     createdAt: "2026-08-02T09:15:00.000Z",
//     updatedAt: "2026-08-03T08:00:00.000Z"
//   },
//   {
//     id: "96224533-b8f8-7e94-22e4-7i9935hi8h13",
//     userId: "60560xa0-471i-7ea1-2i77-3586f3583g37",
//     technicianId: "0b038471-3923-4595-83c6-8b2563cbfdb8",
//     serviceId: "139fg1fh-hh6h-7i08-e912-7h17g9fe5h20",
//     scheduledDate: "2026-08-06T11:00:00.000Z",
//     address: "Goalpara, Khulna",
//     status: "ACCEPTED",
//     totalAmount: 1800,
//     cancelledAt: null,
//     completedAt: null,
//     createdAt: "2026-08-03T12:00:00.000Z",
//     updatedAt: "2026-08-03T12:30:00.000Z"
//   },
//   {
//     id: "07335644-c9g9-8f05-33f5-8j0046ij9i24",
//     userId: "50450w9-582j-8fb2-3j88-4697g4694h48",
//     technicianId: "0b038471-3923-4595-83c6-8b2563cbfdb8",
//     serviceId: "240gh2gi-ii7i-8j19-f023-8i28h0gf6i31",
//     scheduledDate: "2026-08-07T09:00:00.000Z",
//     address: "Khalishpur, Khulna",
//     status: "PAID",
//     totalAmount: 2500,
//     cancelledAt: null,
//     completedAt: null,
//     createdAt: "2026-08-03T13:00:00.000Z",
//     updatedAt: "2026-08-03T13:30:00.000Z"
//   }
// ]

const getStatusBadge = (status:string) => {
  switch (status) {
    case "REQUESTED":
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Requested</Badge>
    case "ACCEPTED":
      return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Accepted</Badge>
    case "DECLINED":
      return <Badge className="bg-red-500 hover:bg-red-600 text-white">Declined</Badge>
    case "PAID":
      return <Badge className="bg-purple-500 hover:bg-purple-600 text-white">Paid</Badge>
    case "IN_PROGRESS":
      return <Badge className="bg-green-600 hover:bg-green-700 text-white">In-Progress</Badge>
    case "COMPLETED":
      return <Badge className="bg-gray-500 hover:bg-gray-600 text-white">Completed</Badge>
    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}



const BookingAll = async() => {
  const result=await getAllBooking()
  const bookingsData=result.data.length?result.data:[]
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
            {bookingsData.map((booking:Booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium text-xs text-muted-foreground">
                  {booking.id.slice(0, 8)}...
                </TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>{new Date(booking.scheduledDate).toLocaleDateString()}</TableCell>
                <TableCell className="font-bold">৳{booking.totalAmount}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <UpdateStatus  booking={booking}></UpdateStatus>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default BookingAll