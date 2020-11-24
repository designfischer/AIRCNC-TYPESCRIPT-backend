import { Router } from 'express'
import { createSession } from '../controllers/session-controller'
import { createSpot } from '../controllers/spot-controller'
import { createUser, getUsers, deleteUser } from '../controllers/user-controller'

const routes = Router()

routes.get('/', (req, res) => res.send('API Aircnc in Typescript'))

routes.post('/sessions', createSession)

routes.get('/users', getUsers)
routes.post('/users', createUser)
routes.delete('/users/:user_id', deleteUser)

routes.post('/spots', createSpot)

export default routes