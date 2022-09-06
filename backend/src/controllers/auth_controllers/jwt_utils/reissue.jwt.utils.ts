import { Response } from 'express'
import createHttpError from 'http-errors'
import { get } from 'lodash'
import { UserModel } from '../../../database/models/user.model'
import { signJwtAccessToken, signJwtRefreshToken } from './sign.jwt.utils'
import { verifyRefreshToken } from './verify.jwt.utils'

//reissue tokens
export const reissueTokens = (res: Response, refreshToken: string) => {
	return new Promise<{
		newAccessToken: string | undefined
		newRefreshToken: string | undefined
	}>(async (resolve, reject) => {
		const { decoded, expired } = await verifyRefreshToken(refreshToken)
		//if refresh token verification fails
		if (!decoded || !get(decoded, 'userId') || expired) {
			return reject(new createHttpError.Unauthorized())
		}

		//find user
		const user = await UserModel.findById(get(decoded, 'userId'))

		if (!user) {
			return reject(new createHttpError.Unauthorized())
		}

		//sign new tokens
		const newAccessToken = await signJwtAccessToken(res, {
			userId: user._id,
		})
		const { refreshToken: newRefreshToken, refreshTokenId } =
			await signJwtRefreshToken(res, user._id)

		//update refresh token id in database
		user.refreshTokenId = refreshTokenId
		await user.save()

		resolve({ newAccessToken, newRefreshToken }),
			(err: any) => {
				if (err) {
					return reject(new createHttpError.InternalServerError())
				}
			}
	})
}
