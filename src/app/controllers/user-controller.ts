import { Request, Response } from 'express'
import User from '../../database/models/User'
import { formatResponse } from '../helpers'

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

}


async function createUserService(body: IUserBody) {
    const { email } = body
    const hasUser = await User.findOne({ email })
    if (hasUser) return formatResponse(409, { message: 'User already exists' })
    const user = await User.create({ email })
    return formatResponse(201, user)
}

async function getUsersService() {
    const users = await User.find()
    if (users.length === 0) return formatResponse(404, { message: 'No users found' })
    return formatResponse(200, users)
}