import { Request, Response } from 'express'
import { getSpotsByUserService } from '../services/spot-services'

export async function getSpotsByUser(req: Request, res: Response) {
    try {
        const user_id = req.headers.user_id as string
        const response = await getSpotsByUserService(user_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}