import { NextFunction, Request, Response } from 'express'
import logger from './winstonLogger'

export const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	logger.error(err.message)
	const status = err.status || 500
	const message = status === 500 ? 'Internal server error.' : err.message
	res.status(status)
	res.send({
		error: {
			status: err.status || 500,
			message,
		},
	})
}
