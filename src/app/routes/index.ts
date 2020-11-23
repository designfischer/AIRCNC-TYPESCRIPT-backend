import { Router } from 'express'
import { createUser, getUsers, deleteUser } from '../controllers/user-controller'

const routes = Router()

routes.get('/', (req, res) => res.send('API Aircnc in Typescript'))

routes.get('/users', getUsers)
routes.post('/users', createUser)
routes.delete('/users', deleteUser)

export default routes