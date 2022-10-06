import { Response } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import {
	ACCESS_TOKEN_SECRET_KEY,
	ACCESS_TOKEN_TIME_TO_LIVE,
	REFRESH_TOKEN_SECRET_KEY,
	REFRESH_TOKEN_TIME_TO_LIVE,
} from '../../config/env'
import { UserModel } from '../../models/user.model'

export interface AccessTokenPayload {
	userId: Types.ObjectId
	role: string
}

//sign jwt access token async
export const signAccessToken = (res: Response, payload: AccessTokenPayload) => {
	return new Promise<string | undefined>((resolve, reject) => {
		jwt.sign(
			payload,
			ACCESS_TOKEN_SECRET_KEY,
			{
				expiresIn: ACCESS_TOKEN_TIME_TO_LIVE,
			},
			(err, accessToken) => {
				if (err) {
					return reject(new createHttpError.InternalServerError())
				}
				res.cookie('accessToken', accessToken, {
					path: '/',
					maxAge: 30 * 24 * 60 * 60,
					httpOnly: true,
					sameSite: 'lax',
				})
				resolve(accessToken)
			}
		)
	})
}

export const signRefreshToken = async (
	res: Response,
	userId: Types.ObjectId
) => {
	try {
		const refreshTokenId = uuidv4()
		const user = await UserModel.findById(userId)

		//sign new token
		const refreshToken = jwt.sign(
			{
				id: refreshTokenId,
				userId,
			},
			REFRESH_TOKEN_SECRET_KEY,
			{
				expiresIn: REFRESH_TOKEN_TIME_TO_LIVE,
			}
		)
		//store refresh token id in database
		user!.refreshTokenId = refreshTokenId
		await user!.save()

		//store token in cookie
		res.cookie('refreshToken', refreshToken, {
			path: '/',
			maxAge: 30 * 24 * 60 * 60,
			httpOnly: true,
			sameSite: 'lax',
		})

		return { refreshToken, refreshTokenId }
	} catch (error: any) {
		return new createHttpError.InternalServerError()
	}
}
