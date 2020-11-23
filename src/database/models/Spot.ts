import mongoose from 'mongoose'

interface ISpotModel extends mongoose.Document {
    image: string,
    company: string,
    price?: number,
    techs?: string[],
    user: string
}

const Schema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default mongoose.model<ISpotModel>('Spot', Schema)