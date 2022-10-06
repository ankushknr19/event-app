import Joi from 'joi'

export const categorySchema = Joi.object({
	name: Joi.string().required(),
	types: Joi.array().items(Joi.string()).optional(),
})
