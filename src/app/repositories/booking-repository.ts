import Booking from "../../database/models/Booking"

export async function createBookingRespository(data: IBookingModel) {
    const booking = await Booking.create(data)
    return booking
}