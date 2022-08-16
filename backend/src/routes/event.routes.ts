import { Router } from 'express'
import { createEventController } from '../controllers/event_controllers/createEvent.controller'
import { validateResource } from '../middlewares/validateResource'
import { requireUser } from '../middlewares/requireUser'
import { createEventSchema } from '../schemas/event.schema'
import { getAllEventsController } from '../controllers/event_controllers/getAllEvents.controller'

const router = Router()

router
	.route('/')
	.get(getAllEventsController)
	.post(
		requireUser,
		validateResource(createEventSchema),
		createEventController
	)

export default router
