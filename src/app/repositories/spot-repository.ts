import Spot from '../../database/models/Spot'

export async function createSpotRepository(data: ISpotModel) {
    const spot = await Spot.create(data)
    return spot
}

export async function deleteByIdAndUserRepository() {}

export async function getSpotsByTechRepository() {}

export async function getSpotsByUserRepository() {}

export async function getSpotByIdRepository() {}