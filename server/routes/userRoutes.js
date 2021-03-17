import express from 'express'
const router = express.Router()
import{ getAllUsers, registerUser, loginUser} from './userController.js'

router.route('/')
.post(registerUser)
.get(getAllUsers)
router.post('/login', loginUser)
export default router