import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import { UserModel } from '../../models/user.model'
import { NextFunction, Request, Response } from 'express'
import {
	AccessTokenPayload,
	signAccessToken,
	signRefreshToken,
} from '../../utils/jwt_utils/sign.jwt.utils'
import { userLoginSchema } from '../../schemas/auth_schemas/login.schema'

export const userLoginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//validate data
		const result = await userLoginSchema.validateAsync(req.body)

		//get data from request after validating
		const { email, password } = result

		//find user using email
		const user = await UserModel.findOne({ email })
		if (!user) {
			throw new createHttpError.BadRequest('User not registered')
		}
		//check if password field exists
		if (!user.password)
			throw new createHttpError.Unauthorized('Invalid email/password')
		// check if raw password matches the ecrypted password
		const isValidPassword = bcrypt.compareSync(password, user.password!)
		if (!isValidPassword) {
			throw new createHttpError.Unauthorized('Invalid email/password')
		}

		//sign access token
		const payload: AccessTokenPayload = {
			userId: user._id,
			role: user.role,
		}
		await signAccessToken(res, payload)

		//sign refresh token
		await signRefreshToken(res, user._id)

		//store refresh token id in database
		//done while creating the token

		res.status(200).send({
			message: 'Sucessfully logged in',
			user: user._id,
			role: user.role,
		})
	} catch (error: any) {
		//do not send exact error message from validation
		if (error.isJoi) {
			return next(new createHttpError.BadRequest('Invalid email/password'))
		}
		next(error)
	}
}
