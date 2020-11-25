import { formatResponse } from '../helpers'
import { 
    getUserByEmailRepository, 
    createUserRepository, 
    getAllUsersRepository, 
    deleteUserByIdRepository
} from '../repositories/user-repository'

export async function createUserService(body: IUserBody) {
    const { email } = body

    const hasUser = await getUserByEmailRepository(email)
    if (hasUser) return formatResponse(409, { message: 'User already exists' })

    const user = await createUserRepository(email)

    return formatResponse(201, user)
}

export async function getUsersService() {
    const users = await getAllUsersRepository()
    if (users.length === 0) return formatResponse(404, { message: 'No users found' })

    return formatResponse(200, users)
}

export async function deleteUserService(user_id: string) {
    const deletedUser = await deleteUserByIdRepository(user_id)
    if (!deletedUser) return formatResponse(404, { message: 'User not found' })
    
    return formatResponse(200, { message: 'Deleted successfully', deletedUser })
}