import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../../database/models/user.model'
import {
	signJwtAccessToken,
	signJwtRefreshToken,
} from './jwt_utils/sign.jwt.utils'
import { userLoginSchema } from '../../database/schemas/auth_schemas/login.schema'
import createHttpError from 'http-errors'

// @desc user login
// @route POST /api/auth/login
// @access public

export const userLoginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//validate incoming data
		const result = await userLoginSchema.validateAsync(req.body)
		//get data from request after validating
		const { email, password } = result

		//find user using email
		const user = await UserModel.findOne({ email })
		if (!user) {
			throw new createHttpError.BadRequest('User not registered')
		}
		// check if raw password matches the ecrypted password
		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			throw new createHttpError.Unauthorized('Invalid email/password')
		}

		//sign access token
		signJwtAccessToken(res, { userId: user._id, role: user.role })

		//sign refresh token
		const { refreshTokenId } = await signJwtRefreshToken(res, user._id)

		//store refresh token id in database
		user.refreshTokenId = refreshTokenId
		await user.save()

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
