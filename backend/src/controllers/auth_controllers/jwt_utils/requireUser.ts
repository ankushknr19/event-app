import { get } from 'lodash' //makes little bit safe to access property that we dont know if exists or not
import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from './verify.jwt.utils'
import { reissueTokens } from './reissue.jwt.utils'
import createHttpError from 'http-errors'

export const requireUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//get access token from cookies
		const cookies = get(req, 'cookies')
		const accessToken = cookies.accessToken
		const refreshToken = cookies.refreshToken

		//if the cookie has expired and/or there is no token in cookie
		if (!accessToken) throw new createHttpError.Unauthorized()

		//verify access token
		const { valid, decoded, expired } = await verifyAccessToken(accessToken)

		//put user in res.locals
		if (valid && decoded && !expired) {
			res.locals.user = decoded //decoded has data passed when signing jwt i.e. userId
			return next()
		}

		//refreshing expired access token
		if (expired && refreshToken) {
			//reissue tokens
			const { newAccessToken } = await reissueTokens(res, refreshToken)

			if (!newAccessToken) throw new createHttpError.Unauthorized()
			//verify new access token
			const { valid, decoded, expired } = await verifyAccessToken(
				newAccessToken
			)

			if (!valid || !decoded || expired)
				throw new createHttpError.Unauthorized()

			//put user in res.locals
			if (valid && decoded && !expired) {
				res.locals.user = decoded //decoded has data passed when signing jwt i.e. userId
				return next()
			}
		}
		next()
	} catch (error: any) {
		next(error)
	}
}
