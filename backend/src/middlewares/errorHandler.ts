import { Response } from 'express'

export const errorHandler = (error: any, res: Response) => {
	console.log('error catched')
	res.status(error.status || 500)
	res.send({
		error: {
			status: error.status || 500,
			message: error.message,
		},
	})
}
