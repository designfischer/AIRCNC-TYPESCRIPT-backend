import { Request, Response } from 'express'
import { getSpotByIdService, getSpotsService } from '../services/spot-services'

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
