import { Request, Response, NextFunction } from 'express'

export const requireUser = (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = res.locals.user
	//in deserialzeUser, we put the user in the response object because they had a valid token
	if (!user) {
		return res.status(401).send('unauathorized, invalid token')
	}
	return next() //code shouldn't go any further from here i.e. to controllers
}
