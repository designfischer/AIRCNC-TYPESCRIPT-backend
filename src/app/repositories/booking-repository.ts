import Booking from "../../database/models/Booking"

export async function createBookingRespository(data: IBookingModel) {
    const booking = await Booking.create(data)
    return booking
}

export async function getBookingByIdRepository(_id: string) {
    const booking = await Booking.findById(_id).populate('spot').populate('user')
    return booking
}

export async function getBookingsByArrayOfSpots(array_of_spots: string[]) {
    const bookings = await Booking.find({ spot: { $in: array_of_spots } })
        .populate('spot')
        .populate('user')
    return bookings
}