import _ from 'lodash'
import createHttpError from 'http-errors'
import { UserModel } from '../../models/user.model'
import { NextFunction, Request, Response } from 'express'
import { userRegisterSchema } from '../../schemas/auth_schemas/register.schema'
import { SALT_ROUND } from '../../config/env'
import bcrypt from 'bcrypt'

// @desc register a new user
// @route POST /api/auth/register
// @access public

export const userRegisterController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//get data from req.body and validate it
		const result = await userRegisterSchema.validateAsync(req.body)

		const { email, password, role } = result

		//check if email exists
		const checkDB = await UserModel.findOne({ email }).select('email')
		if (checkDB) {
			throw new createHttpError.Conflict('email already exists')
		}

		//encrypt the password
		const saltRound = parseInt(SALT_ROUND!)
		const salt: string = await bcrypt.genSalt(saltRound | 10)
		const hashedPassword = await bcrypt.hash(password, salt)

		//save in database
		const newUser = await UserModel.create({
			email,
			password: hashedPassword,
			role,
		})

		//send the response but omit the password
		res.status(201).json(_.omit(newUser.toJSON(), 'password'))
	} catch (error: any) {
		if (error.isJoi) error.status = 422

		next(error)
	}
}
