import express, { Request, Response } from 'express'
import { userRegister } from '../controllers/user.controller'
import { validate } from '../middlewares/validateResource'
import { createUserSchema } from '../schemas/user.schema'

const router = express.Router()

router.route('/').get((_req: Request, res: Response) => res.send('hello user'))

// router.route('/login').post(userLogin)

router.route('/').post(validate(createUserSchema), userRegister)

export default router
