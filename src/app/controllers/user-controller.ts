import { Request, Response } from 'express'
import { createUserService, deleteUserService, getUsersService } from '../services/user-services'

export async function createUser(req: Request, res: Response) {    
    try {
        const body: IUserBody = req.body        
        const response = await createUserService(body)
        return res.status(response.status).json(response.data)
    } catch(err) {        
        return res.status(500).json(err)
    }    
}

export async function getUsers(req: Request, res: Response) {
    try {
        const response = await getUsersService()
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { user_id } = req.params
        const response = await deleteUserService(user_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}