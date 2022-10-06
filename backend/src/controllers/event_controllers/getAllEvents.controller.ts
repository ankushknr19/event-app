import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { EventModel } from '../../models/event.model'

export async function getAllEventsController(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const allEvents = await EventModel.find()

		if (allEvents.length === 0) throw new createHttpError.NotFound()

		res.status(200).send(allEvents)
	} catch (error: any) {
		next(error)
	}
}
