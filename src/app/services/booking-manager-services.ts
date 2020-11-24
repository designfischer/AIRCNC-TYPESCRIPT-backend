import Booking from "../../database/models/Booking"
import Spot from "../../database/models/Spot"
import { formatResponse } from "../helpers"

export async function approveBookingService(booking_id: string, owner_id: string) {
    const BOOKING_STATUS = 'approved'
    const booking = await Booking.findById(booking_id).populate('spot')
    if (!booking) return formatResponse(404) 

    const spotOwner = await Spot.findOne({ user: owner_id }).where({ _id: booking.spot })
    if (!spotOwner) return formatResponse(403, { message: 'Not allowed' })
    
    booking.status = BOOKING_STATUS
    await booking.save()
    return formatResponse(200, booking)
}

export async function refuseBookingService(booking_id: string, owner_id: string) {
    const BOOKING_STATUS = 'refused'
    const booking = await Booking.findById(booking_id).populate('spot')
    if (!booking) return formatResponse(404) 

    const spotOwner = await Spot.findOne({ user: owner_id }).where({ _id: booking.spot })
    if (!spotOwner) return formatResponse(403, { message: 'Not allowed' })
    
    booking.status = BOOKING_STATUS
    await booking.save()
    return formatResponse(200, booking)
}