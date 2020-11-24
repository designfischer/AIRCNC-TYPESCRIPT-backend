import { Request, Response } from 'express'
import { createSpotService, deleteSpotService, getSpotsByUserService } from '../services/spot-services'

export async function getSpotsByUser(req: Request, res: Response) {
    try {
        const user_id = req.headers.user_id as string
        const response = await getSpotsByUserService(user_id)
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
