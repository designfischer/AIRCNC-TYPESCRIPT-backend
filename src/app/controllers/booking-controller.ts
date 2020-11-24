import { Request, Response } from 'express'
import Booking from '../../database/models/Booking'
import { formatResponse } from '../helpers'

export async function createBooking(req: Request, res: Response) {
    try {
        const user_id = req.headers.user_id as string
        const { spot_id } = req.params
        const body: { date: string } = req.body
        const response = await createBookingService(user_id, spot_id, body.date)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function createBookingService(user_id: string, spot_id: string, date: string) {
    const BOOKING_STATUS = 'pending'
    const booking = await Booking.create({
        user: user_id,
        spot: spot_id,
        date: date,
        status: BOOKING_STATUS
    })
    await booking.populate('spot').populate('user').execPopulate()
    return formatResponse(201, booking)
}