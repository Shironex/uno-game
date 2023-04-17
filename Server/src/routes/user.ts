
import RegisterPlayer from '../controllers/userController'
import express from 'express'


const router = express.Router()



router.post('/register', RegisterPlayer)

export default router
