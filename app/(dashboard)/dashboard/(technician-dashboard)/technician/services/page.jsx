import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {getMyService} from '../services/_actions/Service'

// const servicesData = [
//   {
//     id: 'd7a89684-b440-4950-b595-737583ff0b37',
//     technicianId: 'dfd9456e-ff7a-4178-9a7f-17b357b51249',
//     categoryId: '979824a4-5ce0-477d-ba93-0ef45ae7fb03',
//     title: 'Professional Home Electrical Repair',
//     description: 'Expert electrical repair services including wiring, switch replacement, circuit breaker repair, fan installation, and troubleshooting for residential properties.',
//     price: 1300,
//     priceType: 'Fixed',
//     isActive: true,
//     createdAt: '2026-08-03T14:37:17.511Z'
//   },
//   {
//     id: 'e8b91795-c551-5061-c606-848694gg1c48',
//     technicianId: 'dfd9456e-ff7a-4178-9a7f-17b357b51249',
//     categoryId: '979824a4-5ce0-477d-ba93-0ef45ae7fb03',
//     title: 'Advanced Plumbing & Pipe Leak Fix',
//     description: 'Comprehensive plumbing solutions covering leak detection, pipe replacement, faucet installation, drain cleaning, and emergency water fixture maintenance.',
//     price: 1500,
//     priceType: 'Fixed',
//     isActive: true,
//     createdAt: '2026-08-03T15:00:00.000Z'
//   },
//   {
//     id: 'f9c02806-d662-6172-d717-959705hh2d59',
//     technicianId: 'dfd9456e-ff7a-4178-9a7f-17b357b51249',
//     categoryId: '979824a4-5ce0-477d-ba93-0ef45ae7fb03',
//     title: 'AC Maintenance & Deep Cleaning',
//     description: 'Full air conditioner servicing, filter cleaning, gas refilling, cooling efficiency checks, and complete compressor checkups for summer readiness.',
//     price: 2200,
//     priceType: 'Fixed',
//     isActive: false,
//     createdAt: '2026-08-03T16:15:00.000Z'
//   }
// ]

const MyServices = async() => {

    const result=await getMyService()
    const servicesData=result.data
  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold tracking-tight mb-6">My Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service) => (
          <Card key={service.id} className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <Badge variant={service.isActive ? "default" : "secondary"}>
                  {service.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription className="line-clamp-3 mt-2">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ৳{service.price} <span className="text-xs font-normal text-muted-foreground">/ {service.priceType}</span>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground border-t pt-4">
              Created: {new Date(service.createdAt).toLocaleDateString()}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyServices