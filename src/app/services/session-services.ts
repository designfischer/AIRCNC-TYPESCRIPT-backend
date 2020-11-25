import { formatResponse } from '../helpers'
import { getUserByEmailRepository } from '../repositories/user-repository'

export async function createSessionService(email: string) {
    const user = await getUserByEmailRepository(email)
    if (!user) return formatResponse(404, { message: 'Not found' })
    return formatResponse(200, user)
}