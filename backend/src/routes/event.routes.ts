import { Router } from 'express'
import { createEventController } from '../controllers/event_controllers/createEvent.controller'
import { validateResource } from '../middlewares/validateResource'
import { requireUser } from '../middlewares/requireUser'
import { createEventSchema } from '../schemas/event.schema'

const router = Router()

router
	.route('/')
	.post(
		requireUser,
		validateResource(createEventSchema),
		createEventController
	)

export default router
