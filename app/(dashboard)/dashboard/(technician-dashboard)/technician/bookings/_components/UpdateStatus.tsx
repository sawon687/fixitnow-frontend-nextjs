'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TableCell } from '../../../../../../../components/ui/table'
import { Button } from '../../../../../../../components/ui/button'
import { updateStatusAction } from '../_actions/bookingAction'
import { toast } from 'sonner'
import { BookingStatus } from '../../../../../../../utils/type'

interface UpdateStatusProps {
  booking: {
    id: string
    status: string | BookingStatus
  }
}

const UpdateStatus = ({ booking }: UpdateStatusProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpdate = async (newStatus: string, id: string) => {
    try {
      setLoading(true)
      const result = await updateStatusAction(newStatus, id)

      if (result.success) {
        toast.success(`Booking status updated to ${newStatus.replace('_', ' ')} successfully!`)
        router.refresh() // Refreshes the Server Component to pull fresh DB data
      } else {
        toast.error(result.message || "Failed to update status")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  const renderTechnicianActions = (status: string, id: string) => {
    switch (status) {
      case "REQUESTED":
        return (
          <div className="flex justify-end gap-2">
            <Button 
              disabled={loading}
              onClick={() => handleUpdate(BookingStatus.ACCEPTED, id)} 
              size="sm" 
              variant="outline" 
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              Accept
            </Button>
            <Button 
              disabled={loading}
              onClick={() => handleUpdate(BookingStatus.DECLINED, id)} 
              size="sm" 
              variant="outline" 
              className="text-destructive border-destructive hover:bg-destructive/10"
            >
              Decline
            </Button>
          </div>
        )
      case "ACCEPTED":
      case "PAID":
        return (
          <Button 
            disabled={loading}
            onClick={() => handleUpdate(BookingStatus.IN_PROGRESS, id)} 
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Mark In-Progress
          </Button>
        )
      case "IN_PROGRESS":
        return (
          <Button 
            disabled={loading}
            onClick={() => handleUpdate(BookingStatus.COMPLETED, id)} 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Mark Completed
          </Button>
        )
      default:
        return <span className="text-xs text-muted-foreground">No actions</span>
    }
  }

  return (
    <TableCell className="text-right">
      {renderTechnicianActions(booking.status as string, booking.id as string)}
    </TableCell>
  )
}

export default UpdateStatus