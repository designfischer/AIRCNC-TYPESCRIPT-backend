import mongoose from 'mongoose'

interface IBookingModel extends mongoose.Document {
    date: string,
    status: string,
    user: string,
    spot: string | {
        techs: string[],
        _id: string,
        image: string,
        company: string,
        price: number,
        user: string
    }
}

const Schema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        lowercase: true
    },
    status: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot',
        required: true
    }
})

export default mongoose.model<IBookingModel>('Booking', Schema)