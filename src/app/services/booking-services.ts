import Booking from "../../database/models/Booking"
import { formatResponse } from "../helpers"

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