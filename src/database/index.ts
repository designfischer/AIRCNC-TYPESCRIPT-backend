import mongoose from 'mongoose'

const mongoURL = process.env.MONGO_URL!

export function connectToDatabase() {
    mongoose.connect(mongoURL, {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, () => console.log('Connected to database'))
}