import express from 'express'
import { registerUser, loginUser, registerBreeder, loginBreeder, verifyToken } from '../controllers/authController.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/registerBreeder').post(registerBreeder)
router.route('/loginBreeder').post(loginBreeder)

router.route('/verifyToken').post(verifyToken)

export default router