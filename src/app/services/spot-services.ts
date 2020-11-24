import Spot from '../../database/models/Spot'
import { covertStringToArray, formatResponse } from '../helpers'

export async function createSpotService(body: ISpotBody, user_id: string) {    
    const techsArray = covertStringToArray(body.techs)
    const spot = await Spot.create({
        ...body,
        techs: techsArray,
        user: user_id
    })
    return formatResponse(201, spot)
}

export async function deleteSpotService(spot_id: string, user_id: string) {
    const deletedSpot = await Spot.findOneAndRemove({ user: user_id }).where({ _id: spot_id })
    if (!deletedSpot) return formatResponse(400, { message: 'Not found' })
    return formatResponse(200, { message: 'Deleted', deletedSpot })
}

export async function getSpotsService(tech?: string) {    
    if (tech) {
        const techsArray = covertStringToArray(tech)
        const spots = await Spot.find({ techs: { $all: techsArray } })
        if (spots.length === 0) return formatResponse(404)
        return formatResponse(200, spots)
    }
    const spots = await Spot.find()
    if (spots.length === 0) return formatResponse(404)
    return formatResponse(200, spots)
}

export async function getSpotsByUserService(user_id: string) {
    const spots = await Spot.find({ user: user_id })
    if (spots.length === 0) return formatResponse(404)
    return formatResponse(200, spots)
}