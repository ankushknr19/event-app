import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { UserModel } from '../../database/models/user.model'
import { SALT_ROUND } from '../../config/env'
import bcrypt from 'bcrypt'
import _ from 'lodash'

dotenv.config()

// @desc register a new user
// @route POST /api/users
// @access public

export const userRegisterController = async (req: Request, res: Response) => {
	try {
		//get data from req.body and validate it

		//the request object is already validated before coming here
		//using validate middleware in routes
		const { email, password, user_type } = req.body

		//check if email exists
		const checkDB = await UserModel.findOne({ email }).select('email')
		if (checkDB) {
			throw new Error('email already exists')
		}

		//encrypt the password
		const saltRound = parseInt(SALT_ROUND!)
		const salt = await bcrypt.genSalt(saltRound)
		const hashedPassword = bcrypt.hashSync(password, salt)

		//save in database
		const newUser = await UserModel.create({
			email,
			password: hashedPassword,
			user_type,
		})

		//send the response but omit the password
		res.status(201).json(_.omit(newUser.toJSON(), 'password'))
	} catch (error: any) {
		res.status(404).send(error.message)
	}
}
