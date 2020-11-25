import { covertStringToArray, formatResponse } from '../helpers'
import { 
    createSpotRepository,
    deleteByIdAndUserRepository,
    getSpotsByTechRepository,
    getSpotsRespository,
    getSpotsByUserRepository,
    getSpotByIdRepository
} from '../repositories/spot-repository'

export async function createSpotService(body: ISpotBody, user_id: string) {    
    const techsArray = covertStringToArray(body.techs)
    const spot = await createSpotRepository({
        ...body,
        techs: techsArray,
        user: user_id
    })
    return formatResponse(201, spot)
}

export async function deleteSpotService(spot_id: string, user_id: string) {
    const deletedSpot = await deleteByIdAndUserRepository(user_id, spot_id)
    if (!deletedSpot) return formatResponse(400, { message: 'Not found' })
    return formatResponse(200, { message: 'Deleted', deletedSpot })
}

export async function getSpotsService(tech?: string) {    
    if (tech) {
        const techsArray = covertStringToArray(tech)
        const spots = await getSpotsByTechRepository(techsArray)
        if (spots.length === 0) return formatResponse(404)
        return formatResponse(200, spots)
    }
    const spots = await getSpotsRespository()
    if (spots.length === 0) return formatResponse(404)
    return formatResponse(200, spots)
}

export async function getSpotsByUserService(user_id: string) {
    const spots = await getSpotsByUserRepository(user_id)
    if (spots.length === 0) return formatResponse(404)
    return formatResponse(200, spots)
}

export async function getSpotByIdService(spot_id: string) {
    const spot = await getSpotByIdRepository(spot_id)
    if (!spot) return formatResponse(404)
    return formatResponse(200, spot)
}