import express from 'express'
import { userLoginController } from '../controllers/auth_controllers/login.controller'
import { userLoginSchema } from '../schemas/auth_schemas/login.schema'
import { userRegisterController } from '../controllers/auth_controllers/register.controller'
import { userRegisterSchema } from '../schemas/auth_schemas/register.schema'
import { validate } from '../middlewares/validateResource'
import { verifyUser } from '../middlewares/verifyUser'
import { userLogoutController } from '../controllers/auth_controllers/logout.controller'

const router = express.Router()

router.route('/login').post(validate(userLoginSchema), userLoginController)
router
	.route('/register')
	.post(validate(userRegisterSchema), userRegisterController)

router.route('/logout').get(verifyUser, userLogoutController)

export default router
