// middleware to add the user in the request object
// gets access token from headers, verifies it and puts the decoded data into res.locals
//used in index.js

import { get } from 'lodash' //makes little bit safe to access property that we dont know if exists or not
import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt.utils'

export const deserializeUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//get access token from cookies
	const cookies = get(req, 'headers.cookie')
	if (!cookies) {
		return next()
	}
	const accessToken = cookies?.split('=')[1]
	//verify token
	const { valid, decoded, expired } = verifyJwt(accessToken)
	//put user in res.locals
	if (valid && !expired) {
		res.locals.user = decoded //decoded has data passed when signing jwt: userId
		return next()
	}
	if (expired) {
		//reissue access token
		res.status(401).send('access token expired')
		return next()
	}
	next()
}
