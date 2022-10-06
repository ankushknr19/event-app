import { EventModel } from '../../models/event.model'
import { NextFunction, Request, Response } from 'express'
import { createEventSchema } from '../../schemas/event.schema'

//@desc POST create a new event by organizer
//@route /api/events
//@access Private

export async function createEventController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const result = await createEventSchema.validateAsync(req.body)
		const {
			name,
			organizer,
			category,
			event_type,
			venue,
			location,
			start_date,
			end_date,
			time,
			description,
			tags,
			ticket_type,
			ticket_price,
			image,
			contact,
		} = result

		const user = res.locals.user.userId

		const newEvent = await EventModel.create({
			user,
			name,
			organizer,
			category,
			event_type,
			venue,
			location,
			start_date,
			end_date,
			time,
			description,
			tags,
			ticket: {
				type: ticket_type,
				price: ticket_price,
			},
			image,
			contact,
		})

		res.status(201).send(newEvent)
	} catch (error: any) {
		next(error)
	}
}
