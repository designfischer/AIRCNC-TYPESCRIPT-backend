import User from '../../database/models/User'

export async function createUserRepository(email: string) {
    const user = await User.create({ email: email })
    return user
}

export async function getUserByEmailRepository(email: string) {
    const user = await User.findOne({ email: email })
    return user
}

export async function getAllUsersRepository() {
    const users = await User.find()
    return users
}

export async function deleteUserByIdRepository(id: string) {
    const user = await User.findByIdAndRemove(id)
    return user
}