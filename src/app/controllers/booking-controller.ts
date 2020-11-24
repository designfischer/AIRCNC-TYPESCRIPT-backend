import { Request, Response } from 'express'
import Booking from '../../database/models/Booking'
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

export async function getCreatedBookings(req: Request, res: Response) {
    try {
        const { user_id } = req.params
        const response = await getCreatedBookingsService(user_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function getCreatedBookingsService(client_id: string) {
    const bookings = await Booking.find({ user: client_id }).populate('spot')
    if (bookings.length === 0) return formatResponse(404)
    return formatResponse(200, bookings)
}