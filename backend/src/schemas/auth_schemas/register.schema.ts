import { z } from 'zod'

export const userRegisterSchema = z.object({
	body: z.object({
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email('Not a valid email'),
		password: z
			.string({
				required_error: 'Password is required',
			})
			.min(6, 'Password should be of at least 6 characters'),
		user_type: z.enum(['user', 'organizer', 'admin']),
	}),
})
