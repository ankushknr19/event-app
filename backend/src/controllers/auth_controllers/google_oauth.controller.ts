import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
// import { CLIENT_ORIGIN } from '../../config/env'
import { v4 as uuidv4 } from 'uuid'
import { UserModel } from '../../models/user.model'
import { getGoogleOAuthTokens } from '../../utils/google_oauth_utils/get.tokens'
import { verifyIdToken } from '../../utils/google_oauth_utils/verify.tokens'
import {
	signAccessToken,
	signRefreshToken,
} from '../../utils/jwt_utils/sign.jwt.utils'

export const googleOAuthController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//get code from query parameter
		const code = req.query.code as string

		//get id token
		const { id_token } = await getGoogleOAuthTokens({ code })

		//verify the token and extract user email from id_token
		const { valid, decoded, expired } = await verifyIdToken(id_token)

		if (!valid || !decoded || expired)
			throw new createHttpError.Unauthorized()

		//upsert user
		const { email } = decoded
		const googleId = uuidv4()
		const user = await UserModel.findOneAndUpdate(
			{ email },
			{
				email,
				isSocial: true,
				googleId,
			},
			{
				upsert: true,
				new: true,
			}
		)

		//sign access token
		await signAccessToken(res, {
			userId: user._id,
			role: user.role,
		})

		//sign refresh token
		await signRefreshToken(res, user._id)

		//redirect back to the client
		// res.redirect(CLIENT_ORIGIN)

		res.status(200).send({
			message: 'Sucessfully logged in',
			userId: user._id,
			email: user.email,
			role: user.role,
		})
	} catch (error: any) {
		next(error)
	}
}
