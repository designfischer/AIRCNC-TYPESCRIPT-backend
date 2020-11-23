import mongoose from 'mongoose'

interface IUserModel extends mongoose.Document {
    email: string
}

const Schema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    }
})

export default mongoose.model<IUserModel>('User', Schema)