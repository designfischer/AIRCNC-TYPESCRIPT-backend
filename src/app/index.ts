import express from 'express'
import cors from 'cors'
import routes from './routes'
import { connectToDatabase } from '../database'

const app = express()

connectToDatabase()

app.use(cors())
app.use(routes)

export default app