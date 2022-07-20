import express from 'express'
import { userLogin } from '../controllers/session.controller'
import { validate } from '../middlewares/validateResource'
import { loginUserSchema } from '../schemas/session.schema'

const router = express.Router()

router.route('/').post(validate(loginUserSchema), userLogin)

export default router
