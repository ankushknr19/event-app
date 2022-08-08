import express from 'express'
import { userLoginController } from '../controllers/auth_controllers/login.controller'
import { userLoginSchema } from '../schemas/auth_schemas/login.schema'
import { userRegisterController } from '../controllers/auth_controllers/register.controller'
import { userRegisterSchema } from '../schemas/auth_schemas/register.schema'
import { validateResource } from '../middlewares/validateResource'
import { requireUser } from '../middlewares/requireUser'
import { userLogoutController } from '../controllers/auth_controllers/logout.controller'

const router = express.Router()

router
	.route('/login')
	.post(validateResource(userLoginSchema), userLoginController)
router
	.route('/register')
	.post(validateResource(userRegisterSchema), userRegisterController)

router.route('/logout').get(requireUser, userLogoutController)

export default router
