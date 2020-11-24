import { Request, Response } from 'express'

export async function createSpot(req: Request, res: Response) {
    try {
        const body = req.body
        const user_id = req.headers.user_id as string
        const response = await createSpotService(body, user_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function deleteSpot(req: Request, res: Response) {
    try {} catch(err) {
        return res.status(500).json(err)
    }
}

export async function getSpots(req: Request, res: Response) {
    try {} catch(err) {
        return res.status(500).json(err)
    }
}

