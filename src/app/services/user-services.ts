import User from '../../database/models/User'
import { formatResponse } from '../helpers'

export async function createUserService(body: IUserBody) {
    const { email } = body
    const hasUser = await User.findOne({ email })
    if (hasUser) return formatResponse(409, { message: 'User already exists' })
    const user = await User.create({ email })
    return formatResponse(201, user)
}

export async function getUsersService() {
    const users = await User.find()
    if (users.length === 0) return formatResponse(404, { message: 'No users found' })
    return formatResponse(200, users)
}

export async function deleteUserService(user_id: string) {
    const deletedUser = await User.findByIdAndRemove(user_id)
    if (!deletedUser) return formatResponse(404, { message: 'User not found' })
    return formatResponse(200, { message: 'Deleted successfully', deletedUser })
}