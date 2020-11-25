interface IUserBody {
    email: string
}

interface ISpotBody {
    image: string,
    company: string,
    price?: number,
    techs?: string
}

interface ISpotModel {
    image: string,
    company: string,
    price?: number,
    techs?: string[],
    user: string
}