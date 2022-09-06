import express from 'express'
import { userLoginController } from '../controllers/auth_controllers/login.controller'
import { userRegisterController } from '../controllers/auth_controllers/register.controller'
import { requireUser } from '../controllers/auth_controllers/jwt_utils/requireUser'
import { userLogoutController } from '../controllers/auth_controllers/logout.controller'

const router = express.Router()

router.post('/login', userLoginController)

router.post('/register', userRegisterController)

router.delete('/logout', requireUser, userLogoutController)

export default router
