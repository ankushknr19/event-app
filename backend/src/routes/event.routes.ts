import { Router } from 'express'
import { createEventController } from '../controllers/event_controllers/createEvent.controller'
import { requireUser } from '../controllers/auth_controllers/jwt_utils/requireUser'
import { getAllEventsController } from '../controllers/event_controllers/getAllEvents.controller'

const router = Router()

router
	.route('/')
	.get(getAllEventsController)
	.post(requireUser, createEventController)

export default router
