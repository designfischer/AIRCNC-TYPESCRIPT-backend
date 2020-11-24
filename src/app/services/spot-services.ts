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