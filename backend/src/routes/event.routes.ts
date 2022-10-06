import { Router } from 'express'
import { createEventController } from '../controllers/event_controllers/createEvent.controller'
import { requireUser } from '../middlewares/requireUser'
import { getAllEventsController } from '../controllers/event_controllers/getAllEvents.controller'
import {
	createCategoryController,
	getAllCategoryController,
} from '../controllers/event_controllers/category.controller'

const router = Router()

router
	.route('/')
	.get(requireUser, getAllEventsController)
	.post(requireUser, createEventController)

router
	.route('/categories')
	.get(getAllCategoryController)
	.post(requireUser, createCategoryController)

export default router
