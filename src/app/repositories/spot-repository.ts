import Spot from '../../database/models/Spot'

export async function createSpotRepository(data: ISpotModel) {
    const spot = await Spot.create(data)
    return spot
}

export async function deleteByIdAndUserRepository(user: string, _id: string) {
    const spot = await Spot.findOneAndRemove({ user }).where({ _id })
    return spot
}

export async function getSpotsByTechRepository(techsArray: string[]) {
    const spots = await Spot.find({ techs: { $all: techsArray } })
    return spots
}

export async function getSpotsRespository() {
    const spots = await Spot.find()
    return spots
}

export async function getSpotsByUserRepository(user: string) {
    const spots = await Spot.find({ user })
    return spots
}

export async function getSpotByIdRepository(spot_id: string) {
    const spot = await Spot.findById(spot_id)
    return spot
}