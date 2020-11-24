import { Request, Response } from 'express'
import Spot from '../../database/models/Spot'
import { covertStringToArray, formatResponse } from '../helpers'
import { createSpotService } from '../services/spot-services'

export async function createSpot(req: Request, res: Response) {
    try {
        const body: ISpotBody = req.body
        const user_id = req.headers.user_id as string        
        const response = await createSpotService(body, user_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function deleteSpot(req: Request, res: Response) {
    try {
        const { spot_id } = req.params
        const user_id = req.headers.user_id as string
        const response = await deleteSpotService(spot_id, user_id)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function getSpots(req: Request, res: Response) {
    try {
        const tech = req.query.tech as string
        const response = await getSpotsService(tech)
        return res.status(response.status).json(response.data)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function deleteSpotService(spot_id: string, user_id: string) {
    const deletedSpot = await Spot.findOneAndRemove({ user: user_id }).where({ _id: spot_id })
    if (!deletedSpot) return formatResponse(400, { message: 'Not found' })
    return formatResponse(200, { message: 'Deleted', deletedSpot })
}

export async function getSpotsService(tech?: string) {    
    if (tech) {
        const techsArray = covertStringToArray(tech)
        const spots = await Spot.find({ techs: { $all: techsArray } })
        if (spots.length === 0) return formatResponse(404)
        return formatResponse(200, spots)
    }
    const spots = await Spot.find()
    if (spots.length === 0) return formatResponse(404)
    return formatResponse(200, spots)
}