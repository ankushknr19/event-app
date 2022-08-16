import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import {
	ACCESS_TOKEN_SECRET_KEY,
	ACCESS_TOKEN_TIME_TO_LIVE,
	REFRESH_TOKEN_SECRET_KEY,
	REFRESH_TOKEN_TIME_TO_LIVE,
} from '../../../config/env'

//sign access token
export const signJwtAccessToken = (res: Response, payload: Object) => {
	const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY!, {
		expiresIn: ACCESS_TOKEN_TIME_TO_LIVE,
	})

	//store access token in cookie and send as response
	res.cookie('accessToken', accessToken, {
		path: '/',
		maxAge: 30 * 24 * 60 * 60,
		httpOnly: true,
	})
	// note: the browser will automatically set the cookie in req.headers using set-cookie
	//but isn't visible to client side because of htppOnly
	//so in frontend, set: {Access-Control-Allow-Credentials: true} in req
	//eg: axios.get('some api url', { withCredentials: true });
	return accessToken
}
//sign refreshToken token
export const signJwtRefreshToken = (res: Response, userId: any) => {
	const refreshTokenId = uuidv4()
	const refreshToken = jwt.sign(
		{
			id: refreshTokenId,
			userId,
		},
		REFRESH_TOKEN_SECRET_KEY!,
		{
			expiresIn: REFRESH_TOKEN_TIME_TO_LIVE,
		}
	)

	//store refresh token in cookie
	res.cookie('refreshToken', refreshToken, {
		path: '/',
		maxAge: 30 * 24 * 60 * 60,
		httpOnly: true,
	})

	return { refreshToken, refreshTokenId }
}
