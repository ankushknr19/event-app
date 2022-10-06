import express from 'express'
import { userLoginController } from '../controllers/auth_controllers/login.controller'
import { userRegisterController } from '../controllers/auth_controllers/register.controller'
import { requireUser } from '../middlewares/requireUser'
import { userLogoutController } from '../controllers/auth_controllers/logout.controller'
import { googleOAuthController } from '../controllers/auth_controllers/google_oauth.controller'

const router = express.Router()

router.post('/login', userLoginController)

router.post('/register', userRegisterController)

router.delete('/logout', requireUser, userLogoutController)

router.get('/google', googleOAuthController)

export default router
