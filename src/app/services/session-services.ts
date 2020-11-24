import User from '../../database/models/User'
import { formatResponse } from '../helpers'

export async function createSessionService(email: string) {
    const user = await User.findOne({ email })
    if (!user) return formatResponse(404, { message: 'Not found' })
    return formatResponse(200, user)
}