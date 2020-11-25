import { Request, Response } from 'express'
import Spot from '../../database/models/Spot'
import { formatResponse } from '../helpers'
import { getSpotsService } from '../services/spot-services'

export async function getSpots(req: Request, res: Response) {
    try {
        const tech = req.query.tech as string
        const response = await getSpotsService(tech)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function getSpotById(req: Request, res: Response) {
    try {
        const { spot_id } = req.params
        const response = await getSpotByIdService(spot_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function getSpotByIdService(spot_id: string) {
    const spot = await Spot.findById(spot_id)
    if (!spot) return formatResponse(404)
    return formatResponse(200, spot)
}
