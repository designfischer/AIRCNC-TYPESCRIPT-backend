import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => res.send('API Aircnc in Typescript'))

export default routes