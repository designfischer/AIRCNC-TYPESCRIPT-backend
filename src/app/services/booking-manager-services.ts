import { formatResponse } from "../helpers"
import { getBookingByIdRepository, getBookingsByArrayOfSpots } from "../repositories/booking-repository"
import { getSpotByIdAndUserRepository, getSpotsByUserRepository } from "../repositories/spot-repository"

export async function approveBookingService(booking_id: string, owner_id: string) {
    const BOOKING_STATUS = 'approved'
    const booking = await getBookingByIdRepository(booking_id)
    if (!booking) return formatResponse(404) 

    const spotOwner = await getSpotByIdAndUserRepository(owner_id, booking.spot)
    if (!spotOwner) return formatResponse(403, { message: 'Not allowed' })
    
    booking.status = BOOKING_STATUS
    await booking.save()
    return formatResponse(200, booking)
}

export async function refuseBookingService(booking_id: string, owner_id: string) {
    const BOOKING_STATUS = 'refused'
    const booking = await getBookingByIdRepository(booking_id)
    if (!booking) return formatResponse(404) 

    const spotOwner = await getSpotByIdAndUserRepository(owner_id, booking.spot)
    if (!spotOwner) return formatResponse(403, { message: 'Not allowed' })
    
    booking.status = BOOKING_STATUS
    await booking.save()
    return formatResponse(200, booking)
}

export async function getBookingsRequetsService(owner_id: string) {
    const mySpots = await getSpotsByUserRepository(owner_id)
    if (mySpots.length === 0) return formatResponse(404)
    const mySpotsIdsArray: string[] = mySpots.map(spot => spot._id)
    const boookingRequest = await getBookingsByArrayOfSpots(mySpotsIdsArray)        
    return formatResponse(200, boookingRequest)
}

export async function getBookingByIdService(booking_id: string) {
    const booking = await getBookingByIdRepository(booking_id)
    if (!booking) return formatResponse(404)
    return formatResponse(200, booking)
}