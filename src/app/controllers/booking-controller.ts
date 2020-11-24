import { Request, Response } from 'express'
import Booking from '../../database/models/Booking'
import Spot from '../../database/models/Spot'
import { formatResponse } from '../helpers'
import { createBookingService } from '../services/booking-services'

export async function createBooking(req: Request, res: Response) {
    try {
        const client_id = req.headers.user_id as string
        const { spot_id } = req.params
        const body: { date: string } = req.body
        const response = await createBookingService(client_id, spot_id, body.date)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function approveBooking(req: Request, res: Response) {
    try {
        const { booking_id } = req.params
        const onwer_id = req.headers.user_id as string
        const response = await approveBookingService(booking_id, onwer_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function refuseBooking(req: Request, res: Response) {
    try {
        const { booking_id } = req.params
        const onwer_id = req.headers.user_id as string
        const response = await refuseBookingService(booking_id, onwer_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function getCreatedBookings(req: Request, res: Response) {
    
}

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