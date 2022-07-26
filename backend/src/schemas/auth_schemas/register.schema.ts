import Joi from 'joi'

export const userRegisterSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).max(30).required(),
	role: Joi.string().valid('user', 'organizer', 'admin'),
})
