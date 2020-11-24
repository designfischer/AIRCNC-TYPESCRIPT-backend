import { Request, Response } from 'express'
import { createSpotService, deleteSpotService, getSpotsService } from '../services/spot-services'

export async function createSpot(req: Request, res: Response) {
    try {
        const body: ISpotBody = req.body
        const user_id = req.headers.user_id as string        
        const response = await createSpotService(body, user_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function deleteSpot(req: Request, res: Response) {
    try {
        const { spot_id } = req.params
        const user_id = req.headers.user_id as string
        const response = await deleteSpotService(spot_id, user_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function getSpots(req: Request, res: Response) {
    try {
        const tech = req.query.tech as string
        const response = await getSpotsService(tech)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}
