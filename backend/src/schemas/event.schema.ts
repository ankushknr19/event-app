import { z } from 'zod'

export const createEventSchema = z.object({
	body: z.object({
		name: z
			.string({
				required_error: 'Event name is required',
			})
			.min(3)
			.max(30),
		organizer: z
			.string({
				required_error: 'Organizer name is required',
			})
			.min(3)
			.max(30),
		category: z.string({
			required_error: 'Event category is required',
		}),
		event_type: z.string({
			required_error: 'Event type is required',
		}),
		venue: z
			.string({
				required_error: 'Venue is required',
			})
			.min(3)
			.max(30),
		location: z
			.string({
				required_error: 'Location is required',
			})
			.min(4)
			.max(100),
		start_date: z.string({
			required_error: 'Start date is required',
		}),
		end_date: z.string({
			required_error: 'End date is required',
		}),
		time: z.string().max(30).optional(),
		description: z.string().max(500).optional(),
		tags: z.array(z.string()).optional(),
		ticket_type: z.enum(['paid', 'free']),
		ticket_price: z.number({
			required_error: 'Ticket price is required',
		}),

		image: z.string().optional(),
		contact: z.array(z.number()).optional(),
	}),
})
