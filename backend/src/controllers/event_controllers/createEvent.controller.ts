import { Request, Response } from 'express'
import { EventModel } from '../../database/models/event.model'

//@desc POST create a new event by organizer
//@route /api/events
//@access Private

export async function createEventController(req: Request, res: Response) {
	try {
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
		} = req.body

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
		res.status(404).send(error.message)
	}
}
