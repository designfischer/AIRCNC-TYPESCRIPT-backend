import { Request, Response } from 'express'
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

}