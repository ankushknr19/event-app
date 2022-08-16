import { Request, Response } from 'express'
import { EventModel } from '../../database/models/event.model'

export async function getAllEventsController(_req: Request, res: Response) {
	try {
		const allEvents = await EventModel.find()

		if (!allEvents) throw new Error('events not found.')

		res.status(200).send(allEvents)
	} catch (error: any) {
		res.status(404).send(error.message)
	}
}
