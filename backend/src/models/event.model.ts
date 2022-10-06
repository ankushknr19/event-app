import mongoose, { Schema } from 'mongoose'

const eventSchema = new Schema(
	{
		user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
		name: { type: String, required: true },
		organizer: { type: String, required: true },
		category: { type: String, required: true },
		event_type: { type: String, required: true },
		venue: { type: String, required: true },
		location: { type: String, required: true },
		start_date: { type: Date, required: true },
		end_date: Date,
		time: String,
		description: String,
		tags: [{ type: String, lowercase: true }],
		ticket: {
			type: { type: String, enum: ['paid', 'free'], required: true },
			price: { type: Number, required: true },
		},
		image: { type: String },
		contact: [{ type: Number }],
		created: { type: Date, default: new Date() },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
)

export const EventModel = mongoose.model('Event', eventSchema)
