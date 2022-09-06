import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../../database/models/user.model'
import _ from 'lodash'
import { userRegisterSchema } from '../../database/schemas/auth_schemas/register.schema'
import createHttpError from 'http-errors'

dotenv.config()

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

		//the request object is already validated before coming here
		//using validate middleware in routes
		const { email, password, role } = result

		//check if email exists
		const checkDB = await UserModel.findOne({ email }).select('email')
		if (checkDB) {
			throw new createHttpError.Conflict('User already exists')
		}

		//encrypt the password
		//done using pre hook inside user model

		//save in database
		const newUser = await UserModel.create({
			email,
			password,
			role,
		})

		//send the response but omit the password
		res.status(201).json(_.omit(newUser.toJSON(), 'password'))
	} catch (error: any) {
		//422 = unprocessable entity
		if (error.isJoi) error.status = 422

		next(error)
	}
}
