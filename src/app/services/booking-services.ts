import { formatResponse } from "../helpers"
import { createBookingRespository } from "../repositories/booking-repository"

export async function createBookingService(user_id: string, spot_id: string, date: string) {
    const BOOKING_STATUS = 'pending'
    const booking = await createBookingRespository({
        user: user_id,
        spot: spot_id,
        date: date,
        status: BOOKING_STATUS
    })
    await booking.populate('spot').populate('user').execPopulate()
    return formatResponse(201, booking)
}