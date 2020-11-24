import { Request, Response } from 'express'
import { createSessionService } from '../services/session-services'

export async function createSession(req: Request, res: Response) {
    try {
        const body: IUserBody = req.body
        const response = await createSessionService(body.email)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}
