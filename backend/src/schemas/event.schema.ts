import Joi from 'joi'

export const createEventSchema = Joi.object({
	name: Joi.string().min(3).max(60).required(),
	organizer: Joi.string().min(3).max(60).required(),
	category: Joi.string().required(),
	event_type: Joi.string().required(),
	venue: Joi.string().min(3).max(60).required(),
	location: Joi.string().min(4).max(200).required(),
	start_date: Joi.string().required(),
	end_date: Joi.string().required(),
	time: Joi.string().max(30).optional(),
	description: Joi.string().max(2000).allow('').optional(),
	tags: Joi.array().items(Joi.string()).optional(),
	ticket_type: Joi.string().valid('paid', 'free'),
	ticket_price: Joi.number().required(),
	image: Joi.string().allow('').optional(),
	contact: Joi.array().items(Joi.number()).optional(),
})
