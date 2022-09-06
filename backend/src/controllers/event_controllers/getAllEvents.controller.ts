import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { EventModel } from '../../database/models/event.model'

//@desc get all the events
//@route GET /api/events
//@access public
export async function getAllEventsController(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const allEvents = await EventModel.find()

		if (!allEvents) throw new createHttpError.NotFound()

		res.status(200).send(allEvents)
	} catch (error: any) {
		next(error)
	}
}
