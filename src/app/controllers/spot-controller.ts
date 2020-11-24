import { Request, Response } from 'express'
import { createSpotService, getSpotsService } from '../services/spot-services'

export async function getSpots(req: Request, res: Response) {
    try {
        const tech = req.query.tech as string
        const response = await getSpotsService(tech)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}
